const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    trim: true,
    lowercase: true,
  },
  subject: {
    type: String,
    required: [true, "Please add a subject"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Please add a message"],
  },
  status: {
    type: String,
    enum: ["new", "read", "replied"],
    default: "new",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
