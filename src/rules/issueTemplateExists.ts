import * as fs from "fs";
import * as path from "path";
import { Rule } from "../core/types";

// Priority 1: GitHub's modern convention, a directory of one or more templates.
const ISSUE_TEMPLATE_DIR = ".github/ISSUE_TEMPLATE";

// Priority 2: legacy single-file templates, checked in this order.
const SINGLE_FILE_LOCATIONS = [".github/ISSUE_TEMPLATE.md", "ISSUE_TEMPLATE.md", "docs/ISSUE_TEMPLATE.md"];

const TEMPLATE_EXTENSIONS = [".md", ".yml", ".yaml"];
const CHOOSER_CONFIG_FILENAMES = ["config.yml", "config.yaml"];

function hasRealTemplateFile(dirPath: string): boolean {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return false;
  }

  return fs.readdirSync(dirPath).some((entry) => {
    if (CHOOSER_CONFIG_FILENAMES.includes(entry.toLowerCase())) {
      return false;
    }
    return TEMPLATE_EXTENSIONS.includes(path.extname(entry).toLowerCase());
  });
}

export const issueTemplateExists: Rule = {
  id: "issue-template-exists",
  name: "Issue template exists",
  severity: "warning",
  check(targetDir: string) {
    const templateDirPath = path.join(targetDir, ISSUE_TEMPLATE_DIR);
    if (hasRealTemplateFile(templateDirPath)) {
      return {
        passed: true,
        message: `Issue template found in ${ISSUE_TEMPLATE_DIR}/`,
      };
    }

    const foundFile = SINGLE_FILE_LOCATIONS.find((location) =>
      fs.existsSync(path.join(targetDir, location))
    );

    if (foundFile) {
      return {
        passed: true,
        message: `Issue template found at ${foundFile}`,
      };
    }

    return {
      passed: false,
      message: `No issue template found (checked: ${ISSUE_TEMPLATE_DIR}/, ${SINGLE_FILE_LOCATIONS.join(", ")})`,
    };
  },
};
