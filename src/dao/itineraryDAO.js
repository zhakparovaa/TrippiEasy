const Itinerary = require('../models/Itinerary');
const mongoose = require('mongoose');

class ItineraryDAO {
    static async getItineraries() {
        return await Itinerary.find().populate('country');
    }

    static async getItineraryById(id) {
        return await Itinerary.findById(id).populate('country');
    }

    static async createItinerary(itineraryData) {
        const { title, startDate, endDate, country, notes, collaborators } = itineraryData;
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new Error('Invalid date format. Please use YYYY-MM-DD.');
        }
        const itinerary = new Itinerary({
            id: new mongoose.Types.ObjectId(),
            title,
            notes,
            startDate: start,
            endDate: end,
            country,
            collaborators: collaborators || []
        });
        itinerary.generateShareLink();
        return await itinerary.save();
    }

    static async updateItinerary(id, updateData) {
        return await Itinerary.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate('country');
    }

    static async deleteItinerary(id) {
        return await Itinerary.findByIdAndDelete(id).populate('country');
    }

    static async addCollaborator(itineraryId, userId, role = 'viewer') {
        const itinerary = await Itinerary.findById(itineraryId);
        if (!itinerary) return null;
        itinerary.collaborators.push({ user: userId, role });
        return await itinerary.save();
    }

    static async getItineraryByShareLink(shareLink) {
        return await Itinerary.findOne({ shareLink }).populate('country');
    }

    static async getItinerariesByCountry(countryId) {
        return await Itinerary.find({ country: countryId }).populate('country');
    }
}

module.exports = ItineraryDAO;