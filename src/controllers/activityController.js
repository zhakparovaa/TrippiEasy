const Activity = require('../models/Activity');
const Itinerary = require('../models/Itinerary');

exports.getActivities = async (req, res) => {
  try {
    const itineraryId = req.params.id;
    const activities = await Activity.find({ itinerary: itineraryId }).populate('itinerary');
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Failed to fetch activities', error: error.message });
  }
};

exports.createActivity = async (req, res) => {
  try {
    console.log('Received request body for activity:', req.body);
    console.log('Itinerary ID from params:', req.params.id);
    const { title, description, day } = req.body;
    const itineraryId = req.params.id;

    if (!title || !description || !day) {
      return res.status(400).json({ message: 'Missing required fields: title, description, and day are required.', received: req.body });
    }

    if (isNaN(parseInt(day)) || parseInt(day) < 1) {
      return res.status(400).json({ message: 'Invalid day value. Day must be a positive integer.', received: day });
    }

    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found.', itineraryId: itineraryId });
    }

    const newActivity = new Activity({
      title,
      description,
      day: parseInt(day),
      itinerary: itineraryId,
    });

    const savedActivity = await newActivity.save();
    console.log('Activity saved successfully:', savedActivity);
    res.status(201).json(savedActivity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ message: 'Failed to create activity', error: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const { title, description, day } = req.body;
    const activityId = req.params.id;

    if (!title && !description && !day) {
      return res.status(400).json({ message: 'At least one field (title, description, or day) is required for update.' });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (day) {
      if (isNaN(parseInt(day)) || parseInt(day) < 1) {
        return res.status(400).json({ message: 'Invalid day value. Day must be a positive integer.' });
      }
      updateData.day = parseInt(day);
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      updateData,
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found.' });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ message: 'Failed to update activity', error: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const activityId = req.params.id;
    const deletedActivity = await Activity.findByIdAndDelete(activityId);

    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found.' });
    }

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ message: 'Failed to delete activity', error: error.message });
  }
};