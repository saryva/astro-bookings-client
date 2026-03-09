# Prompts — Ready to Use

These are copy-paste prompts to run each agent in your AI tool of choice
(Claude, GitHub Copilot Chat, Cursor, etc.).

---

## Feature-by-Feature Pipeline

Run agents 1–4 **once** to produce all specs and plans.
Then run agents 5–9 **per feature** in the order below.

### Prerequisites (run once)

| Step | Agent | Prompt |
|------|-------|--------|
| P1 | 1 - Analyst | Prompt 1 |
| P2 | 2 - Architect | Prompt 2 |
| P3 | 3 - Product Owner | Prompt 3 |
| P4 | 4 - Engineer | Prompt 4 |

### Feature Pipeline (run in order)

Replace `{FEATURE_SLUG}` in prompts 5T–9T with the feature slug from the table.

| Step | Feature | Agent | Prompt | Branch | Notes |
|------|---------|-------|--------|--------|-------|
| 1 | chore-core-setup | 5 - Coder | 5T | chore/core-setup | |
| 2 | chore-core-setup | 6 - Tester | 6T | chore/core-setup | |
| 3 | chore-core-setup | 7 - E2E | 7T | chore/core-setup | SKIP: no user-facing routes |
| 4 | chore-core-setup | 8 - Cleaner | 8T | chore/core-setup | |
| 5 | chore-core-setup | 9 - Documenter | 9T | chore/core-setup | Merge to main after |
| 6 | feat-launch-list | 5 - Coder | 5T | feat/launch-list | |
| 7 | feat-launch-list | 6 - Tester | 6T | feat/launch-list | |
| 8 | feat-launch-list | 7 - E2E | 7T | feat/launch-list | Start `npm start` first |
| 9 | feat-launch-list | 8 - Cleaner | 8T | feat/launch-list | |
| 10 | feat-launch-list | 9 - Documenter | 9T | feat/launch-list | Merge to main after |
| 11 | feat-launch-detail | 5 - Coder | 5T | feat/launch-detail | |
| 12 | feat-launch-detail | 6 - Tester | 6T | feat/launch-detail | |
| 13 | feat-launch-detail | 7 - E2E | 7T | feat/launch-detail | |
| 14 | feat-launch-detail | 8 - Cleaner | 8T | feat/launch-detail | |
| 15 | feat-launch-detail | 9 - Documenter | 9T | feat/launch-detail | Merge to main after |
| 16 | feat-booking-form | 5 - Coder | 5T | feat/booking-form | |
| 17 | feat-booking-form | 6 - Tester | 6T | feat/booking-form | |
| 18 | feat-booking-form | 7 - E2E | 7T | feat/booking-form | |
| 19 | feat-booking-form | 8 - Cleaner | 8T | feat/booking-form | |
| 20 | feat-booking-form | 9 - Documenter | 9T | feat/booking-form | Merge to main after |
| 21 | feat-booking-list | 5 - Coder | 5T | feat/booking-list | |
| 22 | feat-booking-list | 6 - Tester | 6T | feat/booking-list | |
| 23 | feat-booking-list | 7 - E2E | 7T | feat/booking-list | |
| 24 | feat-booking-list | 8 - Cleaner | 8T | feat/booking-list | |
| 25 | feat-booking-list | 9 - Documenter | 9T | feat/booking-list | Merge to main after |

---

## Phase 1: Analysis Prompts (run once)

### Prompt 1 — Run the Analyst

```
You are Agent 1 - Analyst. Read the instructions in `.agents/1-analyst.agent.md`.

Your input is `.agents/astrobookings-client.briefing.md`.
Your output must be saved as `.agents/PRD.md`.

Follow the output format and rules defined in the agent file exactly.
```

---

### Prompt 2 — Run the Architect

```
You are Agent 2 - Architect. Read the instructions in `.agents/2-architect.agent.md`.

Your inputs are:
- `.agents/PRD.md`
- `.agents/astrobookings-client.briefing.md`

Your output must be saved as `.agents/ADD.md`.

Follow the output format and rules defined in the agent file exactly.
```

---

### Prompt 3 — Run the Product Owner

```
You are Agent 3 - Product Owner. Read the instructions in `.agents/3-product-owner.agent.md`.

Your inputs are:
- `.agents/PRD.md`
- `.agents/ADD.md`

Your outputs must be saved as `.agents/specs/<spec-slug>.spec.md` (one per requirement).

Follow the generating-specs skill and spec template exactly.
```

---

### Prompt 4 — Run the Engineer

