import { describe, it, expect } from "vitest";
import * as path from "path";
import { runChecks } from "../../src/core/runChecks";
import { allRules } from "../../src/rules";

const fixturesDir = path.join(__dirname, "..", "..", "fixtures");

describe("allRules combined", () => {
  it("fixtures/complete passes every rule", () => {
    const results = runChecks(path.join(fixturesDir, "complete"), allRules);

    expect(results).toHaveLength(11);
    expect(results.every((result) => result.passed)).toBe(true);
  });

  it("fixtures/without-license passes README rules but fails license-exists", () => {
    const results = runChecks(path.join(fixturesDir, "without-license"), allRules);
    const byId = Object.fromEntries(results.map((result) => [result.ruleId, result.passed]));

    expect(byId["readme-exists"]).toBe(true);
    expect(byId["readme-has-h1"]).toBe(true);
    expect(byId["license-exists"]).toBe(false);
  });
});
