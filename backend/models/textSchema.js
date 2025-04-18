// models/Text.js
const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  description: { type: String, required: true },
  history: { type: [String], default: [] },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },  // ⬅ Changed from user to projectId
}, { timestamps: true });

const Text = mongoose.model('Text', textSchema);

module.exports = Text;


  