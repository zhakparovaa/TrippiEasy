const express = require('express');
const router = express.Router();

// In-memory data store for specific places to visit
let places = [
  {
    id: 1,
    name: 'Eiffel Tower',
    description: 'Built in 1889, with steps and elevator to observation deck',
    city: 'Paris',
    country: 'France',
    image: 'eiffel-tower.jpg',
    tips: []
  },
  {
    id: 2,
    name: 'Champ-de-Mars',
    description: 'Landscaped park with paths & trees, extensive lawns and a kids area',
    city: 'Paris',
    country: 'France',
    image: 'champ-de-mars.jpg',
    tips: []
  }
];

// In-memory data store for itineraries
let itineraries = [
  {
    id: 1,
    title: 'Trip to Paris',
    notes: 'A fun trip to explore Paris landmarks',
    startDate: '2025-05-07',
    endDate: '2025-05-12',
    placeIds: [1, 2] // IDs of places (Eiffel Tower, Champ-de-Mars)
  }
];

// Get all places to visit
router.get('/places', (req, res) => {
  res.json(places);
});

// Get a single place by ID
router.get('/places/:id', (req, res) => {
  const place = places.find(p => p.id === parseInt(req.params.id));
  if (!place) {
    return res.status(404).json({ message: 'Place not found' });
  }
  res.json(place);
});

// Share a tip for a specific place
router.post('/places/:id/tips', (req, res) => {
  const place = places.find(p => p.id === parseInt(req.params.id));
  if (!place) {
    return res.status(404).json({ message: 'Place not found' });
  }
  const { tipText } = req.body;
  if (!tipText) {
    return res.status(400).json({ message: 'Tip text is required' });
  }
  place.tips.push(tipText);
  res.status(201).json({ message: 'Tip added successfully', tips: place.tips });
});

// Create a new itinerary
router.post('/', (req, res) => {
  const { title, notes, startDate, endDate, placeIds } = req.body;
  if (!title || !startDate || !endDate || !placeIds || !Array.isArray(placeIds)) {
    return res.status(400).json({ message: 'Title, startDate, endDate, and placeIds are required' });
  }
  const newItinerary = {
    id: itineraries.length + 1,
    title,
    notes: notes || '',
    startDate,
    endDate,
    placeIds
  };
  itineraries.push(newItinerary);
  res.status(201).json(newItinerary);
});

// Get all itineraries
router.get('/', (req, res) => {
  res.json(itineraries);
});

// Get a single itinerary by ID (for collaboration/sharing)
// MOVED BELOW /places routes
router.get('/:id', (req, res) => {
  const itinerary = itineraries.find(it => it.id === parseInt(req.params.id));
  if (!itinerary) {
    return res.status(404).json({ message: 'Itinerary not found' });
  }
  res.json(itinerary);
});

// Update an itinerary (for collaboration)
// MOVED BELOW /places routes
router.put('/:id', (req, res) => {
  const itinerary = itineraries.find(it => it.id === parseInt(req.params.id));
  if (!itinerary) {
    return res.status(404).json({ message: 'Itinerary not found' });
  }
  const { title, notes, startDate, endDate, placeIds } = req.body;
  itinerary.title = title || itinerary.title;
  itinerary.notes = notes || itinerary.notes;
  itinerary.startDate = startDate || itinerary.startDate;
  itinerary.endDate = endDate || itinerary.endDate;
  itinerary.placeIds = placeIds || itinerary.placeIds;
  res.json(itinerary);
});

router.delete('/:id', (req, res) => {
  const itineraryIndex = itineraries.findIndex(it => it.id === parseInt(req.params.id));
  if (itineraryIndex === -1) {
    return res.status(404).json({ message: 'Itinerary not found' });
  }
  itineraries.splice(itineraryIndex, 1);
  res.status(204).send();
});

module.exports = router;