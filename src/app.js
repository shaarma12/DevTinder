const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const connectionRequestRouter = require("./routes/connectionRequestRouter");
const userRouter = require("./routes/userRouter");
const app = express();

const connectDB = require("./config/database");

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", connectionRequestRouter);
app.use("/user", userRouter);

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
