const express = require("express");
const logger = require("./middlewares/logger");
const { updateExerciseHistory } = require("./handlers/calorie-tracker-handlers");

const createApp = () => {
  const app = express();

  app.use(logger);
  app.use(express.json());

  app.post("/calorie-tracker/exercises", updateExerciseHistory);
  app.use(express.static("public"));
  return app;
};

module.exports = createApp;
