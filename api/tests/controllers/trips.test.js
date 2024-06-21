const request = require("supertest");
const app = require("../../app");
const Trip = require("../../models/trip");
require("../mongodb_helper");
const mongoose = require("mongoose");

describe("/trips/newtrip", () => {

    describe("POST, when location, start date and end date are provided", () => {
        beforeEach(async() => {
            await Trip.deleteMany({});
        });

        test("the response code is 201", async () => {
            const mockUserId = new mongoose.Types.ObjectId();
            const response = await request(app)
                .post("/trips/newtrip")
                .send({ 
                    userId: mockUserId.toString(),
                    location: "Manchester",
                    startDate: "2024-06-08", 
                    endDate: "2024-06-15",
                    flight: "",
                    flightNumber: "", 
                    accommodation: "",
                    accommodationAddress: ""})
            expect(response.statusCode).toBe(201); 
            
        });

        test("a trip created", async () => {
            const mockUserId = new mongoose.Types.ObjectId();
            await request(app)
                .post('/trips/newtrip')
                .send({ 
                    userId: mockUserId.toString(),
                    location: "Manchester",
                    startDate: "2024-06-08", 
                    endDate: "2024-06-15",
                    flight: "yes",
                    flightNumber: "FR202", 
                    accommodation: "yes",
                    accommodationAddress: "Mums house"})
            
            const trips = await Trip.find();
            const newTrip = trips[trips.length - 1];
            expect (newTrip.location).toEqual("Manchester");
            expect (newTrip.flight).toEqual("yes");
            expect (newTrip.flightNumber).toEqual("FR202");
            expect (newTrip.accommodation).toEqual("yes");
            expect (newTrip.accommodationAddress).toEqual("Mums house");
        });
    });
    

    describe("POST, when location is missing", () =>{
        beforeEach(async() => {
            await Trip.deleteMany({});
        });

        test("response code is 400", async () => {
            const response = await request(app)
                .post("/trips/newtrip")
                .send({startDate:"2024-06-08", endDate:"2024-05-09"})
            expect(response.statusCode).toBe(400);
        });

        test("does not create a trip", async ()=> {
            const response = await request(app)
                .post("/trips/newtrip")
                .send({startDate:"2024-06-08", endDate:"2024-05-09"});
            const trips = await Trip.find();
            expect(trips.length).toEqual(0);
        });
    });
});

describe("/trips/", () => {

    describe("GET, when there are several trips in the database", () => {
        const mockUserId = new mongoose.Types.ObjectId();
        beforeEach(async() => {
            await Trip.deleteMany({});
            await Trip.create({ 
                userId: mockUserId.toString(),
                location: "Paris",
                startDate: "2025-06-08", 
                endDate: "2025-06-15",
                flight: "yes",
                flightNumber: "FR202", 
                accommodation: "yes",
                accommodationAddress: "Eiffel Tower"});
            await Trip.create({
                userId: mockUserId.toString(),
                location: "Singapore",
                startDate: "2026-06-08", 
                endDate: "2026-06-15",
                flight: "yes",
                flightNumber: "FR402", 
                accommodation: "yes",
                accommodationAddress: "Big Hotels"});
            await Trip.create({
                userId: mockUserId.toString(),
                location: "Berlin",
                startDate: "2026-06-08", 
                endDate: "2026-06-15",
                flight: "yes",
                flightNumber: "FR205", 
                accommodation: "yes",
                accommodationAddress: "wall"});
        });

        test("the response code is 200", async () => {
            const response = await request(app)
                .get("/trips")
            expect(response.statusCode).toBe(200)
        });

        test("trips are recieved", async () => {
            const response = await request(app)
                .get("/trips/");
            expect (response.body.trips.length).toBe(3);
            expect (response.body.trips[0].location).toEqual("Paris");
            expect (response.body.trips[1].location).toEqual("Singapore");
            expect (response.body.trips[2].location).toEqual("Berlin");
        })
    })
})