const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/authUser");
const {
  createItem,
  editItem,
  createWorker,
  orderItem,
} = require("../controllers/admin-controller");

router.get("/", function (req, res, next) {
  res.send("We are live");
});

router.post("/create-item", authUser, createItem);
router.put("/item/:id", authUser, editItem);
router.post("/create-worker", authUser, createWorker);
router.put("/order-item/:id", authUser, orderItem);

module.exports = router;
