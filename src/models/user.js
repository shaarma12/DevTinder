const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoURL: {
      type: String,
      trim: true,
      default:
        "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("URL is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "This is a Default about",
      minLength: 10,
      maxLength: 200,
      trim: true,
    },
    skills: {
      type: [String],
      trim: true,
      validate(value) {
        if (!(value.length > 1 && value.length < 30)) {
          throw new Error("Skills must be between 1 and 30");
        }
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
