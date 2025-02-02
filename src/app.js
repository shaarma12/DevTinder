const express = require("express");

const app = express();

const connectDB = require("./config/database");
const User = require("./models/user");
app.post("/signup", async (req, res) => {
  const userData = {
    firstName: "Himanshu",
    lastName: "Sharma",
    email: "himanshusharma1581@gmail.com",
    password: "Himanshu@123",
    age: 25,
  };

  const user = new User(userData);

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    console.error("Something went wrong");
    res.status(400).send("Something went wrong", err);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen("7777", () => {
      console.log("Server is successfully listening on PORT:7777");
    });
  })
  .catch(() => {
    console.error("Database connection failed");
  });
