# Brand Visibility Analytics Platform

A modern, enterprise-grade brand visibility analytics tool built with React 19, Next.js 16, Tailwind CSS v4, and TanStack Query. Features real-time metrics, competitor analysis, AI engine comparison, and comprehensive dark mode support.

## ✨ Key Features

### Core Analytics
- **Brand Metrics Dashboard** - Real-time visibility, engagement, reach, and authority scores
- **Visibility Trends** - Interactive line charts tracking performance over time
- **Competitor Analysis** - Compare your brand against competitors with bar charts
- **AI Engine Comparison** - Radar charts showing coverage, accuracy, and freshness across search engines
- **Smart Recommendations** - AI-powered actionable insights with priority levels

### Modern UX/DX
- **Dark Mode** - Full dark mode support with system preference detection
- **Responsive Design** - Mobile-first layout that works seamlessly on all devices
- **Real-time Search** - Domain search with debounced input for instant results
- **Skeleton Loaders** - Smooth loading states for better perceived performance
- **Chart Interactions** - Hover tooltips and interactive legends

### Enterprise Features
- **PWA Support** - Installable as an app, offline capability via service worker
- **WCAG 2.1 AA Compliance** - Full accessibility with semantic HTML, ARIA labels, keyboard navigation
- **Performance Optimized** - React Compiler, code splitting, efficient caching strategy
- **Security Headers** - XSS protection, CSRF headers, content security policies
- **SEO Ready** - Optimized metadata, Open Graph tags, structured data

## 🚀 Tech Stack

### Frontend
- **React 19.2.4** - Latest React with server components
- **Next.js 16.2.0** - App router with optimized bundling
- **Tailwind CSS v4** - Modern utility-first CSS with postcss v4
- **Recharts 2.15.0** - Beautiful, responsive charts
- **TanStack Query v5** - Powerful server state management
- **Lucide React** - Consistent icon library

### Infrastructure
- **TypeScript 5.7.3** - Type-safe development
- **next-themes 0.4.6** - Theme management with system detection
- **Radix UI** - Accessible component primitives
- **Sonner** - Toast notifications

## 📊 Charts & Visualizations

The platform includes 4 chart types powered by Recharts:

1. **Line Chart** - Visibility trends over 12 months with multi-line tracking
2. **Bar Chart** - Competitive positioning across 4 key metrics
3. **Radar Chart** - AI engine comparison across 3 dimensions
4. **Metric Cards** - KPI display with trend indicators

All charts are:
- Fully responsive with mobile optimization
- Theme-aware (light/dark mode)
- Accessible with proper ARIA labels
- Interactive with tooltips and legends

## ♿ Accessibility

Built with WCAG 2.1 AA compliance:
- **Semantic HTML** - Proper heading hierarchy, landmark regions
- **ARIA Labels** - All interactive elements properly labeled
- **Keyboard Navigation** - Full keyboard support with visible focus indicators
- **Color Contrast** - 4.5:1 minimum contrast ratio for all text
- **Skip Links** - Jump to main content for keyboard users
- **Screen Reader Support** - Proper aria-live regions for dynamic content

## 📱 PWA Capabilities

- **Installable** - Add to home screen on iOS/Android
- **Offline Support** - Service worker caching strategy
- **App Manifest** - Complete PWA metadata
- **Mobile Shortcuts** - Quick access to key features
- **Status Bar Styling** - Native app appearance

## ⚡ Performance

### Optimization Strategies
- **React Compiler** - Automatic memoization and optimization
- **Code Splitting** - Dynamic imports for chart components
- **TanStack Query Caching** - Intelligent cache with stale-while-revalidate
- **Image Optimization** - Next.js image optimization
- **Bundle Analysis** - Optimized package imports

### Performance Targets
- **LCP**: < 2.5s
- **FCP**: < 1.8s
- **CLS**: < 0.1
- **TTI**: < 3.5s

## 🎨 Design System

