const express = require("express");

const app = express();

// order is always matter in the routes.

app.use("/api/2", (req, res) => {
  res.send("This another string from API page!");
});

app.use("/api", (req, res) => {
  res.send("This is an API Page!");
});

app.use("/login", (req, res) => {
  res.send("This is the Login Page!");
});

app.use("/", (req, res) => {
  res.send("Hello!");
});

app.listen(8085, () => {
  console.log("Server is Sucessfully listen on 8085!");
});
