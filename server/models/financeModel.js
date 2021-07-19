const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const financeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A name must be there"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    select: false
  },
  financeName: {
    type: String,
    trim: true,
  },
  financeEmail: {
    type: String,
    trim: true,
  },
  financeDesignation: {
    type: String,
  },
  financeContact: {
    type: String,
  },
  financePic: {
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

financeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

financeSchema.methods.correctPassword = async function (
  candidatePass,
  userPass
) {
  return await bcrypt.compare(candidatePass, userPass);
};

module.exports = mongoose.model("Finance", financeSchema);
