# Test Report

**Test runner**: Vitest 4.0.18 via `@angular/build:unit-test`

## Overall Summary

| Metric | Value |
|--------|-------|
| Test files | 8 |
| Total tests | 65 |
| Passed | 65 |
| Failed | 0 |
| Duration | ~2s |

---

## chore-core-setup

**Date**: 2026-03-09
**Status**: PASS

### Summary

| Metric | Value |
|--------|-------|
| Test files | 6 (5 new + 1 existing) |
| Total tests | 28 |
| Passed | 28 |
| Failed | 0 |

## Test Files

### `src/app/core/api.config.spec.ts` (3 tests)

| Test | Status |
|------|--------|
| should be a non-empty string | PASS |
| should not have a trailing slash | PASS |
| should match the development environment apiUrl | PASS |

### `src/app/shared/components/loading/loading.spec.ts` (6 tests)

| Test | Status |
|------|--------|
| should create | PASS |
| should be standalone | PASS |
| should use OnPush change detection | PASS |
| should display a loading spinner element | PASS |
| should display "Loading..." text | PASS |
| should have aria-hidden on the spinner | PASS |

### `src/app/shared/components/error-message/error-message.spec.ts` (7 tests)

| Test | Status |
|------|--------|
| should create | PASS |
| should be standalone | PASS |
| should use OnPush change detection | PASS |
| should display the provided error message | PASS |
| should update when the message input changes | PASS |
| should have role="alert" for accessibility | PASS |
| should handle long error messages without breaking | PASS |

### `src/app/shared/components/empty-state/empty-state.spec.ts` (6 tests)

| Test | Status |
|------|--------|
| should create | PASS |
| should be standalone | PASS |
| should use OnPush change detection | PASS |
| should display the default message "No results found." | PASS |
| should display a custom message when provided | PASS |
| should update when the message input changes | PASS |

### `src/app/app.routes.spec.ts` (4 tests)

| Test | Status |
|------|--------|
| should have routes defined | PASS |
| should redirect root path to /launches | PASS |
| should have a lazy-loaded launches route | PASS |
| should have a lazy-loaded bookings route | PASS |

### `src/app/app.spec.ts` (2 tests — pre-existing, updated by Coder)

| Test | Status |
|------|--------|
| should create the app | PASS |
| should render title | PASS |

## Acceptance Criteria Coverage

| Criterion | Covered by |
|-----------|------------|
| Centralized API config exports base URL | `api.config.spec.ts` |
| Environment-based URL without code changes | `api.config.spec.ts` (no trailing slash, matches env) |
| LoadingComponent displays visible indicator | `loading.spec.ts` (spinner + text assertions) |
| ErrorMessageComponent displays provided message | `error-message.spec.ts` (input, update, long message) |
| EmptyStateComponent displays informative message | `empty-state.spec.ts` (default + custom message) |
| Shared components standalone + OnPush | All 3 component specs verify `standalone` and `onPush` |

## Edge Cases Tested

- `API_URL` has no trailing slash
- `ErrorMessageComponent` handles long error messages
- `EmptyStateComponent` uses meaningful default when no custom message provided
- Signal-based inputs update correctly via `componentRef.setInput()`

## Bugs Found

None.

## Notes

- Signal-based inputs must be tested using `fixture.componentRef.setInput()` — not by mutating a test host property — to avoid `NG0100: ExpressionChangedAfterItHasBeenCheckedError` with OnPush components.
- Interfaces (`Launch`, `Rocket`, `Booking`, `CreateBookingDto`) are TypeScript-only constructs with no runtime behavior; they are validated by the compiler, not unit tests.
- Environment file replacement (`environment.ts` -> `environment.prod.ts`) is an Angular CLI build configuration; it is verified by the production build, not unit tests.

---

## feat-launch-list

**Date**: 2026-03-09
**Status**: PASS

### Summary

| Metric | Value |
|--------|-------|
| Test files | 2 (new) |
| Total tests | 37 |
| Passed | 37 |
| Failed | 0 |

### `src/app/features/launches/launches.service.spec.ts` (18 tests)

| Test | Status |
|------|--------|
| should be created | PASS |
| initial state > should have empty launches array | PASS |
| initial state > should have loading as false | PASS |
| initial state > should have error as null | PASS |
| getAll > happy path > should set loading to true when called | PASS |
| getAll > happy path > should clear any previous error when called | PASS |
| getAll > happy path > should make a GET request to the launches endpoint | PASS |
| getAll > happy path > should set launches with the response data | PASS |
| getAll > happy path > should set loading to false after success | PASS |
| getAll > happy path > should keep error as null after success | PASS |
| getAll > empty response > should set launches to empty array | PASS |
| getAll > empty response > should set loading to false | PASS |
| getAll > error path > should set error with the error message | PASS |
| getAll > error path > should set launches to empty array on error | PASS |
| getAll > error path > should set loading to false on error | PASS |
| getAll > error path > should use fallback message when error has no message | PASS |
| getAll > edge cases > should handle launches with zero available seats | PASS |
| getAll > edge cases > should replace previous data on subsequent calls | PASS |

### `src/app/features/launches/launch-list/launch-list.spec.ts` (19 tests)

| Test | Status |
|------|--------|
| should create | PASS |
| should be standalone | PASS |
| should use OnPush change detection | PASS |
| should call service.getAll() on init | PASS |
| loading state > should display app-loading when loading is true | PASS |
| loading state > should not display launch cards when loading | PASS |
| error state > should display app-error-message when error is set | PASS |
| error state > should not display loading or launch cards on error | PASS |
| empty state > should display app-empty-state when launches is empty | PASS |
| data state > should display launch cards | PASS |
| data state > should display launch destination | PASS |
| data state > should display launch date | PASS |
| data state > should display rocket name | PASS |
| data state > should display price per seat | PASS |
| data state > should display available / total seats | PASS |
| data state > should have routerLink to launch detail | PASS |
| data state > should apply sold-out class when availableSeats is 0 | PASS |
| data state > should not apply sold-out class when seats are available | PASS |
| data state > should not show loading, error, or empty components | PASS |

### Acceptance Criteria Coverage

| Criterion | Covered by |
|-----------|------------|
| Navigating to /launches fetches launches | `launch-list.spec.ts` (calls getAll on init) |
| Display destination, date, rocket, price, seats | `launch-list.spec.ts` (data state tests) |
| Show loading while request in progress | `launch-list.spec.ts` (loading state) |
| Show error message on API failure | `launch-list.spec.ts` (error state) + `launches.service.spec.ts` (error path) |
| Show empty state for empty list | `launch-list.spec.ts` (empty state) |
| Clicking launch navigates to /launches/:id | `launch-list.spec.ts` (routerLink test) |

### Edge Cases Tested

- Service: empty API response, error with/without message, zero available seats, subsequent calls replace data
- Component: sold-out class applied/not-applied, mutual exclusivity of loading/error/empty/data states

### Bugs Found

None.
