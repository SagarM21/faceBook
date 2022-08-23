const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { readdirSync } = require("fs");
const app = express();
app.use(cors());

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

PORT = process.env.PORT || 8000
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
