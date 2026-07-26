import * as fs from "fs";
import * as path from "path";
import { Rule } from "../core/types";

const H1_PATTERN = /^#\s+.+/m;

export const readmeHasH1: Rule = {
  id: "readme-has-h1",
  name: "README has H1 heading",
  severity: "warning",
  check(targetDir: string) {
    const readmePath = path.join(targetDir, "README.md");

    if (!fs.existsSync(readmePath)) {
      return {
        passed: false,
        message: "README.md not found, cannot check for H1 heading",
      };
    }

    const content = fs.readFileSync(readmePath, "utf-8");
    const hasH1 = H1_PATTERN.test(content);

    return {
      passed: hasH1,
      message: hasH1
        ? "README.md contains an H1 heading"
        : 'README.md does not contain an H1 heading (e.g. "# Title")',
    };
  },
};
