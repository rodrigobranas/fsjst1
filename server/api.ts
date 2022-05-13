import express from "express";

const app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
});

app.get("/boards/:idBoard", function (req, res) {
	res.json({ 
		name: "Project A",
		columns: [
			{ 
				name: "Todo", 
				hasEstimative: true, 
				cards: [
					{ title: "A", estimative: 3 },
					{ title: "B", estimative: 6 },
					{ title: "C", estimative: 9 }
				]
			},
			{ name: "Doing", hasEstimative: true, cards: [] },
			{ name: "Done", hasEstimative: false, cards: [] }
		]
	 });
});

app.listen(8000);