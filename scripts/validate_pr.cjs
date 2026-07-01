#!/usr/bin/env node
// npm run validate    (also runs in CI on every pull request)
//
// THE ENFORCED GATE. Unlike begin/unlock (local scaffolds), this is what actually decides
// whether your PR can merge. It checks that every required artifact exists and is real.
// CI runs typecheck + tests separately; this script checks the written evidence.
//
// PR body: in CI the PR description is passed in via the PR_BODY env var. Locally, you can
// preview the check by saving your PR text to PR_BODY.md before running.

const fs = require("node:fs");

const failures = [];

function wordCount(file) {
  return fs.readFileSync(file, "utf8").trim().split(/\s+/).filter(Boolean).length;
}
function requireFile(file, minWords, label) {
  if (!fs.existsSync(file)) {
    failures.push(`${label} (${file}) is missing`);
    return;
  }
  if (minWords > 0 && wordCount(file) < minWords) {
    failures.push(`${label} (${file}) is too short \u2014 needs at least ${minWords} words`);
  }
}

// 1. Pre-code hypothesis.
requireFile("hypothesis.md", 100, "Pre-code hypothesis");

// 2. All five bug journals.
for (let i = 1; i <= 5; i++) {
  requireFile(`bug-journal/bug-0${i}.md`, 80, `Bug ${i} journal`);
}

// 3. Reflection (moved out of source into its own file \u2014 regex on source comments is fragile).
requireFile("REFLECTION.md", 30, "REFLECTION.md");

// 4. Skill statement.
requireFile("SKILL-STATEMENT.md", 0, "SKILL-STATEMENT.md");
if (fs.existsSync("SKILL-STATEMENT.md") && fs.readFileSync("SKILL-STATEMENT.md", "utf8").trim().length < 20) {
  failures.push("SKILL-STATEMENT.md is essentially empty \u2014 fill it in");
}

const aiLogPath = "ai-session-log.md";
if (!fs.existsSync(aiLogPath)) {
  failures.push("ai-session-log.md is missing");
} else {
  const aiWords = fs.readFileSync(aiLogPath, "utf8").split(/\s+/).filter(Boolean).length;
  if (aiWords < 20) failures.push(`ai-session-log.md has ${aiWords} words \u2014 needs \u2265 20`);
}

// 5. Bug 1 actually addressed: interfaces defined.
if (fs.existsSync("src/types.ts") && !/interface\s+\w+/.test(fs.readFileSync("src/types.ts", "utf8"))) {
  failures.push("src/types.ts has no interface definitions \u2014 Bug 1 asks you to define Meal and ScorerResult");
}

// 6. All five tests unlocked (present in the live test folder).
for (let i = 1; i <= 5; i++) {
  if (!fs.existsSync(`src/__tests__/bug-0${i}.test.ts`)) {
    failures.push(`src/__tests__/bug-0${i}.test.ts is missing \u2014 you have not unlocked all five bugs`);
  }
}

// 7. Discovery check: Bug 3's test must do more than assert a successful array load.
//    It must assert the promise rejects (rejects.toThrow) or throws on a missing file.
const bug03Path = "src/__tests__/bug-03.test.ts";
if (fs.existsSync(bug03Path)) {
  const bug03 = fs.readFileSync(bug03Path, "utf8");
  const assertsReject = /rejects\.toThrow|rejects\.toMatch|toThrow|\.rejects/i.test(bug03);
  if (!assertsReject) {
    failures.push(
      "bug-03.test.ts still only checks that loadMeals returns an array \u2014 rewrite it to assert " +
      "the promise rejects when the file is missing. That is the discovery: a successful return " +
      "is not proof the file was found."
    );
  }
}

// 8. Discovery check: Bug 5's test must do more than assert a valid input scores successfully.
//    It must assert scoreMeal throws on invalid input (missing field or non-numeric score).
const bug05Path = "src/__tests__/bug-05.test.ts";
if (fs.existsSync(bug05Path)) {
  const bug05 = fs.readFileSync(bug05Path, "utf8");
  const assertsThrow = /\.toThrow|toThrow\(\)|toThrowError|rejects\.toThrow/i.test(bug05);
  if (!assertsThrow) {
    failures.push(
      "bug-05.test.ts still only checks that a valid meal scores correctly \u2014 rewrite it to assert " +
      "scoreMeal throws when a field is missing or not a number. That is the discovery: " +
      "a confident answer is not proof the input was valid."
    );
  }
}

// 9. PR body sections (only when a PR body is available).
const prBody = process.env.PR_BODY || (fs.existsSync("PR_BODY.md") ? fs.readFileSync("PR_BODY.md", "utf8") : "");
if (prBody) {
  if (!/why each fix was necessary/i.test(prBody)) {
    failures.push('PR description must include a section titled "Why each fix was necessary"');
  }
  if (!/discovery/i.test(prBody)) {
    failures.push('PR description must include a "Discovery" section (how you found the bugs nothing pointed you to \u2014 Bugs 3 and 5)');
  }
} else {
  console.log("\u2139 No PR body found (PR_BODY env or PR_BODY.md). Skipping PR-section check locally.");
}

if (failures.length > 0) {
  console.error("\n\u274c PR validation failed:\n");
  for (const f of failures) console.error("  \u2022 " + f);
  console.error("\nFix the above and push again.\n");
  process.exit(1);
}

console.log("\n\u2713 All required artifacts present. PR validation passed.\n");
