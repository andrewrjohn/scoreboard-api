"use strict";
exports.__esModule = true;
var express = require("express");
var scoreboardRoute = require("./routes/scoreboard");
var app = express();
var port = process.env.PORT || 4000;
app.use("/api/v1/sports", [scoreboardRoute]);
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.listen(port, function () {
    console.log("Server running on port " + port);
});
