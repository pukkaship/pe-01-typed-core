import { readFile } from "node:fs/promises";

// Loads meals from disk. Two bugs live here.

// Bug 2: JSON.parse throws a raw, contextless SyntaxError when the file is malformed.
// The caller has no idea WHICH file or WHY. A boundary that fails should say what failed.
// A staged test passes you a malformed string and expects a clear, contextual error.
export function parseMeals(raw: string): any {
  return JSON.parse(raw);
}

// Bug 3: this swallows every failure. If the file is missing or unreadable, the catch
// returns an empty list and the program carries on as if nothing happened — it "succeeds"
// silently. A staged test points this at a path that does not exist and expects it to fail
// loudly, not resolve to [].
export async function loadMeals(path: string): Promise<any> {
  try {
    const raw = await readFile(path, "utf8");
    return parseMeals(raw);
  } catch {
    return [];
  }
}
