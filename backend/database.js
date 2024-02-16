const mysql = require("mysql2");

const DB_NAME = "notes_db";
const DB_USER = "root";
const DB_PASSWORD = "";

const pool = mysql.createPool({
  host: "localhost",
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
});

pool.query(
  `CREATE TABLE if not exists  users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL ) ;
   `
)

pool.query(
  ` CREATE TABLE if not exists  notes (
   id INT AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   body TEXT NOT NULL,
   priority ENUM('low', 'med', 'high') NOT NULL,
   user_id INT,
   FOREIGN KEY (user_id) REFERENCES users(id) ) ;`
 ) ;

module.exports = pool.promise();
