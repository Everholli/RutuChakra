const express = require("express");
const router = express.Router();

const { predictPCOD,  getUserHistory } = require("../controllers/predictController");

router.post("/predict", predictPCOD);
router.get("/history/:email", getUserHistory);

module.exports = router;
