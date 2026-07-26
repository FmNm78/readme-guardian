import { describe, it, expect } from "vitest";
import * as path from "path";
import { readmeExists } from "../../src/rules/readmeExists";

const fixturesDir = path.join(__dirname, "..", "..", "fixtures");

describe("readmeExists rule", () => {
  it("passes when README.md exists", () => {
    const result = readmeExists.check(path.join(fixturesDir, "valid-readme"));
    expect(result.passed).toBe(true);
  });

  it("fails when README.md does not exist", () => {
    const result = readmeExists.check(fixturesDir);
    expect(result.passed).toBe(false);
  });
});
