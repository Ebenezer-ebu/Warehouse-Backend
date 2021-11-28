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
  },
  { timestamps: true }
);
const Item = mongoose.model("item", itemsSchema);

module.exports = { Item };
