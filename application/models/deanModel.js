const mongoose = require("mongoose");
const Request = require("./requestModel");

const deanSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A name must be there"],
    unique: true,
    trim: true,
  },
  password: {
    required: [true, "A name must be there"],
    type: String,
    trim: true,
  },
  deanName: {
    required: [true, "A name must be there"],
    type: String,
    trim: true,
  },
  signature: {
    type: String,
    required: [true, "Signature must be there"],
  },
  pendingRequests: {
    type: Request,
  },
  history: {
    approved: {
      type: Request,
    },
    rejected: {
      type: Request,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Dean = new mongoose.model("Dean", deanSchema);

module.exports = Dean;
