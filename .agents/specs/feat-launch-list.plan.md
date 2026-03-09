# Launch List — Implementation Plan

## File Map

| # | File Path | Action | Description |
|---|-----------|--------|-------------|
| 1 | `src/app/features/launches/launches.service.ts` | Create | HTTP service for launches |
| 2 | `src/app/features/launches/launches.routes.ts` | Create | Feature routes (list + detail) |
| 3 | `src/app/features/launches/launch-list/launch-list.ts` | Create | Launch list page component |
| 4 | `src/app/features/launches/launch-list/launch-list.html` | Create | Launch list template |
| 5 | `src/app/features/launches/launch-list/launch-list.scss` | Create | Launch list styles |

## Service Contracts

### LaunchesService

```typescript
// src/app/features/launches/launches.service.ts
@Injectable({ providedIn: 'root' })
export class LaunchesService {

  /** Signal holding the list of launches */
  readonly launches: Signal<Launch[]>;

  /** Signal indicating whether a request is in progress */
  readonly loading: Signal<boolean>;

  /** Signal holding the last error message, or null */
  readonly error: Signal<string | null>;

  /**
   * Fetches all available launches from the API.
   * Updates `launches`, `loading`, and `error` signals.
   */
  getAll(): void;
}
```

- Endpoint: `GET {API_URL}/launches`
- On success: sets `launches` with response array, `loading` to false, `error` to null.
- On error: sets `error` with message, `loading` to false, `launches` to empty array.

## Component Contracts

### LaunchListComponent

| Property | Value |
|----------|-------|
| Selector | `app-launch-list` |
| Standalone | `true` |
| ChangeDetection | `OnPush` |
| Imports | `RouterLink`, `LoadingComponent`, `ErrorMessageComponent`, `EmptyStateComponent` |
| Inputs | none |
| Outputs | none |

**Template summary:**
- `@if (service.loading())` → `<app-loading />`
- `@else if (service.error())` → `<app-error-message [message]="service.error()!" />`
- `@else if (service.launches().length === 0)` → `<app-empty-state message="No launches available." />`
- `@else` → `@for (launch of service.launches(); track launch.id)` → launch card with `[routerLink]="['/launches', launch.id]"`

**Each launch card displays:**
- `launch.destination`
- `launch.date`
- `launch.rocket.name`
- `launch.pricePerSeat` (formatted as currency)
- `launch.availableSeats` / `launch.totalSeats`

**Interactions:**
- On init, calls `service.getAll()`.
- Clicking a launch card navigates to `/launches/:id`.

## Dependencies

```
api.config.ts ← LaunchesService ← LaunchListComponent
launch.interface.ts ← LaunchesService
LoadingComponent    ─┐
ErrorMessageComponent├── LaunchListComponent
EmptyStateComponent ─┘
RouterLink          ─┘
```

**Prerequisite:** `chore-core-setup` must be implemented first.

## Edge Cases

- All launches may have `availableSeats === 0` — still display them but visually indicate "sold out".
- `launch.date` comes as an ISO string — format it for display (e.g. `DatePipe`).
- API may return launches with missing `rocket` object — guard against null rocket in the template.
