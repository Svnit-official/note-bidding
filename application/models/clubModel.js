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
  drafts: {
    type: Request,
  },
  requestsSent: {
    type: Request,
  },
  receivedForCorrection: {
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

const Club = new mongoose.model("Club", clubSchema);

module.exports = Club;
