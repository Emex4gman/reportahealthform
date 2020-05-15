const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  role: {
    type: String,
    default: "user",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);