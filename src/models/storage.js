class Storage {
  #fs;
  #userDatabasePath;
  #calorieTrackerDatabasePath;

  constructor(fs) {
    this.#fs = fs;
    this.#userDatabasePath = "./database/users.json";
    this.#calorieTrackerDatabasePath = "./database/calorie-tracker.json";
  }

  storeUserDetails(userDetails, onStore) {
    const content = JSON.stringify(userDetails);

    this.#fs.writeFile(this.#userDatabasePath, content, () => {
      onStore();
    });
  }

  storeTrackerDetails(calorieTrackerDetails, onStore) {
    const content = JSON.stringify(calorieTrackerDetails);

    this.#fs.writeFile(this.#calorieTrackerDatabasePath, content, () => {
      onStore();
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
