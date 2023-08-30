class Storage {
  #fs;
  #userDatabasePath;
  #calorieTrackerDatabasePath;

  constructor(fs) {
    this.#fs = fs;
    this.#userDatabasePath = "./database/users.json";
    this.#calorieTrackerDatabasePath = "./database/calorie-tracker.json";
  }

  storeUserDetails(userDetails) {
    return new Promise((res, rej) => {
      const content = JSON.stringify(userDetails, null, 2);

      this.#fs.writeFile(this.#userDatabasePath, content, () => {
        res();
      });
    });
  }

  storeTrackerDetails(calorieTrackerDetails) {
    return new Promise((res, rej) => {
      const content = JSON.stringify(calorieTrackerDetails, null, 2);

      this.#fs.writeFile(this.#calorieTrackerDatabasePath, content, () => {
        res();
      });
    });
  }

  getUserDetails() {
    try {
      return JSON.parse(this.#fs.readFileSync(this.#userDatabasePath, "utf-8"));
    } catch (error) {
      this.#fs.writeFileSync(this.#userDatabasePath, "[]");
      return [];
    }
  }

  getCalorieTrackerDetails() {
    try {
      return JSON.parse(
        this.#fs.readFileSync(this.#calorieTrackerDatabasePath, "utf-8")
      );
    } catch (error) {
      this.#fs.writeFileSync(this.#calorieTrackerDatabasePath, "[]");
      return [];
    }
  }
}

module.exports = Storage;
