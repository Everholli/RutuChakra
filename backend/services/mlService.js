const { spawn } = require("child_process");
const path = require("path");

/**
 * Try to spawn Python with different executable names.
 * Returns a Promise that resolves with parsed JSON or rejects with error.
 */
const spawnPythonWithFallback = (scriptPath, inputData, pythonCmds = ["python", "python3", "py"]) => {
  return new Promise((resolve, reject) => {
    let lastError = null;

    const tryNext = (index) => {
      if (index >= pythonCmds.length) {
        // All executables failed
        const errorMsg = `Python execution failed on all attempts (tried: ${pythonCmds.join(", ")}). Last error: ${lastError}`;
        console.error("ML Error:", errorMsg);
        return reject(new Error(errorMsg));
      }

      const pythonCmd = pythonCmds[index];
      const python = spawn(pythonCmd, [scriptPath, JSON.stringify(inputData)]);

      let output = "";
      let stderr = "";

      python.stdout.on("data", (data) => {
        output += data.toString();
      });

      python.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      python.on("error", (err) => {
        // Executable not found or other spawn error
        lastError = err.message;
        console.warn(`Python '${pythonCmd}' not available or error: ${err.message}`);
        tryNext(index + 1);
      });

      python.on("close", (code) => {
        if (code !== 0) {
          lastError = `Exit code ${code}: ${stderr}`;
          console.warn(`Python '${pythonCmd}' exited with code ${code}: ${stderr}`);
          tryNext(index + 1);
          return;
        }

        if (stderr && stderr.trim()) {
          console.warn(`Python '${pythonCmd}' stderr: ${stderr}`);
        }

        // Parse JSON output
        try {
          const outputTrimmed = output.trim();
          if (!outputTrimmed) {
            throw new Error("Python script returned empty output");
          }
          const parsed = JSON.parse(outputTrimmed);
          console.log(`[mlService] Prediction successful (${pythonCmd}):`, parsed);
          resolve(parsed);
        } catch (parseErr) {
          lastError = `JSON parse error: ${parseErr.message}. Raw output: "${output}"`;
          console.warn(`ML JSON parse error (${pythonCmd}): ${lastError}`);
          tryNext(index + 1);
        }
      });
    };

    tryNext(0);
  });
};

const predictRisk = (inputData) => {
  const scriptPath = path.join(__dirname, "../../ml/predict.py");
  // Use PYTHON_CMD env var if set, otherwise use default attempts
  const pythonCmds = process.env.PYTHON_CMD
    ? [process.env.PYTHON_CMD]
    : ["python", "python3", "py"];

  return spawnPythonWithFallback(scriptPath, inputData, pythonCmds);
};

module.exports = { predictRisk };
