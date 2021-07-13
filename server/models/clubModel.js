const mongoose = require("mongoose");
const Request = require("./requestModel");
const Faculty = require("./facultyModel");
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
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
  sentRequests: [
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

clubSchema.statics.findAndValidate = async function (username, password) {
  const foundUser = await this.findOne({ username });
  const isvalid = await bcrypt.compare(password, foundUser.password);
  return isvalid ? foundUser : false;
};
clubSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 12);
  next();
});
const Club = new mongoose.model("Club", clubSchema);

module.exports = Club;
