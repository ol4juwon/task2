const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app"); // Import your Express.js app
const User = require("../../app/v1/users/users.model"); // Import your User model
require("dotenv").config({});
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Create User API", () => {
  const mongo = MongoMemoryServer.create();

  // const uri = mongo.getUri();

  beforeAll(async () => {
    //   const uri =  mongod.getUri();
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    (await mongo).stop;
  });
  beforeEach(async () => {
    // Clear the User collection before each test
    await User.deleteMany({});
  });

  it("should create a new user", async () => {
    const userData = {
        username: "john_doe",
        email: "john@example.com",
        name: "securepassword",
        dob: "1334-08-09",
        state: "kill",
        occupation: "jj",
    };

    const response = await request(app)
      .post("/api/v1/users")
      .send(userData)
      .set("Accept", "application/json");

    // Assert HTTP response status code
    console.log({response})
    expect(response.status).toBe(201);

    // Assert response body
    expect(response.body).toMatchObject({
      username: userData.username,
      email: userData.email,
    });

    // Verify that the user is saved in the database
    const user = await User.findOne({ email: userData.email });
    expect(user).toBeDefined();
    expect(user.username).toBe(userData.username);
  });

  it("should return an error for duplicate email", async () => {
    const existingUser = new User({
      username: "existing_user",
      email: "john@example.com", // Duplicate email
      password: "password123",
    });

    await existingUser.save();

    const userData = {
      username: "john_doe",
      email: "john@example.com",
      name: "securepassword",
      dod: "",
      state: "",
      occupation: "",
    };

    const response = await request(app)
      .post("/api/v1/users")
      .send(userData)
      .set("Accept", "application/json");

    // Assert HTTP response status code
    expect(response.status).toBe(400);

    // Assert response body
    expect(response.body).toMatchObject({
      error: "Email is already in use.",
    });
  });
});
