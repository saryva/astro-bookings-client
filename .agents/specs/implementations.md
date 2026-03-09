# Implementation Report

## chore-core-setup

**Status**: Complete

### Components created

| Component | Selector | Inputs | Path |
|-----------|----------|--------|------|
| `LoadingComponent` | `app-loading` | none | `src/app/shared/components/loading/` |
| `ErrorMessageComponent` | `app-error-message` | `message: input.required<string>()` | `src/app/shared/components/error-message/` |
| `EmptyStateComponent` | `app-empty-state` | `message: input<string>('No results found.')` | `src/app/shared/components/empty-state/` |

All components are standalone with `ChangeDetectionStrategy.OnPush`.

### Components modified

| Component | File | Change |
|-----------|------|--------|
| `App` (root) | `src/app/app.ts` | Added `standalone: true`, `OnPush`. Template replaced with app shell (header + router-outlet). |

### Services created

None (core setup does not include services).

### Models created

| Interface | File |
|-----------|------|
| `Rocket` | `src/app/core/models/launch.interface.ts` |
| `Launch` | `src/app/core/models/launch.interface.ts` |
| `Booking` | `src/app/core/models/booking.interface.ts` |
| `CreateBookingDto` | `src/app/core/models/booking.interface.ts` |

### Configuration files created

| File | Description |
|------|-------------|
| `src/environments/environment.ts` | Dev environment (`apiUrl: 'http://localhost:3000/api'`) |
| `src/environments/environment.prod.ts` | Prod environment (`apiUrl: '/api'`) |
| `src/app/core/api.config.ts` | Exports `API_URL` from active environment |

### Routes configured

| Path | Target | Type |
|------|--------|------|
| `/` | Redirect to `/launches` | `pathMatch: 'full'` |
| `/launches` | `launchesRoutes` | Lazy (`loadChildren`) |
| `/bookings` | `bookingsRoutes` | Lazy (`loadChildren`) |

### Files modified

| File | Change |
|------|--------|
| `src/app/app.config.ts` | Added `provideHttpClient(withFetch())` |
| `src/app/app.routes.ts` | Added redirect and lazy feature routes |
| `angular.json` | Added `fileReplacements` for prod environment swap |

### Deviations from plan

| # | Deviation | Reason |
|---|-----------|--------|
| 1 | Created `src/app/features/launches/launches.routes.ts` and `src/app/features/bookings/bookings.routes.ts` (empty stub route files) | Not in original file map, but required for `loadChildren` to resolve at build time. |
| 2 | Replaced default Angular template in `app.html` with app shell | Not explicitly in file map, but necessary for the root component to function as a router shell. |
| 3 | Added `standalone: true` and `OnPush` to root `App` component | Addressed during code review (Agent 8) — conventions require these on all components. |

---

## feat-launch-list

**Status**: Complete

### Components created

| Component | Selector | Inputs | Path |
|-----------|----------|--------|------|
| `LaunchListComponent` | `app-launch-list` | none | `src/app/features/launches/launch-list/` |

Standalone, `ChangeDetectionStrategy.OnPush`, uses `inject()` for DI. On init calls `LaunchesService.getAll()`. Template handles four states: loading, error, empty, and data.

### Services created

| Service | Method | Signals | Path |
|---------|--------|---------|------|
| `LaunchesService` | `getAll()` | `launches`, `loading`, `error` | `src/app/features/launches/launches.service.ts` |

`providedIn: 'root'`. Fetches `GET {API_URL}/launches` via `HttpClient`. Uses `catchError` with `||` fallback for error messages (fixed during code review from `??` to `||`).

### Models used

| Interface | Source |
|-----------|--------|
| `Launch` | `src/app/core/models/launch.interface.ts` (created in chore-core-setup) |
| `Rocket` | `src/app/core/models/launch.interface.ts` (created in chore-core-setup) |

### Routes configured

| Path | Component | File |
|------|-----------|------|
| `/launches` (default child) | `LaunchListComponent` | `src/app/features/launches/launches.routes.ts` |

The parent `/launches` route in `app.routes.ts` lazy-loads `launchesRoutes` via `loadChildren`.

### Files modified

| File | Change |
|------|--------|
| `src/app/features/launches/launches.routes.ts` | Updated from empty stub to register `LaunchListComponent` at default path |
| `src/app/app.routes.server.ts` | Added `launches/**` and `bookings/**` with `RenderMode.Client` to prevent SSR prerendering of API-dependent routes |

### Deviations from plan

| # | Deviation | Reason |
|---|-----------|--------|
| 1 | Plan suggested guarding against missing `rocket` object in template; implementation accesses `launch.rocket.name` directly | The `Launch` interface defines `rocket: Rocket` (non-optional), so the guard is unnecessary. If the API returns null, it would be a data integrity issue, not a client concern. |
| 2 | `app.routes.server.ts` modified to set `RenderMode.Client` for feature routes | Not in original file map, but required to prevent SSR prerendering failures on routes that fetch API data at runtime. |
| 3 | Error handler uses logical OR instead of nullish coalescing for fallback message | Fixed during code review (Agent 8). The `??` operator didn't catch empty-string error messages, which caused the template to show empty state instead of error state. |
