const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

router.get('/', itineraryController.getItineraries);
router.get('/:id', itineraryController.getItinerary);
router.post('/', itineraryController.createItinerary);
router.put('/:id', itineraryController.updateItinerary);
router.delete('/:id', itineraryController.deleteItinerary);
router.post('/:id/collaborators', itineraryController.addCollaborator);
router.post('/share', itineraryController.generateShareLink); 
router.get('/share/:shareLink', itineraryController.getItineraryByShareLink);

module.exports = router; 