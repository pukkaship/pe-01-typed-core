import { describe, it, expect } from "vitest";
import { scoreMeal } from "../scorer";

// Bug 1 — the type system was switched off with `any`, hiding a field-name mismatch.
// This test is already active. Run `npm test` and read the failure before changing code.
describe("scoreMeal — Bug 1: typed shapes catch wrong field names", () => {
  it("scores a protein+fibre meal as balanced", () => {
    const meal = { name: "veggie omelette", carb_score: 2, protein_score: 2, fibre_score: 3, fat_score: 1 };
    expect(scoreMeal(meal).signal).toBe("balanced");
  });

  it("scores a carb-heavy meal as off-balance", () => {
    const meal = { name: "pasta bake", carb_score: 5, protein_score: 2, fibre_score: 1, fat_score: 3 };
    expect(scoreMeal(meal).signal).toBe("off-balance");
  });

  it("scores a bare-carb meal as needs-balance", () => {
    const meal = { name: "plain crackers", carb_score: 3, protein_score: 0, fibre_score: 0, fat_score: 0 };
    expect(scoreMeal(meal).signal).toBe("needs-balance");
  });

  it("returns the meal name unchanged", () => {
    const meal = { name: "lentil soup", carb_score: 3, protein_score: 3, fibre_score: 3, fat_score: 1 };
    expect(scoreMeal(meal).name).toBe("lentil soup");
  });
});
