class CalorieTrackers {
  #calorieTrackers;

  constructor(calorieTrackers) {
    this.#calorieTrackers = calorieTrackers;
  }

  addCalorieTracker(calorieTracker) {
    this.#calorieTrackers.push(calorieTracker);
  }

  #findTracker(trackerId) {
    return this.#calorieTrackers.find((tracker) => {
      return tracker.id === trackerId;
    });
  }

  getExerciseHistory(trackerId) {
    const tracker = this.#findTracker(trackerId);

    return tracker.getHistory();
  }

  getTrackerDetails() {
    return this.#calorieTrackers.map((tracker) => {
      const history = tracker.getHistory();
      const id = tracker.id;
      const remainingTarget = tracker.remainingTarget;

      return { history, id, remainingTarget };
    });
  }

  setTarget(trackerId, target) {
    const tracker = this.#findTracker(trackerId);

    tracker.target = target;
  }

  addExercises(exercises, trackerId) {
    const tracker = this.#findTracker(trackerId);
    tracker.addExercises(exercises);

    return tracker.remainingTarget;
  }
}

module.exports = CalorieTrackers;
