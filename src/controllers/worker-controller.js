const { Item } = require("../models/items");
const { Transaction } = require("../models/transactions");
const getStock = async (req, res) => {
  const { date } = req.body;
  let stock;
  if (date) {
    stock = await Item.find({
      created_at: {
        $gte: ISODate(`${date}`),
      },
    });
  } else {
    stock = await Item.find({});
  }

  if (stock.length === 0) {
    return res.status(404).json({ message: "No items in stock" });
  }
  return res.status(200).json({ stock });
};

const getTransaction = async (req, res) => {
  const { date } = req.body;
  let transaction;
  if (date) {
    transaction = await Transaction.find({
      created_at: {
        $gte: ISODate(`${date}`),
      },
    });
  } else {
    transaction = await Transaction.find({});
  }

  if (transaction.length === 0) {
    return res.status(404).json({ message: "No transactions to show" });
  }
  return res.status(200).json({ transaction });
};

module.exports = { getStock, getTransaction };
