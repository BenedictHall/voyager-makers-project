require("../mongodb_helper");
const request = require("supertest");
const Trip = require("../../models/trip");
const mongoose = require("mongoose");


describe("Trip model", () => {

    beforeEach(async () => {
        await Trip.deleteMany({}); 
    });

    test("created a trip", () => {
        const mockUserId = new mongoose.Types.ObjectId();
        const trip = new Trip({
            
            userId: mockUserId.toString(),
            location: "Manchester",
            startDate: "2024-06-08", 
            endDate: "2024-06-15",
            flight: "yes",
            flightNumber: "FR202", 
            accommodation: "yes",
            accommodationAddress: "Mums house"
        });
        expect (trip.location).toEqual("Manchester");
        expect (trip.flight).toEqual("yes");
        expect (trip.flightNumber).toEqual("FR202");
        expect (trip.accommodation).toEqual("yes");
        expect (trip.accommodationAddress).toEqual("Mums house");
    });

});