### Color Palette (OKLCH)
- **Primary**: Deep blue (#1E40AF) - Professional, trustworthy
- **Secondary**: Cool gray - Neutral backgrounds
- **Accent**: Cyan/Teal - Data highlights
- **Chart Colors**: 5 optimized colors for data visualization
- **Light Mode**: Clean whites and subtle grays
- **Dark Mode**: Deep charcoal with bright accents

### Typography
- **Headings**: Geist (sans-serif)
- **Body**: Geist (sans-serif)
- **Code**: Geist Mono

### Spacing & Radius
- **Spacing Scale**: 4px grid system
- **Border Radius**: 10px default (0.625rem)
- **Grid Gap**: 16px (0 on mobile)

## 🔧 Development

### Installation

```bash
# Clone or download the project
cd brand-visibility-analytics

# Install dependencies (pnpm recommended)
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

### Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Main app entry point
│   └── globals.css             # Global styles and design tokens
├── components/
│   ├── brand-visibility/       # Feature components
│   │   ├── header.tsx          # Navigation & search
│   │   ├── dashboard.tsx       # Main layout
│   │   ├── metrics-overview.tsx # KPI cards
│   │   ├── visibility-trend.tsx # Line chart
│   │   ├── competitor-analysis.tsx # Bar chart
│   │   ├── ai-engine-comparison.tsx # Radar chart
│   │   └── recommendations.tsx # Insights list
│   ├── providers/
│   │   └── pwa-provider.tsx    # PWA initialization
│   └── ui/                     # shadcn/ui components
├── hooks/
│   └── use-brand-data.ts       # TanStack Query hooks
├── lib/
│   └── mock-data.ts            # Sample analytics data
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── service-worker.js       # Offline caching
│   └── pwa-icon.jpg            # App icon
└── package.json
```

### Key Files

- **`components/brand-visibility/header.tsx`** - Search and theme toggle with accessibility
- **`hooks/use-brand-data.ts`** - TanStack Query hooks for data fetching and caching
- **`lib/mock-data.ts`** - Sample data (replace with real API calls)
- **`app/globals.css`** - Design tokens and theme variables

## 🔄 Customization

### Replace Mock Data

Update `lib/mock-data.ts` with your API integration:

```typescript
// Before: Mock data
export const mockBrandData = { ... }

// After: Real API call
export async function fetchBrandData(domain: string) {
  const response = await fetch(`/api/analytics/${domain}`)
  return response.json()
}
```

### Customize Colors

Update design tokens in `app/globals.css`:

```css
:root {
  --primary: oklch(0.35 0.15 250);      /* Change primary color */
  --accent: oklch(0.5 0.2 260);         /* Change accent */
  --chart-1: oklch(0.55 0.2 260);       /* Change chart colors */
}

.dark {
  --primary: oklch(0.65 0.15 260);
  /* ... */
}
```

### Add New Metrics

1. Add to `lib/mock-data.ts`
2. Create component in `components/brand-visibility/`
3. Add TanStack Query hook in `hooks/use-brand-data.ts`
4. Import and render in `components/brand-visibility/dashboard.tsx`

## 📈 Data Integration

The app uses TanStack Query for efficient data management:

```typescript
// Example: Adding a new data hook
export function useCustomMetric(domain?: string) {
  return useQuery({
    queryKey: ['custom-metric', domain],
    queryFn: async () => {
      const response = await fetch(`/api/metrics/${domain}`)
      return response.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Connect GitHub repository
# Auto-deploys on push

# Or deploy directly
pnpm build
vercel deploy
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

### Environment Variables

No API keys required for mock mode. For real integrations, add to `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
API_SECRET_KEY=your_secret_key
```

## 🧪 Testing

### Lighthouse Audit

```bash
# Run Google Lighthouse
pnpm build
pnpm start
# Open DevTools > Lighthouse
```

### Accessibility Audit

```bash
# Use axe DevTools or WAVE browser extension
# Check WCAG 2.1 AA compliance
```

## 📝 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## 🔐 Security

- **XSS Protection** - React escaping + CSP headers
- **CSRF Prevention** - SameSite cookies
- **Rate Limiting** - Implement on API backend
- **Input Validation** - Zod schemas ready to integrate
- **HTTPS Only** - Enforced in production

## 🚦 Lighthouse Scores

Target metrics:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TanStack Query](https://tanstack.com/query)
- [Recharts](https://recharts.org)
- [Radix UI](https://www.radix-ui.com)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 📄 License

MIT - Feel free to use for commercial and personal projects

## 🤝 Contributing

Contributions welcome! Please ensure:
- Accessibility compliance (WCAG 2.1 AA)
- Performance doesn't degrade (Lighthouse 90+)
- Dark mode works for new features
- TypeScript strict mode
- No console errors/warnings

## 📞 Support

For questions or issues:
1. Check the GitHub issues
2. Review the documentation
3. Open a new discussion

---

**Built with ❤️ using React 19, Next.js 16, and Tailwind CSS v4**
