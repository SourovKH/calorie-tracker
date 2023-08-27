const showTarget = (target) => {
  const targetElement = document.querySelector("#target");
  targetElement.innerText = `${target} cal`;
};

const requestToSetTarget = (target) => {
  const request = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ target }),
  };

  fetch("/calorie-tracker/target", request).then((res) => {
    if (res.status === 204) showTarget(target);
  });
};

const handleTargetSetter = () => {
  const targetBox = document.querySelector("#target-box");
  const setButton = document.querySelector("#set-button");

  setButton.onclick = () => {
    const target = targetBox.value;
    targetBox.value = 0;
    requestToSetTarget(target);
  };
};

const getExerciseDetails = () => {
  const exerciseElements = document.querySelectorAll(".exercise-measurement");

  const exerciseDetails = [...exerciseElements].map((exerciseElement) => {
    const exerciseName = exerciseElement.name;
    const exerciseMeasurement = exerciseElement.value;

    return [exerciseName, +exerciseMeasurement];
  });

  return Object.fromEntries(exerciseDetails);
};

const updateCalorieBoard = (remainingCalorie) => {
  const achieveElement = document.querySelector("#achieved");
  achieveElement.innerText = `${remainingCalorie} cal`;
};

const submitExercises = () => {
  const exerciseDetails = getExerciseDetails();
  const request = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...exerciseDetails }),
  };

  fetch("/calorie-tracker/exercises", request)
    .then((res) => res.json())
    .then((body) => updateCalorieBoard(body.remainingCalorie));
};

const handleExercises = () => {
  const form = document.querySelector("#exercise-measurements");

  form.onsubmit = (event) => {
    event.preventDefault();
    submitExercises();
  };
};

const main = () => {
  handleTargetSetter();
  handleExercises();
};

window.onload = main;
