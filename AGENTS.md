# Agents Instructions

## Product Overview
- AstroBookings Client is an Angular SPA for browsing rocket launches and booking seats.
- Consumes the AstroBookings REST API. No auth, no payments, demo/training only.

## Technical Implementation

### Tech Stack
- **Language**: TypeScript 5.9 (strict mode)
- **Framework**: Angular 21 (standalone components, signals)
- **Database**: None (API-driven)
- **Security**: None (out of scope)
- **Testing**: Vitest via @angular/build:unit-test
- **Logging**: None (no console.log in production code)

### Development workflow

```bash
# Install dependencies
npm install
# Run dev server at localhost:4200
npm start
# Build for production
npm run build
# Run unit tests
npm test
```

### Folder structure
```text
.                              # Project root
├── AGENTS.md                  # This file with instructions for AI agents
├── CLAUDE.md                  # Claude Code specific instructions
├── .agents/                   # Agents related files
|   ├── PRD.md                 # Product Requirements Document
|   ├── ADD.md                 # Architectural Design Document
|   ├── specs/                 # Feature specifications
|   └── skills/                # Custom agent skills and templates
├── src/
|   └── app/
|       ├── app.ts             # Root component (shell)
|       ├── app.routes.ts      # Top-level lazy routes
|       ├── app.config.ts      # App providers
|       ├── core/models/       # Domain interfaces (Launch, Booking)
|       ├── shared/components/ # Reusable UI (loading, error, empty)
|       └── features/
|           ├── launches/      # Launch list + detail + service
|           └── bookings/      # Booking list + form + service
└── public/                    # Static assets
```

## Architecture Rules
- Standalone components only. No NgModules.
- inject() instead of constructor injection.
- ChangeDetectionStrategy.OnPush on all components.
- Signal-based inputs (input() / input.required()) and outputs (output()).
- State management with Angular Signals only. No NgRx, no BehaviorSubject.
- Services: providedIn root, expose data/loading/error as signals.
- HTTP calls only in services, never in components.
- Templates: @if / @for / @switch. Never NgIf/NgFor directives.
- track item.id required on all @for loops.
- SCSS: BEM strict, CSS variables for colors, mobile-first, max 3 nesting levels.
- No any type. No console.log in production code.
- JSDoc on public methods.

## Environment
- This is a Windows environment using Git Bash terminal.
- Default git branch is `main` unless specified otherwise.
- Mind the available **agent skills** when performing tasks.

## Behavior Guidelines
- Code and documentation must be in English.
- Chat responses must be in the language of the user prompt.
- Sacrifice grammar for conciseness when needed to fit response limits.
- When using templates, ensure to replace {placeholders} with actual values.

### Naming Conventions

Use slugs with hyphens for any identifiers or non-code file names.

| Spec        | GitHub Label  | Git Branch    | Commit  |
|-------------|---------------|---------------|---------|
| feat-<slug> | enhancement   | feat/<slug>   | feat:   |
| bug-<slug>  | bug           | fix/<slug>    | fix:    |
| chore-<slug>| chore         | chore/<slug>  | chore:  |
