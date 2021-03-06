const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    select: false, 
  },
  facultyName: {
    required: [true, "A name must be there"],
    type: String,
    trim: true,
  },
  facultyDesignation: {
    type: String,
  },
  facultyEmail: {
    type: String,
    trim: true,
  },
  facultyContact: {
    type: String,
  },
  facultyPic: {
    type: String,
  },
  facultyClubs: [
   { type: mongoose.Schema.Types.ObjectId,}
  ],
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

facultySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

facultySchema.methods.correctPassword = async function (
  candidatePass,
  userPass
) {
  return await bcrypt.compare(candidatePass, userPass);
};

module.exports = mongoose.model("Faculty", facultySchema);

