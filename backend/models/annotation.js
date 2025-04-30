const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstname: { type: String, required: true },      
  lastname: { type: String, required: true },  
  content: { type: String, required: true },
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project', 
    required: true 
  },
  sectionId: { 
    type: String, 
    required: true 
  },
  dimension: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Annotation', annotationSchema);
