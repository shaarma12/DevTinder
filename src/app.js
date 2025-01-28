const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello!");
});

app.use("/api", (req, res) => {
  res.send("This is an API Page!");
});

app.use("/login", (req, res) => {
  res.send("This is the Login Page!");
});

app.listen(8085, () => {
  console.log("Server is Sucessfully listen on 8085!");
});
