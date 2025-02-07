const validator = require("validator");
const validateSignUp = (req) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName) {
    throw new Error("Please fill all the fields");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not correct");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is weak");
  }

  if (firstName.length < 3 || firstName.length > 40) {
    throw new Error("First name should be between 3 to 40 characters");
  }
};
module.exports = validateSignUp;
