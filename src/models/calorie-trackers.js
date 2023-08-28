class CalorieTrackers {
  #calorieTrackers;

  constructor(calorieTrackers) {
    this.#calorieTrackers = calorieTrackers;
  }

  addCalorieTracker(calorieTracker) {
    this.#calorieTrackers.push(calorieTracker);
  }

  getTrackerHistory(trackerId) {
    const tracker = this.#calorieTrackers.find((tracker) => {
      return tracker.id === trackerId;
    });

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
}

module.exports = CalorieTrackers;