const express = require("express");

const app = express();

app.get(
  "/user",
  [
    (req, res, next) => {
      console.log("Handling the first route handler!");
      // res.send("1st response");
      next();
    },
    (req, res, next) => {
      // res.send("2nd response!");
      console.log("Handling the second route handler!");
      next();
    },
  ],
  [
    (req, res, next) => {
      console.log("Handling the third route handler!");
      next();
    },
    (req, res, next) => {
      console.log("Handling the fourth route handler!");
      res.send("4th response");
      next();
    },
  ]
);

app.listen("7777", () => {
  console.log("Server is successfully listening on PORT:7777");
});
