const express = require("express");
const Response = require("../schema/response.schema");
const Form = require("../schema/form.schema");
const router = express.Router();

// Submit a response to a form
router.post("/responses", async (req, res) => {
  try {
    const { formId, responses } = req.body;

    // Validate the form ID
    const formExists = await Form.findById(formId);
    if (!formExists) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Save the response
    const response = new Response({ formId, responses });
    await response.save();

    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all responses for a specific form
router.get("/responses/:formId", async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
