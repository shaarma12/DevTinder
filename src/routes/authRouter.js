const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const validateSignUp = require("../utils/validateSignUp");
const validateLogin = require("../utils/validateLogin");

const User = require("../models/user");

// for signup the user:-
router.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);

    const {
      email,
      password,
      firstName,
      lastName,
      age,
      gender,
      photoURL,
      about,
    } = req.body;

    const encyptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email: email,
      password: encyptedPassword,
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      photoURL: photoURL,
      about: about,
    });

    await user.save();

    const token = user.generateAuthToken();

    res.cookie("token", token);

    res.json({ message: "User created successfully", data: user });
  } catch (err) {
    console.error("Something went wrong");
    res.status(400).send(err.message);
  }
});

// for login the user:-
router.post("/login", async (req, res) => {
  try {
    validateLogin(req);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const ispasswordMatch = await user.comparePasswords(password);

    if (!ispasswordMatch) {
      throw new Error("Invalid Credentials");
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);

    res.json({ message: "Login successful", data: user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// for logout the user:-
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logout successfully" });
});

module.exports = router;
