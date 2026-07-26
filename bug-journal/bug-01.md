# Bug 1 — untyped models switch off the type checker

Fill this in as you fix Bug 1. At least 80 words. Run `node scripts/unlock.cjs 1` when done.

**1. Paste the exact error** `mypy src` printed before you converted `Meal` / `ScorerResult`
into typed dataclasses in `src/models.py`. Include the file and line number.

```
[paste here]
```

**2.** While `Meal.__init__` had no type annotations, why could mypy not catch a wrong field
shape handed to `score_meal`? What does an untyped constructor actually tell the type checker
to do?

[your answer]

**3.** If a production data source started sending string scores (`"5"` instead of `5`), what
would the untyped version of the scorer have returned for every meal — and why would nobody
notice until much later?

[your answer]
