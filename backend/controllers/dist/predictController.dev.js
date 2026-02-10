"use strict";

var _require = require("../services/mlService"),
    predictRisk = _require.predictRisk;

var UserPrediction = require("../models/UserPrediction");

exports.predictPCOD = function _callee(req, res) {
  var prediction, userPrediction, bmi, risk;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(predictRisk(req.body));

        case 3:
          prediction = _context.sent;
          // Save to MongoDB
          userPrediction = new UserPrediction({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            bmi: req.body.bmi,
            bloodPressure: req.body.bloodPressure,
            symptoms: req.body.symptoms,
            riskLevel: prediction.risk,
            riskScore: prediction.risk_score
          });
          _context.next = 7;
          return regeneratorRuntime.awrap(userPrediction.save());

        case 7:
          res.status(200).json({
            success: true,
            source: "ml",
            prediction: prediction,
            savedId: userPrediction._id
          });
          _context.next = 16;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          // FALLBACK MOCK (for hackathon safety)
          bmi = req.body.bmi || 25;
          risk = "Low";
          if (bmi > 30) risk = "High";else if (bmi > 25) risk = "Medium";
          res.status(200).json({
            success: true,
            source: "mock",
            prediction: {
              risk: risk,
              risk_score: Math.random().toFixed(2)
            }
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.getUserHistory = function _callee2(req, res) {
  var email, predictions;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          email = req.params.email;
          _context2.next = 4;
          return regeneratorRuntime.awrap(UserPrediction.find({
            email: email
          }).sort({
            createdAt: -1
          }));

        case 4:
          predictions = _context2.sent;
          res.status(200).json({
            success: true,
            data: predictions
          });
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            error: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};