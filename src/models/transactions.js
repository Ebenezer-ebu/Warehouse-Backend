const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    catergory: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      defaultValue: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Transaction = mongoose.model("transaction", itemsSchema);

module.exports = { Transaction };
