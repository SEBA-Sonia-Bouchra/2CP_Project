const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated unique ID
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['visitor', 'pro user'], required: true }, 
  affiliation: { type: String, required: function () { return this.role === 'pro user'; } }, // Only for pro users
  additionalInformation: { type: String, required: false }, 
  status: { type: String, enum: ['accepted', 'rejected'], default: 'rejected' }, // Default is rejected until approved
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('User', userSchema);

