const Itinerary = require('../models/Itinerary');

class ItineraryDAO {
    static async getItineraries() {
        return await Itinerary.find()
            .populate('destination')
            .populate('collaborators.user', 'name email');
    }

    static async getItineraryById(id) {
        return await Itinerary.findById(id)
            .populate('destination')
            .populate('collaborators.user', 'name email')
            .populate('tips.user', 'name');
    }

    static async createItinerary(itineraryData) {
        const itinerary = new Itinerary(itineraryData);
        itinerary.generateShareLink();
        return await itinerary.save();
    }

    static async updateItinerary(id, updateData) {
        return await Itinerary.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
    }

    static async deleteItinerary(id) {
        return await Itinerary.findByIdAndDelete(id);
    }

    static async addCollaborator(itineraryId, userId, role = 'viewer') {
        const itinerary = await Itinerary.findById(itineraryId);
        if (!itinerary) return null;
        return await itinerary.addCollaborator(userId, role);
    }

    static async addTip(itineraryId, userId, content) {
        const itinerary = await Itinerary.findById(itineraryId);
        if (!itinerary) return null;
        return await itinerary.addTip(userId, content);
    }

    static async getItineraryByShareLink(shareLink) {
        return await Itinerary.findOne({ shareLink })
            .populate('destination')
            .populate('collaborators.user', 'name email')
            .populate('tips.user', 'name');
    }

    static async getItinerariesByDestination(destinationId) {
        return await Itinerary.find({ destination: destinationId })
            .populate('destination')
            .populate('collaborators.user', 'name email');
    }

    static async getItinerariesByUser(userId) {
        return await Itinerary.find({ 'collaborators.user': userId })
            .populate('destination')
            .populate('collaborators.user', 'name email');
    }

    static async deleteTip(itineraryId, tipIndex) {
        const itinerary = await Itinerary.findById(itineraryId);
        if (!itinerary || tipIndex < 0 || tipIndex >= itinerary.tips.length) {
            return null;
        }
        itinerary.tips.splice(tipIndex, 1);
        return await itinerary.save();
    }
}

module.exports = ItineraryDAO; 