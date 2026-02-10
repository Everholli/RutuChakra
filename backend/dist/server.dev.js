"use strict";

var express = require("express");

var cors = require("cors");

var dotenv = require("dotenv");

var connectDB = require("./config/db");

dotenv.config();
connectDB();
var app = express();
app.use(cors());
app.use(express.json()); // health check route

app.get('/api/test', function (req, res) {
  return res.json({
    ok: true
  });
});
app.use("/api", require("./routes/predictRoutes"));
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});