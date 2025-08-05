const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const authenticate = require('../middlewares/authMiddleware');

// All routes are protected
router.use(authenticate); 

// @route   GET /api/drivers/profile
router.get('/profile', driverController.getDriverProfile);

// @route   PUT /api/drivers/profile
router.put('/profile', driverController.updateDriverProfile);

// @route   POST /api/drivers/upload-documents
router.post('/upload-documents', driverController.uploadDocuments);

// @route   PUT /api/drivers/toggle-online
router.put('/toggle-online', driverController.toggleOnline);

// @route   GET /api/drivers/ride-requests
router.get('/ride-requests', driverController.getRideRequests);

// @route   POST /api/drivers/accept-ride
router.post('/accept-ride', driverController.acceptRide);

// @route   POST /api/drivers/reject-ride
router.post('/reject-ride', driverController.rejectRide);

// @route   PUT /api/drivers/update-location
router.put('/update-location', driverController.updateLocation);

// @route   GET /api/drivers/earnings
router.get('/earnings', driverController.getEarnings);

// @route   POST /api/drivers/withdraw-earnings
router.post('/withdraw-earnings', driverController.withdrawEarnings);

// @route   GET /api/drivers/trip-history
router.get('/trip-history', driverController.getTripHistory);

module.exports = router;
