require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("formats correctly as a schema", () => {
    const user = new User({
      firstname: "John",
      lastname: "Smith",
      username: "JSmith",
      email: "johnsmith@example.com",
      password: "Password1!",
    });
    expect(user.firstname).toEqual("John");
    expect(user.lastname).toEqual("Smith");
    expect(user.username).toEqual("JSmith");
    expect(user.email).toEqual("johnsmith@example.com");
    expect(user.password).toEqual("Password1!");
  });

  
  it("can save a user", async () => {
    const user = new User({
      firstname: "John",
      lastname: "Smith",
      username: "JSmith",
      email: "johnsmith@example.com",
      password: "Password1!",
    });

    await user.save();
    const users = await User.find();

    expect(users[0].email).toEqual("johnsmith@example.com");
    expect(users[0].firstname).toEqual("John");
    expect(users[0].lastname).toEqual("Smith");
    expect(users[0].username).toEqual("JSmith");
    expect(users[0].password).toEqual("Password1!");
  });
});