const CALORIE_CHART = {
  pushup: 7,
  chinup: 8,
  squat: 4,
};

class CalorieTracker {
  #target;
  #history;

  constructor() {
    this.#history = [];
  }

  getHistory() {
    return this.#history.map((hist) => {
      return { ...hist };
    });
  }

  #updateTarget(exercises) {
    Object.entries(exercises).forEach(([exerciseName, durationOrCount]) => {
      const calorieBurned = CALORIE_CHART[exerciseName] * durationOrCount;

      this.#target -= calorieBurned;
    });
  }

  addExercises(exercises) {
    this.#updateTarget(exercises);
    this.#history.push(exercises);
  }

  set target(target) {
    this.#target = target;
  }

  get remainingTarget() {
    return this.#target;
  }
}

exports.CalorieTracker = CalorieTracker;