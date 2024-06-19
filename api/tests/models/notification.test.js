require("../mongodb_helper");
const Notification = require("../../models/notification");
const { ObjectId } = require("mongoose").Types;

describe("Notification model", () => {
    beforeEach(async () => {
        await Notification.deleteMany({});
    });

    it("formats correctly as a schema", () => {
        const userId = new ObjectId();
        const toDoId = new ObjectId();
        const notification = new Notification({
        message: "I need to make a call to Kathey",
        dueDate: new Date(),
        isRead: false,
        userId: userId,
        toDoId: toDoId,
        });
        console.log("!!!!!!", notification)
        expect(notification.message).toEqual("I need to make a call to Kathey");
        expect(notification.dueDate).toEqual(notification.dueDate);
        expect(notification.isRead).toEqual(false);
        expect(notification.userId).toEqual(userId);
        expect(notification.toDoId).toEqual(toDoId);
    });


});