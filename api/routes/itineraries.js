const express = require('express');
const ItinerariesController = require('../controllers/itineraries');
const router = express.Router();

router.get('/', ItinerariesController.getAllItineraries);
router.post('/', ItinerariesController.createItinerary);
router.delete('/', ItinerariesController.deleteItinerary);

module.exports = router;