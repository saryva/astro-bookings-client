# E2E Test Report

**Test runner**: Playwright 1.52.0 (Chromium)
**Base URL**: http://localhost:4200

---

## feat-launch-list

**Date**: 2026-03-09
**Status**: PASS (with caveats)

### Summary

| Metric | Value |
|--------|-------|
| Test file | `tests/feat-launch-list.spec.ts` |
| Total tests | 6 |
| Passed | 6 |
| Failed | 0 |
| Duration | ~2.8s |

### Tests

| Test | AC | Status |
|------|----|--------|
| should navigate to /launches when visiting the root URL | AC1 | PASS |
| should display the page title | AC1 | PASS |
| should briefly show the loading component while fetching | AC3 | PASS |
| should display the empty state component | AC5 | PASS |
| should display "No launches available." message | AC5 | PASS |
| should not show loading, error, or launch cards | AC5 | PASS |

### Acceptance Criteria Coverage

| Criterion | E2E Coverage | Notes |
|-----------|-------------|-------|
| AC1: Navigate to /launches fetches launches | Covered | Root URL redirects to /launches; title visible |
| AC2: Display launch details | **Not testable** | API returns empty array — no launch data to render |
| AC3: Loading state | Covered | Verifies page resolves from loading to a final state |
| AC4: Error state on API failure | **Not testable** | API at localhost:3000 is running and returns 200 |
| AC5: Empty state for empty list | Covered | API returns `[]`; empty state component displayed correctly |
| AC6: Click navigates to detail | **Not testable** | No launch cards rendered (empty data) |

### Findings

1. **API is running but has no data**: The backend at `http://localhost:3000/api/launches` responds with `200 OK` and an empty array `[]`. This means:
   - AC5 (empty state) is naturally testable and verified.
   - AC2 (display launch details), AC4 (error state), and AC6 (click navigation) cannot be tested without seed data or a stopped API.

2. **No mocking applied**: Per Agent 7 rules ("Do not mock the backend — E2E tests exercise the full stack"), no network interception was used. Tests reflect the actual application behavior against the live API.

3. **No bugs found**: All observable behaviors match the spec. The loading → empty state transition works correctly.

### Recommendations

- **Seed the API with test data** before running E2E tests to enable AC2 and AC6 coverage.
- **Provide a mechanism to stop/error the API** (or run tests without the API) to enable AC4 coverage. Note: when the API is stopped, verify that the `LaunchesService.catchError` correctly sets the `error` signal to a truthy string (the `??` operator in the error handler may not catch empty-string error messages — consider using `||` instead).
