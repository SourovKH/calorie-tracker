const createHistoryElement = (exerciseDetails) => {
  const historyElement = document.createElement("div");
  historyElement.classList.add("exercise-details");

  const exerciseElements = Object.entries(exerciseDetails).map(
    ([exerciseName, durationOrCount]) => {
      const exerciseElement = document.createElement("div");
      exerciseElement.innerText = `${exerciseName}: ${durationOrCount}`;

      return exerciseElement;
    }
  );

  historyElement.append(...exerciseElements);
  return historyElement;
};

const showHistory = (history) => {
  const historyContainer = document.querySelector("#history");
  historyContainer.innerText = "";

  history.forEach((exerciseDetails) => {
    const historyElement = createHistoryElement(exerciseDetails);

    historyContainer.appendChild(historyElement);
  });
};

const fetchAndShowHistory = () => {
  fetch("/calorie-tracker/exercise-history")
    .then((res) => res.json())
    .then((body) => showHistory(body));
};

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
    exerciseElement.value = 0;

    return [exerciseName, +exerciseMeasurement];
  });

  return Object.fromEntries(exerciseDetails);
};

const updateCalorieBoard = (remainingTarget) => {
  const achieveElement = document.querySelector("#achieved");
  achieveElement.innerText = `${remainingTarget} cal`;
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
    .then((body) => {
      updateCalorieBoard(body.remainingTarget);
      fetchAndShowHistory();
    });
};

const handleExercises = () => {
  const form = document.querySelector("#exercise-measurements");

  form.onsubmit = (event) => {
    event.preventDefault();
    submitExercises();
  };
};

const main = () => {
  fetchAndShowHistory();
  handleTargetSetter();
  handleExercises();
};

window.onload = main;
