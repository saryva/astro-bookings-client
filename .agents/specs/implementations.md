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
