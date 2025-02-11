const validator = require("validator");

const validatePassword = (req) => {
  const requiredFields = ["password", "currentPassword"];

  const isFieldsCorrect = Object.keys(req.body).every((field) =>
    requiredFields.includes(field)
  );
  if (!isFieldsCorrect) {
    throw new Error("Please enter the correct data to update");
  }
  if (
    req.body.currentPassword === undefined ||
    req.body.password === undefined
  ) {
    throw new Error("Please enter the required fields");
  }
  if (req.body.currentPassword.length === 0) {
    throw new Error("Please enter your currentPassword");
  }

  if (!validator.isStrongPassword(req.body.password)) {
    throw new Error("Please enter a Strong password");
  }
};
module.exports = validatePassword;
