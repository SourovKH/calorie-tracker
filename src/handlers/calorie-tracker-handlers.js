const CalorieTracker = require("../models/calorie-tracker");
const User = require("../models/user");

const setTarget = (req, res) => {
  const { target } = req.body;
  const { calorieTrackers } = req.app;
  const trackerId = req.cookies.userId;

  calorieTrackers.setTarget(trackerId, +target);

  res.status(204);
  res.end();
};

const storeUserAndTrackerDetails = (req, _, onStore) => {
  const { users, calorieTrackers, storage } = req.app;

  const userDetails = JSON.stringify(users.getUserDetails());
  const trackerDetails = JSON.stringify(calorieTrackers.getTrackerDetails());

  storage.storeUserDetails(userDetails, () => {
    storage.storeTrackerDetails(trackerDetails, () => {
      onStore();
    });
  });
};

const updateExerciseHistory = (req, res) => {
  const exercises = req.body;
  const { calorieTrackers } = req.app;
  const trackerId = req.cookies.userId;

  const remainingTarget = calorieTrackers.addExercises(exercises, trackerId);

  storeUserAndTrackerDetails(req, res, () => {
    res.type("json");
    res.status(201);
    res.send({ remainingTarget });
  });
};

const getHistory = (req, res) => {
  const { calorieTrackers } = req.app;
  const trackerId = req.cookies.userId;

  const exerciseHistory = calorieTrackers.getExerciseHistory(trackerId);

  res.type("json");
  res.status(200);
  res.send(exerciseHistory);
};

const serveTrackingPage = (req, res) => {
  const { cookies } = req;

  if (!cookies.userId) {
    res.redirect(301, "/login");
    return;
  }

  const pwd = process.env.PWD;
  res.sendFile(`${pwd}/private/pages/calorie-tracker.html`);
};

const serveLoginPage = (req, res) => {
  const pwd = process.env.PWD;

  res.sendFile(`${pwd}/private/pages/login.html`);
};

const handleLogin = (req, res) => {
  const { username, password } = req.body;
  const users = req.app.users;

  const validation = users.validateUser(username, password);

  if (validation.username && validation.password) {
    res.cookie("userId", `${username}-${password}`);
  }

  res.json({ location: "/", ...validation });
};

const serveSignupPage = (req, res) => {
  const pwd = process.env.PWD;

  res.sendFile(`${pwd}/private/pages/signup.html`);
};

const registerUser = (req, res) => {
  const { users, calorieTrackers } = req.app;
  const { username, password } = req.body;
  const userId = `${username}-${password}`;

  const user = new User(username, userId, password);
  users.addUser(user);

  const calorieTracker = new CalorieTracker(userId);
  calorieTrackers.addCalorieTracker(calorieTracker);

  storeUserAndTrackerDetails(req, res, () => {
    res.redirect(303, "login");
  });
};

const logoutUser = (req, res) => {
  res.clearCookie("userId");
  res.redirect(303, "/");
};

module.exports = {
  updateExerciseHistory,
  getHistory,
  serveTrackingPage,
  setTarget,
  serveLoginPage,
  handleLogin,
  serveSignupPage,
  registerUser,
  logoutUser,
};
