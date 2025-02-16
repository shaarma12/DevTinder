const express = require("express");
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connection");
const router = express.Router();

router.get("/request", authUser, async (req, res) => {
  try {
    const getAllPendingRequests = await ConnectionRequest.find({
      toUserId: req.userId,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age photoURL about skills");

    if (getAllPendingRequests.length === 0) {
      return res.status(404).json({ message: "no pending request found" });
    }

    res.json({
      message: "Getting all the pending request",
      data: getAllPendingRequests,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

router.get("/connection", authUser, async (req, res) => {
  try {
    const connections = await ConnectionRequest.find({
      $or: [
        { status: "accepted", toUserId: req.userId },
        { status: "accepted", fromUserId: req.userId },
      ],
    })
      .populate("fromUserId", "firstName lastName age photoURL about skills")
      .populate("toUserId", "firstName lastName age photoURL about skills");

    if (connections.length === 0) {
      return res.status(404).json({ message: "No connection found!" });
    }

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === req.userId.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ message: "Getting all the connections", data: data });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = router;
