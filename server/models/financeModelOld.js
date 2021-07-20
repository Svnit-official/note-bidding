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
    required: [true, "A name must be there"],
    type: String,
    select: false,
  },
  financeName: {
    required: [true, "A name must be there"],
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

module.exports =
  mongoose.models.Finance || mongoose.model("Finance", financeSchema);
