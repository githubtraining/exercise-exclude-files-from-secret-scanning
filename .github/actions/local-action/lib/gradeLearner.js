const fs = require("fs");
const yaml = require("js-yaml");
const arrayCompare = require("./arrayCompare");

module.exports = async () => {
  const answerArray = ["dist/*.js", "**/docs/**"];
  const secretScanningFile = fs.readFileSync(
    `${process.env.GITHUB_WORKSPACE}/.github/secret_scanning.yml`,
    "utf8"
  );
  const parsedSecretScanning = yaml.load(secretScanningFile);

  try {
    //   Do some logic to verify the leaner understands

    if (arrayCompare(answerArray, parsedSecretScanning["paths-ignore"])) {
      return {
        reports: [
          {
            filename: "",
            isCorrect: true,
            display_type: "actions",
            level: "info",
            msg: "Great job!",
            error: {
              expected: "",
              got: "",
            },
          },
        ],
      };
      // BAD-RESULT
    } else {
      return {
        reports: [
          {
            filename: "",
            isCorrect: false,
            display_type: "actions",
            level: "warning",
            msg: `incorrect solution`,
            error: {
              expected: `secret-scanning.yml to match the following patterns: ${answerArray}`,
              got: `${parsedSecretScanning["paths-ignore"]}`,
            },
          },
        ],
      };
    }
  } catch (error) {
    return {
      reports: [
        {
          filename: filename,
          isCorrect: false,
          display_type: "actions",
          level: "fatal",
          msg: "",
          error: {
            expected: "",
            got: "An internal error occurred.  Please open an issue at: https://github.com/githubtraining/exercise-exclude-files-from-secret-scanning and let us know!  Thank you",
          },
        },
      ],
    };
  }
};
