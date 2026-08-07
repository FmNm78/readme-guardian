#!/usr/bin/env node
import { runChecks } from "./core/runChecks";
import { evaluateStatus } from "./core/evaluateStatus";
import { allRules } from "./rules";
import { formatReport, OutputFormat } from "./formatters";

function printUsage(): void {
  console.log("Usage: readme-guardian check <path> [--format text|json] [--strict]");
}

function parseFormat(args: string[]): OutputFormat {
  const flagIndex = args.indexOf("--format");
  if (flagIndex === -1) {
    return "text";
  }
  return args[flagIndex + 1] === "json" ? "json" : "text";
}

function main(): void {
  const args = process.argv.slice(2);
  const [command, targetPath] = args;

  if (command !== "check" || !targetPath) {
    printUsage();
    process.exit(1);
  }

  const format = parseFormat(args);
  const strict = args.includes("--strict");

  const results = runChecks(targetPath, allRules);
  const status = evaluateStatus(results, strict);

  console.log(formatReport(format, targetPath, results, status));

  process.exit(status === "fail" ? 1 : 0);
}

main();
