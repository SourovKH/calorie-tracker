const { describe, it } = require("node:test");
const request = require("supertest");

const createApp = require("../src/app");
const Storage = require("../src/models/storage");
const CalorieTracker = require("../src/models/calorie-tracker");
const CalorieTrackers = require("../src/models/calorie-trackers");
const Users = require("../src/models/users");
const User = require("../src/models/user");

describe("GET /", () => {
  it("should get index page", (_, done) => {
    const app = createApp();

    request(app).get("/").expect(200).expect("content-type", /html/).end(done);
  });
});

describe("POST /calorie-tracker/exercises", () => {
  it("should store exercise data performed by user", (_, done) => {
    const fs = {
      writeFile: (path, content, onStore) => onStore(),
    };
    const storage = new Storage(fs);
    const users = new Users([]);

    const calorieTrackers = new CalorieTrackers([]);
    const calorieTracker = new CalorieTracker("s123");
    calorieTracker.target = 200;
    calorieTrackers.addCalorieTracker(calorieTracker);

    const app = createApp(users, calorieTrackers, storage);

    request(app)
      .post("/calorie-tracker/exercises")
      .set("cookie", "userId=s123")
      .send({ pushup: 5, running: 10 })
      .expect(201)
      .expect("content-type", /json/)
      .expect({ remainingTarget: 85 })
      .end(done);
  });
});

describe("GET /calorie-tracker/exercise-history", () => {
  it("should give all exercise history", (_, done) => {
    const fs = {};
    const storage = new Storage(fs);
    const users = new Users([]);

    const calorieTrackers = new CalorieTrackers([]);
    const calorieTracker = new CalorieTracker("s123");
    calorieTracker.addExercises({ pushup: 5, running: 10, squat: 8 });
    calorieTrackers.addCalorieTracker(calorieTracker);

    const app = createApp(users, calorieTrackers, storage);

    request(app)
      .get("/calorie-tracker/exercise-history")
      .set("cookie", "userId=s123")
      .expect(200)
      .expect("content-type", /json/)
      .expect([{ pushup: 5, running: 10, squat: 8 }])
      .end(done);
  });
});

describe("GET /calorie-tracker", () => {
  it("should serve calorie tracking page", (_, done) => {
    const app = createApp();

    request(app)
      .get("/calorie-tracker")
      .expect(301)
      .expect("content-type", /plain/)
      .end(done);
  });
});

describe("POST /calorie-tracker/target", () => {
  it("should set target in calorie tracker", (_, done) => {
    const fs = {};
    const storage = new Storage(fs);
    const users = new Users([]);

    const calorieTrackers = new CalorieTrackers([]);
    const calorieTracker = new CalorieTracker("s123");
    calorieTrackers.addCalorieTracker(calorieTracker);
    const app = createApp(users, calorieTrackers, storage);

    request(app)
      .post("/calorie-tracker/target")
      .set("cookie", "userId=s123")
      .send({ target: 300 })
      .expect(204)
      .end(done);
  });
});

describe("GET /login", () => {
  it("should get the login page", (_, done) => {
    const app = createApp();

    request(app)
      .get("/login")
      .expect(200)
      .expect("content-type", /html/)
      .end(done);
  });
});

describe("POST /login", () => {
  it("should give response when user credentials are valid", (_, done) => {
    const fs = {};
    const storage = new Storage(fs);
    const users = new Users([]);
    const calorieTrackers = new CalorieTrackers([]);

    const user = new User("skh", "s123", "s123");
    users.addUser(user);

    const app = createApp(users, calorieTrackers, storage);
    const expectedResponse = { location: "/calorie-tracker", username: true, password: true };

    request(app)
      .post("/login")
      .send({ username: "skh", password: "s123" })
      .expect(200)
      .expect(expectedResponse)
      .end(done);
  });

  it("should give response when username is wrong", (_, done) => {
    const fs = {};
    const storage = new Storage(fs);
    const users = new Users([]);
    const calorieTrackers = new CalorieTrackers([]);

    const user = new User("skh", "s123", "s123");
    users.addUser(user);

    const app = createApp(users, calorieTrackers, storage);
    const expectedResponse = {
      location: "/calorie-tracker",
      username: false,
      password: false,
    };

    request(app)
      .post("/login")
      .send({ username: "riya", password: "s123" })
      .expect(200)
      .expect(expectedResponse)
      .end(done);
  });

  it("should give response when username is valid but password is wrong", (_, done) => {
    const fs = {};
    const storage = new Storage(fs);
    const users = new Users([]);
    const calorieTrackers = new CalorieTrackers([]);

    const user = new User("skh", "s123", "s123");
    users.addUser(user);

    const app = createApp(users, calorieTrackers, storage);
    const expectedResponse = { location: "/calorie-tracker", username: true, password: false };

    request(app)
      .post("/login")
      .send({ username: "skh", password: "s1234" })
      .expect(200)
      .expect(expectedResponse)
      .end(done);
  });
});

describe("GET /signup", () => {
  it("should get signup page with status code 200", (_, done) => {
    const app = createApp();

    request(app)
      .get("/signup")
      .expect(200)
      .expect("content-type", /html/)
      .end(done);
  });
});

describe("POST /signup", () => {
  it("should register a user", (_, done) => {
    const fs = {
      writeFile: (path, content, onStore) => onStore(),
    };
    const storage = new Storage(fs);
    const users = new Users([]);
    const calorieTrackers = new CalorieTrackers([]);

    const app = createApp(users, calorieTrackers, storage);

    request(app)
      .post("/signup")
      .send({ username: "skh", password: "s1234" })
      .expect(303)
      .expect("location", "login")
      .end(done);
  });
});

describe("GET /logout", () => {
  it("should logout user from page", (_, done) => {
    const app = createApp();

    request(app).get("/logout").expect(303).expect("location", "/").end(done);
  });
});
