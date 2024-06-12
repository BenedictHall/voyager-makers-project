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

describe("/toDos", () => {
    beforeEach(async () => {
        const user = new User({
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
        console.log("USER!!!!!!", user);
    });
    
    describe("POST, when title, description, dueDate, isCompleted, and userId are sent", () => {
        test("the response code is 201", async () => {
            const tripId = new ObjectId();
            const userId = new ObjectId();
            const response = await request(app)
                .post("/toDos")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Buy groceries",
                    description: "Buy milk, eggs, and bread",
                    dueDate: new Date(),
                    isCompleted: false,
                    userId: userId,
                    tripId: tripId,
                });

            expect(response.statusCode).toBe(201);
        })
    });
});


