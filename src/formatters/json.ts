import { RuleResult } from "../core/types";
import { Status } from "../core/evaluateStatus";

export function formatJson(repository: string, results: RuleResult[], status: Status): string {
  const passed = results.filter((result) => result.passed);
  const failed = results.filter((result) => !result.passed);

  const payload = {
    repository,
    status,
    summary: {
      total: results.length,
      passed: passed.length,
      failed: failed.length,
    },
    passed,
    failed,
  };

  return JSON.stringify(payload, null, 2);
}
