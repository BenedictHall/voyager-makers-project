require("../mongodb_helper");
const Expense = require("../../models/expense");
const { ObjectId } = require("mongoose").Types;

describe("Expense model", () => {
    beforeEach(async () => {
        await Expense.deleteMany({});
    });

    it("formats correctly as a schema", () => {
        const budgetId = new ObjectId();
        const expense = new Expense({
            description: "Groceries",
            amount: 100,
            date: new Date(),
            category: "Food",
            budgetId: budgetId,
        });
        expect(expense.description).toEqual("Groceries");
        expect(expense.amount).toEqual(100);
        expect(expense.date).toEqual(expense.date);
        expect(expense.category).toEqual("Food");
        expect(expense.budgetId).toEqual(budgetId);
    });

    it("can save an expense", async () => {
        const budgetId = new ObjectId();
        const expense = new Expense({
            description: "Groceries",
            amount: 100,
            date: new Date(),
            category: "Food",
            budgetId: budgetId,
        });

        await expense.save();
        const expenses = await Expense.find();

        expect(expenses[0].description).toEqual("Groceries");
        expect(expenses[0].amount).toEqual(100);
        expect(expenses[0].date).toEqual(expense.date);
        expect(expenses[0].category).toEqual("Food");
        expect(expenses[0].budgetId).toEqual(budgetId);
    });
});