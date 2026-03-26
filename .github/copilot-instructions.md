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

- Custom Hooks: useExchangeRates + useConverter
- Component Composition: Small, focused components
- State Management: URL-first with useSearchParams
- API Layer: Multiple fallback sources with 1-hour caching

## Critical Patterns

- Co-located tests (.tsx + .test.tsx)
- URL state management pattern
- API error handling with fallbacks

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
