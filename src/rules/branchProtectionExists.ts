import * as fs from "fs";
import * as path from "path";
import { Rule } from "../core/types";

// Branch protection itself is a GitHub server-side setting (repo Settings ->
// Branches), not a file in the repo, and this tool has no GitHub API access.
// The closest file-based proxy is .github/settings.yml, the convention used
// by the Probot Settings app to declare branch protection rules as code.
// A match here means protection is *declared*, not that GitHub is actually
// enforcing it -- that still requires the Settings app (or equivalent) to be
// installed and running against the repo.
const SETTINGS_FILE = ".github/settings.yml";

export const branchProtectionExists: Rule = {
  id: "branch-protection-exists",
  name: "Branch protection config exists",
  severity: "warning",
  check(targetDir: string) {
    const found = fs.existsSync(path.join(targetDir, SETTINGS_FILE));

    return {
      passed: found,
      message: found
        ? `Branch protection config found at ${SETTINGS_FILE} (declares intent; actual enforcement lives in GitHub repo settings and isn't verified here)`
        : `No ${SETTINGS_FILE} found (branch protection is a GitHub server-side setting this tool can't query directly)`,
    };
  },
};
