require("../mongodb_helper");
const ToDo = require("../../models/toDo");
const { ObjectId } = require("mongoose").Types;

describe("ToDo model", () => {
    beforeEach(async () => {
        await ToDo.deleteMany({});
    });
    
    it("formats correctly as a schema", () => {
        const tripId = new ObjectId();
        const userId = new ObjectId();
        const toDo = new ToDo({
        title: "Buy groceries",
        description: "Buy milk, eggs, and bread",
        dueDate: new Date(),
        isCompleted: false,
        userId: userId,
        tripId: tripId,
        });
        console.log("!!!!!!", toDo)
        expect(toDo.title).toEqual("Buy groceries");
        expect(toDo.description).toEqual("Buy milk, eggs, and bread");
        expect(toDo.dueDate).toEqual(toDo.dueDate);
        expect(toDo.isCompleted).toEqual(false);
        expect(toDo.userId).toEqual(userId);
        expect(toDo.tripId).toEqual(tripId);
    });
    
    
    it("can save a toDo", async () => {
        const tripId = new ObjectId();
        const userId = new ObjectId();
        const toDo = new ToDo({
        title: "Buy groceries",
        description: "Buy milk, eggs, and bread",
        dueDate: new Date(),
        isCompleted: false,
        userId: userId,
        tripId: tripId,
        });
    
        await toDo.save();
        const toDos = await ToDo.find();
    
        expect(toDos[0].title).toEqual("Buy groceries");
        expect(toDos[0].description).toEqual("Buy milk, eggs, and bread");
        expect(toDos[0].dueDate).toEqual(toDo.dueDate);
        expect(toDos[0].isCompleted).toEqual(false);
        expect(toDos[0].userId).toEqual(userId);
        expect(toDos[0].tripId).toEqual(tripId);
    });
});