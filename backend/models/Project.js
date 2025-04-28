const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  dimension: { type: String, required: true },
  contributor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Reference to the User model
    required: true
  } 
});

const projectSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  dateOfPublish: { type: Date, default: Date.now }, 
  //category: { type: String, required: true }, 
  //region: { type: String, required: true }, 
  coverPhoto: { type: String },
  media: [{ type: String }], 
  sections: [sectionSchema],
  references: [
    {
      title: { type: String, required: true },
      link: { type: String } // Optional: If you want reference links
    }
  ], 
}, { timestamps: true }); 


module.exports = mongoose.model('Project', projectSchema);
