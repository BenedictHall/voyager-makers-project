const request = require("supertest");
const app = require("../../app");
const Itinerary = require("../../models/itinerary");
const { ObjectId } = require("mongoose").Types;
const JWT = require("jsonwebtoken");
const User = require("../../models/user");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

const createToken = (userId) => {
    return JWT.sign(
        { 
            user_id: userId, 
            iat: Math.floor(Date.now() / 1000) - 5 * 60, 
            exp: Math.floor(Date.now() / 1000) + 10 * 60 
        }, 
        secret
    );
};

let token;
let user;

describe("/itineraries", () => {
    beforeEach(async () => {
        user = new User({
            firstname: "John",
            lastname: "Smith",
            username: "JSmith",
            email: "jsmith@test.com",
            password: "Password1!",
        });
        await User.deleteMany({});
        await user.save();
        token = createToken(user._id);
        await Itinerary.deleteMany({});
    });

    describe ("POST, when activity, date, startTime, endTime, and tripId are provided", () => {
        test("should return a 201 status code and a message of 'Itinerary Created'", async () => {
            const response = await request(app)
                .post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    activity: "Visit the Louvre",
                    date: new Date(),
                    startTime: "09:00",
                    endTime: "12:00",
                    tripId: new ObjectId(),
                });
                
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Itinerary Created");
        });

        test("a itinerary is created", async () => {
            await request(app)
                .post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    activity: "Visit the Louvre",
                    date: new Date(),
                    startTime: "09:00",
                    endTime: "12:00",
                    tripId: new ObjectId(),
                });

            const itineraries = await Itinerary.find();
            const newItinerary = itineraries[itineraries.length - 1];
            expect(itineraries.length).toBe(1);
            expect(newItinerary.activity).toBe("Visit the Louvre");
        });
    });

    describe("POST, when activity is missing", () => {
        test("should return a 400 status code and a message of 'Internal server error'", async () => {
            const response = await request(app)
                .post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    date: new Date(),
                    startTime: "09:00",
                    endTime: "12:00",
                    tripId: new ObjectId(),
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Internal server error");
        });

        test("no itinerary is created", async () => {
            await request(app)
                .post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    date: new Date(),
                    startTime: "09:00",
                    endTime: "12:00",
                    tripId: new ObjectId(),
                });

            const itineraries = await Itinerary.find();
            expect(itineraries.length).toBe(0);
        });
    });

    describe("POST, when date is missing", () => {
        test("should return a 400 status code and a message of 'Internal server error'", async () => {
            const response = await request(app)
                .post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    activity: "Visit the Louvre",
                    startTime: "09:00",
                    endTime: "12:00",
                    tripId: new ObjectId(),
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Internal server error");
        });

        test("no itinerary is created", async () => {
            await request(app)
                .post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    activity: "Visit the Louvre",
                    startTime: "09:00",
                    endTime: "12:00",
                    tripId: new ObjectId(),
                });

            const itineraries = await Itinerary.find();
            expect(itineraries.length).toBe(0);
        });
    });

    describe("POST, when startTime is missing", () => {
        test("should return a 400 status code and a message of 'Internal server error'", async () => {
            const response = await request(app)
                .post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    activity: "Visit the Louvre",
                    date: new Date(),
                    endTime: "12:00",
                    tripId: new ObjectId(),
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Internal server error");
        });

        test("no itinerary is created", async () => {
            await request(app)
                .post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    activity: "Visit the Louvre",
                    date: new Date(),
                    endTime: "12:00",
                    tripId: new ObjectId(),
                });

            const itineraries = await Itinerary.find();
            expect(itineraries.length).toBe(0);
        });
    });

    describe("POST, when endTime is missing", () => {
        test("should return a 400 status code and a message of 'Internal server error'", async () => {
            const response = await request(app)
                .post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    activity: "Visit the Louvre",
                    date: new Date(),
                    startTime: "09:00",
                    tripId: new ObjectId(),
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Internal server error");
        });

        test("no itinerary is created", async () => {
            await request(app)
                .post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    activity: "Visit the Louvre",
                    date: new Date(),
                    startTime: "09:00",
                    tripId: new ObjectId(),
                });

            const itineraries = await Itinerary.find();
            expect(itineraries.length).toBe(0);
        });
    });

    describe("POST, when tripId is missing", () => {
        test("should return a 400 status code and a message of 'Internal server error'", async () => {
            const response = await request(app)
                .post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    activity: "Visit the Louvre",
                    date: new Date(),
                    startTime: "09:00",
                    endTime: "12:00",
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Internal server error");
        });

        test("no itinerary is created", async () => {
            await request(app)
                .post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    activity: "Visit the Louvre",
                    date: new Date(),
                    startTime: "09:00",
                    endTime: "12:00",
                });

            const itineraries = await Itinerary.find();
            expect(itineraries.length).toBe(0);
        });
    });

    describe ("GET, when there no itineraries", () => { 
        test("should return a 200 status code and an empty array", async () => {
            const response = await request(app)
                .get("/itineraries")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body.itineraries).toEqual([]);
        });

        test("should return a token", async () => {
            const response = await request(app)
                .get("/itineraries")
                .set("Authorization", `Bearer ${token}`);

            expect(response.body.token).toBeDefined();
        });

        test("should return a token that is valid", async () => {
            const response = await request(app)
                .get("/itineraries")
                .set("Authorization", `Bearer ${token}`);

            const decoded = JWT.verify(response.body.token, secret);
            console.log("decoded!!!!", decoded);
            expect(decoded.user_id).toEqual(user._id.toString());
        });
    });

    describe("GET, when there are itineraries", () => {
        beforeEach(async () => {
            await Itinerary.create({
                activity: "Visit the Louvre",
                date: new Date(),
                startTime: "09:00",
                endTime: "12:00",
                tripId: new ObjectId(),
            });
        });

        test("should return a 200 status code and an array of itineraries", async () => {
            const response = await request(app)
                .get("/itineraries")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body.itineraries.length).toBe(1);
            expect(response.body.itineraries[0].activity).toBe("Visit the Louvre");
        });

        test("should return a token", async () => {
            const response = await request(app)
                .get("/itineraries")
                .set("Authorization", `Bearer ${token}`);

            expect(response.body.token).toBeDefined();
        });

        test("should return a token that is valid", async () => {
            const response = await request(app)
                .get("/itineraries")
                .set("Authorization", `Bearer ${token}`);

            const decoded = JWT.verify(response.body.token, secret);
            expect(decoded.user_id).toEqual(user._id.toString());
        });
    });

    describe("DELETE, when the itinerary exists", () => {
        let itinerary;

        beforeEach(async () => {
            itinerary = await Itinerary.create({
                activity: "Visit the Louvre",
                date: new Date(),
                startTime: "09:00",
                endTime: "12:00",
                tripId: new ObjectId(),
            });
        });

        test("should return a 200 status code and a message of 'Itinerary Deleted'", async () => {
            const response = await request(app)
                .delete("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({ itineraryId: itinerary._id });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Itinerary Deleted");
        });

        test("should delete the itinerary", async () => {
            await request(app)
                .delete("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({ itineraryId: itinerary._id });

            const itineraries = await Itinerary.find();
            expect(itineraries.length).toBe(0);
        });
    });
});