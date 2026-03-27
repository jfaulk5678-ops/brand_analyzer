# Development Guide - Brand Visibility Analytics

## Getting Started

### Setup
```bash
# Install dependencies
pnpm install

# Start dev server with hot reload
pnpm dev

# Open http://localhost:3000
```

## Project Architecture

### Technology Stack Decisions

**Why React 19?**
- Automatic batching for better performance
- Built-in compiler support for optimization
- Improved error boundaries
- Latest features and fixes

**Why TanStack Query?**
- Best-in-class caching strategy
- Automatic refetching and synchronization
- Devtools for debugging
- Optimistic updates support

**Why Tailwind v4?**
- Modern CSS with postcss v4
- Better performance with zero-runtime CSS
- Improved theming with CSS variables
- Better dark mode support

**Why Recharts?**
- Lightweight and responsive
- Built on D3 but simpler API
- Great accessibility support
- Perfect for analytics dashboards

## File-by-File Breakdown

### Core Files

#### `app/page.tsx`
Entry point that sets up QueryClientProvider and manages search state.
```typescript
// Key responsibilities:
// 1. Initialize TanStack Query
// 2. Manage global search domain
// 3. Render header + dashboard
```

#### `app/layout.tsx`
Root layout with theme provider and PWA setup.
```typescript
// Key responsibilities:
// 1. ThemeProvider for dark mode
// 2. PWAProvider for offline support
// 3. Global metadata and viewport
```

#### `app/globals.css`
Design tokens in OKLCH color space.
```css
/* All colors defined here - easy to customize */
:root {
  --primary: oklch(...);
  --chart-1: oklch(...);
  /* ... */
}

.dark {
  /* Dark mode overrides */
}
```

### Component Hierarchy

```
<Header>
  ├── Search Input
  └── Theme Toggle

<Dashboard>
  ├── <MetricsOverview>
  │   ├── Visibility Card
  │   ├── Engagement Card
  │   ├── Reach Card
  │   └── Authority Card
  ├── <VisibilityTrend>
  │   └── Recharts LineChart
  ├── <CompetitorAnalysis>
  │   └── Recharts BarChart
  ├── <AIEngineComparison>
  │   └── Recharts RadarChart
  └── <Recommendations>
      └── List of Action Items
```

## Common Tasks

### 1. Add a New Metric Card

**Step 1: Update mock data** (`lib/mock-data.ts`)
```typescript
export const mockBrandData = {
  metrics: {
    visibility: 78,
    newMetric: 85,  // Add here
  },
}
```

**Step 2: Create TanStack Query hook** (`hooks/use-brand-data.ts`)
```typescript
export function useNewMetric(domain?: string) {
  return useQuery({
    queryKey: ['new-metric', domain],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return mockNewMetricData
    },
  })
}
```

**Step 3: Add to metrics overview** (`components/brand-visibility/metrics-overview.tsx`)
```typescript
const metrics = [
  // ... existing metrics
  {
    label: 'New Metric',
    value: data?.metrics.newMetric || 0,
    icon: Icon,
    color: 'text-blue-500',
    description: 'Description here',
  },
]
```

### 2. Add a New Chart

**Step 1: Create component** (`components/brand-visibility/new-chart.tsx`)
```typescript
'use client'

import { useNewChartData } from '@/hooks/use-brand-data'
import { ResponsiveContainer, BarChart, Bar, /* ... */ } from 'recharts'

export default function NewChart({ domain }: { domain?: string }) {
  const { data, isLoading } = useNewChartData(domain)

  if (isLoading) return <Skeleton />

  return (
    <div className="rounded-lg border border-border bg-card p-6" 
         role="region" 
         aria-label="Chart description">
      <h3 className="text-lg font-semibold mb-6">Chart Title</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          {/* Chart implementation */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
```

**Step 2: Add to dashboard** (`components/brand-visibility/dashboard.tsx`)
```typescript
import NewChart from './new-chart'

export default function Dashboard({ domain }: DashboardProps) {
  return (
    <main>
      {/* ... existing components */}
      <div className="grid gap-6 lg:grid-cols-2">
        <NewChart domain={domain} />
      </div>
    </main>
  )
}
```

### 3. Customize Colors

**Edit** `app/globals.css`:
```css
:root {
  /* Light mode */
  --primary: oklch(0.35 0.15 250);      /* Your brand blue */
  --accent: oklch(0.5 0.2 260);         /* Accent color */
  --chart-1: oklch(0.55 0.2 260);       /* Chart color 1 */
}

.dark {
  /* Dark mode */
  --primary: oklch(0.65 0.15 260);
  --accent: oklch(0.70 0.18 260);
  --chart-1: oklch(0.70 0.18 260);
}
```

Then use in components:
```typescript
<div className="bg-primary text-primary-foreground">
  Styled with custom colors
</div>
```

### 4. Integrate Real API

