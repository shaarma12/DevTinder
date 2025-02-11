const express = require("express");
const User = require("../models/user");
const { authUser } = require("../middlewares/auth");

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

module.exports = router;
