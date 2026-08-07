import * as fs from "fs";
import * as path from "path";
import { Rule } from "../core/types";

const FUNDING_FILE = ".github/FUNDING.yml";

export const fundingExists: Rule = {
  id: "funding-exists",
  name: "FUNDING.yml exists",
  severity: "warning",
  check(targetDir: string) {
    const found = fs.existsSync(path.join(targetDir, FUNDING_FILE));

    return {
      passed: found,
      message: found ? `${FUNDING_FILE} found` : `${FUNDING_FILE} not found`,
    };
  },
};
