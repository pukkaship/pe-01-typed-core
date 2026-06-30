# Day 1 — Glossary (8 terms)

Plain language. No jargon inside the definitions.

- **async / await** — Some work (reading a file, calling a network service) takes time. "async"
  lets the program start that work and do other things instead of freezing. `await` means "wait
  here for that result." The catch: if the awaited work fails and nobody catches the error, the
  failure can disappear without a trace. That is Bug 3.

- **fail loud** — When a system cannot do what was asked, it should announce the failure clearly
  (an error, a non-zero exit code) instead of returning a fake-success answer. The opposite —
  "fail silent" — is the most expensive kind of bug because nobody knows it happened.

- **fixture** — A known input with a known expected output. It is the atomic unit of a test:
  "given *this* meal, the scorer must say *that* signal." `fixtures/meals.json` holds this week's.

- **boundary** — The edge where data enters your system from somewhere you do not control: a
  file, a network request, a user. Boundaries are where you stop trusting input and start
  checking it. Bug 2 and Bug 5 are both boundary failures.

- **interface (TypeScript)** — A named description of the exact shape data must have (which fields,
  which types). Once a value is typed with an interface, the compiler refuses code that uses a
  field that does not exist. That is how Bug 1 gets caught.

- **strict mode (TypeScript)** — A compiler setting (already ON in this repo's `tsconfig.json`)
  that turns many "silently allowed" mistakes into compile-time errors. It is the difference
  between finding a bug before you run the program and finding it in production.

- **exit code** — The number a program returns when it finishes. `0` means success; anything else
  means failure. Scripts and CI pipelines trust this number. A program that fails but exits `0` is
  lying to everything that calls it. That is Bug 5.

- **stack trace** — The list of function calls leading to an error. Read it top-down: the first
  line is usually where it broke; the file and line number tell you where to look first.

## A note for Python engineers

Python type hints look like TypeScript types but behave differently at the most important moment.

```python
# Python — the hint exists, the runtime ignores it
def score_meal(meal: dict) -> dict:
    return {"name": meal["name"], "signal": "balanced"}  # KeyError only if it runs

# TypeScript with `any` — same problem: no checking
function scoreMeal(meal: any): any {
  return { name: meal.name, signal: "balanced" };  # undefined, no error, no crash
}

# TypeScript with a strict interface — the compiler refuses it BEFORE you run anything
function scoreMeal(meal: Meal): ScorerResult {
  return { name: meal.name, signal: computeSignal(meal) };  # error here if the shape is wrong
}
```

Python type hints are documentation. TypeScript strict types are contracts the compiler enforces.
That distinction runs through every module of this program.
