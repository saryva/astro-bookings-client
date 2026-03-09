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
