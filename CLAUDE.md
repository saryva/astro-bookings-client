# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AstroBookings Client is an Angular SPA that consumes the AstroBookings REST API to let users browse rocket launches and book seats. It is a training/demo project — no auth, payments, or production infra required.

## Commands

```bash
npm start          # Dev server at http://localhost:4200 (ng serve)
npm run build      # Production build → dist/
npm test           # Unit tests with Vitest (via Angular CLI: ng test)
npm run watch      # Dev build with watch mode
```

There is no linter configured. Formatting uses Prettier (`.prettierrc`: 100 printWidth, single quotes, Angular HTML parser).

## Tech Stack

- **Angular 21** (standalone components, signals, new control flow syntax)
- **TypeScript 5.9** with strict mode
- **Vitest** for unit tests (configured via `@angular/build:unit-test`, globals from `vitest/globals`)
- **SCSS** for styles (BEM methodology)
- **SSR** enabled via `@angular/ssr` with Express (port 4000 for SSR, 4200 for dev)
- Package manager: **npm**

## Architecture

The app is in early bootstrap stage. Current source is just the scaffolded root component (`src/app/app.ts`). The planned architecture (defined in `.agents/ADD.md`) follows a **feature-first** structure:

```
src/app/
  core/models/        # Domain interfaces (Launch, Booking, CreateBookingDto)
  features/launches/  # Launch list feature (lazy-loaded)
  features/bookings/  # Booking management feature (lazy-loaded)
  shared/components/  # Reusable UI: loading spinner, error message, empty state
```

State management: Angular Signals (`signal()`, `computed()`, `toSignal()`) — no NgRx or BehaviorSubject.

## Angular Conventions

Defined in `.agents/skills/angular-conventions/angular-conventions.skill.md`:

- **Standalone components only** — no NgModules
- `inject()` instead of constructor injection
- `ChangeDetectionStrategy.OnPush` on all components
- Signal-based inputs (`input()` / `input.required()`) and outputs (`output()`)
- Templates: `@if` / `@for` / `@switch` — never NgIf/NgFor directives
- `track item.id` required on all `@for` loops
- Services: `providedIn: 'root'`, expose state as signals (`data`, `loading`, `error`)
- HTTP calls only through services, never from components
- SCSS: BEM strict, CSS variables for colors, mobile-first, max 3 nesting levels
- No `any`, no `console.log` in production code, JSDoc on public methods

## Agent Pipeline

The `.agents/` directory contains an AI agent pipeline for structured product development:

| Agent | Role | Input | Output |
|-------|------|-------|--------|
| 1-analyst | Business Analyst | briefing | `.agents/PRD.md` |
| 2-architect | Frontend Architect | PRD | `.agents/ADD.md` |
| 3-product-owner | Product Owner | PRD + ADD | `.agents/specs/backlog.md` |
| 4-engineer | Technical Spec Writer | ADD + backlog | `.agents/specs/*.spec.md` |
| 5-coder | Angular Developer | specs | `src/` implementation |
| 6-tester | Unit Tester (Vitest) | specs + code | `*.spec.ts` + test report |
| 7-e2e-tester | E2E Tester (Playwright) | backlog + running app | `tests/*.spec.ts` + e2e report |
| 8-cleaner | Code Reviewer | code + tests | refactored code |
| 9-documenter | Documenter | project + specs | `README.md` + `implementations.md` |

Skills (reusable step-by-step guides with templates) live in `.agents/skills/`.

## Environment & Conventions

- Windows with Git Bash terminal
- Default branch: `main`
- Code and documentation in English; chat responses match user's language
- Naming: slugs with hyphens for identifiers and non-code filenames
- Branch/commit prefixes: `feat/<slug>` / `fix/<slug>` / `chore/<slug>` with matching commit prefixes (`feat:`, `fix:`, `chore:`)
