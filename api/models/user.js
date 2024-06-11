const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true, trim: true},
  lastname: { type: String, required: true, trim: true},
  username: {type: String, required: true, unique: true, trim: true},
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;