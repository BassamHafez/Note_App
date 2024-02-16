const db = require("../database");

class User {
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  save() {
    return db.execute("INSERT INTO users (email, password) VALUES (?, ?)", [
      this.email,
      this.password,
    ]);
  }

  static findByEmail(email) {
    return db.execute("SELECT * FROM users WHERE email = ?", [email]);
  }

  static findById(id) {
    return db.execute("SELECT * FROM users WHERE id = ?", [id]);
  }

  static deleteById(id) {
    return db.execute("DELETE FROM users WHERE id = ?", [id]);
  }

  // update() {
  //   return db.execute(
  //     "UPDATE users SET email = ?, password = ? WHERE id = ?",
  //     [this.email, this.password, this.id]
  //   );
  // }
}

module.exports = User;
