const express = require("express");
const axios = require('axios');
const router = express.Router();
const FlightsController = require("../controllers/flights")

router.get("/:carrierCode-:flightNumber-:scheduledDepartureDate", FlightsController.getFlight);

module.exports = router;