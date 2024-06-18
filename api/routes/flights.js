const express = require("express");
const router = express.Router();
const FlightsController = require("../controllers/flights")

router.get("/", FlightsController.getAllTrackedFlights);

router.post("/saveNewFlight", FlightsController.create);

router.get("/:carrierCode-:flightNumber-:scheduledDepartureDate", FlightsController.getFlightFromAPI);

module.exports = router;