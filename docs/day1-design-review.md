# Day 1 — Design review, section 4: Testability

Starting this week, before you touch code, you ask a small, fixed set of questions about the
design — not the whole checklist yet, one section at a time, as the program gives you reason to
need it. Most modules will start with state & correctness; this one starts with testability,
because a pure local scorer is the cleanest possible place to see what "testable" actually means
before real I/O muddies it.

## Section 4 — Testability

- **Can the core be a pure function?** `scoreMeal` and `parseMeals` take an input, return an
  output, and touch nothing else — no network, no database, no clock, no randomness. That's not
  an accident of this being a small exercise; it's the property that makes a function cheap to
  test at all. Notice it now, because most of what you'll build later (a route handler, a queue
  worker) will *not* be this clean by default — you'll have to work to carve a pure core out of it.
- **Name test cases before code: happy / failure / most-likely-to-regress.** `tests/test_bug_01.py` is
  already written for you — read it as a worked example of naming a failure case *before* touching
  the fix, not just as an obstacle to clear.
- **Which existing test should a new one mirror?** As Bugs 2–5 arrive, each staged test is written
  in the same shape as the one before it. When you get to writing your own tests (this module and
  every one after), find the nearest existing test and match its shape — same imports, same
  `describe`/`it` structure, same fixture style — rather than inventing a new pattern each time.

## Why this section, this week

Every bug in this module is, underneath, a testability story: a function that silently returns the
wrong thing is untestable until you write the assertion that would catch it; an error that's
swallowed is untestable until you write the test that proves it wasn't swallowed. The discovery
bugs (3 and 5) are the sharpest version of this — the test that ships already exists, it just isn't
testing the right thing yet, and your job is to notice what it should be asserting instead.

## Write it down before you code

Add three lines to `hypothesis.md` under a **Design note** heading:

1. Which of the five bugs, if any, involves code that *isn't* a pure function — and why does that
   make it harder to test?
2. Pick one bug you haven't fixed yet. What's the specific failure-path test case for it (not the
   happy path)?
3. Which existing test file will you mirror the shape of, once the gate delivers your next bug?

This is the same **spec-first intake** habit you'll formalize further starting Module 2 — writing
down what you expect the design to guarantee, before you write the code that's supposed to
guarantee it.
