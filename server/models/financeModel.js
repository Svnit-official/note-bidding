const mongoose = require("mongoose");
const Request = require("./requestModel");

const financeSchema = new mongoose.Schema({
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
  financeName: {
    required: [true, "A name must be there"],
    type: String,
    trim: true,
  },
  signature: {
    type: String,
    required: [true, "Signature must be there"],
  },
  respondedRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Finance = new mongoose.model("finance", financeSchema);

module.exports = Finance;
