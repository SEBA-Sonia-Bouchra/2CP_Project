const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { type: String, required: true },      // Optional if you're using `user` reference
  surname: { type: String, required: true },   // Optional if using `user` reference
  content: { type: String, required: true },
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project', 
    required: true 
  },
  sectionId: { 
    type: String, // Keep as string if section is just an ID inside project
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Annotation', annotationSchema);
