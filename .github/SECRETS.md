# GitHub Secrets

Configure these repository or environment secrets before relying on the CI and release workflows.

| Secret | Used by | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SENTRY_DSN` | `ci.yml` build | Public DSN embedded into the production build so the Sentry SDK can send events. |
| `SENTRY_AUTH_TOKEN` | `ci.yml` build, `sentry.yml` release | Authenticates source map upload during build and release creation in Sentry. |
| `SENTRY_ORG` | `ci.yml` build, `sentry.yml` release | Sentry organization slug. |
| `SENTRY_PROJECT` | `ci.yml` build, `sentry.yml` release | Sentry project slug for this portfolio. |
| `LHCI_GITHUB_APP_TOKEN` | `ci.yml` Lighthouse CI | Optional Lighthouse CI GitHub token for commit status integration; temporary public storage works without it. |
