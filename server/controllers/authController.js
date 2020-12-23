const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function authenticateUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User doesn't exist" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const payload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    console.log(payload);

    jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ errors: [{ msg: "Unable to generate token" }] });
      }

      res.status(200).json({
        token,
        user,
      });
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
}

module.exports = {
  authenticateUser,
};