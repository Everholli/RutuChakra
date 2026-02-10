import os
import sys
import json
import joblib
import pandas as pd


# Resolve paths relative to this file
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "pcod_model.pkl")

# Load trained model
model = joblib.load(MODEL_PATH)

# Features expected by the model (must match train_model.py)
FEATURES = [
    "Age",
    "BMI",
    "Irregular_Periods",
    "Unusual_Bleeding",
    "number_of_peak",
    "Menses_score",
]


def _normalize_input(raw: dict) -> dict:
    """
    Normalize incoming JSON from Node backend / CLI into
    the feature set expected by the trained model.
    """
    normalized = {}

    # Map keys case‑insensitively onto our feature names
    feature_key_map = {f.lower(): f for f in FEATURES}

    for key, value in raw.items():
        lower_key = str(key).lower()
        if lower_key in feature_key_map:
            normalized[feature_key_map[lower_key]] = value

    # Derive Irregular_Periods from cycle length if not directly provided
    if "Irregular_Periods" not in normalized:
        cycle_len = raw.get("Length_of_cycle") or raw.get("length_of_cycle")
        if cycle_len is not None:
            try:
                cycle_len = float(cycle_len)
                normalized["Irregular_Periods"] = (
                    1 if cycle_len < 21 or cycle_len > 35 else 0
                )
            except (TypeError, ValueError):
                # If parsing fails, fall back to 0 (regular)
                normalized["Irregular_Periods"] = 0

    return normalized


def predict_pcod(data: dict) -> dict:
    """
    Core prediction function.
    Returns a JSON‑serializable dict that matches what the Node backend expects.
    """
    features = _normalize_input(data)

    # Ensure all required features exist; missing ones default to 0
    row = {f: features.get(f, 0) for f in FEATURES}

    df = pd.DataFrame([row], columns=FEATURES)

    # Use probability of PCOD risk (class "1") if available
    if hasattr(model, "predict_proba"):
        proba_arr = model.predict_proba(df)[0]
        classes = getattr(model, "classes_", None)
        if classes is not None and 1 in classes:
            idx = list(classes).index(1)
            proba = float(proba_arr[idx])
        else:
            # If the model has a single class or no explicit "1" class,
            # fall back to deterministic prediction
            pred = int(model.predict(df)[0])
            proba = 1.0 if pred == 1 else 0.0
    else:
        # Fallback: 1.0 for positive prediction, 0.0 otherwise
        pred = int(model.predict(df)[0])
        proba = 1.0 if pred == 1 else 0.0

    # Map probability to categorical risk level
    if proba >= 0.66:
        risk_level = "High"
    elif proba >= 0.33:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return {
        "risk": risk_level,
        "risk_score": round(proba, 2),
    }


def main():
    """
    CLI entrypoint.
    - If called with a JSON string argument, parses it and prints JSON result.
    - If called without args, runs a demo prediction.
    """
    if len(sys.argv) < 2:
        sample_input = {
            "Age": 22,
            "BMI": 28,
            "Irregular_Periods": 1,
            "Unusual_Bleeding": 1,
            "number_of_peak": 4,
            "Menses_score": 5,
        }
        result = predict_pcod(sample_input)
        print(json.dumps(result))
        return

    raw_arg = sys.argv[1]

    try:
        payload = json.loads(raw_arg)
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
        return

    result = predict_pcod(payload)
    print(json.dumps(result))


if __name__ == "__main__":
    main()