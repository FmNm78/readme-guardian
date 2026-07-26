export type Severity = "error" | "warning";

export interface RuleCheckOutput {
  passed: boolean;
  message: string;
}

export interface Rule {
  id: string;
  name: string;
  severity: Severity;
  check(targetDir: string): RuleCheckOutput;
}

export interface RuleResult {
  ruleId: string;
  ruleName: string;
  passed: boolean;
  severity: Severity;
  message: string;
}
