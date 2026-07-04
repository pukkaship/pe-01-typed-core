# Day 1 — Welcome to Nudge

You've just joined a two-person startup as the first engineering hire. The product is Nudge, an
AI coach that talks to people over chat about their eating habits — someone describes a meal,
Nudge replies with feedback. The other person is the founder: heads-down on the product vision,
handing you the system one milestone at a time. Sometimes it's broken. Sometimes it isn't built
yet. Sometimes it "works," until a user proves it doesn't.

## What's in front of you today

The founder handed you the core scoring logic — the part of the app that will eventually decide
whether a described meal is balanced. It compiles. It "runs." Two of the four sample tests are
already red, and the type file is a stub with `any` sprinkled through it.

Before you touch the logic, you have to decide what a `Meal` and a `ScorerResult` actually,
contractually are — and turn on strict mode, because the founder's rule zero is that nothing
quietly returns garbage.

## Why this week matters beyond the bugs

Every later milestone in this program — the first live endpoint, the first LLM call, the queue,
the eval harness, the capstone — builds on the habit you're forming this week: a system should
fail at the boundary of a wrong assumption, not return `undefined` and continue. You'll see this
exact principle again, at a wider trust radius, in every module that follows.

There's no AI or network code this week on purpose. Calibrate the fundamentals — strict types,
disciplined debugging, the AI-workflow habits in
[`day1-ai-workflow.md`](day1-ai-workflow.md) — before the harder, non-deterministic material
arrives starting next week.
