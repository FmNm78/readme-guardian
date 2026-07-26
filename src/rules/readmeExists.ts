import * as fs from "fs";
import * as path from "path";
import { Rule } from "../core/types";

export const readmeExists: Rule = {
  id: "readme-exists",
  name: "README exists",
  severity: "error",
  check(targetDir: string) {
    const readmePath = path.join(targetDir, "README.md");
    const exists = fs.existsSync(readmePath);
    return {
      passed: exists,
      message: exists ? "README.md found" : "README.md not found",
    };
  },
};
