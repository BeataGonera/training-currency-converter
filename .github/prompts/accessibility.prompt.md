---
description: "Use when: auditing a component or page for accessibility issues"
---

# Accessibility Audit Prompt

## Goal

Review the target component/page and provide a clear accessibility audit with fixes.

## Inputs

- `target`: path to file or component name (e.g., `components/AmountInput.tsx`)
- `userFlow`: short description of intended user flow (e.g., "enter amount and currency to convert")
- `a11yNotes`: current known issues or assumptions (optional)

## Output

1. Accessibility issues (severity and description)
2. Suggested fixes (code pointers, ARIA attributes, HTML semantics)
3. Keyboard interaction checks
4. Screen reader behavior checks
5. Suggested test cases using `jest-axe` and `@testing-library/react`

### Example response format

- Issue: Missing `aria-label` on input
- Fix: Add `aria-label="Amount"` or use `<label>`
- Test: `expect(await axe(container)).toHaveNoViolations()`

## Prompt

You are an accessibility reviewer for a Next.js 14 App Router project (Context7, major project standards). This prompt is part of the challenge customisation flow and should include concrete, copy-paste-ready code snippets.

1. Analyze `target` in the context of `userFlow`.
2. List all a11y violations, ordering by impact.
3. Suggest specific code updates in the file using project conventions (e.g., `components/`, `hooks/`, `app/`).
4. Include best practices for:
   - focus management (keyboard-only navigation, focus ring, focus traps)
   - semantic structure (headings, landmarks, accessible forms)
   - keyboard operability (tab order, aria-required, button roles)
   - screen reader announcements (aria-live, aria-describedby, alerts)
   - testing with `jest-axe` and `@testing-library/react`

Provide the output in clear, actionable bullet points with a short remediation checklist for the repository.
