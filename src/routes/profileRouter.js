const express = require("express");
const User = require("../models/user");
const { authUser } = require("../middlewares/auth");
const validateEdit = require("../utils/validateEdit");
const validatePassword = require("../utils/validatePassword");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/view", authUser, async (req, res) => {
  try {
    const Id = req.userId;
    const user = await User.findById({ _id: Id });
    if (!user) {
      throw new Error("User not found");
    }
    res.json({ data: user });
  } catch (error) {
    res.status(400).send("Something went wrong " + error);
  }
});

router.patch("/edit", authUser, async (req, res) => {
  try {
    validateEdit(req);
    const user = await User.findById({ _id: req.userId });

    Object.keys(req.body).map((value) => (user[value] = req.body[value]));

    await user.save();
    res.json({
      message: `${user.firstName} ${user.lastName} your profile updated succesfully!`,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: err.message });
  }
});

router.patch("/password", authUser, async (req, res) => {
  try {
    const { currentPassword, password } = req.body;

    validatePassword(req);

    const user = await User.findById({ _id: req.userId });

    const isCurrentPasswordCorrect = await user.comparePasswords(
      currentPassword
    );

    if (!isCurrentPasswordCorrect) {
      throw new Error("Current Password is not correct");
    }

    const encryptedUpdatedPassword = await bcrypt.hash(password, 10);

    user.password = encryptedUpdatedPassword;

    await user.save();

    res.clearCookie("token");

    res.json({
      message: `${user.firstName} ${user.lastName} your password updated succesfully`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "something went wrong", error: err.message });
  }
});

module.exports = router;
