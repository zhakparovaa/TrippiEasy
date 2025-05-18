const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.get('/activities/:id', activityController.getActivities);

router.post('/activities/:id', activityController.createActivity);

router.put('/activities/:id', activityController.updateActivity);

router.delete('/activities/:id', activityController.deleteActivity);

module.exports = router;