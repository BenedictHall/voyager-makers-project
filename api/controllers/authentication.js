const User = require("../models/user");
const { generateToken } = require("../lib/token");
const bcrypt = require("bcrypt");

const createToken = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });

  if (!user) {
    console.log("Auth Error: User not found");
    res.status(401).json({ message: "User not found" });
  } else {
    await bcrypt.compare(password, user.password).then((result) => { comparePassword = result;});
    if (!comparePassword) {
      console.log("Auth Error: Passwords do not match");
      res.status(401).json({ message: "Password incorrect" });
    } else {
      const token = generateToken(user.id);
      res.status(201).json({ token: token, message: "OK", userId:user.id});
  }}
};

const AuthenticationController = {
  createToken: createToken,
};

module.exports = AuthenticationController;