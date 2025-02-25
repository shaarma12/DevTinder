const validator = require("validator");
const validateLogin = (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please fill all the fields");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please Enter Correct Email ID");
  }
};

module.exports = validateLogin;
