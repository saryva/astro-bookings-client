# Test Report — chore-core-setup

**Date**: 2026-03-09
**Status**: PASS
**Test runner**: Vitest 4.0.18 via `@angular/build:unit-test`

## Summary

| Metric | Value |
|--------|-------|
| Test files | 6 (5 new + 1 existing) |
| Total tests | 28 |
| Passed | 28 |
| Failed | 0 |
| Duration | ~3s |

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
