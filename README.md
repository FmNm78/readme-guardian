# README Guardian

A command-line tool that checks whether a repository's README meets basic quality standards.

## Why

A missing or thin README is one of the most common reasons a repository is hard to use or contribute to. README Guardian automates a few basic checks so you can catch these issues in a script, a pre-commit hook, or CI, instead of relying on manual review.

## Current features

- `check <path>` CLI command that runs all rules against a target directory
- Two rules: README existence and README H1 heading presence
- Text output with a summary and grouped passed/failed results
- JSON output via `--format json` for machine consumption
- `--strict` mode to treat warnings as failures

## Installation

Clone the repository and install dependencies:

```
git clone https://github.com/FmNm78/readme-guardian.git
cd readme-guardian
npm install
```

Build the CLI:

```
npm run build
```

## Quick start

Run against any directory:

```
node dist/index.js check .
```

Run without building, directly against TypeScript source (development use):

```
npm run dev -- check .
```

Example output:

```
Summary: 2 passed, 0 failed (2 total)

Passed:
  ✅ [error] readme-exists - README exists: README.md found
  ✅ [warning] readme-has-h1 - README has H1 heading: README.md contains an H1 heading
```

## Output formats

By default, output is human-readable text with a summary and grouped passed/failed sections.

Pass `--format json` for machine-readable output instead:

```
node dist/index.js check . --format json
```

```json
{
  "repository": ".",
  "status": "pass",
  "summary": { "total": 2, "passed": 2, "failed": 0 },
  "passed": [
    {
      "ruleId": "readme-exists",
      "ruleName": "README exists",
      "passed": true,
      "severity": "error",
      "message": "README.md found"
    }
  ],
  "failed": []
}
```

## Strict mode

Each rule has a severity: `error` or `warning`.

- By default, only `error`-level failures cause a non-zero exit code.
- With `--strict`, `warning`-level failures also cause a non-zero exit code.

```
node dist/index.js check . --strict
```

Use `--strict` in CI when you want warnings enforced as hard failures.

## Current rules

| Rule ID | Description | Severity |
|---|---|---|
| `readme-exists` | Fails if `README.md` is not found in the target directory | error |
| `readme-has-h1` | Fails if `README.md` does not contain an H1 heading (e.g. `# Title`) | warning |

## Roadmap

**Done:**
- CLI `check <path>` command
- Rule system (`core/` + `rules/`) supporting multiple checks
- Text and JSON output formats
- `--strict` mode

**Planned:**
- Additional rules (e.g. LICENSE, CONTRIBUTING.md presence)
- Config file support for enabling/disabling rules
- GitHub Actions integration

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
