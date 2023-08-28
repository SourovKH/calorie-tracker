const express = require("express");

const logger = require("./middlewares/logger");
const parseCookie = require("./middlewares/cookie-parser");
const {
  updateExerciseHistory,
  getHistory,
  serveTrackingPage,
  setTarget,
  serveLoginPage,
  handleLogin,
  serveSignupPage,
  registerUser,
} = require("./handlers/calorie-tracker-handlers");

const createApp = (users, calorieTrackers, storage) => {
  const app = express();
  app.users = users;
  app.calorieTrackers = calorieTrackers;
  app.storage = storage;

  app.use(logger);
  app.use(express.json());
  app.use(parseCookie);
  app.use(express.urlencoded());

  app.get("/login", serveLoginPage);
  app.post("/login", handleLogin);

  app.get("/signup", serveSignupPage);
  app.post("/signup", registerUser);

  app.post("/calorie-tracker/exercises", updateExerciseHistory);
  app.get("/calorie-tracker/exercise-history", getHistory);
  app.get("/calorie-tracker", serveTrackingPage);
  app.post("/calorie-tracker/target", setTarget);

  app.use(express.static("public"));
  return app;
};

module.exports = createApp;
