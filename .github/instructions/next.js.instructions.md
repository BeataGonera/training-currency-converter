---
description: "Use when working with Next.js 14 App Router files. Covers server/client components, API routes, layouts, metadata, error boundaries, and streaming patterns."
---

# Next.js 14 App Router Guidelines

This guide covers best practices for Next.js 14 development using the App Router pattern employed in this currency converter project.

## Server vs Client Components

### Default: Server Components

- All components are server components by default
- Use for data fetching, database access, and sensitive API keys
- No bundle size penalty

### Client Components

- Mark with `"use client"` directive at the top of the file
- Required for: event handlers, hooks, browser APIs
- Keep at leaf level of component tree for optimal performance

```tsx
"use client";

import { useState } from "react";

export function InteractiveForm() {
  const [input, setInput] = useState("");
  // ...
}
```

## File Structure & Routing

### App Directory Convention

- **`app/layout.tsx`**: Root layout with global styles and providers
- **`app/page.tsx`**: Home page (index route)
- **`app/[dynamic]/page.tsx`**: Dynamic routes using bracket syntax
- **`app/api/[route]/route.ts`**: API endpoints
- **`app/error.tsx`**: Error boundary for route segment
- **`app/loading.tsx`**: Loading UI (deprecated in favor of Suspense)

### Dynamic Routes

Use folder-based routing with `[param]` syntax:

```
app/
  rates/
    [currency]/
      page.tsx  ← /rates/USD, /rates/EUR
```

Access params:

```tsx
export default function Page({ params }: { params: { currency: string } }) {
  return <div>{params.currency}</div>;
}
```

## API Routes

### Structure

- Place in `app/api/[resource]/route.ts`
- Export HTTP method handlers: `GET`, `POST`, `PUT`, `DELETE`

```typescript
export async function GET(request: Request) {
  try {
    const data = await fetchData();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
```

### Response Patterns

- Use `Response.json()` for type-safe responses
- Always handle errors with proper HTTP status codes
- Implement try-catch for robustness

## Metadata & SEO

### Static Metadata

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Currency Converter",
  description: "Convert currencies with live rates",
};
```

### Dynamic Metadata

```typescript
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Currency: ${params.id}`,
  };
}
```

## Error Handling

### Error Boundaries

Create `error.tsx` at route segment level:

```tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### Root Error Handler

Place `app/error.tsx` to catch unhandled errors globally.

## Streaming & Suspense

### Streaming with Suspense

Use React Suspense for progressive rendering:

```tsx
import { Suspense } from "react";
import { ExchangeRates } from "@/components/ExchangeRates";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ExchangeRates />
    </Suspense>
  );
}
```

## Environment Variables

### Public vs Private

**Public** (client-side):

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

Access in browser:

```typescript
const url = process.env.NEXT_PUBLIC_API_URL;
```

**Private** (server-only):

```
DATABASE_URL=postgresql://...
```

Access only in server components and API routes.

## Caching Strategy

### Recommended Patterns

- **Static pages**: Default behavior for optimal performance
- **Dynamic content**: Use `'use cache'` directive (Next.js 15+) or revalidation tags
- **API routes**: Implement 1-hour cache for exchange rates (per project pattern)

```typescript
export async function GET(request: Request) {
  const response = await fetch("https://api.example.com/rates", {
    next: { revalidate: 3600 }, // 1 hour cache
  });

  return Response.json(await response.json());
}
```

## Performance Best Practices

1. **Code splitting**: Automatic with App Router
2. **Image optimization**: Use `next/image` component
3. **Dynamic imports**: Lazy load large components
   ```typescript
   const HeavyComponent = dynamic(() => import("./Heavy"));
   ```
4. **Minimize client-side JavaScript**: Keep server components by default
5. **Use path aliases**: `@/` for clean imports

## URL State Management

This project uses URL-first state via `useSearchParams`:

- Store filter/sort state in query parameters
- Maintains browser history
- Enables shareable URLs

```typescript
"use client";

import { useSearchParams } from "next/navigation";

export function FilterComponent() {
  const params = useSearchParams();
  const currency = params.get("currency");
  // ...
}
```

## TypeScript Best Practices

- Enable strict mode in `tsconfig.json`
- Avoid `any` types—use explicit types
- Type component props with interfaces
- Leverage Next.js type utilities: `Metadata`, `ResolvingMetadata`

```typescript
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export default function Page({ params, searchParams }: PageProps) {
  // ...
}
```
