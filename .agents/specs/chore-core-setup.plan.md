# Core Setup — Implementation Plan

## File Map

| # | File Path | Action | Description |
|---|-----------|--------|-------------|
| 1 | `src/environments/environment.ts` | Create | Development environment config |
| 2 | `src/environments/environment.prod.ts` | Create | Production environment config |
| 3 | `src/app/core/api.config.ts` | Create | API base URL export |
| 4 | `src/app/core/models/launch.interface.ts` | Create | Launch, Rocket interfaces |
| 5 | `src/app/core/models/booking.interface.ts` | Create | Booking, CreateBookingDto interfaces |
| 6 | `src/app/shared/components/loading/loading.ts` | Create | Loading spinner component |
| 7 | `src/app/shared/components/loading/loading.html` | Create | Loading spinner template |
| 8 | `src/app/shared/components/loading/loading.scss` | Create | Loading spinner styles |
| 9 | `src/app/shared/components/error-message/error-message.ts` | Create | Error message component |
| 10 | `src/app/shared/components/error-message/error-message.html` | Create | Error message template |
| 11 | `src/app/shared/components/error-message/error-message.scss` | Create | Error message styles |
| 12 | `src/app/shared/components/empty-state/empty-state.ts` | Create | Empty state component |
| 13 | `src/app/shared/components/empty-state/empty-state.html` | Create | Empty state template |
| 14 | `src/app/shared/components/empty-state/empty-state.scss` | Create | Empty state styles |
| 15 | `src/app/app.config.ts` | Modify | Add `provideHttpClient()` to providers |
| 16 | `src/app/app.routes.ts` | Modify | Add redirect `/` -> `/launches` and lazy routes |

## Models / Interfaces

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: '/api',
};
```

```typescript
// src/app/core/api.config.ts
import { environment } from '../../environments/environment';

/** Base URL for the AstroBookings REST API */
export const API_URL: string = environment.apiUrl;
```

```typescript
// src/app/core/models/launch.interface.ts

/** Rocket attached to a launch */
export interface Rocket {
  id: string;
  name: string;
  capacity: number;
  range: string;
}

/** A scheduled rocket launch */
export interface Launch {
  id: string;
  agencyId: string;
  rocketId: string;
  date: string;
  mission: string;
  destination: string;
  pricePerSeat: number;
  totalSeats: number;
  availableSeats: number;
  status: string;
  rocket: Rocket;
}
```

```typescript
// src/app/core/models/booking.interface.ts

/** A confirmed booking */
export interface Booking {
  id: string;
  launchId: string;
  travelerId: string;
  numberOfSeats: number;
  totalPrice: number;
  status: string;
}

/** DTO for creating a new booking */
export interface CreateBookingDto {
  launchId: string;
  travelerId: string;
  numberOfSeats: number;
}
```

## Component Contracts

### LoadingComponent

| Property | Value |
|----------|-------|
| Selector | `app-loading` |
| Standalone | `true` |
| ChangeDetection | `OnPush` |
| Inputs | none |
| Outputs | none |
| Template | A spinner or "Loading..." text indicator |

### ErrorMessageComponent

| Property | Value |
|----------|-------|
| Selector | `app-error-message` |
| Standalone | `true` |
| ChangeDetection | `OnPush` |
| Inputs | `message: input.required<string>()` |
| Outputs | none |
| Template | Displays the error `message` in a styled container |

### EmptyStateComponent

| Property | Value |
|----------|-------|
| Selector | `app-empty-state` |
| Standalone | `true` |
| ChangeDetection | `OnPush` |
| Inputs | `message: input<string>('No results found.')` |
| Outputs | none |
| Template | Displays the `message` in a styled container |

## Dependencies

```
environment.ts
  └── api.config.ts
        └── (used by all feature services)

launch.interface.ts  (used by launches feature)
booking.interface.ts (used by bookings feature)

LoadingComponent     ─┐
ErrorMessageComponent ├── (used by all feature components)
EmptyStateComponent  ─┘
```

**Implementation order:**
1. Environment files
2. `api.config.ts`
3. Domain model interfaces
4. Shared components (loading, error-message, empty-state) — parallel
5. Modify `app.config.ts` (add `provideHttpClient()`)
6. Modify `app.routes.ts` (add redirect + lazy routes)

## Edge Cases

- `API_URL` must not have a trailing slash — services append paths like `/launches`.
- `ErrorMessageComponent` must handle long error messages without breaking layout.
- `EmptyStateComponent` default message must be meaningful if no custom message is provided.
