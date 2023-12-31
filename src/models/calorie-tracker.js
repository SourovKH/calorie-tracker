const CALORIE_CHART = {
  pushup: 7,
  running: 8,
  squat: 4,
};

class CalorieTracker {
  #target;
  #history;
  #id;

  constructor(id, history = []) {
    this.#id = id;
    this.#history = history;
    this.#target = 0;
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

  get id() {
    return this.#id;
  }

  get remainingTarget() {
    return this.#target;
  }
}

module.exports = CalorieTracker;
