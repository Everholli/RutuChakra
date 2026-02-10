const mongoose = require("mongoose");

const UserHealthSchema = new mongoose.Schema(
  {
    age: {
      type: Number,
      required: true
    },

    height: {
      type: Number, // in cm
      required: true
    },

    weight: {
      type: Number, // in kg
      required: true
    },

    bmi: {
      type: Number
    },

    cycleIrregularity: {
      type: Boolean,
      required: true
    },

    periodLength: {
      type: Number,
      required: true
    },

    acne: {
      type: Boolean,
      default: false
    },

    hairLoss: {
      type: Boolean,
      default: false
    },

    hairGrowth: {
      type: Boolean,
      default: false
    },

    stressLevel: {
      type: Number,
      min: 1,
      max: 10
    },

    sleepHours: {
      type: Number
    },

    physicalActivity: {
      type: Number
    },

    pcodRiskScore: {
      type: Number
    },

    riskCategory: {
      type: String,
      enum: ["Low", "Medium", "High"]
    }
  },
  { timestamps: true }
);

/* 🔹 Auto-calculate BMI before saving */
UserHealthSchema.pre("save", function (next) {
  if (this.height && this.weight) {
    const heightInMeters = this.height / 100;
    this.bmi = this.weight / (heightInMeters * heightInMeters);
  }
  next();
});

module.exports = mongoose.model("UserHealth", UserHealthSchema);
