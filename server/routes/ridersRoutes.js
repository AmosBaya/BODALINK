const express = require('express');
const router = express.Router();
const riderController = require('../controllers/ridersController');
const authenticate= require('../middlewares/authMiddleware');

router.use(authenticate); 

// @route   GET /api/riders/profile
router.get('/profile', riderController.getRiderProfile);

// @route   PUT /api/riders/profile
router.put('/profile', riderController.updateRiderProfile);

// @route   POST /api/riders/request-ride
router.post('/request-ride', riderController.requestRide);

// @route   GET /api/riders/ride-history
router.get('/ride-history', riderController.getRideHistory);

// @route   POST /api/riders/rate-driver
router.post('/rate-driver', riderController.rateDriver);

// @route   GET /api/riders/available-drivers
router.get('/available-drivers', riderController.listAvailableDrivers);

// @route   GET /api/riders/fare-estimate?distance=3&duration=10
router.get('/fare-estimate', riderController.estimateFare);

// @route   POST /api/riders/cancel-ride
router.post('/cancel-ride', riderController.cancelRide);

module.exports = router;


