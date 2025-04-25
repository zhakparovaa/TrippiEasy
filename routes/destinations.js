const express = require('express');
const router = express.Router();

// In-memory data store for destinations (cities and countries)
let destinations = [
  {
    id: 1,
    city: 'Paris',
    country: 'France',
    description: 'A city known for its cultural landmarks and romantic atmosphere.',
    image: 'paris-france.jpg'
  },
  {
    id: 2,
    city: 'Tokyo',
    country: 'Japan',
    description: 'A bustling metropolis with a mix of modern and traditional culture.',
    image: 'tokyo-japan.jpg'
  }
];

// Search for destinations by city or country
router.get('/', (req, res) => {
  const { query } = req.query; // e.g., /api/destinations?query=paris
  if (!query) {
    return res.json(destinations);
  }
  const filteredDestinations = destinations.filter(dest =>
    dest.city.toLowerCase().includes(query.toLowerCase()) ||
    dest.country.toLowerCase().includes(query.toLowerCase()) ||
    dest.description.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filteredDestinations);
});

// Get a single destination by ID
router.get('/:id', (req, res) => {
  const destination = destinations.find(dest => dest.id === parseInt(req.params.id));
  if (!destination) {
    return res.status(404).json({ message: 'Destination not found' });
  }
  res.json(destination);
});

module.exports = router;