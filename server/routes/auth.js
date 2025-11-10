const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Contact = require("../models/Contact");

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User already exists with this email" });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" }, // Token expires in 7 days
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ msg: "Server error during registration" });
  }
});

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error during login" });
  }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error("Get User Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
// @route   POST api/auth/contact
// @desc    Submit contact form
// @access  Public
router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Please enter a valid email" });
    }

    // Message length validation
    if (message.length < 10) {
      return res
        .status(400)
        .json({ msg: "Message must be at least 10 characters" });
    }

    // Create new contact
    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await contact.save();

    res.status(201).json({
      success: true,
      msg: "Thank you for contacting us! We'll get back to you soon.",
    });
  } catch (err) {
    console.error("Contact Form Error:", err.message);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
});

module.exports = router;
