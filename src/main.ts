import { loadMeals } from "./load";
import { scoreMeal } from "./scorer";

// The entry point. It loads the meals, scores each one, and prints a signal per meal.
//
// Bug 5 lives in how this file handles failure. Right now, if anything goes wrong, the
// error is caught, printed as if it were normal output, and the process still exits 0 —
// so a script (or a CI pipeline) calling this would believe it succeeded. That is the
// "200 OK, nobody noticed" pattern. A staged test drives the run() function with input
// that must fail; make run() surface the failure instead of swallowing it, and make the
// process exit non-zero. See REFLECTION.md.

export async function run(mealsPath: string): Promise<string[]> {
  const meals = await loadMeals(mealsPath);
  const lines: string[] = [];
  for (const meal of meals) {
    const result = scoreMeal(meal);
    lines.push(`${result.name.padEnd(14)} → ${result.signal}`);
  }
  return lines;
}

async function main(): Promise<void> {
  const mealsPath = "fixtures/meals.json";
  try {
    const lines = await run(mealsPath);
    for (const line of lines) {
      console.log(line);
    }
  } catch (err) {
    // Bug 5: this reports a failure but does NOT fail. Exit code stays 0.
    console.log("done");
  }
}

main();
