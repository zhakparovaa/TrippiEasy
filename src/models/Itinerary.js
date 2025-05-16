const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  title: { type: String, required: true },
  notes: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  shareLink: { type: String, unique: true },
  collaborators: [{
    user: { type: String }, // Simplified since no User model (use String for userId)
    role: { type: String, default: 'viewer' }
  }]
});

itinerarySchema.methods.generateShareLink = function() {
  this.shareLink = require('crypto').randomBytes(16).toString('hex');
};

itinerarySchema.methods.addCollaborator = async function(userId, role) {
  this.collaborators.push({ user: userId, role });
  return await this.save();
};

module.exports = mongoose.model('Itinerary', itinerarySchema);