import { describe, it, expect } from "vitest";
import { parseMeals } from "../load";

// Bug 2 â JSON.parse fails with a raw, contextless error. A boundary that rejects bad
// input should say what it rejected and why. Make parseMeals throw a clear error.
describe("parseMeals â Bug 2: fail loud at the data boundary", () => {
  it("throws a clear, contextual error on malformed JSON", () => {
    const malformed = '[{ "name": "veggie omelette", ';
    expect(() => parseMeals(malformed)).toThrowError(/valid json|could not parse|malformed/i);
  });

  it("still parses well-formed JSON", () => {
    const ok = '[{"name":"x","carb_score":1,"protein_score":1,"fibre_score":1,"fat_score":1}]';
    expect(parseMeals(ok)).toHaveLength(1);
  });
});
