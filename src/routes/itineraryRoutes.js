const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

router.get('/itineraries', itineraryController.getItineraries); 
router.get('/itineraries/all', itineraryController.getAllItineraries); 
router.get('/itineraries/:id', itineraryController.getItineraryById);
router.post('/itineraries', itineraryController.createItinerary);
router.put('/itineraries/:id', itineraryController.updateItinerary);
router.delete('/itineraries/:id', itineraryController.deleteItinerary);
router.post('/itineraries/:id/collaborators', itineraryController.addCollaborator);
router.post('/itineraries/share', itineraryController.generateShareLink); 
router.get('/itineraries/share/:shareLink', itineraryController.getItineraryByShareLink);

module.exports = router;