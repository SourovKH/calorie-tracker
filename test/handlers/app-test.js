const fs = require("fs");
const { describe, it } = require("node:test");
const request = require("supertest");

const createApp = require("../../src/app");

describe("GET /", () => {
  it("should get index page", (_, done) => {
    const indexPage = fs.readFileSync("./public/index.html", "utf-8");
    const app = createApp();

    request(app)
      .get("/")
      .expect(200)
      .expect("content-type", /html/)
      .expect(indexPage)
      .end(done);
  });
});

describe("POST /calorie-tracker/exercises", () => {
  it("should store exercise data performed by user", (_, done) => {
    const app = createApp();

    request(app)
      .post("/calorie-tracker/exercises")
      .send({ pushup: 5, running: 10 })
      .expect(201)
      .expect("content-type", /json/)
      .expect({ remainingCalorie: 40 })
      .end(done);
  });
});
