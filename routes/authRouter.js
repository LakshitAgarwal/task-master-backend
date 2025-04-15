const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// importing userModel that we created for auth routing
const userModel = require("../models/userModel");

//registerUser route
router.post("/register", async (req, res) => {
  let { firstName, lastName, username, password } = req.body;
  try {
    const checkForDuplicateUsername = await userModel.findOne({ username });
    if (checkForDuplicateUsername) {
      return res
        .status(400)
        .send({ message: "User with this username already exists." });
    }
    let user = new userModel({ firstName, lastName, username, password });
    const result = await user.save();
    console.log(result);
    res.status(201).send({ message: "User created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//LoginUser route
router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User with this username do not exist" });
    }
    if (user.password !== password) {
      return res.status(404).send({ message: "Authentication failed!" });
    }
    const token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    let finalData = {
      userId: user?._id,
      username: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      token: token,
    };
    res.send(finalData);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//export router to use in main server file
module.exports = router;
