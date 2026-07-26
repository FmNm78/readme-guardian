import { describe, it, expect } from "vitest";
import * as path from "path";
import { readmeHasH1 } from "../../src/rules/readmeHasH1";

const fixturesDir = path.join(__dirname, "..", "..", "fixtures");

describe("readmeHasH1 rule", () => {
  it("passes when README.md contains an H1 heading", () => {
    const result = readmeHasH1.check(path.join(fixturesDir, "valid-readme"));
    expect(result.passed).toBe(true);
  });

  it("fails when README.md has no H1 heading", () => {
    const result = readmeHasH1.check(path.join(fixturesDir, "readme-no-h1"));
    expect(result.passed).toBe(false);
  });

  it("fails when README.md does not exist", () => {
    const result = readmeHasH1.check(fixturesDir);
    expect(result.passed).toBe(false);
  });
});
