import { Rule, RuleResult } from "./types";

export function runChecks(targetDir: string, rules: Rule[]): RuleResult[] {
  return rules.map((rule) => {
    const output = rule.check(targetDir);
    return {
      ruleId: rule.id,
      ruleName: rule.name,
      passed: output.passed,
      severity: rule.severity,
      message: output.message,
    };
  });
}
