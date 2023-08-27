const express = require("express");
const logger = require("./middlewares/logger");
const {
  updateExerciseHistory,
  getHistory,
  serveTrackingPage,
  setTarget,
} = require("./handlers/calorie-tracker-handlers");

const createApp = () => {
  const app = express();

  app.use(logger);
  app.use(express.json());

  app.post("/calorie-tracker/exercises", updateExerciseHistory);
  app.get("/calorie-tracker/exercise-history", getHistory);
  app.get("/calorie-tracker", serveTrackingPage);
  app.post("/calorie-tracker/target", setTarget);

  app.use(express.static("public"));
  return app;
};

module.exports = createApp;
