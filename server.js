const fs = require("fs");

const createApp = require("./src/app");
const Storage = require("./src/models/storage");
const CalorieTrackers = require("./src/models/calorie-trackers");
const Users = require("./src/models/users");

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

const main = () => {
  const storage = new Storage(fs);
  const userDetails = storage.getUserDetails();
  const trackerDetails = storage.getCalorieTrackerDetails();

  const users = new Users(createUsers(userDetails));
  const calorieTrackers = new CalorieTrackers(
    createCalorieTrackers(trackerDetails)
  );

  const app = createApp(users, calorieTrackers, storage);
  const port = 8000;

  app.listen(8000, () => console.log("listening on port", port));
};

main();
