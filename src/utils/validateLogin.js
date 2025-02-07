const validator = require("validator");
const validateLogin = (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please fill all the fields");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Something not correct with email");
  }
};

module.exports = validateLogin;
