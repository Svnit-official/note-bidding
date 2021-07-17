const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const clubSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A name must be there"],
    trim: true,
  },
  password: {
    required: [true, "A name must be there"],
    type: String,
    select: false
  },
  clubName: {
    // required: [true, "A name must be there"],
    type: String,
    trim: true,
  },
  clubEmail: {
    type: String,
    trim: true,
  },
  clubContact: {
    type: String
  },
  clubLogo: {
    type: String,
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
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
  },
  sentRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

clubSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 12);
  next();
});

clubSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

const Club = new mongoose.model("Club", clubSchema);

module.exports = Club;
