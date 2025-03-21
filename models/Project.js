const mongoose = require('mongoose');

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
  sections: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      dimension: { 
        type: String, 
       // enum: ['architecturale', 'historique', 'archéologique', 'other'], 
        required: true 
      }
    }
  ],
  references: [
    {
      title: { type: String, required: true },
      link: { type: String } // Optional: If you want reference links
    }
  ], 
}, { timestamps: true }); 


module.exports = mongoose.model('Project', projectSchema);
