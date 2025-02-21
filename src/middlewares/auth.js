const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please login first");
    }
    const decoded = jwt.verify(token, "supersecretkey123@31");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).send(`Something went wrong: ${err.message}`);
  }
};

module.exports = { authUser };
