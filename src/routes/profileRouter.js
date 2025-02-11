const express = require("express");
const User = require("../models/user");
const { authUser } = require("../middlewares/auth");
const validateEdit = require("../utils/validateEdit");
const router = express.Router();

router.get("/view", authUser, async (req, res) => {
  try {
    const Id = req.userId;
    const user = await User.findById({ _id: Id });
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong", error);
  }
});

router.patch("/edit", authUser, async (req, res) => {
  try {
    validateEdit(req);
    const user = await User.findById({ _id: req.userId });

    Object.keys(req.body).map((value) => (user[value] = req.body[value]));

    await user.save();
    res.send(
      `${user.firstName} ${user.lastName} your profile updated succesfully!`
    );
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = router;
