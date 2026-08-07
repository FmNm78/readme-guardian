# Contributing

Thanks for your interest in contributing to README Guardian.

## Local development

```
git clone https://github.com/FmNm78/readme-guardian.git
cd readme-guardian
npm install
```

Useful commands while working:

```
npm run dev -- check .   # run the CLI directly against TypeScript source
npm run build      # compile to dist/
npm test           # run the Vitest suite once
npm run test:watch  # watch mode
```

Before opening a pull request, both of these should pass:

```
npm test
npm run build
```

**Troubleshooting:** if `npm test` fails with
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

## Adding a new rule

Rules follow a fixed shape (`Rule` in `src/core/types.ts`): `id`, `name`,
`severity`, and a `check(targetDir)` function returning `{ passed, message }`.
When adding one, update all of the following — missing a step is the most
common way a new rule silently breaks existing tests or the CLI output:

1. **`src/rules/<yourRule>.ts`** — the rule implementation itself.
2. **`src/rules/index.ts`** — import it and add it to the `allRules` array.
3. **A fixture** under `fixtures/` for the positive case (a directory
   containing whatever file/structure the rule checks for). Reuse an
   existing fixture for the negative case if one already lacks that file.
4. **A unit test** in `test/rules/<yourRule>.test.ts` covering both the
   passing and failing case, following the pattern in the existing rule
   tests.
5. **`fixtures/complete/`** — add whatever file your rule checks for here
   too, so this fixture keeps passing all rules. `test/rules/allRules.test.ts`
   asserts this fixture passes every rule; forgetting this step breaks that
   test.
6. **`test/rules/allRules.test.ts`** — update the `toHaveLength(N)`
   assertion to the new total rule count.
7. **`README.md`** — add a row to the rules table (rule ID, what it checks,
   severity).

## Notes

Please keep changes focused and include clear descriptions in pull requests.
