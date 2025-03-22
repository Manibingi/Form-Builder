const mongoose = require("mongoose");
const Form = require("../schema/form.schema");

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true }, // Reference to the form
  responses: [
    {
      inputId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to the input
      value: { type: String, required: true }, // User's response
    },
  ],
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model("Response", responseSchema);
