class User {
  #username;
  #userId;
  #password;

  constructor(username, userId, password) {
    this.#username = username;
    this.#userId = userId;
    this.#password = password;
  }

  getUserDetails() {
    const username = this.#username;
    const password = this.#password;
    const userId = this.#userId;

    return { username, password, userId };
  }
}
