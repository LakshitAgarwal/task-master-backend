const express = require("express");
const toDoModel = require("../models/toDoModel");
const authenticateToken = require("../middlewares/authJWT");
const router = express.Router();

router.post("/create-to-do", authenticateToken, async (req, res) => {
  try {
    let data = req.body;
    let toDo = new toDoModel(data);
    const result = await toDo.save();
    console.log(result);
    res.status(201).send({ message: "Task created Successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/get-to-do/:userId", authenticateToken, async (req, res) => {
  let { userId } = req.params;
  try {
    const userToDos = await toDoModel.find({ createdBy: userId });
    res.send(userToDos);
    console.log(userToDos);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.delete("/delete-to-do/:id", authenticateToken, async (req, res) => {
  let toDoId = req.params.id;
  try {
    const deletedToDo = await toDoModel.findByIdAndDelete(toDoId);
    console.log(deletedToDo);
    res.send({ message: "To Do Deleted!" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.patch("/update-to-do/:id", authenticateToken, async (req, res) => {
  let toDoId = req.params.id;

  let data = req.body;
  try {
    const updatedToDo = await toDoModel.findByIdAndUpdate(
      toDoId,
      { $set: data },
      { returnOriginal: false }
    );
    console.log(updatedToDo);
    res.send({ message: "To Do updated!" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
