const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  googleId: String, // For Google Auth
  avatar: String,
});

module.exports = mongoose.model("User", UserSchema);
