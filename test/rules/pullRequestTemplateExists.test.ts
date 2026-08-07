import { describe, it, expect } from "vitest";
import * as path from "path";
import { pullRequestTemplateExists } from "../../src/rules/pullRequestTemplateExists";

const fixturesDir = path.join(__dirname, "..", "..", "fixtures");

describe("pullRequestTemplateExists rule", () => {
  it("passes when .github/PULL_REQUEST_TEMPLATE/ has at least one .md file", () => {
    const result = pullRequestTemplateExists.check(path.join(fixturesDir, "pr-template-exists-dir"));
    expect(result.passed).toBe(true);
  });

  it("passes when a single-file PULL_REQUEST_TEMPLATE.md exists", () => {
    const result = pullRequestTemplateExists.check(path.join(fixturesDir, "pr-template-exists-single"));
    expect(result.passed).toBe(true);
  });

  it("fails when no pull request template exists in any accepted location", () => {
    const result = pullRequestTemplateExists.check(path.join(fixturesDir, "valid-readme"));
    expect(result.passed).toBe(false);
  });
});
