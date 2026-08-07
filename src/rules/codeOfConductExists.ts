import * as fs from "fs";
import * as path from "path";
import { Rule } from "../core/types";

export const codeOfConductExists: Rule = {
  id: "code-of-conduct-exists",
  name: "CODE_OF_CONDUCT exists",
  severity: "warning",
  check(targetDir: string) {
    const codeOfConductPath = path.join(targetDir, "CODE_OF_CONDUCT.md");
    const found = fs.existsSync(codeOfConductPath);

    return {
      passed: found,
      message: found ? "CODE_OF_CONDUCT.md found" : "CODE_OF_CONDUCT.md not found",
    };
  },
};
