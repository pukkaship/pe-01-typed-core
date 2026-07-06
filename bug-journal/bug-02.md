# Bug 2 â fail loud at the data boundary (JSON.parse)

Fill this in as you fix Bug 2. At least 80 words. Run `npm run unlock -- 2` when done.

**1. Paste the exact error** Node printed when `parseMeals` hit malformed JSON (try it:
`npx tsx -e "require('./src/load').parseMeals('[{')"`, or read the failing test output).

```
[paste here]
```

**2.** What is the difference between a raw `SyntaxError` from `JSON.parse` and a clear error
that names which boundary failed? Why does the caller care?

[your answer]

**3.** If a user's request arrived as malformed JSON at this boundary, what should they
experience â a crash with a stack trace, a clear error, or silence? Which is worst, and why?

[your answer]

**AI use (required for every bug):**

- Did you use an AI assistant? Paste the exact prompt you gave it.
- Did the AI identify the root cause or just the symptom?
  Where did your reasoning have to override or correct it?

