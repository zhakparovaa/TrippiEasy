const Country = require('../models/Country');

exports.getCountries = async (req, res) => {
    try {
        const countries = await Country.find().sort({ name: 1 });
        res.status(200).json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ message: 'Failed to fetch countries', error: error.message });
    }
};

exports.getCountryById = async (req, res) => {
    try {
        const country = await Country.findById(req.params.id);
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.status(200).json(country);
    } catch (error) {
        console.error('Error fetching country:', error);
        res.status(500).json({ message: 'Failed to fetch country', error: error.message });
    }
};