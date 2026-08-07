# README Guardian

A command-line tool that checks whether a repository meets basic open-source
readiness standards: README quality, contributor entry points, and common
GitHub community files.

## Why

Missing or thin README, license, or contributor docs are some of the most
common reasons a repository is hard to use or contribute to. README Guardian
automates these checks so you can catch gaps in a script, a pre-commit hook,
or CI, instead of relying on manual review.

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

## Usage

Run against any directory:

```
node dist/index.js check .
```

Run without building, directly against TypeScript source (development use):

```
npm run dev -- check .
```

By default, output is human-readable text with a summary and grouped
passed/failed sections. Pass `--format json` for machine-readable output
instead:

```
node dist/index.js check . --format json
```

```json
{
  "repository": ".",
  "status": "pass",
  "summary": { "total": 11, "passed": 11, "failed": 0 },
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

- **Default mode**: only `error`-level failures cause a non-zero exit code.
  A failing `warning`-level rule is reported but does not fail the run.
- **`--strict` mode**: `warning`-level failures also cause a non-zero exit
  code, on top of `error`-level ones.

```
node dist/index.js check . --strict
```

Use `--strict` in CI once you want every rule enforced as a hard failure,
not just the `error`-level ones.

## Current rules

| Rule ID | Checks for | Severity |
|---|---|---|
| `readme-exists` | `README.md` in the target directory | error |
| `readme-has-h1` | An H1 heading (`# Title`) inside `README.md` | warning |
| `license-exists` | `LICENSE`, `LICENSE.md`, or `LICENSE.txt` | error |
| `contributing-exists` | `CONTRIBUTING.md` | warning |
| `security-policy-exists` | `SECURITY.md` | warning |
| `code-of-conduct-exists` | `CODE_OF_CONDUCT.md` | warning |
| `codeowners-exists` | `CODEOWNERS`, checked in GitHub's own lookup order: `.github/CODEOWNERS`, then `CODEOWNERS` (root), then `docs/CODEOWNERS` | warning |
| `issue-template-exists` | A real template (`.md`/`.yml`/`.yaml`, excluding `config.yml`) in `.github/ISSUE_TEMPLATE/`, or a single-file template at `.github/ISSUE_TEMPLATE.md`, `ISSUE_TEMPLATE.md`, or `docs/ISSUE_TEMPLATE.md` | warning |
| `pull-request-template-exists` | A `.md` file in `.github/PULL_REQUEST_TEMPLATE/`, or a single-file template at `.github/PULL_REQUEST_TEMPLATE.md`, `PULL_REQUEST_TEMPLATE.md`, or `docs/PULL_REQUEST_TEMPLATE.md` | warning |
| `branch-protection-exists` | `.github/settings.yml` (the Probot Settings app convention for declaring branch protection as code). This is a file-based proxy only — actual branch protection is a GitHub server-side setting this tool has no API access to verify | warning |
| `funding-exists` | `.github/FUNDING.yml` (existence only, contents are not validated) | warning |

All 11 rules run on every `check` call; there's currently no way to select a
subset.

## Development

```
npm install       # install dependencies
npm run dev -- check .   # run the CLI directly against TypeScript source
npm run build      # compile to dist/
npm run start -- check .  # run the compiled CLI
```

## Testing

```
npm test           # run the full Vitest suite once
npm run test:watch  # watch mode, for active development
npm run test:clean  # clear the Vitest cache (see Troubleshooting below)
```

Fixtures live under `fixtures/`, one directory per scenario. `fixtures/complete/`
is a combined fixture that's expected to pass all 11 rules — it exists to
catch regressions where a new rule silently breaks the "everything passes"
baseline.

**Troubleshooting:** if a test run fails with
`TypeError: Cannot read properties of undefined (reading 'config')`, try in
order:

```
npm run test:clean
npm test
```

If it still fails, reinstall dependencies and retry:

```
npm ci
npm test
```

## Roadmap

**Done:**
- CLI `check <path>` command
- Rule system (`core/` + `rules/`) supporting multiple checks
- Text and JSON output formats
- `--strict` mode
- 11 repository-readiness rules
- CI running install, tests, build, and a self-check

**Planned:**
- Config file support for enabling/disabling individual rules
- Rule for a `CHANGELOG.md`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
