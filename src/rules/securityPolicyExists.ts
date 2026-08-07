import * as fs from "fs";
import * as path from "path";
import { Rule } from "../core/types";

export const securityPolicyExists: Rule = {
  id: "security-policy-exists",
  name: "SECURITY policy exists",
  severity: "warning",
  check(targetDir: string) {
    const securityPath = path.join(targetDir, "SECURITY.md");
    const found = fs.existsSync(securityPath);

    return {
      passed: found,
      message: found ? "SECURITY.md found" : "SECURITY.md not found",
    };
  },
};
