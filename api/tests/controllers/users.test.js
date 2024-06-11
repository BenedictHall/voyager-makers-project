const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when firstname, lastname, username, email and password are sent", () => {
    test("the response code is 201", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          firstname: "John",
          lastname: "Smith",
          username: "JSmith",
          email: "johnsmith@example.com",
          password: "Password1!",});

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({
          firstname: "John",
          lastname: "Smith",
          username: "JSmith",
          email: "johnsmith@example.com",
          password: "Password1!",});

      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.email).toEqual("johnsmith@example.com");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          firstname: "John",
          lastname: "Smith",
          username: "JSmith",
          email: "johnsmith@example.com",
        });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user when missing password", async () => {
      await request(app).post("/users").send({ firstname: "John", lastname: "Smith", username: "JSmith", email: "johnsmith@example.com"});

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          firstname: "John",
          lastname: "Smith",
          username: "JSmith",
          password: "Password1!",
        });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user when email is missing", async () => {
      await request(app).post("/users").send({ firstname: "John", lastname: "Smith", username: "JSmith", password: "Password1!"});

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });
});