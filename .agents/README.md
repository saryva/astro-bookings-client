# AstroBookings Client — AI Agent Pipeline

This folder contains the full **intelligent programming pipeline** for the AstroBookings Client project.
Each agent is a specialised AI role that reads inputs and produces a concrete artefact.

## Pipeline Overview

```
briefing.md
      |
      v
  +-----------------------------------------------------------+
  |  1. ANALYST          -> PRD.md                             |
  |  2. ARCHITECT        -> ADD.md                             |
  |  3. PRODUCT OWNER    -> specs/*.spec.md                    |
  |  4. ENGINEER         -> specs/*.plan.md                    |
  +-----------------------------------------------------------+
      |
      v  (repeat per feature: core-setup -> launches -> bookings)
  +-----------------------------------------------------------+
  |  5. CODER            -> src/ (feature implementation)      |
  |  6. TESTER           -> *.spec.ts + test-report.md         |
  |  7. E2E TESTER       -> tests/*.spec.ts + e2e-report.md   |
  |  8. CLEANER          -> refactored src/ + code-review.md   |
  |  9. DOCUMENTER       -> README.md + implementations.md    |
  +-----------------------------------------------------------+
```

Agents 1–4 run **once** to produce all specs and plans.
Agents 5–9 run **per feature** in dependency order (see pipeline table in `prompts/how-to-use.md`).

## Folder Structure

```
.agents/
├── astrobookings-client.briefing.md   <- Start here: project brief
├── PRD.md                             <- Product Requirements Document
├── ADD.md                             <- Architecture Design Document
|
├── 1-analyst.agent.md                 <- Agent definitions
├── 2-architect.agent.md
├── 3-product-owner.agent.md
├── 4-engineer.agent.md
├── 5-coder.agent.md
├── 6-tester.agent.md
├── 7-e2e-tester.agent.md
├── 8-cleaner.agent.md
├── 9-documenter.agent.md
|
├── prompts/
|   └── how-to-use.md                  <- Copy-paste prompts for each agent
|
├── specs/
|   ├── chore-core-setup.spec.md       <- Technical spec (Agent 3)
|   ├── chore-core-setup.plan.md       <- Implementation plan (Agent 4)
|   ├── feat-launch-list.spec.md
|   ├── feat-launch-list.plan.md
|   ├── feat-launch-detail.spec.md
|   ├── feat-launch-detail.plan.md
|   ├── feat-booking-form.spec.md
|   ├── feat-booking-form.plan.md
|   ├── feat-booking-list.spec.md
|   ├── feat-booking-list.plan.md
|   ├── test-report.md                 <- Unit test report (Agent 6, cumulative)
|   ├── e2e-report.md                  <- E2E test report (Agent 7, cumulative)
|   ├── code-review.md                 <- Code review findings (Agent 8, cumulative)
|   └── implementations.md            <- Implementation report (Agent 9, cumulative)
|
└── skills/
    └── angular-conventions/           <- Reusable Angular patterns
```

## How to Run the Pipeline

1. Open `.agents/prompts/how-to-use.md`
2. Run prompts 1–4 once to generate all specs and plans
3. Follow the **Feature Pipeline table** — run prompts 5T–9T for each feature in order
4. Replace `{FEATURE_SLUG}` in each template with the actual feature slug
5. Review each output before running the next agent
6. Merge to main after completing all 5 agents for a feature

> The PRD.md and ADD.md in this folder are pre-filled as a starting point.
> You can regenerate them by running Agent 1 and Agent 2.