**Step 1: Update hook** (`hooks/use-brand-data.ts`)
```typescript
export function useBrandMetrics(domain?: string) {
  return useQuery({
    queryKey: ['brand-metrics', domain],
    queryFn: async () => {
      const response = await fetch(
        `/api/analytics/${domain}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      )
      if (!response.ok) throw new Error('Failed to fetch')
      return response.json()
    },
  })
}
```

**Step 2: Add error handling**
```typescript
const { data, isLoading, isError, error } = useBrandMetrics(domain)

if (isError) {
  return <div className="text-destructive">Error: {error.message}</div>
}
```

### 5. Add Loading States

Use Skeleton component for loading UI:
```typescript
import { Skeleton } from '@/components/ui/skeleton'

export default function MyComponent({ domain }: Props) {
  const { data, isLoading } = useData(domain)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return <div>{/* Render data */}</div>
}
```

### 6. Add Search/Filtering

Already built-in! The search flow:
```
Header Input → onChange → setSearchDomain
             → Pass to Dashboard
             → useQuery uses domain in queryKey
             → TanStack Query refetches
```

To add custom filtering:
```typescript
const [filters, setFilters] = useState({
  domain: '',
  dateRange: 'month',
  compareType: 'competitor',
})

// Update hooks to use filters
useQuery({
  queryKey: ['data', filters],
  queryFn: () => fetchData(filters),
})
```

## Debugging

### Browser DevTools

**React DevTools**
```
1. Install React DevTools extension
2. Components tab to inspect component tree
3. Props and hooks inspection
```

**Network Tab**
```
1. Monitor API calls
2. Check response times
3. Verify caching behavior
```

### TanStack Query DevTools

Already installed but commented out. To enable:
```typescript
// app/page.tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

return (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
```

### Console Logging

Use prefixed logs for easy filtering:
```typescript
console.log('[v0] Component loaded:', data)
console.log('[API] Request sent:', url)
console.log('[TanStack] Cache hit:', domain)
```

## Testing

### Manual Testing Checklist

```
Light Mode:
[ ] All text readable
[ ] Buttons responsive
[ ] Charts render correctly
[ ] Icons visible

Dark Mode:
[ ] All text readable with contrast
[ ] Charts visible
[ ] Button states clear
[ ] No glowing artifacts

Responsive:
[ ] Mobile (375px)
[ ] Tablet (768px)
[ ] Desktop (1920px)

Accessibility:
[ ] Tab through all controls
[ ] Screen reader announces titles
[ ] Skip link works
[ ] Focus visible on all elements

Performance:
[ ] No layout shift (CLS)
[ ] Smooth animations
[ ] Charts load quickly
```

### Automated Testing

Add Jest + React Testing Library:
```bash
pnpm add -D jest @testing-library/react
```

Example test:
```typescript
// components/__tests__/metrics-overview.test.tsx
import { render, screen } from '@testing-library/react'
import MetricsOverview from '@/components/brand-visibility/metrics-overview'

describe('MetricsOverview', () => {
  it('renders all metric cards', () => {
    render(<MetricsOverview />)
    expect(screen.getByText('Visibility Score')).toBeInTheDocument()
  })
})
```

## Performance Monitoring

### Lighthouse Integration

```bash
# Generate report
pnpm build
pnpm start
# DevTools > Lighthouse > Analyze page load
```

### Web Vitals

Built-in with Next.js. View in Vercel Analytics dashboard.

### Bundle Analysis

```bash
# Install analyzer
pnpm add -D @next/bundle-analyzer

# Update next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)

# Run
ANALYZE=true pnpm build
```

## Code Style

### ESLint Rules
```bash
pnpm lint
```

### TypeScript Strict Mode
Enabled by default - no `any` types!

### Naming Conventions
- Components: PascalCase (`MyComponent.tsx`)
- Files: kebab-case or PascalCase
- Hooks: camelCase with `use` prefix (`useBrandData`)
- Constants: UPPER_SNAKE_CASE (`MAX_ITEMS`)

## Common Errors & Solutions

### "hydration mismatch"
Usually theme-related. Add `suppressHydrationWarning`:
```typescript
<html suppressHydrationWarning>
```

### "window is not defined"
Use `useEffect` or mark as `'use client'`:
```typescript
'use client'  // For client components

// Or in server components
if (typeof window !== 'undefined') {
  // Client-only code
}
```

### "TanStack Query key not found"
Make sure queryKey is specified correctly:
```typescript
queryKey: ['brand-metrics', domain]  // Includes dependencies
```

### Chart rendering blank
Check:
1. Data is loaded
2. Container has height
3. ResponsiveContainer is used
4. Chart colors visible in theme

## Next Steps

1. **Replace mock data** with real API
2. **Add authentication** for user accounts
3. **Implement reports** for PDF exports
4. **Add notifications** for metric changes
5. **Multi-language support** with i18n
6. **Analytics integration** for tracking

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Recharts Documentation](https://recharts.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Happy coding! 💻**
