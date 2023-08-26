const fs = require("fs");
const { describe, it } = require("node:test");
const request = require("supertest");

const createApp = require("../../src/app");

describe("GET /", () => {
  it("it should get index page", (_, done) => {
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
