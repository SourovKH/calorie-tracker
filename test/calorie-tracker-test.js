const { describe, it } = require("node:test");
const { strictEqual, deepStrictEqual } = require("assert");

const { CalorieTracker } = require("../src/calorie-tracker");

describe("TrackCalorie", function () {
  describe("showRemainingTarget", function () {
    it("should give the remaining target", function () {
      const tracker = new CalorieTracker(10);
      strictEqual(tracker.showRemainingTarget(), 10);
    });
  });

  describe("addExercise", function () {
    it("should add exercises to the calorie tracker", function () {
      const tracker = new CalorieTracker(70);
      tracker.addExercise("pushup", 9);
      const remainingTarget = 7;
      strictEqual(tracker.showRemainingTarget(), remainingTarget);
    });

    it("should add multiple exercises to the calorie tracker", function () {
      const tracker = new CalorieTracker(50);

      tracker.addExercise("chinup", 5);
      tracker.addExercise("squat", 2);

      const remainingTarget = 2;
      strictEqual(tracker.showRemainingTarget(), remainingTarget);
    });
  });

  describe("showHistory", function () {
    it("should be show history of one exercise when one exercise is added", function () {
      const tracker = new CalorieTracker(70);

      tracker.addExercise("pushup", 3);

      const expectedHistory = { pushup: 3 };
      deepStrictEqual(tracker.showHistory(), expectedHistory);
    });

    it("should be give history of multiple exercises when multiple exercises are added", function () {
      const tracker = new CalorieTracker(70);

      tracker.addExercise("chinup", 5);
      tracker.addExercise("squat", 6);

      const expectedHistory = { chinup: 5, squat: 6 };

      deepStrictEqual(tracker.showHistory(), expectedHistory);
    });
  });
});
