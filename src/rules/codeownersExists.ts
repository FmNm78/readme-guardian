import * as fs from "fs";
import * as path from "path";
import { Rule } from "../core/types";

// Mirrors GitHub's own CODEOWNERS lookup order: .github/, then repo root,
// then docs/. GitHub only uses the first one it finds, so we check in the
// same order and report the first match.
const CODEOWNERS_LOCATIONS = [".github/CODEOWNERS", "CODEOWNERS", "docs/CODEOWNERS"];

export const codeownersExists: Rule = {
  id: "codeowners-exists",
  name: "CODEOWNERS exists",
  severity: "warning",
  check(targetDir: string) {
    const foundAt = CODEOWNERS_LOCATIONS.find((location) =>
      fs.existsSync(path.join(targetDir, location))
    );

    return {
      passed: foundAt !== undefined,
      message:
        foundAt !== undefined
          ? `CODEOWNERS found at ${foundAt}`
          : `No CODEOWNERS file found (checked: ${CODEOWNERS_LOCATIONS.join(", ")})`,
    };
  },
};
