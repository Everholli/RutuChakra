import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("data/pcod_dataset.csv")

# ----------------------------
# CLEAN DATA
# ----------------------------

# Remove duplicates
df = df.drop_duplicates()

# Drop useless noisy columns
df = df.drop(columns=["Height", "Income"], errors="ignore")

# Remove unrealistic BMI values
df = df[(df["BMI"] > 12) & (df["BMI"] < 50)]


# Normalize Yes/No column
df["Unusual_Bleeding"] = df["Unusual_Bleeding"].str.lower().map({
    "yes": 1,
    "no": 0
})

# Convert BMI to numeric
df["BMI"] = pd.to_numeric(df["BMI"], errors="coerce")

# Handle missing values
df = df.fillna(df.median(numeric_only=True))

# ----------------------------
# CREATE IRREGULAR PERIOD FLAG
# Normal cycle: 21–35 days
# ----------------------------

df["Irregular_Periods"] = df["Length_of_cycle"].apply(
    lambda x: 1 if x < 21 or x > 35 else 0
)

# ----------------------------
# CREATE PCOD RISK (MEDICAL LOGIC)
# ----------------------------

def pcod_risk(row):
    if (
        row["BMI"] > 25 and
        row["Irregular_Periods"] == 1 and
        row["Menses_score"] >= 4
    ):
        return 1
    else:
        return 0

df["PCOD_Risk"] = df.apply(pcod_risk, axis=1)

# ----------------------------
# FINAL FEATURES
# ----------------------------

features = [
    "Age",
    "BMI",
    "Irregular_Periods",
    "Unusual_Bleeding",
    "number_of_peak",
    "Menses_score"
]

X = df[features]
y = df["PCOD_Risk"]

# ----------------------------
# TRAIN MODEL
# ----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("Model Accuracy:", round(accuracy, 2))

# ----------------------------
# SAVE MODEL
# ----------------------------

joblib.dump(model, "pcod_model.pkl")

print("pcod_model.pkl saved successfully")
