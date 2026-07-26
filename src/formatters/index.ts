import { RuleResult } from "../core/types";
import { Status } from "../core/evaluateStatus";
import { formatText } from "./text";
import { formatJson } from "./json";

export type OutputFormat = "text" | "json";

export function formatReport(
  format: OutputFormat,
  repository: string,
  results: RuleResult[],
  status: Status
): string {
  if (format === "json") {
    return formatJson(repository, results, status);
  }
  return formatText(results);
}