```
You are Agent 4 - Engineer. Read the instructions in `.agents/4-engineer.agent.md`.

Your inputs are:
- `.agents/ADD.md`
- `.agents/specs/*.spec.md`

Your outputs must be saved as `.agents/specs/<spec-slug>.plan.md` (one per spec).

Follow the output format and rules defined in the agent file exactly.
```

---

## Phase 2: Feature Prompt Templates (run per feature)

> Replace every `{FEATURE_SLUG}` with the actual feature slug (e.g. `chore-core-setup`, `feat-launch-list`).

### Prompt 5T — Run the Coder

```
You are Agent 5 - Coder. Read the instructions in `.agents/5-coder.agent.md`.

Your inputs are:
- `.agents/ADD.md`
- `.agents/specs/{FEATURE_SLUG}.spec.md`
- `.agents/specs/{FEATURE_SLUG}.plan.md`

Implement ONLY the feature defined in `{FEATURE_SLUG}`. Do not modify or create files outside the scope defined in the plan's File Map.

Follow the file structure defined in ADD.md.
Follow Angular patterns defined in CLAUDE.md and the angular-conventions skill.

After implementation, verify the project compiles: `npm run build`.
```

---

### Prompt 6T — Run the Tester

```
You are Agent 6 - Tester. Read the instructions in `.agents/6-tester.agent.md`.

Your inputs are:
- `.agents/specs/{FEATURE_SLUG}.spec.md`
- `.agents/specs/{FEATURE_SLUG}.plan.md`
- All source files created or modified by the `{FEATURE_SLUG}` plan (see its File Map)

Write unit tests ONLY for the files in scope of `{FEATURE_SLUG}`.
Place each `.spec.ts` file alongside the file it tests.
Run all tests with `npm test` and ensure they pass.
Append findings to `.agents/specs/test-report.md` under a `## {FEATURE_SLUG}` heading.
```

---

### Prompt 7T — Run the E2E Tester

```
You are Agent 7 - E2E Tester. Read the instructions in `.agents/7-e2e-tester.agent.md`.

Your inputs are:
- `.agents/specs/{FEATURE_SLUG}.spec.md`
- The running application (`npm start`)

Write Playwright E2E tests for the acceptance criteria of `{FEATURE_SLUG}` ONLY.
Place tests in `tests/{FEATURE_SLUG}.spec.ts`.
Ensure the dev server is running before executing tests.
Run tests with `npx playwright test tests/{FEATURE_SLUG}.spec.ts`.
Append findings to `.agents/specs/e2e-report.md` under a `## {FEATURE_SLUG}` heading.

After the E2E step, also run `npx playwright test` (all tests) to verify no regressions.
```

---

### Prompt 8T — Run the Cleaner

```
You are Agent 8 - Cleaner. Read the instructions in `.agents/8-cleaner.agent.md`.

Your inputs are:
- `.agents/specs/{FEATURE_SLUG}.plan.md` (to know which files are in scope)
- All source files and test files created or modified by `{FEATURE_SLUG}`
- `.agents/ADD.md` (to verify architectural compliance)

Review ONLY the files in scope of `{FEATURE_SLUG}`.
Fix all critical issues directly in the source files.
Append findings to `.agents/specs/code-review.md` under a `## {FEATURE_SLUG}` heading.
```

---

### Prompt 9T — Run the Documenter

```
You are Agent 9 - Documenter. Read the instructions in `.agents/9-documenter.agent.md`.

Your inputs are:
- `.agents/specs/{FEATURE_SLUG}.spec.md`
- `.agents/specs/{FEATURE_SLUG}.plan.md`
- All source files in `src/`
- `CLAUDE.md`

Update documentation for the `{FEATURE_SLUG}` feature:
- Update `README.md` incrementally (add/update the feature's section).
- Append a `## {FEATURE_SLUG}` section to `.agents/specs/implementations.md` with: status, components, services, models, routes, and deviations from plan.

Do NOT overwrite sections from previous features.
```

---

## Tips for Using These Prompts

1. **Run agents 1–4 once** to produce all specs and plans before starting the feature pipeline.
2. **Run agents 5–9 per feature** in the exact order shown in the Pipeline table.
3. **Replace `{FEATURE_SLUG}`** in every prompt template before pasting.
4. **Review each output** before running the next agent — catch errors early.
5. **Merge to main** after completing all 5 agents for a feature, before starting the next feature.
6. **In Cursor / Copilot Chat**: open the relevant files before pasting the prompt so they are in context.
7. **In Claude**: paste the prompt and attach or paste the relevant `.md` files.
8. **E2E note**: skip E2E (Prompt 7T) for `chore-core-setup` — it has no user-facing routes.
9. **Regression check**: after each E2E step, run the full test suite to catch regressions.
