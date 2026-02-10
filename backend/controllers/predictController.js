const { predictRisk } = require("../services/mlService");

exports.predictPCOD = async (req, res) => {
  try {
    // Try ML
    const prediction = await predictRisk(req.body);

    res.status(200).json({
      success: true,
      source: "ml",
      prediction,
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
