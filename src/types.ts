// Bug 1 starts here.
//
// This file is intentionally empty. The scorer currently uses `any`, which means
// TypeScript cannot catch a single wrong assumption about the data shape.
//
// Your job (Bug 1): define the two interfaces this system actually needs —
//   - Meal:         one row from fixtures/meals.json
//   - ScorerResult: what scoreMeal() returns
//
// Then import them in src/scorer.ts and replace the `any` types. The moment you do,
// `npm run typecheck` will reveal a bug the `any` was hiding. That is the lesson.
//
// Look at fixtures/meals.json for the exact field names. They matter.

export {};
