const express = require('express');
const router = express.Router();
const seedController = require('../controllers/seedController');

router.post('/destinations', seedController.seedDestinations);

module.exports = router; 