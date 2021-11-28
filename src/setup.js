const mongoose = require("mongoose");

require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(
    process.env.NODE_ENV === "test" ? process.env.TEST_DB : process.env.DB_URL
  );
});


afterAll(async () => {
    const collections = await mongoose.connection.db.collections();
    collections.map(async (collection) => {
        await collection.deleteMany({});
    })
})