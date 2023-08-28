class Users {
  #users;
  #calorieTrackers;
  #storage;

  constructor(users, calorieTrackers, storage) {
    this.#users = users;
    this.#calorieTrackers = calorieTrackers;
    this.#storage = storage;
  }

  #storeUsers(onStore) {
    const userDetails = this.#users.map((user) => {
      return user.getDetails();
    });

    this.#storage.storeUserDetails(userDetails, onStore);
  }

  addUser(user, onStore) {
    this.#users.push(user);
    this.#storeUsers(onStore);
  }

  getUserDetails(userId) {
    console.log(this.#calorieTrackers, this.#storage);
    const user = this.#users.find(
      (user) => user.getDetails().userId === userId
    );

    return user.getDetails();
  }

  getTrackerHistory(trackerId) {
    const tracker = this.#calorieTrackers.find((tracker) => {
      return tracker.id === trackerId;
    });

    return tracker.getHistory();
  }
}

module.exports = Users;
