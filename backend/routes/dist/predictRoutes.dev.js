"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/predictController"),
    predictPCOD = _require.predictPCOD,
    getUserHistory = _require.getUserHistory;

router.post("/predict", predictPCOD);
router.get("/history/:email", getUserHistory);
module.exports = router;