const express = require("express");
const router = express.Router();
const payStackController = require("../controller/paystack");

router.post("/paystack/verify", payStackController.verifyPayment);

module.exports = router;
