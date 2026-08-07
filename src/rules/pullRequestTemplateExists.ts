import * as fs from "fs";
import * as path from "path";
import { Rule } from "../core/types";

// Priority 1: GitHub's modern convention, a directory of one or more templates.
const TEMPLATE_DIR = ".github/PULL_REQUEST_TEMPLATE";

// Priority 2: legacy single-file templates, checked in this order.
const SINGLE_FILE_LOCATIONS = [
  ".github/PULL_REQUEST_TEMPLATE.md",
  "PULL_REQUEST_TEMPLATE.md",
  "docs/PULL_REQUEST_TEMPLATE.md",
];

function hasMarkdownFile(dirPath: string): boolean {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return false;
  }

  return fs.readdirSync(dirPath).some((entry) => path.extname(entry).toLowerCase() === ".md");
}

export const pullRequestTemplateExists: Rule = {
  id: "pull-request-template-exists",
  name: "Pull request template exists",
  severity: "warning",
  check(targetDir: string) {
    const templateDirPath = path.join(targetDir, TEMPLATE_DIR);
    if (hasMarkdownFile(templateDirPath)) {
      return {
        passed: true,
        message: `Pull request template found in ${TEMPLATE_DIR}/`,
      };
    }

    const foundFile = SINGLE_FILE_LOCATIONS.find((location) =>
      fs.existsSync(path.join(targetDir, location))
    );

    if (foundFile) {
      return {
        passed: true,
        message: `Pull request template found at ${foundFile}`,
      };
    }

    return {
      passed: false,
      message: `No pull request template found (checked: ${TEMPLATE_DIR}/, ${SINGLE_FILE_LOCATIONS.join(", ")})`,
    };
  },
};
