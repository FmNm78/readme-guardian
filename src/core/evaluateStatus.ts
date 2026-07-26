import { RuleResult } from "./types";

export type Status = "pass" | "fail";

function isBlockingFailure(result: RuleResult, strict: boolean): boolean {
  if (result.passed) {
    return false;
  }
  return strict ? true : result.severity === "error";
}

export function evaluateStatus(results: RuleResult[], strict: boolean): Status {
  const hasBlockingFailure = results.some((result) => isBlockingFailure(result, strict));
  return hasBlockingFailure ? "fail" : "pass";
}
