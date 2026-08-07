import { describe, it, expect } from "vitest";
import * as path from "path";
import { codeOfConductExists } from "../../src/rules/codeOfConductExists";

const fixturesDir = path.join(__dirname, "..", "..", "fixtures");

describe("codeOfConductExists rule", () => {
  it("passes when CODE_OF_CONDUCT.md exists", () => {
    const result = codeOfConductExists.check(path.join(fixturesDir, "code-of-conduct-exists"));
    expect(result.passed).toBe(true);
  });

  it("fails when CODE_OF_CONDUCT.md does not exist", () => {
    const result = codeOfConductExists.check(path.join(fixturesDir, "valid-readme"));
    expect(result.passed).toBe(false);
  });
});
