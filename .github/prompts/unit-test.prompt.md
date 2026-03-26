---
description: "Use when: writing Jest unit tests for React components or hooks in the currency converter project"
---

# Unit Test Template (Jest + Testing Library)

## Context7

This prompt aligns with Context7 challenge flow and the repository coding standards (Next.js 14 App Router, strict TypeScript, co-located tests).

## Inputs

- `subjectPath`: component/hook path (e.g., `components/ConverterForm.tsx`, `hooks/useConverter.ts`)
- `subjectName`: exported name (e.g., `ConverterForm`, `useConverter`)
- `behavior`: behavior to assert (e.g., "converts 100 USD to EUR" or "disables convert button for invalid input")
- `edgeCase`: optional edge case scenario (e.g., "network failure", "empty amount")
- `existingTestDescription`: optional existing test statements

## Output

1. Suggested test title(s)
2. Full Jest test code snippet using `@testing-library/react` and mock utilities
3. Setup for `msw` or manual mocking if API interaction required
4. Clear assertions and cleanup

## Prompt

You are a test engineer for a Next.js 14 project (Context7). Write a reusable unit test for `{subjectName}`.

- Use best practices: `render`, `screen`, `userEvent`, `waitFor`, and `jest-axe` where applicable.
- Targets: site-specific accessibility and functional behavior.
- For hooks: use `renderHook` from `@testing-library/react-hooks` and verify result/state transitions.

### Example

`subjectPath`: components/AmountInput.tsx
`subjectName`: AmountInput
`behavior`: "renders correct value and validates numeric input"
`edgeCase`: "empty or whitespace input should show error"

### Deliver

- unit test file path suggestion
- test code snippet with setup/teardown
- one additional edge-case test for robustness
