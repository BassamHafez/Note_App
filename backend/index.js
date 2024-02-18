const express = require("express");
const cors = require("cors");

const noteController = require("./controllers/noteController");
const userController = require("./controllers/userController");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.post("/signup", userController.signup);
app.post("/login", userController.login);

app.use((req, res, next) => {
  if (!req.headers.userid) {
    return res.status(401).json({ message: "Provide the user ID" });
  }

  next();
});

app.get("/notes", noteController.getAllNotes);
app.post("/notes", noteController.createNote);
app.get("/notes/:id", noteController.getNoteById);
app.put("/notes/:id", noteController.updateNote);
app.delete("/notes/:id", noteController.deleteNote);

app.listen(4444, () => {
  console.log(`Listening on port 4444`);
});
