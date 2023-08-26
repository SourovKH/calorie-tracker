const { describe, it } = require("node:test");
const { strictEqual, deepStrictEqual } = require("assert");

const { CalorieTracker } = require("../../src/models/calorie-tracker");

describe("CalorieTracker", () => {
  describe("showRemainingTarget", () => {
    it("should give the remaining target", () => {
      const tracker = new CalorieTracker(10);

      strictEqual(tracker.showRemainingTarget(), 10);
    });
  });

  describe("addExercise", () => {
    it("should add exercises to the calorie tracker", () => {
      const tracker = new CalorieTracker(70);
      tracker.addExercise("pushup", 9);
      const remainingTarget = 7;

      strictEqual(tracker.showRemainingTarget(), remainingTarget);
    });

    it("should add multiple exercises to the calorie tracker", () => {
      const tracker = new CalorieTracker(50);

      tracker.addExercise("chinup", 5);
      tracker.addExercise("squat", 2);

      const remainingTarget = 2;

      strictEqual(tracker.showRemainingTarget(), remainingTarget);
    });
  });

  describe("showHistory", () => {
    it("should be show history of one exercise when one exercise is added", () => {
      const tracker = new CalorieTracker(70);

      tracker.addExercise("pushup", 3);

      const expectedHistory = { pushup: 3 };
      deepStrictEqual(tracker.showHistory(), expectedHistory);
    });

    it("should be give history of multiple exercises when multiple exercises are added", () => {
      const tracker = new CalorieTracker(70);

      tracker.addExercise("chinup", 5);
      tracker.addExercise("squat", 6);

      const expectedHistory = { chinup: 5, squat: 6 };

      deepStrictEqual(tracker.showHistory(), expectedHistory);
    });
  });
});
