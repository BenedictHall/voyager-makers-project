const request = require("supertest");
const { ObjectId } = require("mongoose").Types;
const app = require("../../app");
const ToDo = require("../../models/toDo");
const JWT = require("jsonwebtoken");
const User = require("../../models/user");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

const createToken = (userId) => {
    return JWT.sign(
        {
            user_id: userId,
      // Backdate this token of 5 minutes
            iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
            exp: Math.floor(Date.now() / 1000) + 10 * 60,
        },
        secret
    );
};

let token;
let user;

describe("/toDos", () => {
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
        await ToDo.deleteMany({});
        token = createToken(user._id);
    });
    
    describe("POST, when title, description, dueDate, isCompleted, and userId are sent", () => {
        test("the response code is 201", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Buy groceries",
                    description: "Buy milk, eggs, and bread",
                    dueDate: new Date(),
                    isCompleted: false,
                    userId: user._id,
                    tripId: tripId,
                });

            expect(response.statusCode).toBe(201);
        })

        test("a ToDo is created", async () => {
            const tripId = new ObjectId();
            await request(app)
                .post("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Buy groceries",
                    description: "Buy milk, eggs, and bread",
                    dueDate: new Date(),
                    isCompleted: false,
                    userId: user._id,
                    tripId: tripId,
                });

            const toDos = await ToDo.find();
            const newToDo = toDos[toDos.length - 1];
            expect(newToDo.title).toEqual("Buy groceries");
        });
    });

    describe("POST, when title is missing", () => {
        test("response code is 400", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    description: "Buy milk, eggs, and bread",
                    dueDate: new Date(),
                    isCompleted: false,
                    userId: user._id,
                    tripId: tripId,
                });

            expect(response.statusCode).toBe(400);
        });

        test("does not create a ToDo when missing title", async () => {
            const tripId = new ObjectId();
            await request(app)
                .post("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    description: "Buy milk, eggs, and bread",
                    dueDate: new Date(),
                    isCompleted: false,
                    userId: user._id,
                    tripId: tripId,
                });

            const toDos = await ToDo.find();
            expect(toDos.length).toEqual(0);
        });
    });

    describe("POST, when description is missing", () => {
        test("response code is 400", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Buy groceries",
                    dueDate: new Date(),
                    isCompleted: false,
                    userId: user._id,
                    tripId: tripId,
                });

            expect(response.statusCode).toBe(400);
        });

        test("does not create a ToDo when missing description", async () => {
            const tripId = new ObjectId();
            await request(app)
                .post("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Buy groceries",
                    dueDate: new Date(),
                    isCompleted: false,
                    userId: user._id,
                    tripId: tripId,
                });

            const toDos = await ToDo.find();
            expect(toDos.length).toEqual(0);
        });
    });

    describe("POST, when dueDate is missing", () => {
        test("response code is 400", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Buy groceries",
                    description: "Buy milk, eggs, and bread",
                    isCompleted: false,
                    userId: user._id,
                    tripId: tripId,
                });

            expect(response.statusCode).toBe(400);
        });

        test("does not create a ToDo when missing dueDate", async () => {
            const tripId = new ObjectId();
            await request(app)
                .post("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Buy groceries",
                    description: "Buy milk, eggs, and bread",
                    isCompleted: false,
                    userId: user._id,
                    tripId: tripId,
                });

            const toDos = await ToDo.find();
            expect(toDos.length).toEqual(0);
        });
    });

    describe("POST, when isCompleted is missing", () => {
        test("response code is 400", async () => {
            const tripId = new ObjectId();
            const response = await request(app)
                .post("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Buy groceries",
                    description: "Buy milk, eggs, and bread",
                    dueDate: new Date(),
                    userId: user._id,
                    tripId: tripId,
                });

            expect(response.statusCode).toBe(400);
        });

        test("does not create a ToDo when missing isCompleted", async () => {
            const tripId = new ObjectId();
            await request(app)
                .post("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Buy groceries",
                    description: "Buy milk, eggs, and bread",
                    dueDate: new Date(),
                    userId: user._id,
                    tripId: tripId,
                });

            const toDos = await ToDo.find();
            expect(toDos.length).toEqual(0);
        });
    });

    describe("GET, when there are no ToDos", () => {
        test("response code is 200", async () => {
            const response = await request(app)
                .get("/toDos")
                .set("Authorization", `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
        });

        test("response body is an empty array", async () => {
            const response = await request(app)
                .get("/toDos")
                .set("Authorization", `Bearer ${token}`);

            expect(response.body.toDos).toEqual([]);
        });

        test("response body has a token", async () => {
            const response = await request(app)
                .get("/toDos")
                .set("Authorization", `Bearer ${token}`);

            expect(response.body.token).toBeTruthy();
        });

        test("response body token is valid", async () => {
            const response = await request(app)
                .get("/toDos")
                .set("Authorization", `Bearer ${token}`);

            const decoded = JWT.verify(response.body.token, secret);
            expect(decoded.user_id).toEqual(user._id.toString());
        });

        test("response body token is different from the original token", async () => {
            const response = await request(app)
                .get("/toDos")
                .set("Authorization", `Bearer ${token}`);

            const decoded = JWT.verify(response.body.token, secret);
            expect(decoded.user_id).not.toEqual(token);
        });

        test("response body token is not expired", async () => {
            const response = await request(app)
                .get("/toDos")
                .set("Authorization", `Bearer ${token}`);

            const decoded = JWT.verify(response.body.token, secret);
            expect(decoded.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
        });
    });

    describe("GET, when there are ToDos", () => {
        beforeEach(async () => {
            const tripId = new ObjectId();
            await ToDo.create({
                title: "Buy groceries",
                description: "Buy milk, eggs, and bread",
                dueDate: new Date(),
                isCompleted: false,
                userId: user._id,
                tripId: tripId,
            });
        });

        test("response code is 200", async () => {
            const response = await request(app)
                .get("/toDos")
                .set("Authorization", `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
        });

        test("response body has the ToDos", async () => {
            const response = await request(app)
                .get("/toDos")
                .set("Authorization", `Bearer ${token}`);

            expect(response.body.toDos.length).toEqual(1);
        });

        test("response body has a token", async () => {
            const response = await request(app)
                .get("/toDos")
                .set("Authorization", `Bearer ${token}`);

            expect(response.body.token).toBeTruthy();
        });

        test("response body token is valid", async () => {
            const response = await request(app)
                .get("/toDos")
                .set("Authorization", `Bearer ${token}`);

            const decoded = JWT.verify(response.body.token, secret);
            expect(decoded.user_id).toEqual(user._id.toString());
        });

        test("response body token is different from the original token", async () => {
            const response = await request(app)
                .get("/toDos")
                .set("Authorization", `Bearer ${token}`);

            const decoded = JWT.verify(response.body.token, secret);
            expect(decoded.user_id).not.toEqual(token);
        });

        test("response body token is not expired", async () => {
            const response = await request(app)
                .get("/toDos")
                .set("Authorization", `Bearer ${token}`);

            const decoded = JWT.verify(response.body.token, secret);
            expect(decoded.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
        });
    });

    describe("PUT, when a ToDo is toggled", () => {
        let toDo;

        beforeEach(async () => {
            const tripId = new ObjectId();
            toDo = await ToDo.create({
                title: "Buy groceries",
                description: "Buy milk, eggs, and bread",
                dueDate: new Date(),
                isCompleted: false,
                userId: user._id,
                tripId: tripId,
            });
        });

        test("response code is 200", async () => {
            const response = await request(app)
                .put("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: toDo._id });

            expect(response.statusCode).toBe(200);
        });

        test("response body has the toggled ToDo", async () => {
            const response = await request(app)
                .put("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: toDo._id });

            expect(response.body.toDo.isCompleted).toBe(true);
        });

        test("toDO is toggled and then toggled back", async () => {
            await request(app)
                .put("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: toDo._id });

            const updatedToDo = await ToDo.findById(toDo._id);
            expect(updatedToDo.isCompleted).toBe(true);

            await request(app)
                .put("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: toDo._id });

            const reUpdatedToDo = await ToDo.findById(toDo._id);
            expect(reUpdatedToDo.isCompleted).toBe(false);
        });

        test("response body has a token", async () => {
            const response = await request(app)
                .put("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: toDo._id });

            expect(response.body.token).toBeTruthy();
        });

        test("response body token is valid", async () => {
            const response = await request(app)
                .put("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: toDo._id });

            const decoded = JWT.verify(response.body.token, secret);
            expect(decoded.user_id).toEqual(user._id.toString());
        });

        test("response body token is different from the original token", async () => {
            const response = await request(app)
                .put("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: toDo._id });

            const decoded = JWT.verify(response.body.token, secret);
            expect(decoded.user_id).not.toEqual(token);
        });

        test("response body token is not expired", async () => {
            const response = await request(app)
                .put("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: toDo._id });

            const decoded = JWT.verify(response.body.token, secret);
            expect(decoded.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
        });
    });

    describe("PUT, when a ToDo is toggled that does not exist", () => {
        test("response code is 404", async () => {
            const response = await request(app)
                .put("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: new ObjectId() });

            expect(response.statusCode).toBe(404);
        });

        test("response body has a message", async () => {
            const response = await request(app)
                .put("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: new ObjectId() });

            expect(response.body.message).toEqual("ToDo not found");
        });
    });

    describe("DELETE, when a ToDo is deleted", () => {
        test("response code is 200", async () => {
            const tripId = new ObjectId();
            const toDo = await ToDo.create({
                title: "Buy groceries",
                description: "Buy milk, eggs, and bread",
                dueDate: new Date(),
                isCompleted: false,
                userId: user._id,
                tripId: tripId,
            });

            const response = await request(app)
                .delete("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: toDo._id });

            expect(response.statusCode).toBe(200);
        });

        test("toDO is deleted", async () => {
            const tripId = new ObjectId();
            const toDo = await ToDo.create({
                title: "Buy groceries",
                description: "Buy milk, eggs, and bread",
                dueDate: new Date(),
                isCompleted: false,
                userId: user._id,
                tripId: tripId,
            });

            await request(app)
                .delete("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: toDo._id });

            const toDos = await ToDo.find();
            expect(toDos.length).toEqual(0);
        });
    });

    describe("DELETE, when a ToDo is deleted that does not exist", () => {
        test("response code is 404", async () => {
            const response = await request(app)
                .delete("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: new ObjectId() });

            expect(response.statusCode).toBe(404);
        });

        test("response body has a message", async () => {
            const response = await request(app)
                .delete("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({ toDoId: new ObjectId() });

            expect(response.body.message).toEqual("ToDo not found");
        });
    });
});


