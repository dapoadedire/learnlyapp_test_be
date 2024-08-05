const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { body, validationResult } = require("express-validator");
require("dotenv").config(); // Load environment variables from .env file

const router = express.Router();

// User Registration
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password, email } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        password: hashedPassword,
        email,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// User Login
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
