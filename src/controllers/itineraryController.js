const Itinerary = require('../models/Itinerary');
const mongoose = require('mongoose');

exports.getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find().populate('country');
    res.status(200).json(itineraries);
  } catch (error) {
    console.error('Error fetching all itineraries:', error);
    res.status(500).json({ message: 'Failed to fetch itineraries', error: error.message });
  }
};

exports.getItineraries = async (req, res) => {
  try {
    const countryId = req.query.countryId;
    if (!countryId) {
      return res.status(400).json({ message: 'countryId query parameter is required' });
    }
    const itineraries = await Itinerary.find({ country: countryId }).populate('country');
    res.status(200).json(itineraries);
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    res.status(500).json({ message: 'Failed to fetch itineraries', error: error.message });
  }
};

exports.getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id).populate('country');
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    console.error('Error fetching itinerary by ID:', error);
    res.status(500).json({ message: 'Failed to fetch itinerary', error: error.message });
  }
};

exports.createItinerary = async (req, res) => {
  try {
    console.log('Received request body for itinerary:', req.body);
    const { title, startDate, endDate, country } = req.body;

    if (!title || !startDate || !endDate || !country) {
      return res.status(400).json({ message: 'Missing required fields: title, startDate, endDate, and country are required.', received: req.body });
    }

    if (!mongoose.Types.ObjectId.isValid(country)) {
      return res.status(400).json({ message: 'Invalid country ID.', received: country });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format.', received: { startDate, endDate } });
    }

    const newItinerary = new Itinerary({
      title,
      startDate: start,
      endDate: end,
      country,
    });

    if (typeof newItinerary.generateShareLink === 'function') {
      newItinerary.generateShareLink();
    }

    const savedItinerary = await newItinerary.save();
    console.log('Itinerary saved successfully:', savedItinerary);
    res.status(201).json(savedItinerary);
  } catch (error) {
    console.error('Error creating itinerary:', error);
    if (error.stack) console.error(error.stack);
    res.status(500).json({ message: 'Failed to create itinerary', error: error.message });
  }
};

exports.updateItinerary = async (req, res) => {
  try {
    const { title, startDate, endDate, country } = req.body;
    const updateData = {};

    if (title) updateData.title = title;
    if (startDate) {
      const start = new Date(startDate);
      if (isNaN(start.getTime())) {
        return res.status(400).json({ message: 'Invalid startDate format' });
      }
      updateData.startDate = start;
    }
    if (endDate) {
      const end = new Date(endDate);
      if (isNaN(end.getTime())) {
        return res.status(400).json({ message: 'Invalid endDate format' });
      }
      updateData.endDate = end;
    }
    if (country) {
      if (!mongoose.Types.ObjectId.isValid(country)) {
        return res.status(400).json({ message: 'Invalid country ID' });
      }
      updateData.country = country;
    }

    const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate('country');
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    console.error('Error updating itinerary:', error);
    res.status(500).json({ message: 'Failed to update itinerary', error: error.message });
  }
};

exports.deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    res.status(200).json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    res.status(500).json({ message: 'Failed to delete itinerary', error: error.message });
  }
};

exports.addCollaborator = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    const { collaboratorId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(collaboratorId)) {
      return res.status(400).json({ message: 'Invalid collaborator ID' });
    }
    itinerary.collaborators = itinerary.collaborators || [];
    if (!itinerary.collaborators.includes(collaboratorId)) {
      itinerary.collaborators.push(collaboratorId);
      await itinerary.save();
    }
    res.status(200).json(itinerary);
  } catch (error) {
    console.error('Error adding collaborator:', error);
    res.status(500).json({ message: 'Failed to add collaborator', error: error.message });
  }
};

exports.generateShareLink = async (req, res) => {
  try {
    const { itineraryId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
      return res.status(400).json({ message: 'Invalid itinerary ID' });
    }
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    const shareLink = `${itineraryId}-${Date.now()}`;
    itinerary.shareLink = shareLink;
    await itinerary.save();
    res.status(200).json({ shareLink });
  } catch (error) {
    console.error('Error generating share link:', error);
    res.status(500).json({ message: 'Failed to generate share link', error: error.message });
  }
};

exports.getItineraryByShareLink = async (req, res) => {
  try {
    const { shareLink } = req.params;
    const itinerary = await Itinerary.findOne({ shareLink }).populate('country');
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    console.error('Error fetching itinerary by share link:', error);
    res.status(500).json({ message: 'Failed to fetch itinerary', error: error.message });
  }
};