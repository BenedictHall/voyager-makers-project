const express = require("express");
const router = express.Router();
const FlightsController = require("../controllers/flights")

router.get("/", FlightsController.getAllTrackedFlights);

router.post("/saveNewFlight", FlightsController.create);

router.get("/:carrierCode-:flightNumber-:departureDate", FlightsController.getFlightFromAPI);

module.exports = router;