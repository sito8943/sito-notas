# Sito Notas

Notes app built with React 19, TypeScript, Vite, Tailwind CSS 4 and `@sito/ui`.
Accounts live in **sito-auth**; notes in the **Sito Notes API**.

## Development

```sh
cp .env.example .env   # set VITE_AUTH_URL and VITE_API_URL
pnpm install
pnpm dev
```

| Variable        | Purpose                                               |
| --------------- | ----------------------------------------------------- |
| `VITE_AUTH_URL` | sito-auth base URL (sign-in, refresh, password reset) |
| `VITE_API_URL`  | Sito Notes API base URL                               |

Both servers must allow this app's origin in `CORS_ALLOWED_ORIGINS`.

Checks: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test`, `pnpm build`.

Architecture rules: see [`ARCHITECTURE_RULES.md`](ARCHITECTURE_RULES.md).

## CI / Deploy

`.github/workflows/ci.yml`:

| Job              | When                              | What                                                               |
| ---------------- | --------------------------------- | ------------------------------------------------------------------ |
| `checks`         | every push to `main` and every PR | format, lint, typecheck, tests, build                              |
| `deploy-preview` | PRs from this repo                | Firebase Hosting preview channel (7 days), URL commented on the PR |
| `deploy-live`    | push to `main`                    | Firebase Hosting live (`sitonotas`)                                |

Deploy jobs are skipped with a warning until the secrets below exist.

Required repository secrets:

| Secret                               | Purpose                                                  |
| ------------------------------------ | -------------------------------------------------------- |
| `FIREBASE_SERVICE_ACCOUNT_SITONOTAS` | Service account JSON with Firebase Hosting deploy rights |
| `VITE_AUTH_URL`                      | Production sito-auth base URL                            |
| `VITE_API_URL`                       | Production Sito Notes API base URL                       |

Create the service account secret with `firebase init hosting:github`, or add it manually under Settings → Secrets and variables → Actions.
