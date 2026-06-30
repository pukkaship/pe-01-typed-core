// The meal scorer.
//
// Two bugs live in this file. You will not see them all at once — the gate system
// reveals one failing test at a time. Read each test before you change anything here.

// Bug 1: `any` switches off the type system. While `meal` is `any`, TypeScript will
// happily let this file read a field that does not exist on the data. Define proper
// interfaces in src/types.ts, import them, and replace every `any` below.
export function scoreMeal(meal: any): any {
  return {
    name: meal.name,
    signal: computeSignal(meal),
  };
}

function computeSignal(meal: any): string {
  if (meal.carbScore >= 4) {
    return "off-balance";
  }
  // Bug 4: a meal is only "balanced" when it has enough protein AND enough fibre.
  // This line uses the wrong boolean operator, so meals that are strong in only one
  // dimension are wrongly called balanced. A staged test will expose this.
  if (meal.proteinScore >= 2 || meal.fibreScore >= 2) {
    return "balanced";
  }
  return "needs-balance";
}
