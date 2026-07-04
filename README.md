# pe-01-typed-core — A typed meal scorer

> In production, a service once processed every request with a swallowed async error.
> Every call returned success. Nobody noticed for four hours.
> This repo has that exact pattern — and four others like it. You fix them one at a time.

This is **Module 1**. It is calibration: pure local TypeScript, no network, no AI, no database.
The point is not the meal scorer — it is the habit of making a system **fail loud**.

You're the first engineering hire at Nudge, a two-person startup building an AI coach that talks
to people about their eating habits. This week's code is what the founder handed you on day one —
see [`docs/day1-nudge-intro.md`](docs/day1-nudge-intro.md) for the story this program follows.

---

## What it does (once fixed)

Reads `fixtures/meals.json`, scores each meal through a deterministic algorithm, and prints one
signal per meal:

```
veggie omelette → balanced
lentil soup     → balanced
pasta bake      → off-balance
plain crackers  → needs-balance
grilled chicken → balanced
```

## What is broken

- The scorer accepts any input shape — it will not tell you when the data is wrong (Bug 1).
- A malformed meals file fails with a raw, contextless error (Bug 2).
- A missing file is swallowed — the program "succeeds" with no data (Bug 3).
- The "balanced" rule uses the wrong logic, so some meals are mislabelled (Bug 4).
- Invalid input gets a confident, plausible answer instead of an error, and the process exits 0
  even when it failed (Bug 5).

---

## Before touching code — Day 1 (~55 min + video)

▶ **[Orientation video — 5 min](https://customer-r5z7zoebyw1di9aq.cloudflarestream.com/429f3e5831265167bcad9bc544db3395/watch)** — watch first.

1. [`docs/day1-nudge-intro.md`](docs/day1-nudge-intro.md) — 5 min — the story this program follows
2. [`docs/day1-architecture-story.md`](docs/day1-architecture-story.md) — 15 min
3. [`docs/day1-glossary.md`](docs/day1-glossary.md) — 20 min
4. [`docs/day1-micro-loop.md`](docs/day1-micro-loop.md) — 10 min
5. [`docs/day1-ai-workflow.md`](docs/day1-ai-workflow.md) — 10 min — how we use AI on this project
6. [`docs/day1-design-review.md`](docs/day1-design-review.md) — 5 min — the first section of the
   design review you'll keep building on all program: testability

Then fill in [`hypothesis.md`](hypothesis.md) (including the new **Design note** section) and run
`npm run begin`.

**Optional, ungraded warm-up:** [`docs/day1-game-round-0.md`](docs/day1-game-round-0.md) — a
15–20 min design-judgment exercise, unrelated to Nudge's own code. The first of a recurring,
scored game that starts for real once the program has given you a framework to score it against.

---

## Getting started

Register at [pukkaship.dev](https://pukkaship.dev) — your private repo is created
automatically after sign-up. The welcome page walks you through **Open in Cursor** setup.

Then read [`docs/cursor-setup.md`](docs/cursor-setup.md) (2 min) and continue with the Day-1
orientation below.

```bash
node -v          # need 20+ (22 recommended — see .nvmrc)
npm install      # first time only; re-run after pulling dependency changes
npm run begin    # fails until hypothesis.md is complete
npm test         # one test fails (Bug 1) — start there
```

## How to proceed — one bug at a time

You do not fix everything at once. Each fix is checked before the next bug's test is revealed.

1. Watch the video + read the Day-1 docs → fill in `hypothesis.md` → `npm run begin`
2. Fix Bug 1 → fill in `bug-journal/bug-01.md` → push, open a PR, **merge when CI is green**
3. Pull `main` — the gate bot delivers Bug 2's test → fix it → open a PR → **merge again**
4. Repeat through Bug 5. **Bugs 3 and 5 are discovery bugs** — see below.
5. Fill in `REFLECTION.md`, `SKILL-STATEMENT.md`, and `ai-session-log.md`
6. `npm run validate` → open your final pull request → **merge when CI is green**

See [`docs/pull-request-flow.md`](docs/pull-request-flow.md) for the full PR + merge loop.

> **The discovery bugs (Bugs 3 and 5).** Their tests *pass* when you receive them. That is the point. A test that passes is not necessarily telling the truth — it may only be checking the happy path. Your job is to investigate, reproduce the silent failure, and rewrite the test so it proves the real behaviour. Record how you found each one in its bug journal (the discovery questions are different from the others).

> **What is actually enforced:** `begin` and `unlock` are local scaffolds that keep you honest —
> they are *not* enforced. The real gate is **CI on your pull request** (`npm run validate` +
> typecheck + tests). **You click Merge when CI is green** — the gate bot only runs after merge.
> The AI PR review is advisory and never blocks merge.

---

## The Cursor rule

You may use Cursor. You may ask it what an error means. You may **not** ask it to fix code you
have not read. At your weekly sync you will explain each fix without looking at your PR.

## PR requirements (Module 1)

Your PR description must include:

- **"Why each fix was necessary"** — one short paragraph per bug, naming the *failure mode*, not just the line you changed.
- **"Discovery"** — how you found Bugs 3 and 5, the bugs nothing pointed you to directly. Describe the investigation steps, what superficial signal the original test was checking, and what you rewrote it to prove instead.

## What this demonstrates

*Leave blank. You fill this in at the capstone.*