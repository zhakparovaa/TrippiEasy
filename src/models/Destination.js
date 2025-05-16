const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true, index: true }, // Index for frequent searches
  imageUrl: { type: String },
  tips: [{
    text: { type: String, required: true },
    author: { type: String, default: 'Anonymous' },
    createdAt: { type: Date, default: Date.now }
  }],
  itineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' }] 
});

module.exports = mongoose.model('Destination', destinationSchema);