const fs = require("fs");

const createApp = require("./src/app");
const Storage = require("./src/models/storage");
const createController = require("./src/controller-creator");

const main = () => {
  const storage = new Storage(fs);

  const controller = createController(storage);
  const app = createApp(controller);
  const port = 8000;

  app.listen(8000, () => console.log("listening on port", port));
};

main();
