const DestinationDAO = require('../dao/destinationDAO');

exports.getDestinations = async (req, res) => {
    try {
        const { country, priceRange, climate, rating, sortBy = 'name', sortOrder = 'asc' } = req.query;
        const filters = { country, priceRange, climate };
        if (rating) filters.rating = parseFloat(rating);
        const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
        const destinations = await DestinationDAO.getDestinations(filters, sort);
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDestinationById = async (req, res) => {
    try {
        const destination = await DestinationDAO.getDestinationById(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createDestination = async (req, res) => {
    try {
        const destination = await DestinationDAO.createDestination(req.body);
        res.status(201).json(destination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};