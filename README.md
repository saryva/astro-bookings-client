# AstroBookings Client

Angular SPA that consumes the AstroBookings REST API to let users browse rocket launches and book seats. Built as a training/demo project with a structured AI agent pipeline for development.

## Prerequisites

- **Node.js** >= 18
- **npm** >= 10

## Quick Start

```bash
npm install
npm start
```

The dev server starts at `http://localhost:4200`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server at http://localhost:4200 (`ng serve`) |
| `npm run build` | Production build to `dist/` |
| `npm test` | Unit tests with Vitest (`ng test`) |
| `npm run watch` | Dev build with watch mode |

## Tech Stack

- **Angular 21** — standalone components, signals, new control flow syntax
- **TypeScript 5.9** — strict mode
- **Vitest** — unit tests via `@angular/build:unit-test`
- **SCSS** — BEM methodology
- **SSR** — `@angular/ssr` with Express (port 4000 for SSR, 4200 for dev)
- **Prettier** — code formatting (100 printWidth, single quotes)

## Architecture

The app follows a **feature-first** folder structure with lazy-loaded routes. State management uses Angular Signals (`signal()`, `computed()`, `toSignal()`).

```
src/app/
  app.ts                          # Root component (shell + router-outlet)
  app.routes.ts                   # Top-level routes with lazy loading
  app.config.ts                   # Application providers (router, http, hydration)
  core/
    api.config.ts                 # API base URL from environment
    models/
      launch.interface.ts         # Launch, Rocket interfaces
      booking.interface.ts        # Booking, CreateBookingDto interfaces
  shared/
    components/
      loading/                    # Loading spinner component
      error-message/              # Error display component
      empty-state/                # Empty state component
  features/
    launches/
      launches.routes.ts          # Feature routes (list active, detail planned)
      launches.service.ts         # HTTP service: fetches launches, exposes signals
      launch-list/                # Launch list page component
    bookings/
      bookings.routes.ts          # Feature routes (stub — list + form planned)
```

### Key Patterns

- **Standalone components only** — no NgModules
- **OnPush change detection** on all components
- **Signal-based inputs** (`input()` / `input.required()`)
- **Services**: `providedIn: 'root'`, expose state as signals (`data`, `loading`, `error`)
- **HTTP calls** only through services, never from components
- **SCSS**: BEM strict, CSS variables for colors, mobile-first, max 3 nesting levels
- **Environment-based API config** — centralized `API_URL` constant, swapped at build time for production

### Routing

| Path | Feature | Load |
|------|---------|------|
| `/` | Redirect to `/launches` | — |
| `/launches` | Launches | Lazy |
| `/bookings` | Bookings | Lazy |

## Features

### chore-core-setup

Foundation layer providing API configuration, domain models, and shared UI components.

**What it includes:**

- **Environment config** — `environment.ts` (dev) and `environment.prod.ts` (prod) with `apiUrl`, swapped via `fileReplacements` in `angular.json`
- **API config** — `core/api.config.ts` exports `API_URL` from the active environment
- **Domain models** — `Launch`, `Rocket`, `Booking`, `CreateBookingDto` interfaces
- **Shared components:**
  - `<app-loading>` — spinner with "Loading..." text
  - `<app-error-message [message]="...">` — styled error display with `role="alert"`
  - `<app-empty-state>` — default "No results found." or custom message
- **App shell** — header with title + `<router-outlet>`
- **Routing** — redirect `/` to `/launches`, lazy-loaded feature route stubs
- **HttpClient** — `provideHttpClient(withFetch())` registered in app config

### feat-launch-list

Browse available rocket launches with destination, date, pricing, and seat availability.

**Route:** `/launches`

**What it includes:**

- **LaunchesService** — fetches launches from `GET /api/launches`, exposes `launches`, `loading`, and `error` as signals
- **LaunchListComponent** — page component at `/launches` that displays a responsive grid of launch cards
- **Launch cards** show: destination, date (`DatePipe`), rocket name, price per seat (`CurrencyPipe`), and available/total seats
- **State handling** — loading spinner, error message, and empty state via shared components
- **Sold-out indicator** — visual styling when `availableSeats === 0`
- **Navigation** — clicking a launch card navigates to `/launches/:id` (detail page planned)
- **SSR** — `launches/**` routes set to `RenderMode.Client` to avoid prerendering API-dependent pages

## Agent Pipeline

The `.agents/` directory contains an AI agent pipeline for structured product development:

| Agent | Role | Output |
|-------|------|--------|
| 1-analyst | Business Analyst | `.agents/PRD.md` |
| 2-architect | Frontend Architect | `.agents/ADD.md` |
| 3-product-owner | Product Owner | `.agents/specs/backlog.md` |
| 4-engineer | Technical Spec Writer | `.agents/specs/*.spec.md` |
| 5-coder | Angular Developer | `src/` implementation |
| 6-tester | Unit Tester (Vitest) | `*.spec.ts` + test report |
| 7-e2e-tester | E2E Tester (Playwright) | `tests/*.spec.ts` + e2e report |
| 8-cleaner | Code Reviewer | refactored code |
| 9-documenter | Documenter | `README.md` + `implementations.md` |

Skills (reusable step-by-step guides with templates) live in `.agents/skills/`.
