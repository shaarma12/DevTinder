const express = require("express");

const app = express();

const { authAdmin, authUser } = require("./middlewares/auth");

app.use("/admin", authAdmin);

app.get("/user/login", (req, res) => {
  try {
    res.send("User Logged-In Successfully");
  } catch (err) {
    res.status(500).send("Some Error Occured!");
  }
});

app.get("/user/getData", authUser, (req, res) => {
  res.send("user response");
});

app.get("/admin/getUserData", (req, res) => {
  res.send({ firstName: "Himanshu", lastName: "Sharma" });
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted successfully");
});

// Handles edge case of error boundries
app.use("/", (err, req, res, next) => {
  if (err) {
    res
      .status(500)
      .send("something went wrong please contact to support team.");
  }
});

app.listen("7777", () => {
  console.log("Server is successfully listening on PORT:7777");
});
