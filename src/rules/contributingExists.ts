import * as fs from "fs";
import * as path from "path";
import { Rule } from "../core/types";

export const contributingExists: Rule = {
  id: "contributing-exists",
  name: "CONTRIBUTING exists",
  severity: "warning",
  check(targetDir: string) {
    const contributingPath = path.join(targetDir, "CONTRIBUTING.md");
    const found = fs.existsSync(contributingPath);

    return {
      passed: found,
      message: found ? "CONTRIBUTING.md found" : "CONTRIBUTING.md not found",
    };
  },
};
