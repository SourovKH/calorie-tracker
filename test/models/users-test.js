const { describe, it } = require("node:test");
const assert = require("assert");
const User = require("../../src/models/user");
const CalorieTracker = require("../../src/models/calorie-tracker");
const Storage = require("../../src/models/storage");
const Users = require("../../src/models/users");

describe("getUserDetails", () => {
  it("should return the user details of given userId", () => {
    const fs = {
      writeFile: (path, content, onStore) => onStore(),
    };

    const storage = new Storage(fs);
    const user = new User("souma", 1, "s1");

    const users = new Users([user], [], storage);
    const userDetails = users.getUserDetails(1);

    const expected = {
      username: "souma",
      userId: 1,
      password: "s1",
    };
    assert.deepStrictEqual(userDetails, expected);
  });
});

describe("addUser", () => {
  it("should add user in users", (context) => {
    const onStore = context.mock.fn();
    const fs = {
      writeFile: (path, content, onStore) => onStore(),
    };

    const storage = new Storage(fs);
    const users = new Users([], [], storage);

    const user = new User("skh", 2, "skh2");
    users.addUser(user, onStore);
    const userDetails = users.getUserDetails(2);

    const expected = {
      username: "skh",
      userId: 2,
      password: "skh2",
    };
    assert.deepStrictEqual(userDetails, expected);
  });
});

describe("getTrackerHistory", () => {
  it("should give the exercises history of a calorie tracker", () => {
    const fs = {};
    const storage = new Storage(fs);
    const calorieTracker1 = new CalorieTracker(1);
    const calorieTracker2 = new CalorieTracker(2);

    calorieTracker2.addExercises({ pushup: 5, squat: 8 });
    calorieTracker2.addExercises({ pushup: 8, squat: 2 });

    const users = new Users([], [calorieTracker1, calorieTracker2], storage);

    const expected = [
      { pushup: 5, squat: 8 },
      { pushup: 8, squat: 2 },
    ];

    assert.deepStrictEqual(users.getTrackerHistory(2), expected);
  });
});
