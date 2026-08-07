import { describe, it, expect } from "vitest";
import * as path from "path";
import { fundingExists } from "../../src/rules/fundingExists";

const fixturesDir = path.join(__dirname, "..", "..", "fixtures");

describe("fundingExists rule", () => {
  it("passes when .github/FUNDING.yml exists", () => {
    const result = fundingExists.check(path.join(fixturesDir, "funding-exists"));
    expect(result.passed).toBe(true);
  });

  it("fails when .github/FUNDING.yml does not exist", () => {
    const result = fundingExists.check(path.join(fixturesDir, "valid-readme"));
    expect(result.passed).toBe(false);
  });
});
