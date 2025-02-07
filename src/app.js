const express = require("express");
const validate = require("./utils/validateSignUp");
const bcrypt = require("bcrypt");
const app = express();

const connectDB = require("./config/database");

const User = require("./models/user");
const validateSignUp = require("./utils/validateSignUp");
const validateLogin = require("./utils/validateLogin");
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);

    const { email, password, firstName, lastName, age } = req.body;

    const encyptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email: email,
      password: encyptedPassword,
      firstName: firstName,
      lastName: lastName,
      age: age,
    });

    await user.save();
    // res.send(user);
    res.send("User created successfully");
  } catch (err) {
    console.error("Something went wrong");
    res.status(400).send("Something went wrong :- " + err);
  }
});

app.post("/login", async (req, res) => {
  try {
    validateLogin(req);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const ispasswordMatch = await bcrypt.compare(password, user.password);

    if (!ispasswordMatch) {
      throw new Error("invalid Credentials");
    }

    res.send("Login Successfull");
  } catch (err) {
    res.status(500).send("Something went wrong:-" + err);
  }
});

// for finding all the data from the database:-
app.get("/feed", async (req, res) => {
  const allFeedData = await User.find({});
  try {
    res.send(allFeedData);
  } catch (error) {
    res.status(400).send("Something went wrong", error);
  }
});

// find or get the data by findById():-

// app.get("/getUser", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const userData = await User.findById(userId);
//     res.send(userData);
//   } catch (err) {
//     res.status(400).send("Something went wrong", err);
//   }
// });

app.get("/oneUser", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong", err);
  }
});

app.get("/getUser", async (req, res) => {
  const email = req.body.email;
  try {
    const users = await User.find({ email });
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong", error);
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findByIdAndDelete(userId);
  try {
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong", error);
  }
});

app.patch("/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  const updateData = req.body;
  try {
    const isValidate = [
      "firstName",
      "lastName",
      "password",
      "age",
      "photoURL",
      "about",
      "skills",
    ];

    const isUpated = Object.keys(updateData).every((k) =>
      isValidate.includes(k)
    );

    if (!isUpated) {
      throw new Error("Email is not an updated field");
    }

    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      upsert: true,
    });
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong:-" + err);
  }
});

app.put("/update", async (req, res) => {
  const { userId, email } = req.body;
  try {
    await User.replaceOne({ _id: userId }, { email: email });
    res.send("user updated successfully");
  } catch (err) {
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
