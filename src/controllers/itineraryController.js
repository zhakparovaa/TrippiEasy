const ItineraryDAO = require('../dao/itineraryDAO');

exports.getItineraries = async (req, res) => {
    try {
        const itineraries = await ItineraryDAO.getItineraries();
        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getItinerary = async (req, res) => {
    try {
        const itinerary = await ItineraryDAO.getItineraryById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createItinerary = async (req, res) => {
    try {
        const itinerary = await ItineraryDAO.createItinerary(req.body);
        res.status(201).json(itinerary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateItinerary = async (req, res) => {
    try {
        const itinerary = await ItineraryDAO.updateItinerary(req.params.id, req.body);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteItinerary = async (req, res) => {
    try {
        const itinerary = await ItineraryDAO.deleteItinerary(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json({ message: 'Itinerary deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addCollaborator = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const itinerary = await ItineraryDAO.addCollaborator(req.params.id, userId, role);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json({ message: 'Collaborator added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.generateShareLink = async (req, res) => {
    try {
        const { itineraryId } = req.body;
        const itinerary = await ItineraryDAO.getItineraryById(itineraryId);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        itinerary.generateShareLink();
        await itinerary.save();
        res.status(200).json({ shareLink: itinerary.shareLink });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getItineraryByShareLink = async (req, res) => {
    try {
        const itinerary = await ItineraryDAO.getItineraryByShareLink(req.params.shareLink);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};