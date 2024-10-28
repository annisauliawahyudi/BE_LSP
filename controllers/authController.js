require("dotenv").config();
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });

    const token = signToken(newUser.id, newUser.role);

    return res.status(201).json({
      status: "success",
      message: "User has been created",
      data: newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "error",
      message: "Error creating user",
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: "error",
        message: "Username and password are required",
      });
    }

    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "error",
        message: "Invalid username or password",
      });
    }

    const token = signToken(user.id, user.role);

    return res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error logging in",
      error,
    });
  }
};
