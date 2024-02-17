const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
  try {
    const [existingUsers] = await User.findByEmail(req.body.email);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User(
      null,
      req.body.name,
      req.body.email,
      req.body.password
    );
    await user.save();
    res.json({ message: "User created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.login = async (req, res, next) => {
  try {
    const [users] = await User.findByEmail(req.body.email);
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];
    if (user.password !== req.body.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Logged in", userId: user.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
