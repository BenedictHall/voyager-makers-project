require("../mongodb_helper");
const Itinerary = require("../../models/itinerary");
const { ObjectId } = require("mongoose").Types;

describe("Itinerary model", () => {
    beforeEach(async () => {
        await Itinerary.deleteMany({});
    });
    
    it("formats correctly as a schema", () => {
        const tripId = new ObjectId();
        const itinerary = new Itinerary({
        activity: "Visit the Eiffel Tower",
        date: new Date(),
        startTime: "09:00",
        endTime: "12:00",
        tripId: tripId,
        });
        expect(itinerary.activity).toEqual("Visit the Eiffel Tower");
        expect(itinerary.date).toEqual(itinerary.date);
        expect(itinerary.startTime).toEqual("09:00");
        expect(itinerary.endTime).toEqual("12:00");
        expect(itinerary.tripId).toEqual(tripId);
    });
    
    
    it("can save an itinerary", async () => {
        const tripId = new ObjectId();
        const itinerary = new Itinerary({
        activity: "Visit the Eiffel Tower",
        date: new Date(),
        startTime: "09:00",
        endTime: "12:00",
        tripId: tripId,
        });
    
        await itinerary.save();
        const itineraries = await Itinerary.find();
    
        expect(itineraries[0].activity).toEqual("Visit the Eiffel Tower");
        expect(itineraries[0].date).toEqual(itinerary.date);
        expect(itineraries[0].startTime).toEqual("09:00");
        expect(itineraries[0].endTime).toEqual("12:00");
        expect(itineraries[0].tripId).toEqual(tripId);
    });
});