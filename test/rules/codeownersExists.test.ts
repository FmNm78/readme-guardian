import { describe, it, expect } from "vitest";
import * as path from "path";
import { codeownersExists } from "../../src/rules/codeownersExists";

const fixturesDir = path.join(__dirname, "..", "..", "fixtures");

describe("codeownersExists rule", () => {
  it("passes when CODEOWNERS exists at the repo root", () => {
    const result = codeownersExists.check(path.join(fixturesDir, "codeowners-exists"));
    expect(result.passed).toBe(true);
  });

  it("passes when CODEOWNERS exists under .github/", () => {
    const result = codeownersExists.check(path.join(fixturesDir, "codeowners-exists-github"));
    expect(result.passed).toBe(true);
  });

  it("passes when CODEOWNERS exists under docs/", () => {
    const result = codeownersExists.check(path.join(fixturesDir, "codeowners-exists-docs"));
    expect(result.passed).toBe(true);
  });

  it("fails when no CODEOWNERS file exists in any accepted location", () => {
    const result = codeownersExists.check(path.join(fixturesDir, "valid-readme"));
    expect(result.passed).toBe(false);
  });
});
