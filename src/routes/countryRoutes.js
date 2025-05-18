const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

router.get('/countries', countryController.getCountries);

router.get('/countries/:id', countryController.getCountryById);

module.exports = router; 