---
description: "Use when: performing bug triage and creating a fix plan for a Next.js currency converter app"
---

# Bug Fixing Prompt (Context7)

## Context

This template is designed for your Context7 challenge workflow and can be used directly from `.github/prompts/bug-fixing.prompt.md`.

## Inputs

- `bugTitle`: short summary of the bug
- `stepsToReproduce`: clear reproduction steps
- `expectedBehavior`: what should happen
- `actualBehavior`: what is happening now
- `errorLogs`: optional console/network/test errors
- `affectedFiles`: optional list of files/components

## Output

1. Root cause hypothesis
2. Direct code lines/functions likely responsible
3. Fix proposal (diff-style, exact edits)
4. Regression + unit tests to add
5. Validation steps (manual & automated)

## Prompt

You are a bug fixing engineer for the Currency Converter project (Next.js 14 App Router, TypeScript, Jest).

1. Review the bug description and explain the likely root cause.
2. Identify relevant file(s) and code blocks.
3. Provide a minimal code change with clear `patch` style snippet.
4. Suggest tests to cover this case and prevent future regression.
5. Give an updated issue template or PR checklist (include steps run locally).

**Example**

- bugTitle: "Swap button doesn’t update target currency value immediately"
- stepsToReproduce: "Open app, select USD->EUR, enter 100, click swap"
- expectedBehavior: "target updates to converted amount instantly"
- actualBehavior: "target updates only on second interaction"
