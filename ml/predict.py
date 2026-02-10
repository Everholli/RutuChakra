import warnings

# Ignore version mismatch warnings from scikit-learn
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

import os
import joblib
import pandas as pd
import sys
import json

model_path = os.path.join(os.path.dirname(__file__), "pcod_model.pkl")
model = joblib.load(model_path)

def predict_pcod(data):
    df = pd.DataFrame([data])

    result = model.predict(df)[0]

    if result == 1:
        return "HIGH PCOD RISK – Lifestyle changes + doctor consultation recommended"
    else:
        return "LOW PCOD RISK – Maintain healthy routine"


if __name__ == "__main__":
    sample_input = {
        "Age": 22,
        "BMI": 28,
        "Irregular_Periods": 1,
        "Unusual_Bleeding": 1,
        "number_of_peak": 4,
        "Menses_score": 5
    }

    print(predict_pcod(sample_input))
