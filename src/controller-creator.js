const CalorieTracker = require("./models/calorie-tracker");
const Controller = require("./models/controller");
const User = require("./models/user");

const createUsers = (userDetails) => {
  return userDetails.map((userDetail) => {
    const { username, password, userId } = userDetail;
    return new User(username, userId, password);
  });
};

const createCalorieTrackers = (trackerDetails) => {
  return trackerDetails.map((trackerDetail) => {
    const { history, id, remainingTarget } = trackerDetail;
    const calorieTracker = new CalorieTracker(id);

    calorieTracker.restoreHistory(history);
    calorieTracker.target = remainingTarget;

    return calorieTracker;
  });
};

const createController = (storage) => {
  const userDetails = storage.getUserDetails();
  const trackerDetails = storage.getCalorieTrackerDetails();

  const users = createUsers(userDetails);
  const calorieTrackers = createCalorieTrackers(trackerDetails);

  return new Controller(users, calorieTrackers, storage);
};

module.exports = createController;
