# Day 1 — The debugging micro-loop

> ▶ A 3-minute "how to read a TypeScript error" demo is linked at the top of the README.
> Watch it, then read this.

One page. This is the loop you run for every single bug, this week and every week.

```
1. Read the error message — the exact words, not your general feeling about it
2. Form a hypothesis about what is wrong — BEFORE editing anything
3. Ask AI what the error MEANS — not to fix the code for you
4. Make the smallest change that tests your hypothesis
5. Run npm test
6. If green: write down WHY the fix was necessary before moving on
```

## Worked example

```
Error:      Argument of type 'string' is not assignable to parameter of type 'number'.
Hypothesis: "I'm passing a value that came from JSON without converting it to a number."
Ask AI:     "What does 'not assignable' mean in TypeScript?"  (understand — don't outsource)
Smallest fix: convert the value with Number(...) at the point it is used
Run test:   green
Write down: "Values parsed from JSON are strings unless converted. TypeScript caught it at
             compile time instead of letting a wrong calculation run."
```

## The one rule about AI

You may use Cursor or any AI assistant. You may ask it what an error means, what a concept is, or
to explain code you are reading. **You may not ask it to fix code you have not read and understood
first.** At your weekly sync you will explain each fix in your own words, without looking at your PR.
This is the whole point: the program certifies that the understanding is *yours*.
