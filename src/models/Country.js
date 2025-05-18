const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  flag: {
    type: String,
    required: true,
  },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country; 