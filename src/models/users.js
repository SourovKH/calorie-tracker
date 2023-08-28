class Users {
  #users;

  constructor(users) {
    this.#users = users;
  }

  addUser(user) {
    this.#users.push(user);
  }

  getUserDetail(userId) {
    const user = this.#users.find(
      (user) => user.getDetails().userId === userId
    );

    return user.getDetails();
  }

  getUserDetails() {
    return this.#users.map((user) => {
      return user.getDetails();
    });
  }
}

module.exports = Users;
