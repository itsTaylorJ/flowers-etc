# FlowersEtc — Project Context

## Current authority

This file is the repo-level source of truth for project context and engineering working rules.

Before significant planning, implementation, review, or handoff work, also read:

`C:\Users\tjlan\Obsidian Vault\FlowersEtc\Handoffs\Current Handoff.md`

If Obsidian notes conflict with explicit repo behavior or a later approved repo decision, the repo wins.

## Current objective

Create one central digital order-management system for the flower shop.

All order sources should ultimately become the same canonical Order record:

- website orders
- phone orders
- manual/in-store orders

## Current priorities

- consistent order capture
- order status tracking
- due-date management
- calendar-based workflow
- post-entry editing
- one central production queue
- reducing paper dependence
- keeping the system simple for a small shop

## Product principles

- One order model regardless of order source
- Prefer one central system over parallel systems
- Phone/manual orders must flow into the same queue as online orders
- Orders must remain editable after creation
- Due dates and fulfillment status must be easy to see
- Avoid unnecessary enterprise complexity
- Do not add features simply because they are technically possible

## Active project paths

Active code repository:

`C:\Users\tjlan\Projects\flowers-etc`

Obsidian knowledge base:

`C:\Users\tjlan\Obsidian Vault\FlowersEtc`

Archived repository:

`C:\Users\tjlan\Obsidian Vault\FlowersEtc-ARCHIVE`

Never use the archived repository for implementation work.

## Agent roles

### Claude

Primary roles:

- architecture
- workflow analysis
- data-model planning
- implementation planning
- code review
- operational tradeoff analysis

### Codex

Primary roles:

- implementation
- debugging
- testing
- targeted refactoring
- verification
- applying approved fixes

## Before editing

1. Read this file.
2. Read the current Obsidian handoff.
3. Inspect the existing implementation.
4. Check `git status`.
5. Prefer the smallest change that satisfies the approved requirement.

## Development rules

- Do not silently make business or product decisions.
- Do not introduce a second competing order system.
- Do not silently change the canonical order model.
- Do not add payment, POS, CRM, loyalty, or analytics systems unless explicitly approved.
- Do not upgrade dependencies merely because newer versions exist.
- Do not expose or commit secrets.
- Preserve existing behavior unless the task explicitly requires changing it.

## If a decision is unresolved

Stop and identify the decision needed.

Do not guess.

After approval:
1. Update the appropriate project documentation.
2. Then implement.

## Validation after changes

1. Run relevant tests or validation.
2. Run applicable lint/type checks.
3. Inspect the final git diff.
4. Report every changed file.
5. Report assumptions.
6. Report anything that could not be verified.

## Git

- Do not implement from the archived Obsidian repo.
- Do not force-push.
- Do not commit directly to `main` unless explicitly instructed.
- Prefer a dedicated branch for meaningful implementation work.
