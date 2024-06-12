const request = require("supertest");
const app = require("../../app");
const Trip = require("../../models/trip");
require("../mongodb_helper");

describe("/trips/newtrip", () => {

    describe("POST, when location, start date and end date are provided", () => {
        beforeEach(async() => {
            await Trip.deleteMany({});
        });

        test("the response code is 201", async () => {
            const response = await request(app)
                .post("/trips/newtrip")
                .send({ location: "Manchester", startDate: "2024-06-08", endDate: "2024-06-15"})
            expect(response.statusCode).toBe(201); 
            
        });

        test("a trip created", async () => {
            await request(app)
                .post('/trips/newtrip')
                .send({ location: "Manchester", startDate: "2024-06-08", endDate: "2024-06-15"})
            
            const trips = await Trip.find();
            const newTrip = trips[trips.length - 1];
            expect (newTrip.location).toEqual("Manchester");
            expect (newTrip.startDate).toEqual("2024-06-08");
            expect (newTrip.endDate).toEqual("2024-06-15");
            
        });
    });
    
    //using POST, when location, start date and end date are provided
    // test 1: the response code is 201
    // test 2: a trip is created

    //using POST, when start date and end date but no location is provided
    // test 1: the response code is 400
    // test 2: does not create a trip
    

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
        })
    });
})

describe("/trips/", () => {

    describe("GET, when there are several trips in the database", () => {
        beforeEach(async() => {
            await Trip.deleteMany({});
            await Trip.create({location:'Paris', startDate: '30-01-2025', endDate: '04-02-2025'});
            await Trip.create({location:'Berlin', startDate: '30-01-2025', endDate: '04-02-2025'});
            await Trip.create({location:'Singapore', startDate: '30-01-2025', endDate: '04-02-2025'});
        });

        test("the response code is 200", async () => {
            const response = await request(app)
                .get("/trips")
            expect(response.statusCode).toBe(200)
            
        })

        test("trips are recieved", async () => {
            await request(app)
                .get("/trips/")
            const trips = await Trip.getAllTrips();
            console.log(trips)
            expect (trips[0].location).toEqual("Paris");
            expect (trips[1].location).toEqual("Berlin");
            expect (trips[2].location).toEqual("Singapore");
        })
    })
})