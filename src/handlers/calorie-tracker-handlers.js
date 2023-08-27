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
  const pwd = process.env.PWD;

  res.sendFile(`${pwd}/private/pages/calorie-tracker.html`);
};

const setTarget = (req, res) => {
  const { target } = req.body;
  console.log({ target });

  res.status(204);
  res.end();
};

module.exports = {
  updateExerciseHistory,
  getHistory,
  serveTrackingPage,
  setTarget,
};
