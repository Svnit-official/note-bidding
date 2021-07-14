const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    select: false
  },
  deanName: {
    required: [true, "A name must be there"],
    type: String,
    trim: true,
  },
  deanEmail: {
    type: String,
    trim: true,
  },
  deanContact: {
    type: String,
  },
  deanPic: {
    type: String
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
  ]
});

deanSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

deanSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

const Dean = new mongoose.model("Dean", deanSchema);

module.exports = Dean;
