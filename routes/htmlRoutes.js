

var path = require("path");
const workout = require("../models/workout.js");

module.exports = function (app) {
  app.get("/exercise", function (req, res) {
    res.sendFile(path.resolve("./public/exercise.html"));
  });
  app.get("/stats", function (req, res) {
    res.sendFile(path.resolve("./public/stats.html"));
  });
  app.get("/", function (req, res) {
    res.sendFile(path.resolve("./public/index.html"));
  });
};
