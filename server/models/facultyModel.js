const mongoose = require("mongoose");
const Request = require("./requestModel");

const facultySchema = new mongoose.Schema({
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
  facultyName: {
    required: [true, "A name must be there"],
    type: String,
    trim: true,
  },
  signature: {
    type: String,
    required: [true, "Signature must be there"],
  },
  pendingRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  approved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  sentBackForCorrection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  history: {
    approved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request",
      },
    ],
    rejected: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request",
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Faculty = new mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
