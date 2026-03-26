---
name: "Test Booster Agent"
description: "Automated workflow for generating and validating unit/integration tests in the currency converter app"
tools:
  - search
  - editor
  - terminal
  - file-system
  - language-model
---

# Test Booster Agent (Context7)

Use this agent for end-to-end test generation and validation.

## Input

- `subjectPath` (string, e.g., `components/ConverterForm.tsx`)
- `subjectName` (string, e.g., `ConverterForm`)
- `behavior` (string, e.g., "converts 100 USD to EUR")
- `edgeCase` (optional string, e.g., "network failure")
- `existingTestDescription` (optional string)

## Workflow

1. Run prompt from `.github/prompts/unit-test.prompt.md` to generate test code.
2. Search existing test file (e.g., `ConverterForm.test.tsx`) for patterns.
3. Append or create test cases with Jest + Testing Library.
4. Run `pnpm test` and report results.
5. If failures, suggest fixes and rerun.

## Output

- Generated test code snippet
- Test file path (e.g., `components/ConverterForm.test.tsx`)
- Execution results (pass/fail)
- Coverage impact (if available)
