const request = require('supertest');
const app = require('../../app');
const { ObjectId } = require('mongoose').Types;
const Budget = require('../../models/budget');
const User = require('../../models/user');
const JWT = require('jsonwebtoken');
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

describe("/budget", () => {
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
        await Budget.deleteMany({});
        token = createToken(user._id);
    });

    describe("POST, when title, amount, and tripId are provided", () => {
        test("the response code is 201", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Groceries",
                    amount: 100,
                    tripId: tripId,
                });
            expect(response.statusCode).toBe(201);
        });

        test("a Budget is created", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Groceries",
                    amount: 100,
                    tripId: tripId,
                });
            const budget = await Budget.find();
            expect(budget.length).toBe(1);
        });
    });

    describe("POST, when title is missing", () => {
        test("the response code is 400", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    amount: 100,
                    tripId: tripId,
                });
            expect(response.statusCode).toBe(400);
        });

        test("no Budget is created", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    amount: 100,
                    tripId: tripId,
                });
            const budget = await Budget.find();
            expect(budget.length).toBe(0);
        });
    });

    describe("POST, when amount is missing", () => {
        test("the response code is 400", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Groceries",
                    tripId: tripId,
                });
            expect(response.statusCode).toBe(400);
        });

        test("no Budget is created", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Groceries",
                    tripId: tripId,
                });
            const budget = await Budget.find();
            expect(budget.length).toBe(0);
        });
    });

    describe("POST, when amount is not a number", () => {
        test("the response code is 400", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Groceries",
                    amount: "one hundred",
                    tripId: tripId,
                });
            expect(response.statusCode).toBe(400);
        });

        test("no Budget is created", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Groceries",
                    amount: "one hundred",
                    tripId: tripId,
                });
            const budget = await Budget.find();
            expect(budget.length).toBe(0);
        });
    });

    describe("POST, when amount is less than or equal to 0", () => {
        test("the response code is 400", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Groceries",
                    amount: 0,
                    tripId: tripId,
                });
            expect(response.statusCode).toBe(400);
        });

        test("no Budget is created", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Groceries",
                    amount: 0,
                    tripId: tripId,
                });
            const budget = await Budget.find();
            expect(budget.length).toBe(0);
        });
    });

    describe("GET, when there are no budgets", () => {
        test("the response code is 200", async () => {
            const response = await request(app)
                .get("/budget")
                .set("Authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });

        test("an empty array is returned", async () => {
            const response = await request(app)
                .get("/budget")
                .set("Authorization", `Bearer ${token}`);
            expect(response.body.budgets).toEqual([]);
        });
    });

    describe("GET, when there are budgets", () => {
        beforeEach(async () => {
            const tripId = new ObjectId();
            const budget = new Budget({
                title: "Groceries",
                amount: 100,
                tripId: tripId,
            });
            await budget.save();
        });

        test("the response code is 200", async () => {
            const response = await request(app)
                .get("/budget")
                .set("Authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });

        test("the budgets are returned", async () => {
            const response = await request(app)
                .get("/budget")
                .set("Authorization", `Bearer ${token}`);
            expect(response.body.budgets.length).toBe(1);
            expect(response.body.budgets[0].title).toBe("Groceries");
            expect(response.body.budgets[0].amount).toBe(100);
        });
    });

    describe("DELETE, when the budget exists", () => {
        let budget;
        beforeEach(async () => {
            const tripId = new ObjectId();
            budget = new Budget({
                title: "Groceries",
                amount: 100,
                tripId: tripId,
            });
            await budget.save();
        });

        test("the response code is 200", async () => {
            const response = await request(app)
                .delete("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({ budgetId: budget._id });
            expect(response.statusCode).toBe(200);
        });

        test("the budget is deleted", async () => {
            await request(app)
                .delete("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({ budgetId: budget._id });
            const budgets = await Budget.find();
            expect(budgets.length).toBe(0);
        });
    });

    describe("DELETE, when the budget does not exist", () => {
        test("the response code is 404", async () => {
            const response = await request(app)
                .delete("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({ budgetId: new ObjectId() });
            expect(response.statusCode).toBe(404);
        });

        test("no budget is deleted", async () => {
            await request(app)
                .delete("/budget")
                .set("Authorization", `Bearer ${token}`)
                .send({ budgetId: new ObjectId() });
            const budgets = await Budget.find();
            expect(budgets.length).toBe(0);
        });
    });
});