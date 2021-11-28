const express = require("express");
const router = express.Router();
const { getStock, getTransaction } = require('../controllers/worker-controller');

router.get("/restocking", getStock);
router.get("/transactions", getTransaction);

module.exports = router;
