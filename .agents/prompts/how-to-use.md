# Prompts — Ready to Use

These are copy-paste prompts to run each agent in your AI tool of choice
(Claude, GitHub Copilot Chat, Cursor, etc.).

---

## Prompt 1 — Run the Analyst

```
You are Agent 1 - Analyst. Read the instructions in `.agents/1-analyst.agent.md`.

Your input is `.agents/astrobookings-client.briefing.md`.
Your output must be saved as `.agents/PRD.md`.

Follow the output format and rules defined in the agent file exactly.
```

---

## Prompt 2 — Run the Architect

```
You are Agent 2 - Architect. Read the instructions in `.agents/2-architect.agent.md`.

Your inputs are:
- `.agents/PRD.md`
- `.agents/astrobookings-client.briefing.md`

Your output must be saved as `.agents/ADD.md`.

Follow the output format and rules defined in the agent file exactly.
```

---

## Prompt 3 — Run the Product Owner

```
You are Agent 3 - Product Owner. Read the instructions in `.agents/3-product-owner.agent.md`.

Your inputs are:
- `.agents/PRD.md`
- `.agents/ADD.md`

Your output must be saved as `.agents/specs/backlog.md`.

Follow the output format and rules defined in the agent file exactly.
```

---

## Prompt 4 — Run the Engineer

```
You are Agent 4 - Engineer. Read the instructions in `.agents/4-engineer.agent.md`.

Your inputs are:
- `.agents/ADD.md`
- `.agents/specs/backlog.md`

Your outputs must be saved as:
- `.agents/specs/launches.spec.md`
- `.agents/specs/bookings.spec.md`
- `.agents/specs/shared.spec.md`

Follow the output format and rules defined in the agent file exactly.
```

---

## Prompt 5 — Run the Coder

```
You are Agent 5 - Coder. Read the instructions in `.agents/5-coder.agent.md`.

Your inputs are:
- `.agents/ADD.md`
- `.agents/specs/launches.spec.md`
- `.agents/specs/bookings.spec.md`
- `.agents/specs/shared.spec.md`
- `.agents/specs/backlog.md`

Implement the full Angular application under `src/`.
Follow the file structure defined in ADD.md exactly.
Follow Angular patterns defined in CLAUDE.md and the angular-conventions skill.
```

---

## Prompt 6 — Run the Unit Tester

```
You are Agent 6 - Tester. Read the instructions in `.agents/6-tester.agent.md`.

Your inputs are:
- `.agents/specs/backlog.md`
- `.agents/specs/launches.spec.md`
- `.agents/specs/bookings.spec.md`
- All source files in `src/`

Write unit tests for all services and components.
Place each `.spec.ts` file alongside the file it tests.
Produce a test report at `.agents/specs/test-report.md`.
```

---

## Prompt 7 — Run the E2E Tester

```
You are Agent 7 - E2E Tester. Read the instructions in `.agents/7-e2e-tester.agent.md`.

Your inputs are:
- `.agents/specs/backlog.md`
- The running application (`npm start`)

Write Playwright E2E tests in `tests/` covering every acceptance criterion.
Produce an E2E report at `.agents/specs/e2e-report.md`.
```

---

## Prompt 8 — Run the Cleaner

```
You are Agent 8 - Cleaner. Read the instructions in `.agents/8-cleaner.agent.md`.

Review all source files in `src/` and all test files.
Fix all critical issues you find.
Produce a code review report at `.agents/specs/code-review.md`.
```

---

## Prompt 9 — Run DevOps

```
You are Agent 9 - DevOps. Read the instructions in `.agents/9-dev-ops.agent.md`.

Your inputs are all source files and `.agents/ADD.md`.

Produce:
- `README.md` (developer guide)
- `.github/workflows/ci.yml` (GitHub Actions CI pipeline)
```

---

## Tips for Using These Prompts

1. **Run agents in order** — each one depends on the output of the previous.
2. **Review each output** before running the next agent — catch errors early.
3. **In Cursor / Copilot Chat**: open the relevant files before pasting the prompt so they are in context.
4. **In Claude**: paste the prompt and attach or paste the relevant `.md` files.
5. **Iterate**: if the output is not what you expected, refine the agent `.md` file and re-run.
