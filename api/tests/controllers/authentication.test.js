const app = require("../../app");
const supertest = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

describe("/tokens", () => {
  beforeAll( async () => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("Password1!", salt);
    const user = new User({
              firstname: "John",
              lastname: "Smith",
              username: "johnsmith",
              email: "johnsmith@example.com",
              password: hash,
              
            }); 
      return await user.save();
        console.log("THIS IS THE USER !!!!", user);
      });

      
    

    // We need to use `await` so that the "beforeAll" setup function waits for
    // the asynchronous user.save() to be done before exiting.
    // Otherwise, the tests belowc ould run without the user actyakkt being
    // saved, causing tests to fail inconsistently.
    
  

  afterAll(async () => {
    await User.deleteMany({});
  });

  test("returns a token when credentials are valid", async () => {
    const testApp = supertest(app);
    const response = await testApp
      .post("/tokens")
      .send({ email: "johnsmith@example.com", password: "Password1!"});

    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.message).toEqual("OK");
  });

  test("doesn't return a token when the user doesn't exist", async () => {
    const testApp = supertest(app);
    const response = await testApp
      .post("/tokens")
      .send({ email: "non-existent@test.com", password: "Password1!" });

    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("User not found");
  });

  test("doesn't return a token when the wrong password is given", async () => {
    let testApp = supertest(app);
    const response = await testApp
      .post("/tokens")
      .send({ email: "johnsmith@example.com", password: "Wrongpassword1!"});

    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("Password incorrect");
  });
});