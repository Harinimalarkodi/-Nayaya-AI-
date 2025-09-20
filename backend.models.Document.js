const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  name: String,
  content: String,
  simplified: String,
  language: String,
  riskScore: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Document", DocumentSchema);
