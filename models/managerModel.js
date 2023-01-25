const mongoose = require("mongoose");

const managerSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  towerName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const managerModel = mongoose.model("Manager", managerSchema);

module.exports = managerModel;
