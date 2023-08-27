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
    const calorieTracker = new CalorieTracker(1);

    const users = new Users([user], [calorieTracker], storage);
    const userDetails = users.getUserDetails(1);

    const expected = {
      username: "souma",
      userId: 1,
      password: "s1",
    };
    assert.deepStrictEqual(userDetails, expected);
  });
});

