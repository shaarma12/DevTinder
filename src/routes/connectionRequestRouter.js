const express = require("express");
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connection");
const User = require("../models/user");
const router = express.Router();

router.post("/send/:status/:userId", authUser, async (req, res) => {
  try {
    const fromUserId = req.userId;
    const toUserId = req.params.userId;
    const status = req.params.status;

    if (!["interested", "ignored"].includes(status)) {
      throw new Error("Invalid status");
    }

    const isToUserPresent = await User.findById(toUserId);
    if (!isToUserPresent) {
      throw new Error("User is not found");
    }

    const isConnectionPresentAlready = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (isConnectionPresentAlready) {
      throw new Error("Cannot Send the Connection request");
    }

    const connectionCreation = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    await connectionCreation.save();
    res.json({ message: `connection request is send/ignored successfully` });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = router;
