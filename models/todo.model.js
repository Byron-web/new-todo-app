const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { model } = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  finishDate: {
    type: Date,
    required: true,
  },
});

module.exports = model("Todo", TodoSchema);
