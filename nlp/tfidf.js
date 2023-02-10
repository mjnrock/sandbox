const natural = require("natural");
const TfIdf = natural.TfIdf;

const getTfIdfScores = (documents) => {
	const tfidf = new TfIdf();

	// Add the documents to the TF-IDF model
	documents.forEach(doc => tfidf.addDocument(doc));

	// Compute the TF-IDF scores for each word in each document
	const scores = [];
	for(let i = 0; i < documents.length; i++) {
		const words = documents[ i ].split(" ");
		scores[ i ] = [];
		for(let j = 0; j < words.length; j++) {
			tfidf.tfidfs(words[ j ], (index, measure) => {
				scores[ i ][ j ] = measure;
			});
		}
	}

	return scores;
};

const documents = [
	`I would like to find somewhere to go for dinner tonight`,
	`What are some places nearby that serve Italian food`,
	`I love Italian food, especially pasta dishes`,
	`There's a great Italian restaurant on Main Street`,
	`I'm in the mood for pizza tonight`
];

const scores = getTfIdfScores(documents);
console.log(scores);