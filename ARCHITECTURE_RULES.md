# Sito Notas Architecture Rules For Agents (CLAUDE/CODEX)

This file overrides the folder-structure sections (6 and 7) of the workspace
`../ARCHITECTURE_RULES.md` for Sito Notas. Every other workspace rule still
applies (Context + Provider, managers, Tailwind, routing, i18n).

## Scope

- React 19 + JavaScript (JSX) under `src/`.
- Backend: Supabase (auth + `notes` table).
- Styling: Tailwind CSS v4 + `@sito/ui` 0.10.x, tokens in `src/styles/global.css`.

---

## 1) Folder Structure (Required) — Feature-Sliced + Atomic Design

```txt
src/
  app/                       # Composition root
    App.jsx                  # Router + route table
    api/                     # AppApiClient: aggregates feature services
    layouts/                 # App shells that wire feature state (AuthLayout, ViewLayout)
    pages/                   # Feature-less pages (NotFound)
    providers/               # AppProviders: provider tree
    index.js

  shared/                    # Domain-agnostic code only
    components/
      atoms/                 # Smallest UI units (FAB, Syncing)
      molecules/             # Small compositions (Field, InputControl, ModeButton)
      organisms/             # Larger self-contained blocks (ErrorHandler, SplashScreen)
      templates/             # Presentational page shells with no feature state
    hooks/
    lib/                     # supabase client, queryClient, storage helpers
    providers/               # ApiClientProvider, ThemeProvider
    config.js
    routes.js                # AppRoute + route helpers

  features/
    <feature>/               # auth, notes, settings
      pages/                 # Route-level screens of the feature
      components/
      providers/
      services/              # Supabase access for the feature domain
      constants.js
      index.js               # Public feature API

  lang/                      # i18n resources
  styles/                    # global.css (Tailwind entry + tokens), animations/
  main.jsx
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
  `index.js`**. Never import another feature's internals.
- `shared/` must never import `features/` or `app/`.
- Exception: `app/App.jsx` lazy-loads `features/*/pages/*` directly so each
  page stays its own chunk.
- Promote code to `shared/` only when it is domain-agnostic or reused by more
  than one feature.

---

## 2) Unit-Level File Structure (Mandatory)

```txt
Something/
  Something.jsx|js   # One component, hook, provider or service per file
  constants.js
  utils.js
  index.js           # Public exports
```

- Move helpers to `utils.js` and constants to `constants.js`, as siblings of
  the unit they support.
- Every unit folder exposes its API through `index.js`; import through it.

---

## 3) API Access

- Each feature owns its Supabase service in `features/<feature>/services/`.
- `app/api/AppApiClient` aggregates them; `AppProviders` injects one instance
  into `shared/providers/ApiClientProvider`.
- Components read the client with `useAppApiClient()`; never instantiate
  services or import the Supabase client from UI code.

---

## 4) Routing

- All paths live in `shared/routes.js` (`AppRoute`, `getNoteRoute(id)`).
- Do not hardcode route strings in `navigate`, `<Link to>` or `<Route path>`.
