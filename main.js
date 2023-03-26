import * as dfd from "danfojs-node";

const data = [
	{ name: "Point A", lat: 37.7749, long: -122.4194 },
	{ name: "Point B", lat: 37.7749, long: -122.4084 },
	{ name: "Point C", lat: 37.7831, long: -122.4039 },
	{ name: "Point D", lat: 37.7758, long: -122.4128 },
	{ name: "Point E", lat: 37.7858, long: -122.4064 },
];
const refLat = 37.7749;
const refLon = -122.4194;

const df = new dfd.DataFrame(data);

let mask = df.apply(row => isWithin25Miles(refLat, refLon, row[ 1 ], row[ 2 ], .25));
console.log(df.query(mask));

function isWithin25Miles(lat1, lon1, lat2, lon2, radius) {
	// Convert latitude and longitude values to radians
	const R = 3958.8; // Radius of the earth in miles
	const dLat = toRadians(lat2 - lat1);
	const dLon = toRadians(lon2 - lon1);
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;

	return distance <= radius;
}

function toRadians(degrees) {
	return degrees * (Math.PI / 180);
}

// // Define the reference location

// // Define a function to apply to each row using applyRows()
// function isNear(row) {
// 	return Math.random() > 0.5;
// 	return isWithin25Miles(refLat, refLon, row[ 'lat' ], row[ 'long' ]);
// }

// // Apply the function to each row using applyRows()
// const boolArray = df.apply(isNear);

// // Use boolean indexing to filter the DataFrame
// const filtered = df[ boolArray ];

// console.log(df.apply(isNear));
// console.log("------------------")
// console.log(filtered);
// console.log("------------------")
// console.log(df);