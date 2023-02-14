import express from "express";
import natural from "natural";
import cors from "cors";

const app = express();

app.use(cors());

function preprocess(input) {
	// Use the Natural library to preprocess the input
	const processedInput = natural.LancasterStemmer.stem(input);

	return processedInput;
}

function getResponseFromModel(input) {
	// Use the Natural library to generate a response from the AI language model
	const response = preprocess(input);

	return response;
}

app.get("/api/response", (req, res) => {
	const input = req.query.input;
	// Call the AI language model to get the response
	const response = getResponseFromModel(input);

	res.json({ response });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${ port }`));