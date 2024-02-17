const db = require("../database");

class Note {
  constructor(id, title, body, priority, user_id) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.priority = priority;
    this.user_id = user_id;
  }

  save() {
    return db.execute(
      "INSERT INTO notes (title, body, priority, user_id) VALUES (?, ?, ?, ?)",
      [this.title, this.body, this.priority, this.user_id]
    );
  }

  static fetchAll(user_id, priority = null) {
    if (priority) {
      return db.execute(
        "SELECT * FROM notes WHERE user_id = ? AND priority = ?",
        [user_id, priority]
      );
    }

    return db.execute("SELECT * FROM notes WHERE user_id = ?", [user_id]);
  }

  static deleteById(id, user_id) {
    return db.execute("DELETE FROM notes WHERE id = ? AND user_id = ?", [
      id,
      user_id,
    ]);
  }

  static findById(id, user_id) {
    return db.execute("SELECT * FROM notes WHERE id = ? AND user_id = ?", [
      id,
      user_id,
    ]);
  }

  static update(title, body, priority, id, user_id) {
    return db.execute(
      "UPDATE notes SET title = ?, body = ?, priority = ? WHERE id = ? AND user_id = ?",
      [title, body, priority, id, user_id]
    );
  }
}

module.exports = Note;
