const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

router.get('/', itineraryController.getItineraries);

router.get('/:id', itineraryController.getItinerary);

router.post('/', itineraryController.createItinerary);

router.put('/:id', itineraryController.updateItinerary);

router.delete('/:id', itineraryController.deleteItinerary);

router.post('/:id/collaborators', itineraryController.addCollaborator);

router.post('/:id/tips', itineraryController.addTip);

router.get('/share/:shareLink', itineraryController.getItineraryByShareLink);

router.delete('/:id/tips/:tipIndex', itineraryController.deleteTip);

module.exports = router; 