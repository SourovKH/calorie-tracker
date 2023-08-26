class CalorieTracker {
  #calorie;
  #history;

  constructor(target) {
    this.#calorie = target;
    this.#history = {};
  }

  #calculateCaloriesBurned(exerciseName, duration) {
    const chart = {
      pushup: 7,
      chinup: 8,
      squat: 4,
    };

    return chart[exerciseName] * duration;
  }

  #updateExerciseHistory(exerciseName, duration) {
    this.#history[exerciseName] = duration;
  }

  showHistory() {
    return { ...this.#history };
  }

  showRemainingTarget() {
    return this.#calorie;
  }

  addExercise(exerciseName, duration) {
    const calorieBurned = this.#calculateCaloriesBurned(exerciseName, duration);
    this.#calorie -= calorieBurned;
    this.#updateExerciseHistory(exerciseName, duration);
  }
}

exports.CalorieTracker = CalorieTracker;
