const express = require("express");
const config = require("./config.json");

const app = express();

app.use(express.static("public"));

app.listen(config.port, () => {
    console.log(`Running on port ${config.port}`);
});