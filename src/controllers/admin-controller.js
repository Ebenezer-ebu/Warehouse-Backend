const { Item } = require("../models/items");
const { Transaction } = require("../models/transactions");
const { User } = require("../models/users");

const createItem = async (req, res) => {
  let { itemName, catergory, imageUrl, quantity, price } = req.body;
  quantity = +quantity;
  price = +price;

  const toLowCase = itemName.toLowerCase();
  try {
    const isItemInDb = await Item.findOne({ itemName: toLowCase });
    if (isItemInDb) {
      isItemInDb.quantity++;
      await Item.updateOne(
        { itemName: isItemInDb.itemName },
        { $inc: { quantity: 1 } }
      );
      return res
        .status(201)
        .json({ message: "Item added successfully", data: isItemInDb });
    }
    const newItem = new Item({
      itemName: toLowCase,
      catergory,
      imageUrl,
      quantity,
      price,
    });

    newItem.save();
    return res.status(201).json({ message: "Item added successfully" ,data: newItem });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editItem = async (req, res) => {
  const { id } = req.params;
  let update = req.body;
  let keys = Object.keys(update);
  let valuesToUpdate = {};
  let count = 0;
  keys.forEach((key) => {
    if (typeof Number(update[key]) === 'number') {
      Number(update[key])
    }
      if (update[key] !== "") {
        count++;
        valuesToUpdate[key] = update[key];
      }
  })
  try {
    const item = await Item.findByIdAndUpdate({ _id: id }, valuesToUpdate, {
      new: true,
      runValidators: true,
      context: "query",
    });
    if (!item) {
      return res.status(404).json({ message: `No item with the id of ${id}` });
    }
    return res.status(200).json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createWorker = async (req, res) => {
  const { fullname, email, role } = req.body;
  try {
    const workerExit = await User.findOne({ email });
    if (workerExit) {
      return res.status(400).json({ message: "User already exits" });
    }

    const newWorker = new User({
      fullname,
      email,
      role,
    });

    newWorker.save();
    return res.status(201).json({ message: "Worker created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const orderItem = async (req, res) => {
  const { id } = req.params;
  const { number, price } = req.body;
  try {
    const itemInDb = await Item.findById({ _id: id });
    const checkQuantity = itemInDb.quantity - number;
    const profit = number * price - number * itemInDb.price;
    if (itemInDb && checkQuantity > 0) {
      await Item.updateOne(
        { _id: itemInDb.id },
        { $inc: { quantity: -number } }
      );

      const newSales = new Transaction({
        itemName: itemInDb.itemName,
        price,
        profit,
        quantity: number,
        imageUrl: itemInDb.imageUrl,
        catergory: itemInDb.catergory,
      });
      newSales.save();

      res.status(201).json({ message: "Transaction Created", newSales });

      return;
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  createItem,
  editItem,
  createWorker,
  orderItem,
};
