const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

router.get('/', destinationController.getDestinations);

router.get('/:id', destinationController.getDestinationById);

router.post('/', destinationController.createDestination);

router.post('/tips', destinationController.addTip);

module.exports = router; 