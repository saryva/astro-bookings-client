# Launch Detail — Implementation Plan

## File Map

| # | File Path | Action | Description |
|---|-----------|--------|-------------|
| 1 | `src/app/features/launches/launches.service.ts` | Modify | Add `getById()` method |
| 2 | `src/app/features/launches/launch-detail/launch-detail.ts` | Create | Launch detail page component |
| 3 | `src/app/features/launches/launch-detail/launch-detail.html` | Create | Launch detail template |
| 4 | `src/app/features/launches/launch-detail/launch-detail.scss` | Create | Launch detail styles |
| 5 | `src/app/features/launches/launches.routes.ts` | Modify | Add detail route |

## Service Contracts

### LaunchesService (additions)

```typescript
// Added to existing LaunchesService

  /** Signal holding the currently selected launch */
  readonly selectedLaunch: Signal<Launch | null>;

  /**
   * Fetches a single launch by ID from the API.
   * Updates `selectedLaunch`, `loading`, and `error` signals.
   * @param id - The launch ID
   */
  getById(id: string): void;
```

- Endpoint: `GET {API_URL}/launches/:id`
- On success: sets `selectedLaunch` with response, `loading` to false, `error` to null.
- On error: sets `error` with message, `loading` to false, `selectedLaunch` to null.

## Component Contracts

### LaunchDetailComponent

| Property | Value |
|----------|-------|
| Selector | `app-launch-detail` |
| Standalone | `true` |
| ChangeDetection | `OnPush` |
| Imports | `RouterLink`, `LoadingComponent`, `ErrorMessageComponent`, `BookingFormComponent` |
| Inputs | none (reads `:id` from `ActivatedRoute`) |
| Outputs | none |

**Template summary:**
- `@if (service.loading())` → `<app-loading />`
- `@else if (service.error())` → `<app-error-message [message]="service.error()!" />`
- `@else if (service.selectedLaunch())` → launch detail view:
  - Mission, destination, date, status
  - Rocket: name, capacity, range
  - Price per seat, available/total seats
  - Back link: `[routerLink]="['/launches']"`
  - Booking section: `<app-booking-form />` (or link to booking)

**Interactions:**
- On init, reads `id` from route params and calls `service.getById(id)`.
- Back link navigates to `/launches`.
- Booking form or link allows the customer to book on this launch.

## Dependencies

```
LaunchesService (already exists from feat-launch-list)
  └── LaunchDetailComponent
        ├── LoadingComponent
        ├── ErrorMessageComponent
        └── BookingFormComponent (from feat-booking-form, optional dependency)
```

**Prerequisite:** `feat-launch-list` must be implemented first (creates LaunchesService and routes file).

## Edge Cases

- Invalid or non-existent launch ID → API returns 404 → display error message.
- `availableSeats === 0` → show "Sold out" and disable/hide booking form.
- Route param `id` changes without component destroy (same-route navigation) → must react to param changes.
