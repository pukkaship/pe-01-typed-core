#!/usr/bin/env node
// npm run validate    (also runs in CI on every pull request)
//
// THE ENFORCED GATE. Unlike begin/unlock (local scaffolds), this is what actually decides
// whether your PR can merge. It checks that every required artifact exists and is real.
// CI runs typecheck + tests separately; this script checks the written evidence.
//
// Incremental flow: the gate bot delivers bug N+1 after bug N merges. CI validates only the
// milestone reached so far (highest bug-0N.test.ts present), not all five bugs on every PR.
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

function highestUnlockedBug() {
  let n = 0;
  for (let i = 1; i <= 5; i++) {
    if (fs.existsSync(`src/__tests__/bug-0${i}.test.ts`)) n = i;
  }
  return n;
}

const currentBug = highestUnlockedBug();
if (currentBug === 0) {
  failures.push("No bug tests found in src/__tests__/ \u2014 start with Bug 1");
} else {
  console.log(`\u2139 Validating milestone Bug ${currentBug} of 5 (incremental gate-bot flow)`);
}

// 1. Pre-code hypothesis (every PR).
requireFile("hypothesis.md", 100, "Pre-code hypothesis");

// 2. Bug journals through the current milestone only.
for (let i = 1; i <= currentBug; i++) {
  requireFile(`bug-journal/bug-0${i}.md`, 80, `Bug ${i} journal`);
}

// 3. Capstone artifacts only after Bug 5 is in scope.
if (currentBug >= 5) {
  requireFile("REFLECTION.md", 30, "REFLECTION.md");
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
}

// 4. Bug 1 actually addressed: interfaces defined (once Bug 1 is in scope).
if (currentBug >= 1 && fs.existsSync("src/types.ts") && !/interface\s+\w+/.test(fs.readFileSync("src/types.ts", "utf8"))) {
  failures.push("src/types.ts has no interface definitions \u2014 Bug 1 asks you to define Meal and ScorerResult");
}

// 5. Tests through the current milestone (gate bot delivers the next test after each merge).
for (let i = 1; i <= currentBug; i++) {
  if (!fs.existsSync(`src/__tests__/bug-0${i}.test.ts`)) {
    failures.push(`src/__tests__/bug-0${i}.test.ts is missing`);
  }
}

// 6. Discovery check: Bug 3's test must do more than assert a successful array load.
const bug03Path = "src/__tests__/bug-03.test.ts";
if (currentBug >= 3 && fs.existsSync(bug03Path)) {
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

// 7. Discovery check: Bug 5's test must do more than assert a valid input scores successfully.
const bug05Path = "src/__tests__/bug-05.test.ts";
if (currentBug >= 5 && fs.existsSync(bug05Path)) {
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

// 8. PR body sections (only when a PR body is available).
const prBody = process.env.PR_BODY || (fs.existsSync("PR_BODY.md") ? fs.readFileSync("PR_BODY.md", "utf8") : "");
if (prBody) {
  if (!/why each fix was necessary/i.test(prBody)) {
    failures.push('PR description must include a section titled "Why each fix was necessary"');
  }
  if (currentBug >= 5 && !/discovery/i.test(prBody)) {
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

console.log(`\n\u2713 Milestone Bug ${currentBug} validation passed.\n`);
