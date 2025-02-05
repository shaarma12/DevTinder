const express = require("express");

const app = express();

const connectDB = require("./config/database");

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userData = req.body;

  const user = new User(userData);

  try {
    await user.save();
    // res.send(user);
    res.send("User created successfully");
  } catch (err) {
    console.error("Something went wrong");
    res.status(400).send("Something went wrong :- " + err);
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
