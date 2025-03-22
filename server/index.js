const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Form = require("./schema/form.schema");
const formRoutes = require("./routes/form.route");
const responseRoutes = require("./routes/response.route");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", formRoutes);
app.use("/api", responseRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Routes
app.get("/", (req, res) => {
  res.send("Form Builder Backend");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
