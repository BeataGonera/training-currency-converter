---
name: "Project Standards"
description: "Currency Converter coding standards, architecture patterns, and development workflow"
---

# Currency Converter Project Standards

## Session Management

- Always create a to-do list at the start of each multi-step task
- Maintain a temporary log file (copilot_session.log)
- Maintain context throughout the session and reference previous work
- Use descriptive commit messages following conventional commits

## Core Architecture

### Hooks

- `useExchangeRates`: fetch and cache currency rates with failover sources.
- `useConverter`: calculate conversion results, handle sanitization, format output, and preserve parse safety.
- Keep hooks focused and pure, side effects limited to `useEffect`/`useMemo`.
- Leverage built-in hook rules: dependency arrays, cleanup, and stable identities.

### Components

- Build with single responsibility: input widget, select control, result card, history list.
- Favor server components by default; mark interactive components with `'use client'`.
- Avoid deeply nested state in children; lift state to holding component/hook.
- Use component composition and clear prop contracts.

### State Management

- URL-first with `useSearchParams` for shareable state and deep linking.
- Use `useRouter().push()` + `URLSearchParams` for updates; do not mutate search params directly.
- Keep transient UI states local (form touched flags, validation melodies).
- Persist last used settings via localStorage wrapper in `utils/storage` and restore on load.

### API Layer

- Use app API routes (`app/api/rates/route.ts`) and external API fallbacks.
- Use `next: { revalidate: 3600 }` for caching in fetch options.
- Always use `try/catch` and return proper HTTP status codes.
- Validate external payloads explicitly before consuming.

## Critical Patterns

- Co-located tests: component and test living side-by-side (`Component.tsx` + `Component.test.tsx`).
- Convert using debounce in user-facing inputs to avoid rapid repeated API calls.
- Prefer stable, type-safe enums for currency codes (`USD`, `EUR`, ...).
- Centralize error boundary and fallback UI in `app/error.tsx` and `components/ErrorMessage.tsx`.
- Include feature flags in route state or config object for easy toggles.

## Testing Conventions

- Unit tests for each hook, util, and component.
- Integration tests for user flows: enter amount, pick currencies, convert, show history.
- MSW for API mocking; isolate network state in setup/teardown.
- Keep tests deterministic and avoid time-dependent flakiness (`jest.useFakeTimers` wisely).
- Test names use human-readable format (`it('updates conversion when amount changes')`).
- Coverage target: specifically all `components/`, `hooks/`, `utils/`, and `app/api/**` paths.

## Critical Gotchas

- Missing `'use client'` in client components breaks hooks entirely.
- `useSearchParams` returns read-only params; URL updates require router methods.
- Avoid mutable data manipulations; always return new object references in state setters.
- Watch for stale closures in hooks; use refs for values not in dependency arrays.
- `fetch` in server component side may not support some browser features; use API routes when security/caching is needed.
- On encountered error, log context and return user-friendly message, not stack trace.

## Tech Stack and Architecture

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS
- **Testing**: Jest with jsdom environment, @testing-library/react
- **API Mocking**: MSW (Mock Service Worker)

## Coding Standards

- Use TypeScript strictly - no `any` types, explicit types required
- Small, focused components with single responsibility
- Path aliases: use `@/` for imports
- Component composition over inheritance
- Functional components with hooks

## File Structure

- `app/` - Next.js App Router pages and API routes
- `components/` - Reusable React components
- `hooks/` - Custom React hooks
- `utils/` - Utility functions and helpers
- `types/` - TypeScript type definitions
- `docs/` - Project documentation and challenges

## API and Data Handling

- Multiple API fallback sources for reliability
- 1-hour caching for exchange rates
- Graceful error handling with user-friendly messages
- Real-time validation and input sanitization

## Testing Conventions

- Unit tests for all components, hooks, and utilities
- Integration tests for critical user flows
- Mock external APIs using MSW
- Coverage targets: components/, hooks/, utils/, app/
- Test file naming: `*.test.tsx` or `*.test.ts`

## Performance Considerations

- Lazy loading for non-critical components
- Image optimization with Next.js Image component
- Bundle analysis and tree shaking
- Minimize re-renders with proper memoization

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## Next.js 14 App Router Best Practices

- **Server/Client Components**: Mark client-interactive components with `"use client"`
- **Root Layout**: Global styles and providers in `app/layout.tsx`
- **API Routes**: Place API endpoints in `app/api/[route]/route.ts`
- **Dynamic Routes**: Use `[param]` folder syntax, not file extensions
- **Error Boundaries**: Create `error.tsx` for error handling
- **Metadata**: Use `generateMetadata()` for dynamic SEO
- **Streaming**: Use React Suspense for loading states with fallbacks
- **Environment Variables**: Prefix with `NEXT_PUBLIC_` for client-side exposure

## Common Copilot Tasks

When asking Copilot for help, be specific about:

1. **Component creation**: Specify if Server or Client component needed
2. **Hook implementation**: Include dependencies and side effects
3. **Test writing**: Reference existing test patterns in codebase
4. **Type definitions**: Always provide explicit types, avoid `any`
5. **Error handling**: Request graceful degradation patterns
6. **API integration**: Mention fallback sources and caching strategy
