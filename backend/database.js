const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  database: "notes_app",
  user: "root",
  password: "ammar123258",
});

pool.query(
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )`
);

pool.query(
  `CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    priority ENUM('low', 'med', 'high') NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`
);

module.exports = pool.promise();
