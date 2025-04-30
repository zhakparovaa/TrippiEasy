const Destination = require('../models/Destination');

class DestinationDAO {
    static async getDestinations(filters = {}, sort = {}) {
        let query = {};
        if (filters.country) query.country = filters.country;
        if (filters.priceRange) query.priceRange = filters.priceRange;
        if (filters.climate) query.climate = filters.climate;
        if (filters.rating) query.rating = { $gte: filters.rating };
        return await Destination.find(query).sort(sort);
    }

    static async getDestinationById(id) {
        return await Destination.findById(id);
    }

    static async createDestination(destinationData) {
        const destination = new Destination(destinationData);
        return await destination.save();
    }

}

module.exports = DestinationDAO;