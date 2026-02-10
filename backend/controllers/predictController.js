const { predictRisk } = require("../services/mlService");
const UserPrediction = require("../models/UserPrediction");

exports.predictPCOD = async (req, res) => {
  try {
    // Try ML
    const prediction = await predictRisk(req.body);

    // Save to MongoDB
    const userPrediction = new UserPrediction({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      bmi: req.body.bmi,
      bloodPressure: req.body.bloodPressure,
      symptoms: req.body.symptoms,
      riskLevel: prediction.risk,
      riskScore: prediction.risk_score,
    });

    await userPrediction.save();

    res.status(200).json({
      success: true,
      source: "ml",
      prediction,
      savedId: userPrediction._id,
    });
  } catch (err) {
    // FALLBACK MOCK (for hackathon safety)
    const bmi = req.body.bmi || 25;
    let risk = "Low";

    if (bmi > 30) risk = "High";
    else if (bmi > 25) risk = "Medium";

    res.status(200).json({
      success: true,
      source: "mock",
      prediction: {
        risk,
        risk_score: Math.random().toFixed(2),
      },
    });
  }
};

exports.getUserHistory = async (req, res) => {
  try {
    const { email } = req.params;
    const predictions = await UserPrediction.find({ email }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: predictions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};