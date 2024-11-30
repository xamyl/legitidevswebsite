const express = require("express");
const config = require("./config.json");
const path = require("node:path");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/browse", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "world-browser.html"));
});

app.listen(config.port, () => {
  console.log(`Running on port ${config.port}`);
});
