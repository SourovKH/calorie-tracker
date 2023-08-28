const { describe, it } = require("node:test");
const { strictEqual, deepStrictEqual } = require("assert");

const CalorieTracker = require("../../src/models/calorie-tracker");

describe("CalorieTracker", () => {
  describe("id", () => {
    it("should give the id", () => {
      const tracker = new CalorieTracker(3);

      strictEqual(tracker.id, 3);
    });
  });

  describe("remainingTarget", () => {
    it("should give the remaining target", () => {
      const tracker = new CalorieTracker();
      tracker.target = 10;

      strictEqual(tracker.remainingTarget, 10);
    });
  });

  describe("addExercise", () => {
    it("should add exercises to the calorie tracker", () => {
      const tracker = new CalorieTracker(1);
      tracker.target = 70;
      tracker.addExercises({ pushup: 9 });
      const remainingTarget = 7;

      strictEqual(tracker.remainingTarget, remainingTarget);
    });

    it("should add multiple exercises to the calorie tracker", () => {
      const tracker = new CalorieTracker(2);
      tracker.target = 70;
      tracker.addExercises({ running: 5, squat: 2 });

      const remainingTarget = 22;
      strictEqual(tracker.remainingTarget, remainingTarget);
    });

    it("should add exercises multiple times", () => {
      const tracker = new CalorieTracker(1);
      tracker.target = 100;

      tracker.addExercises({ running: 5, squat: 6 });
      tracker.addExercises({ pushup: 5 });

      const remainingTarget = 1;
      strictEqual(tracker.remainingTarget, remainingTarget);
    });
  });

  describe("getHistory", () => {
    it("should show history of one exercise when one exercise is added", () => {
      const tracker = new CalorieTracker(2);
      tracker.target = 70;
      tracker.addExercises({ pushup: 3 });

      const expectedHistory = [{ pushup: 3 }];
      deepStrictEqual(tracker.getHistory(), expectedHistory);
    });

    it("should give history of multiple exercises when multiple exercises are added", () => {
      const tracker = new CalorieTracker(5);
      tracker.target = 70;
      tracker.addExercises({ running: 5, squat: 6 });

      const expectedHistory = [{ running: 5, squat: 6 }];
      deepStrictEqual(tracker.getHistory(), expectedHistory);
    });

    it("should give history when exercises are multiple times", () => {
      const tracker = new CalorieTracker(3);
      tracker.target = 100;
      tracker.addExercises({ running: 5, squat: 6 });
      tracker.addExercises({ pushup: 5 });

      const expectedHistory = [{ running: 5, squat: 6 }, { pushup: 5 }];

      deepStrictEqual(tracker.getHistory(), expectedHistory);
      strictEqual(tracker.remainingTarget, 1);
    });
  });
});
