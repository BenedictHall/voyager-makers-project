const request = require("supertest");
const app = require("../../app");
const { ObjectId } = require("mongoose").Types;
const Expense = require("../../models/expense");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

const createToken = (userId) => {
    return JWT.sign(
        {
            user_id: userId,
            iat: Math.floor(Date.now() / 1000) - 5 * 60,
            exp: Math.floor(Date.now() / 1000) + 10 * 60,
        },
        secret
    );
};

let token;
let user;

describe("/expense", () => {
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
        await Expense.deleteMany({});
        token = createToken(user._id);
    });

    describe("POST, when description, amount, date, category, and budgetId are provided", () => {
        test("the response code is 201", async () => {
            const budgetId = new ObjectId();
            const response = await request(app)
                .post("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    description: "Groceries",
                    amount: 100,
                    date: new Date(),
                    category: "Food",
                    budgetId: budgetId,
                });
            expect(response.statusCode).toBe(201);
        });

        test("an Expense is created", async () => {
            const budgetId = new ObjectId();
            const response = await request(app)
                .post("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    description: "Groceries",
                    amount: 100,
                    date: new Date(),
                    category: "Food",
                    budgetId: budgetId,
                });
            const expenses = await Expense.find();
            expect(expenses[0].description).toEqual("Groceries");
            expect(expenses[0].amount).toEqual(100);
            expect(expenses[0].date).toEqual(expect.any(Date));
            expect(expenses[0].category).toEqual("Food");
            expect(expenses[0].budgetId).toEqual(budgetId);
        });
    });

    describe("POST, when description is missing", () => {
        test("the response code is 400", async () => {
            const budgetId = new ObjectId();
            const response = await request(app)
                .post("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    amount: 100,
                    date: new Date(),
                    category: "Food",
                    budgetId: budgetId,
                });
            expect(response.statusCode).toBe(400);
        });

        test("no Expense is created", async () => {
            const budgetId = new ObjectId();
            const response = await request(app)
                .post("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    amount: 100,
                    date: new Date(),
                    category: "Food",
                    budgetId: budgetId,
                });
            const expenses = await Expense.find();
            expect(expenses.length).toBe(0);
        });
    });

    describe("POST, when amount is missing", () => {
        test("the response code is 400", async () => {
            const budgetId = new ObjectId();
            const response = await request(app)
                .post("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    description: "Groceries",
                    date: new Date(),
                    category: "Food",
                    budgetId: budgetId,
                });
            expect(response.statusCode).toBe(400);
        });

        test("no Expense is created", async () => {
            const budgetId = new ObjectId();
            const response = await request(app)
                .post("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    description: "Groceries",
                    date: new Date(),
                    category: "Food",
                    budgetId: budgetId,
                });
            const expenses = await Expense.find();
            expect(expenses.length).toBe(0);
        });
    });

    describe("POST, when date is missing", () => {
        test("the response code is 400", async () => {
            const budgetId = new ObjectId();
            const response = await request(app)
                .post("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    description: "Groceries",
                    amount: 100,
                    category: "Food",
                    budgetId: budgetId,
                });
            expect(response.statusCode).toBe(400);
        });

        test("no Expense is created", async () => {
            const budgetId = new ObjectId();
            const response = await request(app)
                .post("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    description: "Groceries",
                    amount: 100,
                    category: "Food",
                    budgetId: budgetId,
                });
            const expenses = await Expense.find();
            expect(expenses.length).toBe(0);
        });
    });

    describe("POST, when category is missing", () => {
        test("the response code is 400", async () => {
            const budgetId = new ObjectId();
            const response = await request(app)
                .post("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    description: "Groceries",
                    amount: 100,
                    date: new Date(),
                    budgetId: budgetId,
                });
            expect(response.statusCode).toBe(400);
        });

        test("no Expense is created", async () => {
            const budgetId = new ObjectId();
            const response = await request(app)
                .post("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    description: "Groceries",
                    amount: 100,
                    date: new Date(),
                    budgetId: budgetId,
                });
            const expenses = await Expense.find();
            expect(expenses.length).toBe(0);
        });
    });

    describe("GET, when there are no Expenses", () => {
        test("the response code is 200", async () => {
            const response = await request(app)
                .get("/expense")
                .set("Authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });

        test("an empty array is returned", async () => {
            const response = await request(app)
                .get("/expense")
                .set("Authorization", `Bearer ${token}`);
            expect(response.body.expenses).toEqual([]);
        });
    });

    describe("GET, when there are Expenses", () => {
        beforeEach(async () => {
            const budgetId = new ObjectId();
            const expense = new Expense({
                description: "Groceries",
                amount: 100,
                date: new Date(),
                category: "Food",
                budgetId: budgetId,
            });
            await expense.save();
        });

        test("the response code is 200", async () => {
            const response = await request(app)
                .get("/expense")
                .set("Authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });

        test("an array of Expenses is returned", async () => {
            const response = await request(app)
                .get("/expense")
                .set("Authorization", `Bearer ${token}`);
            expect(response.body.expenses.length).toBe(1);
            expect(response.body.expenses[0].description).toEqual("Groceries");
            expect(response.body.expenses[0].amount).toEqual(100);
            expect(response.body.expenses[0].date).toEqual(expect.any(String));
            expect(response.body.expenses[0].category).toEqual("Food");
        });
    });

    describe("DELETE, when the Expense exists", () => {
        let expense;
        beforeEach(async () => {
            const budgetId = new ObjectId();
            expense = new Expense({
                description: "Groceries",
                amount: 100,
                date: new Date(),
                category: "Food",
                budgetId: budgetId,
            });
            await expense.save();
        });

        test("the response code is 200", async () => {
            const response = await request(app)
                .delete("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({ expenseId: expense._id });
            expect(response.statusCode).toBe(200);
        });

        test("the Expense is deleted", async () => {
            await request(app)
                .delete("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({ expenseId: expense._id });
            const expenses = await Expense.find();
            expect(expenses.length).toBe(0);
        });
    });

    describe("DELETE, when the Expense does not exist", () => {
        test("the response code is 404", async () => {
            const response = await request(app)
                .delete("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({ expenseId: new ObjectId() });
            expect(response.statusCode).toBe(404);
        });

        test("no Expense is deleted", async () => {
            await request(app)
                .delete("/expense")
                .set("Authorization", `Bearer ${token}`)
                .send({ expenseId: new ObjectId() });
            const expenses = await Expense.find();
            expect(expenses.length).toBe(0);
        });
    });
});

