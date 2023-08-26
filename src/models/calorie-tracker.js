const CALORIE_CHART = {
  pushup: 7,
  chinup: 8,
  squat: 4,
};

class CalorieTracker {
  #target;
  #history;

  constructor(target) {
    this.#target = target;
    this.#history = {};
  }

  #calculateCaloriesBurned(exerciseName, duration) {
    return CALORIE_CHART[exerciseName] * duration;
  }

  #updateExerciseHistory(exerciseName, duration) {
    this.#history[exerciseName] = duration;
  }

  showHistory() {
    return { ...this.#history };
  }

  showRemainingTarget() {
    return this.#target;
  }

  addExercise(exerciseName, duration) {
    const calorieBurned = this.#calculateCaloriesBurned(exerciseName, duration);
    this.#target -= calorieBurned;
    this.#updateExerciseHistory(exerciseName, duration);
  }
}

exports.CalorieTracker = CalorieTracker;
