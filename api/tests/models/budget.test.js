require("../mongodb_helper");
const Budget = require("../../models/budget");
const { ObjectId } = require("mongoose").Types;

describe("Budget model", () => {
    beforeEach(async () => {
        await Budget.deleteMany({});
    });

    it("formats correctly as a schema", () => {
        const tripId = new ObjectId();
        const budget = new Budget({
            title: "Groceries",
            amount: 100,
            tripId: tripId,
        });
        expect(budget.title).toEqual("Groceries");
        expect(budget.amount).toEqual(100);
        expect(budget.tripId).toEqual(tripId);
    });

    it("can save a budget", async () => {
        const tripId = new ObjectId();
        const budget = new Budget({
            title: "Groceries",
            amount: 100,
            tripId: tripId,
        });

        await budget.save();
        const budgets = await Budget.find();

        expect(budgets[0].title).toEqual("Groceries");
        expect(budgets[0].amount).toEqual(100);
        expect(budgets[0].tripId).toEqual(tripId);
    });
});