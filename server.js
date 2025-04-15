const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const toDoRouter = require("./routes/toDoRouter");

// stuff like port number and important links are stored in .env files as we dont want these informstion to be publically accessible.
require("dotenv").config();
const port = process.env.PORT || 5000;

//cors is used to manage what all IPs can access your APIs
app.use(cors());

// This is a body parsing middleware used to get body data in POST req.
app.use(express.json());

// connecting to routes
app.use("/api", authRouter);
app.use("/api/toDO", toDoRouter);

//Connecting to dB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("dB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
