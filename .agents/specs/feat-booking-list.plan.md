# Booking List — Implementation Plan

## File Map

| # | File Path | Action | Description |
|---|-----------|--------|-------------|
| 1 | `src/app/features/bookings/bookings.service.ts` | Modify | Add `getByTraveler()` method |
| 2 | `src/app/features/bookings/booking-list/booking-list.ts` | Create | Booking list page component |
| 3 | `src/app/features/bookings/booking-list/booking-list.html` | Create | Booking list template |
| 4 | `src/app/features/bookings/booking-list/booking-list.scss` | Create | Booking list styles |
| 5 | `src/app/features/bookings/bookings.routes.ts` | Modify | Add booking list route |

## Service Contracts

### BookingsService (additions)

```typescript
// Added to existing BookingsService

  /** Signal holding the list of bookings for a traveler */
  readonly bookings: Signal<Booking[]>;

  /**
   * Fetches all bookings for a given traveler from the API.
   * Updates `bookings`, `loading`, and `error` signals.
   * @param travelerId - The traveler's ID
   */
  getByTraveler(travelerId: string): void;
```

- Endpoint: `GET {API_URL}/bookings?travelerId=:id`
- On success: sets `bookings` with response array, `loading` to false, `error` to null.
- On error: sets `error` with message, `loading` to false, `bookings` to empty array.

## Component Contracts

### BookingListComponent

| Property | Value |
|----------|-------|
| Selector | `app-booking-list` |
| Standalone | `true` |
| ChangeDetection | `OnPush` |
| Imports | `RouterLink`, `LoadingComponent`, `ErrorMessageComponent`, `EmptyStateComponent` |
| Inputs | none (reads `:travelerId` from `ActivatedRoute`) |
| Outputs | none |

**Template summary:**
- `@if (service.loading())` → `<app-loading />`
- `@else if (service.error())` → `<app-error-message [message]="service.error()!" />`
- `@else if (service.bookings().length === 0)` → `<app-empty-state message="No bookings found for this traveler." />`
- `@else` → `@for (booking of service.bookings(); track booking.id)` → booking row

**Each booking row displays:**
- `booking.launchId` (as launch reference)
- `booking.numberOfSeats`
- `booking.totalPrice` (formatted as currency)
- `booking.status`

**Interactions:**
- On init, reads `travelerId` from route params and calls `service.getByTraveler(travelerId)`.

## Dependencies

```
BookingsService (already exists from feat-booking-form)
  └── BookingListComponent
        ├── LoadingComponent
        ├── ErrorMessageComponent
        └── EmptyStateComponent
```

**Prerequisites:**
- `chore-core-setup` (models, shared components, API config)
- `feat-booking-form` (creates BookingsService and routes file)

## Edge Cases

- Invalid or non-existent traveler ID → API returns empty array → display empty state (not an error).
- Route param `travelerId` changes without component destroy → must react to param changes.
- `booking.totalPrice` could be 0 if `pricePerSeat` was 0 → display as valid value, not an error.
