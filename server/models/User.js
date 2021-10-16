const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  api_key: { type: String, default: null },
});

module.exports = mongoose.model("users", userSchema);
