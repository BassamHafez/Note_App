const Note = require("../models/noteModel");

exports.getAllNotes = async (req, res, next) => {
  try {
    const [notes] = await Note.fetchAll(req.session.userId);

    res.json({ count: notes.length, notes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.getNoteById = async (req, res, next) => {
  try {
    const [notes] = await Note.findById(req.params.id, req.session.userId);

    if (notes.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(notes[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.createNote = async (req, res, next) => {
  try {
    const note = new Note(
      null,
      req.body.title,
      req.body.body,
      req.body.priority,
      req.session.userId
    );

    await note.save();

    res.json({ message: "Note created", note });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const [notes] = await Note.findById(req.params.id, req.session.userId);

    if (notes.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    const deleteResponse = await Note.deleteById(
      req.params.id,
      req.session.userId
    );
    res.status(204).json(deleteResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const [notes] = await Note.findById(req.params.id, req.session.userId);

    if (notes.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.update(
      req.body.title,
      req.body.body,
      req.body.priority,
      req.params.id,
      req.session.userId
    );

    res.status(200).json({ message: "Note updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
