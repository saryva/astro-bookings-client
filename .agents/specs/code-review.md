# Code Review — chore-core-setup

**Date**: 2026-03-09
**Reviewer**: Agent 8 — Cleaner
**Status**: PASS (after fixes)

## Review Summary

| Category | Issues found | Fixed |
|----------|-------------|-------|
| Critical | 2 | 2 |
| Minor | 0 | — |
| Info | 2 | — |

## Critical Issues (Fixed)

### 1. `src/app/app.ts` — Missing `standalone: true` and `OnPush`

**Rule violated**: Angular conventions require `standalone: true` and `ChangeDetectionStrategy.OnPush` on all components.

**Before**:
```typescript
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
```

**After**:
```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
```

> Note: Angular 21 defaults `standalone: true`, so the app compiled without it. However, the conventions require it to be explicit for readability and consistency with all other components in the project.

### 2. `src/app/shared/components/loading/loading.spec.ts` — Unused import

**Rule violated**: No unused imports.

Removed unused `ChangeDetectionStrategy` import.

## Informational Notes (No action needed)

### 1. Test files use `(Component as any).ɵcmp` for metadata inspection

This is the only way to assert `standalone` and `onPush` at runtime in Angular unit tests. The `any` cast is confined to test files and does not violate the "no `any` in production code" rule.

### 2. SCSS fallback values in `var()` functions

All SCSS files use CSS custom properties with hardcoded fallback values (e.g., `var(--color-primary, #3f51b5)`). This is correct per the convention — the fallback ensures the component renders correctly even without a global theme. The actual colors are defined as CSS variables, not hardcoded.

## Checklist

### TypeScript Quality
- [x] No `any` in production code
- [x] No unused imports
- [x] No `console.log`
- [x] JSDoc on public methods/properties
- [x] Named constants (no magic numbers)

### Angular Best Practices
- [x] All components: `standalone: true`
- [x] All components: `ChangeDetectionStrategy.OnPush`
- [x] Signal-based inputs (`input()` / `input.required()`)
- [x] No constructor injection (no constructors at all)
- [x] `provideHttpClient(withFetch())` in app config

### Template Quality
- [x] No complex logic in templates
- [x] Accessible markup (`role="alert"`, `aria-hidden`)
- [x] BEM class naming

### SCSS Quality
- [x] BEM strict: `.block__element--modifier`
- [x] CSS variables for all colors
- [x] No `!important`
- [x] Max 2 nesting levels (within limit of 3)
- [x] No hardcoded colors outside `var()` fallbacks

### Architecture Compliance
- [x] Folder structure matches ADD
- [x] Core models in `core/models/`
- [x] API config in `core/`
- [x] Shared components in `shared/components/`
- [x] Feature route stubs in `features/<name>/`
- [x] No cross-feature imports
- [x] Lazy-loaded feature routes via `loadChildren`
- [x] Environment file replacement configured in `angular.json`

## Verification

- `ng build` — succeeds
- `ng test` — 28/28 passing

---

## feat-launch-list

**Date**: 2026-03-09
**Reviewer**: Agent 8 — Cleaner
**Status**: PASS (after fix)

### Files Reviewed

| File | Type |
|------|------|
| `src/app/features/launches/launches.service.ts` | Service |
| `src/app/features/launches/launches.routes.ts` | Routes |
| `src/app/features/launches/launch-list/launch-list.ts` | Component |
| `src/app/features/launches/launch-list/launch-list.html` | Template |
| `src/app/features/launches/launch-list/launch-list.scss` | Styles |
| `src/app/features/launches/launches.service.spec.ts` | Unit test |
| `src/app/features/launches/launch-list/launch-list.spec.ts` | Unit test |
| `tests/feat-launch-list.spec.ts` | E2E test |

### Review Summary

| Category | Issues found | Fixed |
|----------|-------------|-------|
| Critical | 1 | 1 |
| Minor | 0 | — |
| Info | 1 | — |

### Critical Issues (Fixed)

#### 1. `launches.service.ts:28` — `??` should be `||` in error handler

**Rule violated**: Template relies on `service.error()` being truthy to show error state. Using `??` (nullish coalescing) only catches `null`/`undefined`, not empty strings.

**Impact**: If `HttpClient` returns an error where `err.message` is `""` (which can happen with `withFetch()` on certain network errors), the `error` signal is set to `""`. The template condition `@else if (service.error())` evaluates to `false`, so the empty state renders instead of the error state — breaking AC4.

**Before**:
```typescript
this.error.set(err?.message ?? 'Failed to load launches');
```

**After**:
```typescript
this.error.set(err?.message || 'Failed to load launches');
```

### Informational Notes (No action needed)

#### 1. Test files duplicate `MOCK_LAUNCHES` constant

Both `launches.service.spec.ts` and `launch-list.spec.ts` define identical `MOCK_LAUNCHES` arrays. This is acceptable because test files should be self-contained and not share state. Extracting to a shared test fixture would add coupling for minimal benefit.

### Checklist

#### TypeScript Quality
- [x] No `any` in production code
- [x] No unused imports
- [x] No `console.log`
- [x] JSDoc on all public methods and properties
- [x] Named constants — `API_URL` imported from config, no magic strings

#### Angular Best Practices
- [x] `standalone: true` on component
- [x] `ChangeDetectionStrategy.OnPush` on component
- [x] `inject()` for dependency injection (no constructor)
- [x] `@Injectable({ providedIn: 'root' })` on service
- [x] Service exposes `launches`, `loading`, `error` as signals
- [x] HTTP calls only in service, never in component
- [x] `catchError` handles API failures with fallback message

#### Template Quality
- [x] New control flow: `@if` / `@else if` / `@for` (no NgIf/NgFor)
- [x] `track launch.id` on `@for` loop
- [x] All four states handled: loading → error → empty → data
- [x] Semantic HTML: `<section>`, `<h2>`, `<ul>`, `<li>`, `<a>`
- [x] No complex logic beyond signal reads and conditionals

#### SCSS Quality
- [x] BEM strict: `.launch-list__title`, `.launch-card__destination`, `.launch-card__seats--sold-out`
- [x] CSS variables for all colors with fallback values
- [x] No `!important`
- [x] Mobile-first with `min-width` breakpoints (600px, 960px)
- [x] Max 3 nesting levels (`.launch-card > &__seats > &--sold-out`)

#### Architecture Compliance
- [x] Feature files in `src/app/features/launches/` per ADD
- [x] No cross-feature imports
- [x] Shared components imported from `shared/components/`
- [x] Lazy-loaded via `loadChildren` in `app.routes.ts`
- [x] Domain model `Launch` imported from `core/models/`

### Verification

- `npm test` — 65/65 passing (all 8 test files)
- No regressions introduced by the `??` → `||` fix
