import { describe, it, expect } from "vitest";
import * as path from "path";
import { licenseExists } from "../../src/rules/licenseExists";

const fixturesDir = path.join(__dirname, "..", "..", "fixtures");

describe("licenseExists rule", () => {
  it("passes when a LICENSE file exists", () => {
    const result = licenseExists.check(path.join(fixturesDir, "license-exists"));
    expect(result.passed).toBe(true);
  });

  it("fails when no license file exists", () => {
    const result = licenseExists.check(path.join(fixturesDir, "valid-readme"));
    expect(result.passed).toBe(false);
  });
});
