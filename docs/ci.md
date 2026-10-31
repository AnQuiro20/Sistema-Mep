# Continuous integration

Workflow: `.github/workflows/ci.yml`. Three jobs run on every pull request and on pushes to `main`:

| Job               | Checks                                                         |
| ----------------- | -------------------------------------------------------------- |
| `quality`         | `format:check`, `verify` (typecheck and lint), `test`, `build` |
| `dependency-scan` | `npm audit --omit=dev --audit-level=high`                      |
| `secret-scan`     | gitleaks over the full history                                 |

## Branch protection for `main`

Required settings: require pull requests, require the three jobs above to pass, require branches to be up to date, include administrators (no bypass), and block force pushes and deletions.

GitHub only offers branch protection on private repositories with a paid plan. Until the repository is public or upgraded, the checks run but cannot block a merge.
