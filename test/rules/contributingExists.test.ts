import { describe, it, expect } from "vitest";
import * as path from "path";
import { contributingExists } from "../../src/rules/contributingExists";

const fixturesDir = path.join(__dirname, "..", "..", "fixtures");

describe("contributingExists rule", () => {
  it("passes when CONTRIBUTING.md exists", () => {
    const result = contributingExists.check(path.join(fixturesDir, "contributing-exists"));
    expect(result.passed).toBe(true);
  });

  it("fails when CONTRIBUTING.md does not exist", () => {
    const result = contributingExists.check(path.join(fixturesDir, "valid-readme"));
    expect(result.passed).toBe(false);
  });
});
