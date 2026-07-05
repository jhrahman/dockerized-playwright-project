const fs = require("fs");

// ----------------------------------------
// Read Playwright JSON report
// ----------------------------------------

const report = JSON.parse(
  fs.readFileSync("./test-results/results.json", "utf8")
);

// ----------------------------------------
// Count results recursively
// ----------------------------------------

let passed = 0;
let failed = 0;
let skipped = 0;

function traverseSuites(suites) {
  for (const suite of suites) {

    if (suite.specs) {

      for (const spec of suite.specs) {

        for (const test of spec.tests) {

          const result = test.results[test.results.length - 1];

          if (!result) continue;

          switch (result.status) {

            case "passed":
              passed++;
              break;

            case "failed":
              failed++;
              break;

            case "skipped":
              skipped++;
              break;
          }
        }
      }
    }

    if (suite.suites) {
      traverseSuites(suite.suites);
    }
  }
}

traverseSuites(report.suites);

const total = passed + failed + skipped;

// ----------------------------------------
// GitHub Context
// ----------------------------------------

const repo = process.env.GITHUB_REPOSITORY;
const branch = process.env.GITHUB_REF_NAME;
const actor = process.env.GITHUB_ACTOR;
const event = process.env.GITHUB_EVENT_NAME;

const reportUrl = process.env.REPORT_URL;
const runUrl =
  `https://github.com/${repo}/actions/runs/${process.env.GITHUB_RUN_ID}`;

const webhook = process.env.DISCORD_WEBHOOK;

// ----------------------------------------
// Discord Embed
// ----------------------------------------

const embed = {
  title: "🧪 Automated Playwright Test Run",

  description:
    failed === 0
      ? "✅ All automated tests passed."
      : "❌ Some automated tests failed.",

  color: failed === 0 ? 5763719 : 15548997,

  fields: [

    {
      name: "Repository",
      value: repo,
      inline: true
    },

    {
      name: "Branch",
      value: branch,
      inline: true
    },

    {
      name: "Triggered By",
      value: actor,
      inline: true
    },

    {
      name: "Event",
      value: event,
      inline: true
    },

    {
      name: "Passed",
      value: `${passed}/${total}`,
      inline: true
    },

    {
      name: "Failed",
      value: `${failed}/${total}`,
      inline: true
    },

    {
      name: "Skipped",
      value: `${skipped}`,
      inline: true
    },

    {
      name: "📊 Allure Report",
      value: reportUrl
    },

    {
      name: "⚙ GitHub Workflow",
      value: runUrl
    }

  ],

  timestamp: new Date().toISOString(),

  footer: {
    text: "Playwright • Docker • GitHub Actions"
  }
};

// ----------------------------------------
// Send Notification
// ----------------------------------------

(async () => {
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    console.log("Discord notification sent.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();