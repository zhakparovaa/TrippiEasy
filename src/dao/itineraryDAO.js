const Itinerary = require('../models/Itinerary');

class ItineraryDAO {
    static async getItineraries() {
        return await Itinerary.find().populate('destination');
    }

    static async getItineraryById(id) {
        return await Itinerary.findById(id).populate('destination');
    }

    static async createItinerary(itineraryData) {
        const itinerary = new Itinerary(itineraryData);
        itinerary.generateShareLink();
        return await itinerary.save();
    }

    static async updateItinerary(id, updateData) {
        return await Itinerary.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }

    static async deleteItinerary(id) {
        return await Itinerary.findByIdAndDelete(id);
    }

    static async addCollaborator(itineraryId, userId, role = 'viewer') {
        const itinerary = await Itinerary.findById(itineraryId);
        if (!itinerary) return null;
        return await itinerary.addCollaborator(userId, role);
    }

    static async getItineraryByShareLink(shareLink) {
        return await Itinerary.findOne({ shareLink }).populate('destination');
    }

    static async getItinerariesByDestination(destinationId) {
        return await Itinerary.find({ destination: destinationId }).populate('destination');
    }
}

module.exports = ItineraryDAO;