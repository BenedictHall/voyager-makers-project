const express = require("express");
const router = express.Router();
const { getFlightData } = require('../services/flightAPIService');

router.get("/flight", async (req, res) => {
    try {
        const data = await getFlightData();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: 'Error fetching flight data from external API'});
    }
});

module.exports = router;