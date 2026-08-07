import * as fs from "fs";
import * as path from "path";
import { Rule } from "../core/types";

const LICENSE_FILENAMES = ["LICENSE", "LICENSE.md", "LICENSE.txt"];

export const licenseExists: Rule = {
  id: "license-exists",
  name: "License exists",
  severity: "error",
  check(targetDir: string) {
    const found = LICENSE_FILENAMES.some((filename) =>
      fs.existsSync(path.join(targetDir, filename))
    );

    return {
      passed: found,
      message: found
        ? "License file found"
        : `No license file found (expected one of: ${LICENSE_FILENAMES.join(", ")})`,
    };
  },
};
