const { describe, it } = require("node:test");
const assert = require("assert");

const CalorieTrackers = require("../../src/models/calorie-trackers");
const CalorieTracker = require("../../src/models/calorie-tracker");

describe("getTrackerDetails", () => {
  it("should give details of calorie trackers when one tracker is present", () => {
    const calorieTracker = new CalorieTracker(2);
    calorieTracker.target = 200;
    calorieTracker.addExercises({ pushup: 4, running: 10 });

    const calorieTrackers = new CalorieTrackers([calorieTracker]);
    const trackerDetails = calorieTrackers.getTrackerDetails();

    const expected = [
      {
        history: [{ pushup: 4, running: 10 }],
        id: 2,
        remainingTarget: 92,
      },
    ];

    assert.deepStrictEqual(trackerDetails, expected);
  });

  it("should give details of all calorie trackers", () => {
    const calorieTracker1 = new CalorieTracker(1);
    calorieTracker1.target = 200;
    calorieTracker1.addExercises({ pushup: 5, running: 10 });

    const calorieTracker2 = new CalorieTracker(2);
    calorieTracker2.target = 250;
    calorieTracker2.addExercises({ pushup: 10, squat: 8 });

    const calorieTrackers = new CalorieTrackers([
      calorieTracker1,
      calorieTracker2,
    ]);
    const trackerDetails = calorieTrackers.getTrackerDetails();

    const expected = [
      {
        history: [{ pushup: 5, running: 10 }],
        id: 1,
        remainingTarget: 85,
      },
      {
        history: [{ pushup: 10, squat: 8 }],
        id: 2,
        remainingTarget: 148,
      },
    ];

    assert.deepStrictEqual(trackerDetails, expected);
  });
});

describe("addCalorieTracker", () => {
  it("should add a calorie tracker", () => {
    const calorieTracker = new CalorieTracker(2);
    calorieTracker.target = 200;
    calorieTracker.addExercises({ pushup: 4, running: 10 });

    const calorieTrackers = new CalorieTrackers([]);
    calorieTrackers.addCalorieTracker(calorieTracker);

    const trackerDetails = calorieTrackers.getTrackerDetails();

    const expected = [
      {
        history: [{ pushup: 4, running: 10 }],
        id: 2,
        remainingTarget: 92,
      },
    ];

    assert.deepStrictEqual(trackerDetails, expected);
  });
});

describe("getTrackerHistory", () => {
  it("Should return the exercise history of a tracker of a given tracker id", () => {
    const calorieTracker1 = new CalorieTracker(1);
    calorieTracker1.target = 200;
    calorieTracker1.addExercises({ pushup: 5, running: 10 });

    const calorieTracker2 = new CalorieTracker(2);
    calorieTracker2.target = 250;
    calorieTracker2.addExercises({ pushup: 10, squat: 8 });

    const calorieTrackers = new CalorieTrackers([
      calorieTracker1,
      calorieTracker2,
    ]);
    const trackerHistory = calorieTrackers.getExerciseHistory(2);

    const expected = [{ pushup: 10, squat: 8 }];

    assert.deepStrictEqual(trackerHistory, expected);
  });
});

describe("setTarget", () => {
  it("should set a target of the calorie tracker of given id", () => {
    const calorieTracker = new CalorieTracker(2);

    const calorieTrackers = new CalorieTrackers([]);
    calorieTrackers.addCalorieTracker(calorieTracker);
    calorieTrackers.setTarget(2, 200);

    const trackerDetails = calorieTrackers.getTrackerDetails();

    const expected = [
      {
        history: [],
        id: 2,
        remainingTarget: 200,
      },
    ];

    assert.deepStrictEqual(trackerDetails, expected);
  });
});

describe("addExercises", () => {
  it("should add exercises to the tracker of a given tracker id", () => {
    const calorieTracker = new CalorieTracker(2);

    const calorieTrackers = new CalorieTrackers([]);
    calorieTrackers.addCalorieTracker(calorieTracker);
    calorieTrackers.setTarget(2, 200);
    calorieTrackers.addExercises({ pushup: 5, running: 10 }, 2);

    const exerciseHistory = calorieTrackers.getExerciseHistory(2);

    const expected = [{ pushup: 5, running: 10 }];

    assert.deepStrictEqual(exerciseHistory, expected);
  });
});
