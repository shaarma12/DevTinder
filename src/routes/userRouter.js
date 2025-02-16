const express = require("express");
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connection");
const router = express.Router();

router.get("/request", authUser, async (req, res) => {
  try {
    const getAllPendingRequests = await ConnectionRequest.find({
      toUserId: req.userId,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age photoURL, about skills");

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

module.exports = router;
