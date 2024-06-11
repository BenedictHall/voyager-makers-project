
const express = require("express");

const TripsController = require("../controllers/trips");

const router = express.Router();

router.post("/", TripsController.create);

module.exports = router;