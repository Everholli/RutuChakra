const { spawn } = require("child_process");
const path = require("path");

const predictRisk = (inputData) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../../ml/predict.py");

    const python = spawn("python", [
      scriptPath,
      JSON.stringify(inputData),
    ]);

    let output = "";
    let error = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      error += data.toString();
    });

    python.on("close", () => {
      if (error) {
        console.error("ML Error:", error);
        return reject("ML execution failed");
      }

      resolve(output.trim());

    });
  });
};

module.exports = { predictRisk };
