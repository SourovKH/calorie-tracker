const updateExerciseHistory = (req, res) => {
  const exercises = req.body;
  console.log(exercises);

  res.type("json");
  res.status(201);
  res.send({ remainingCalorie: 40 });
};

module.exports = { updateExerciseHistory };
