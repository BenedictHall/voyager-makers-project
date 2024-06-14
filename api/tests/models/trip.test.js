require("../mongodb_helper");
const request = require("supertest");
const Trip = require("../../models/trip");


describe("Trip model", () => {

    beforeEach(async () => {
        await Trip.deleteMany({}); 
    });

    test("has a location", () => {
        const trip = new Trip({
            location: "Paris",
            startDate: "2024-01-01",
            endDate: "2024-01-07"
        });
        expect(trip.location).toEqual("Paris");
    });

    test("has a startDate", () => {
        const trip = new Trip({
            location: "Leeds", 
            startDate: "2024-09-09",
            endDate: "2024-09-10"  
        });
        expect(trip.startDate).toEqual("2024-09-09");
    });

    test("has a endDate", () => {
        const trip = new Trip({
            location: "Leeds", 
            startDate: "2024-09-09",
            endDate: "2024-09-10"  
        });
        expect(trip.endDate).toEqual("2024-09-10");
    });

    test("flight selected yes", () => {
        const trip = new Trip({
            location: "Leeds", 
            startDate: "2024-09-09",
            endDate: "2024-09-10",
            flight: "yes" 
        });
        expect(trip.flight).toEqual("yes");
    });

    // test("can list all trips", async () => {
    //     const trips = await trips.find();
    //     expect(trips).toEqual([]);
    // });

    test("can save a user", async () => {
        const trip = new Trip({
            location: "Leeds", 
            startDate: "2024-09-09",
            endDate: "2024-09-10" 
        });
    
        await trip.save();
        const trips = await Trip.find();
    
        expect(trips[0].location).toEqual("Leeds");
        expect(trips[0].startDate).toEqual("2024-09-09");
        expect(trips[0].endDate).toEqual("2024-09-10" );
    });


});
