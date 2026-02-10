import joblib
import pandas as pd

model = joblib.load("pcod_model.pkl")

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
