import { describe, it, expect } from "vitest";
import * as path from "path";
import { securityPolicyExists } from "../../src/rules/securityPolicyExists";

const fixturesDir = path.join(__dirname, "..", "..", "fixtures");

describe("securityPolicyExists rule", () => {
  it("passes when SECURITY.md exists", () => {
    const result = securityPolicyExists.check(path.join(fixturesDir, "security-policy-exists"));
    expect(result.passed).toBe(true);
  });

  it("fails when SECURITY.md does not exist", () => {
    const result = securityPolicyExists.check(path.join(fixturesDir, "valid-readme"));
    expect(result.passed).toBe(false);
  });
});
