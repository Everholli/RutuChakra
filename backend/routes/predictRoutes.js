const express = require("express");
const router = express.Router();

const { predictPCOD } = require("../controllers/predictController");

router.post("/predict", predictPCOD);

module.exports = router;
