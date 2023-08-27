class Users {
  #users;
  #calorieTrackers;
  #storage;

  constructor(users, calorieTrackers, storage) {
    this.#users = users;
    this.#calorieTrackers = calorieTrackers;
    this.#storage = storage;
  }

  getUserDetails(userId) {
    console.log(this.#calorieTrackers, this.#storage);
    const user = this.#users.find(
      (user) => user.getDetails().userId === userId
    );

    return user.getDetails();
  }
}

module.exports = Users;
