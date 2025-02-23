const validator = require("validator");

const validateEdit = (req) => {
  const editableData = [
    "firstName",
    "lastName",
    "age",
    "photoURL",
    "about",
    "skills",
    "gender",
  ];

  const isValidFields = Object.keys(req.body).every((field) =>
    editableData.includes(field)
  );

  if (!isValidFields) {
    throw new Error("Please provide valid fields to update");
  }
  if (req.body.firstName !== undefined) {
    if (req.body.firstName.trim() === "") {
      throw new Error("First Name should not be empty");
    }
    if (req.body.firstName.length < 3 || req.body.firstName.length > 20) {
      throw new Error("First Name should be between 3 to 20 characters");
    }
  }

  if (req.body.lastName !== undefined) {
    if (req.body.lastName.trim() === "") {
      throw new Error("Last Name should not be empty");
    }
    if (req.body.lastName < 3 || req.body.lastName > 30) {
      throw new Error("Last Name should be between 3 to 30 characters");
    }
  }
  if (req.body.age !== undefined) {
    if (req.body.age < 18) {
      throw new Error("Age should be greater than 18");
    }
  }
  if (req.body.photoURL !== undefined) {
    if (!validator.isURL(req.body.photoURL)) {
      throw new Error("Photo URL is not correct");
    }
  }
  if (req.body.about !== undefined) {
    if (req.body.about.trim() === "") {
      throw new Error("About should not be empty");
    }
    if (
      req.body.about.trim().length < 30 ||
      req.body.about.trim().length > 225
    ) {
      throw new Error("Write about yourself in 30 to 225 characters");
    }
  }
};

module.exports = validateEdit;
