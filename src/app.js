const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Himanshu", lastName: "Sharma" });
});

app.post("/user", (req, res) => {
  // Saving the Data which is coming from req.body in to the Database.
  res.send("Data is Sucessfully saved in to the Database!");
});

app.patch("/user", (req, res) => {
  // Updating Data into the Database.
  res.send("Data is Sucessfully updated in to the Database!");
});

app.delete("/user", (req, res) => {
  // Delete the Data from Database.
  res.send("Data is Deleted Sucessfully from the Database!");
});
//  Query params:-
// app.use("/users", (req, res) => {
//   console.log(req.query);
//   res.send("Hello!");
// });

// dynamic routes:-

app.use("/users/:firstName/:lastName/:dob", (req, res) => {
  console.log(req.params);
  res.send("dynamic route");
});

app.listen(8085, () => {
  console.log("Server is Sucessfully listen on 8085!");
});
