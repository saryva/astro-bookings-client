# Booking Form — Implementation Plan

## File Map

| # | File Path | Action | Description |
|---|-----------|--------|-------------|
| 1 | `src/app/features/bookings/bookings.service.ts` | Create | HTTP service for bookings |
| 2 | `src/app/features/bookings/bookings.routes.ts` | Create | Feature routes |
| 3 | `src/app/features/bookings/booking-form/booking-form.ts` | Create | Booking form component |
| 4 | `src/app/features/bookings/booking-form/booking-form.html` | Create | Booking form template |
| 5 | `src/app/features/bookings/booking-form/booking-form.scss` | Create | Booking form styles |

## Service Contracts

### BookingsService

```typescript
// src/app/features/bookings/bookings.service.ts
@Injectable({ providedIn: 'root' })
export class BookingsService {

  /** Signal holding the last created booking (for confirmation) */
  readonly createdBooking: Signal<Booking | null>;

  /** Signal indicating whether a request is in progress */
  readonly loading: Signal<boolean>;

  /** Signal holding the last error message, or null */
  readonly error: Signal<string | null>;

  /**
   * Creates a new booking via the API.
   * Updates `createdBooking`, `loading`, and `error` signals.
   * @param dto - The booking creation payload
   */
  create(dto: CreateBookingDto): void;
}
```

- Endpoint: `POST {API_URL}/bookings`
- Body: `CreateBookingDto` as JSON.
- On success: sets `createdBooking` with response, `loading` to false, `error` to null.
- On error: sets `error` with message, `loading` to false, `createdBooking` to null.

## Component Contracts

### BookingFormComponent

| Property | Value |
|----------|-------|
| Selector | `app-booking-form` |
| Standalone | `true` |
| ChangeDetection | `OnPush` |
| Imports | `ReactiveFormsModule`, `LoadingComponent`, `ErrorMessageComponent` |
| Inputs | `launchId: input.required<string>()`, `availableSeats: input.required<number>()` |
| Outputs | `booked: output<Booking>()` |

**Template summary:**
- A form with two fields:
  - Traveler ID: `<input type="text">` — required
  - Number of seats: `<input type="number">` — required, min=1, max=availableSeats
- Submit button — disabled when form is invalid or `service.loading()` is true
- `@if (service.loading())` → `<app-loading />`
- `@if (service.error())` → `<app-error-message [message]="service.error()!" />`
- `@if (service.createdBooking())` → confirmation message with booking details

**Interactions:**
- On submit, builds `CreateBookingDto` from form values + `launchId` input, calls `service.create(dto)`.
- On successful booking, emits `booked` output with the created `Booking`.

## Dependencies

```
api.config.ts ← BookingsService ← BookingFormComponent
booking.interface.ts ← BookingsService
LoadingComponent     ─┐
ErrorMessageComponent ├── BookingFormComponent
ReactiveFormsModule  ─┘

LaunchDetailComponent → BookingFormComponent (passes launchId + availableSeats as inputs)
```

**Prerequisites:**
- `chore-core-setup` (models, shared components, API config)
- `feat-launch-detail` (host component that provides launchId and availableSeats)

**Note:** `app.config.ts` must include `provideHttpClient()` (done in core-setup).

## Edge Cases

- `availableSeats === 0` → the parent component (LaunchDetailComponent) should not render BookingFormComponent at all.
- User enters `numberOfSeats > availableSeats` → form validation prevents submission.
- User submits, then modifies form → clear previous `createdBooking` and `error` signals.
- API returns 409 (conflict, seats taken by another user) → display error from API response body.
- Traveler ID with leading/trailing spaces → trim before sending to API.
