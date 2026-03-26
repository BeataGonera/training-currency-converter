---
name: "Bug Hunter Agent"
description: "Automated workflow for triage and fix proposals in the currency converter app"
tools:
  - search
  - editor
  - terminal
  - file-system
  - language-model
---

# Bug Hunter Agent (Context7)

Use this agent for end-to-end bug triage and fix generation.

## Input

- `bugTitle` (string)
- `stepsToReproduce` (string)
- `expectedBehavior` (string)
- `actualBehavior` (string)
- `errorLogs` (optional string)
- `affectedFiles` (optional list)

## Workflow

1. Run prompt from `.github/prompts/bug-fixing.prompt.md` to analyze root cause.
2. Search codebase for relevant terms from `affectedFiles`/repro steps.
3. Identify candidate functions/components and output file path(s).
4. Generate minimal patch suggestions (diff-style edits).
5. Add tests (unit/regression) via `.github/prompts/unit-test.prompt.md`.
6. Run `pnpm test` and report results.

## Output

- Root cause summary
- Patch sketch (actual code edit lines)
- Suggested test cases (with names)
- Validation checklist (local + automated)
