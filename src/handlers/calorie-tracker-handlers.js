const CalorieTracker = require("../models/calorie-tracker");
const User = require("../models/user");

const setTarget = (req, res) => {
  const { target } = req.body;
  const { calorieTrackers } = req.app;
  const trackerId = req.cookies.userId;
  calorieTrackers.setCalorie(trackerId, +target);

  res.status(204);
  res.end();
};

const updateExerciseHistory = (req, res) => {
  const exercises = req.body;
  console.log(exercises);

  res.type("json");
  res.status(201);
  res.send({ remainingCalorie: 40 });
};

const getHistory = (req, res) => {
  const exerciseHistory = [{ pushup: 5, running: 10, squat: 8 }];
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

  res.type("json");
  res.send({ location: "/", ...validation });
};

const serveSignupPage = (req, res) => {
  const pwd = process.env.PWD;

  res.sendFile(`${pwd}/private/pages/signup.html`);
};

const storeUserAndTrackerDetails = (req, res) => {
  const { users, calorieTrackers, storage } = req.app;

  const userDetails = JSON.stringify(users.getUserDetails());
  const trackerDetails = JSON.stringify(calorieTrackers.getTrackerDetails());

  storage.storeUserDetails(userDetails, () => {
    storage.storeTrackerDetails(trackerDetails, () => {
      res.redirect("login");
    });
  });
};

const registerUser = (req, res) => {
  const { users, calorieTrackers } = req.app;
  const { username, password } = req.body;
  const userId = `${username}-${password}`;

  const user = new User(username, userId, password);
  users.addUser(user);

  const calorieTracker = new CalorieTracker(userId);
  calorieTrackers.addCalorieTracker(calorieTracker);

  storeUserAndTrackerDetails(req, res);
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
};
