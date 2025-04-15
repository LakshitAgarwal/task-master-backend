const jwt = require("jsonwebtoken");
require("dotenv").config;

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(400).send({ message: "Authentication failed." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(400).send({ message: "Invalid token." });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
