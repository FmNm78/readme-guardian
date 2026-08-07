import { describe, it, expect } from "vitest";
import * as path from "path";
import { issueTemplateExists } from "../../src/rules/issueTemplateExists";

const fixturesDir = path.join(__dirname, "..", "..", "fixtures");

describe("issueTemplateExists rule", () => {
  it("passes when .github/ISSUE_TEMPLATE/ has at least one real template file", () => {
    const result = issueTemplateExists.check(path.join(fixturesDir, "issue-template-exists-dir"));
    expect(result.passed).toBe(true);
  });

  it("fails when .github/ISSUE_TEMPLATE/ only has config.yml", () => {
    const result = issueTemplateExists.check(path.join(fixturesDir, "issue-template-only-config"));
    expect(result.passed).toBe(false);
  });

  it("passes when a single-file ISSUE_TEMPLATE.md exists", () => {
    const result = issueTemplateExists.check(path.join(fixturesDir, "issue-template-exists-single"));
    expect(result.passed).toBe(true);
  });

  it("fails when no issue template exists in any accepted location", () => {
    const result = issueTemplateExists.check(path.join(fixturesDir, "valid-readme"));
    expect(result.passed).toBe(false);
  });
});
