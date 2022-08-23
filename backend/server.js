const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Welcome from backend");
});

app.listen(8000, () => {
	console.log("Server is listening");
});
