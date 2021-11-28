const request = require("supertest");
const app = require("../src/app");

let token, id;

describe("User Api", () => {
  it("First user is the Admin", async () => {
    const res = await request(app).post("/api/v1/login-user").send({
      fullname: "myAdmin",
      email: "myAdmin@gmail.com",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body.payload.user.role).toEqual("admin");
    token = res.body.accessToken;
  });

  it("Admin is able to create item / restock items", async () => {
    const res = await request(app)
      .post("/api/v1/create-item")
      .set("Authorization", `Bearer ${token}`)
      .send({
        itemName: "my iron",
        catergory: "electronic",
        imageUrl: "https://myPressingIron.png",
        quantity: 10,
        price: 5700,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Item added successfully");
    id = res.body.data._id;
  });

  it("Admin is able to edit an item", async () => {
    const res = await request(app)
      .put(`/api/v1/item/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        itemName: "my iron 2",
        catergory: "electronic",
        imageUrl: "https://myPressingIron.jpeg",
        quantity: 11,
        price: 5100,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toEqual(true);
  });

  it("Admin is unable to edit an item that does exist", async () => {
    const res = await request(app)
      .put("/api/v1/item/61a07d8e2f953427c69ab194")
      .set("Authorization", `Bearer ${token}`)
      .send({
        itemName: "my iron 2",
        catergory: "electronic",
        imageUrl: "https://myPressingIron.jpeg",
        quantity: 11,
        price: 5100,
      });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual(
      "No item with the id of 61a07d8e2f953427c69ab194"
    );
  });

  it("Admin is able to create a worker", async () => {
    const res = await request(app)
      .post("/api/v1/create-worker")
      .set("Authorization", `Bearer ${token}`)
      .send({
        fullname: "Worker1",
        email: "worker1@gmail.com",
        role: "worker",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Worker created successfully");
  });

  it("Admin is unable to create a same worker", async () => {
    const res = await request(app)
      .post("/api/v1/create-worker")
      .set("Authorization", `Bearer ${token}`)
      .send({
        fullname: "Worker1",
        email: "worker1@gmail.com",
        role: "worker",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("User already exits");
  });

  it("Log items been stoked", async () => {
    const res = await request(app).get("/api/v1/restocking");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("stock");
    expect(res.body.stock.length).toBeGreaterThan(0);
  });
});
