# Sito Notas Architecture Rules For Agents (CLAUDE/CODEX)

This file overrides the styling (5) and folder-structure (6 and 7) sections of
the workspace `../ARCHITECTURE_RULES.md` for Sito Notas. Every other workspace
rule still applies (Context + Provider, managers, routing, i18n).

## Scope

- React 19 + TypeScript (strict) under `src/`.
- Backend: sito-auth (accounts, tokens) + Sito Notes API (data).
- Styling: Tailwind CSS v4 + `@sito/ui` 0.10.x, tokens in `src/styles/global.css`.

---

## 1) Folder Structure (Required) — Feature-Sliced + Atomic Design

```txt
src/
  app/                       # Composition root
    App.tsx                  # Router + route table
    api/                     # AppApiClient: aggregates feature services
    layouts/                 # App shells that wire feature state (AuthLayout, ViewLayout)
    pages/                   # Feature-less pages (NotFound)
    providers/               # AppProviders: provider tree
    index.ts

  shared/                    # Domain-agnostic code only
    components/
      atoms/                 # Smallest UI units (FAB, Syncing)
      molecules/             # Small compositions (Field, InputControl, ThemeToggle)
      organisms/             # Larger self-contained blocks (ErrorHandler, SplashScreen)
      templates/             # Presentational page shells (AuthTemplate, AppShellTemplate)
    hooks/
    lib/                     # http (HttpClient, SessionManager), queryClient, storage helpers
    providers/               # ApiClientProvider, ThemeProvider
    config.ts
    routes.ts                # AppRoute + route helpers

  features/
    <feature>/               # auth, notes, settings
      pages/                 # Route-level screens of the feature
      components/
      providers/
      models/                # Typed domain entities (Note, Account)
      services/              # API access for the feature domain
      constants.ts
      index.ts               # Public feature API

  lang/                      # i18n resources
  styles/                    # global.css (Tailwind entry + tokens), animations/
  main.tsx
```

### Atomic levels

- **atoms**: one element or a thin wrapper over a `@sito/ui` primitive.
- **molecules**: a few atoms working together for one purpose.
- **organisms**: a complete UI block that may hold local state.
- **templates**: layout skeletons that receive content through props/children.
  A shell that reads feature state (account, cache) is not a template; it goes
  to `app/layouts/`.
- Pages are not an atomic level here: they live in `features/<feature>/pages/`
  (or `app/pages/` when they belong to no feature).
- Before creating a component, check whether `@sito/ui` already provides it.

### Dependency rules

- `app/` may import `shared/` and `features/`.
- `features/` may import `shared/` and other features **only through their
  `index.ts`**. Never import another feature's internals.
- `shared/` must never import `features/` or `app/`.
- Import other folders with the `@/` alias (`@/shared/...`, `@/features/notes`);
  use `./` only for siblings inside the same unit. Never use `../`.
- Exception: `app/App.tsx` lazy-loads `features/*/pages/*` directly so each
  page stays its own chunk.
- Promote code to `shared/` only when it is domain-agnostic or reused by more
  than one feature.

---

## 2) Unit-Level File Structure (Mandatory)

```txt
Something/
  Something.tsx|ts   # One component, hook, provider or service per file
  constants.ts
  utils.ts
  types.ts           # Props, context values and other type aliases
  index.ts           # Public exports (values and types)
```

- Move helpers to `utils.ts` and constants to `constants.ts`, as siblings of
  the unit they support.
- Put props, context values and other types in `types.ts`.
- Providers split context (`XContext.ts`), hook (`useX.ts`) and component.
- Closed sets are `as const` objects with a derived union type.
- Every unit folder exposes its API through `index.ts`; import through it.

---

## 3) API Access

- `shared/providers/ApiClientProvider` declares an empty `ApiClient`
  interface; `app/api/AppApiClient.ts` extends it by declaration merging, so
  `useAppApiClient()` is typed without `shared` depending on features.
- `shared/lib/http` holds the domain-agnostic HTTP layer: `HttpClient`
  (JSON fetch, Bearer token, `HttpError`, retry once after a 401) and
  `SessionManager` (token storage, proactive single-flight refresh).
- Each feature owns its service in `features/<feature>/services/`, built on an
  `HttpClient` it receives (never `fetch` directly).
- `app/api/AppApiClient` creates one `SessionManager`, one `HttpClient` per
  server and the feature services; `AppProviders` injects one instance into
  `shared/providers/ApiClientProvider`.
- Components read the client with `useAppApiClient()`; never instantiate
  services or HTTP clients from UI code.

---

## 4) Styling

- No inline Tailwind utility chains in `className`. Each component owns a
  sibling `styles.css` with semantic classes built with `@apply`, starting with
  `@reference "@/styles/global.css";`, and imports it (`import "./styles.css"`).
- Name classes after the component (`.sidebar`, `.sidebar-header`); express
  states as modifier classes (`.sidebar.open`, `.sidebar-item.active`), not
  ternaries over utility strings.
- `className` only lists those semantic classes, shared helpers
  (`.reveal-after-grow`, `.primary`) or props forwarded by the parent.
- Tokens stay in `src/styles/global.css`. The theme resets `--color-*`, so only
  palette colors exist as utilities (no `bg-black`); use plain CSS otherwise.

---

## 5) Routing

- All paths live in `shared/routes.ts` (`AppRoute`, `getNoteRoute(id)`).
- Do not hardcode route strings in `navigate`, `<Link to>` or `<Route path>`.
