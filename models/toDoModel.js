const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // ✅ this should match mongoose.model("user", userSchema)
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const toDoModel = mongoose.model("toDo", toDoSchema);

module.exports = toDoModel;