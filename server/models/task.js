const mongoose = require("../db/db");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
});

const task = mongoose.model("task", taskSchema);

module.exports = task;
