const mongoose = require("mongoose");
const Request = require("./requestModel")

const clubSchema = new mongoose.Schema({
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
  clubName: {
    required: [true, "A name must be there"],
    type: String,
    trim: true,
  },
  clubDescription: {
    required: [true, "A description must be there"],
    type: String,
  },
  headName: {
    required: [true, "A name must be there"],
    type: String,
    trim: true,
  },
  signature: {
    type: String,
    required: [true, "Signature must be there"],
  },
  drafts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  requestsSent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  receivedForCorrection: [
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

const Club = new mongoose.model("Club", clubSchema);

module.exports = Club;
