const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const financeHeadSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A name must be there"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  financeName: {
    type: String,
    trim: true,
  },
  financeEmail: {
    type: String,
    trim: true,
  },
  financeContact: {
    type: String,
  },
  financePic: {
    type: String,
  },
  financeDesignation: {
    type: String,
  },
  signature: {
    type: String,
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
module.exports = mongoose.model("FinanceHead", financeHeadSchema);
