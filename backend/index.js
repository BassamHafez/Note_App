const express = require("express");
const session = require("express-session");
const cors = require("cors");

const noteController = require("./controllers/noteController");
const userController = require("./controllers/userController");
const { SESSION_SECRET } = require("./config");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.post("/signup", userController.signup);
app.post("/login", userController.login);
// app.post("/logout", userController.logout);
app.get("/logout", userController.logout);

app.use((req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Please log in" });
  }
});

app.get("/notes", noteController.getAllNotes);
app.post("/notes", noteController.createNote);
app.get("/notes/:id", noteController.getNoteById);
app.put("/notes/:id", noteController.updateNote);
app.delete("/notes/:id", noteController.deleteNote);

app.listen(4444, () => {
  console.log(`Listening on port 4444`);
});
