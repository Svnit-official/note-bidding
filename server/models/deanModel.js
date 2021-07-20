const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const deanSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    select: false,
  },
  deanName: {
    type: String,
    trim: true,
  },
  deanDesignation: {
    type: String,
  },
  deanEmail: {
    type: String,
    trim: true,
  },
  deanContact: {
    type: String,
  },
  deanPic: {
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
});

deanSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

deanSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

module.exports = mongoose.model("Dean", deanSchema);

