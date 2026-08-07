import { describe, it, expect } from "vitest";
import * as path from "path";
import { branchProtectionExists } from "../../src/rules/branchProtectionExists";

const fixturesDir = path.join(__dirname, "..", "..", "fixtures");

describe("branchProtectionExists rule", () => {
  it("passes when .github/settings.yml exists", () => {
    const result = branchProtectionExists.check(path.join(fixturesDir, "branch-protection-exists"));
    expect(result.passed).toBe(true);
  });

  it("fails when .github/settings.yml does not exist", () => {
    const result = branchProtectionExists.check(path.join(fixturesDir, "valid-readme"));
    expect(result.passed).toBe(false);
  });
});
