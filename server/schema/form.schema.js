const mongoose = require("mongoose");

const inputSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "text", "email", "number"
  title: { type: String, required: true }, // Label for the input
  placeholder: { type: String }, // Placeholder text
});

const formSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Form title
  inputs: [inputSchema], // Array of inputs
});

module.exports = mongoose.model("Form", formSchema);
