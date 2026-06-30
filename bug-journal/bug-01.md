# Bug 1 — `any` switches off the type system

Fill this in as you fix Bug 1. At least 80 words. Run `npm run unlock -- 1` when done.

**1. Paste the exact error** `npm run typecheck` printed the moment you replaced `any` with
your `Meal` interface in `src/scorer.ts`. Include the file and line number.

```
[paste here]
```

**2.** While `meal` was typed `any`, why could TypeScript not catch the wrong field name
(`carbScore` vs `carb_score`)? What does `any` actually tell the compiler to do?

[your answer]

**3.** If `carb_score` were renamed to `carbScore` in a real production data source, what would
the `any` version of the scorer have returned for every meal — and why would nobody notice until
much later?

[your answer]
