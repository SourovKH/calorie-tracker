const createApp = require("./src/app");

const main = () => {
  const app = createApp();
  const port = 8000;

  app.listen(8000, () => console.log("listening on port", port));
};

main();
