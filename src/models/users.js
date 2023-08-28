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

  validateUser(username, password) {
    const user = this.#users.find(
      (user) => user.getDetails().username === username
    );

    if (!user) {
      return { username: false, password: false };
    }

    if (user.getDetails().password === password) {
      return { username: true, password: true };
    }

    return { username: true, password: false };
  }
}

module.exports = Users;
