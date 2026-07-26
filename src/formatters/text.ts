import { RuleResult } from "../core/types";

function formatLine(icon: string, result: RuleResult): string {
  return `  ${icon} [${result.severity}] ${result.ruleId} - ${result.ruleName}: ${result.message}`;
}

export function formatText(results: RuleResult[]): string {
  const passed = results.filter((result) => result.passed);
  const failed = results.filter((result) => !result.passed);

  const lines: string[] = [];
  lines.push(`Summary: ${passed.length} passed, ${failed.length} failed (${results.length} total)`);

  if (passed.length > 0) {
    lines.push("");
    lines.push("Passed:");
    for (const result of passed) {
      lines.push(formatLine("✅", result));
    }
  }

  if (failed.length > 0) {
    lines.push("");
    lines.push("Failed:");
    for (const result of failed) {
      lines.push(formatLine("❌", result));
    }
  }

  return lines.join("\n");
}
