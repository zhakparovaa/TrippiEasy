const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: String,
  tips: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  placesVisited: [placeSchema],
});

module.exports = mongoose.model('User', userSchema); 