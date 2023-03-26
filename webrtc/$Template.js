const express = require("express");
const http = require("http");
const { PeerServer } = require("peer");
const { RTCPeerConnection, RTCSessionDescription } = require("wrtc");
const stunturn = require("stunturn");

// Create a new STUN server instance
const stunServer = new stunturn.StunServer({
	// Listen on port 3478
	port: 3478,

	// Use the shared secret "mysecret"
	secret: "mysecret"
});

// Start the STUN server
stunServer.start(() => {
	console.log("STUN server listening on port 3478");
});

// Create a new PeerServer instance
const peerServer = PeerServer({
	port: 9000,
	path: "/myapp",
	allow_discovery: true,
	generateClientId: () => {
		return `client-${ Math.random().toString(36).substr(2, 9) }`;
	}
});

// Create a new Express app
const app = express();

// Serve the client files
app.use(express.static(__dirname + "/public"));

// Create a new HTTP server
const server = http.createServer(app);

// Listen for incoming WebRTC connections
peerServer.on("connection", (client) => {
	console.log(`Client connected: ${ client.getId() }`);

	// Create a new RTCPeerConnection instance
	const pc = new RTCPeerConnection({
		iceServers: [ { urls: "stun:localhost:3478" } ]
	});

	// Add audio and video tracks to the RTCPeerConnection
	navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
		const audioTrack = stream.getAudioTracks()[ 0 ];
		const videoTrack = stream.getVideoTracks()[ 0 ];
		pc.addTrack(audioTrack, stream);
		pc.addTrack(videoTrack, stream);
	});

	// Listen for ICE candidate events
	pc.onicecandidate = (event) => {
		console.log(`ICE candidate generated: ${ JSON.stringify(event.candidate) }`);
		client.send(JSON.stringify({ type: "candidate", candidate: event.candidate }));
	};

	// Listen for offer events
	client.on("message", (message) => {
		const data = JSON.parse(message);

		if(data.type === "offer") {
			console.log(`Offer received: ${ JSON.stringify(data.offer) }`);
			pc.setRemoteDescription(new RTCSessionDescription(data.offer));
			pc.createAnswer().then((answer) => {
				console.log(`Answer generated: ${ JSON.stringify(answer) }`);
				pc.setLocalDescription(answer);
				client.send(JSON.stringify({ type: "answer", answer }));
			});
		} else if(data.type === "candidate") {
			console.log(`Candidate received: ${ JSON.stringify(data.candidate) }`);
			pc.addIceCandidate(new RTCIceCandidate(data.candidate));
		}
	});
});

// Start the server
server.listen(3000, () => {
	console.log("Server listening on port 3000");
});
