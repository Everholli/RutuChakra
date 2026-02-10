"use strict";

var mongoose = require("mongoose");

var userPredictionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  bmi: {
    type: Number
  },
  bloodPressure: {
    type: String
  },
  symptoms: {
    type: [String],
    "default": []
  },
  riskLevel: {
    type: String
  },
  riskScore: {
    type: Number
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model("UserPrediction", userPredictionSchema);