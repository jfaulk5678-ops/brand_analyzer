# Deployment Guide - Brand Visibility Analytics

## Quick Start

### 1. Local Development
```bash
pnpm install
pnpm dev
```
Visit `http://localhost:3000`

### 2. Build for Production
```bash
pnpm build
pnpm start
```

### 3. Deploy to Vercel
```bash
vercel deploy
```

## Deployment Options

### Vercel (Recommended)
**Pros**: Zero-config deployment, automatic SSL, built-in analytics
**Steps**:
1. Push to GitHub
2. Connect repo in Vercel dashboard
3. Auto-deploys on push

### Docker
**Pros**: Works anywhere (AWS, GCP, DigitalOcean, etc.)
**Dockerfile**:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY package.json ./
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
```

### AWS (Amplify)
```bash
amplify add hosting
amplify publish
```

### Azure
```bash
az staticwebapp up --name brand-visibility
```

## Environment Setup

### Required Variables (None for mock mode)
```env
# Optional - for real API integration
NEXT_PUBLIC_API_URL=https://api.example.com
API_SECRET_KEY=secret
```

### Optional - Performance Monitoring
```env
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_GTAG_ID=your_gtag_id
```

## Pre-Deployment Checklist

- [ ] Run `pnpm build` successfully
- [ ] No TypeScript errors: `pnpm tsc --noEmit`
- [ ] Lighthouse score > 90
- [ ] Test on mobile (iOS Safari, Chrome Android)
- [ ] Dark mode works correctly
- [ ] PWA installable (`about://app-manifests` on Chrome)
- [ ] Service worker caching works
- [ ] All metrics load without errors
- [ ] Search functionality works
- [ ] Charts render properly

## Performance Optimization

### Before Deployment

```bash
# Analyze bundle size
pnpm build
pnpm next-bundle-analyzer

# Run Lighthouse audit
pnpm start
# DevTools > Lighthouse
```

### Caching Strategy
- **Static assets** (JS, CSS): 1 year cache
- **HTML**: No cache (must-revalidate)
- **API responses**: 5 min stale-while-revalidate
- **Service Worker**: No cache (must-revalidate)

### Image Optimization
All images are optimized by Next.js Image component.

## Monitoring & Analytics

### Vercel Analytics
Built-in with zero config. View in Vercel dashboard.

### Error Tracking (Optional)
Add Sentry for error monitoring:
```bash
pnpm add @sentry/nextjs
```

## Scaling Considerations

### Database Integration
Current app uses mock data. To add a real database:

1. **Supabase** (PostgreSQL)
```typescript
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(url, key)
```

2. **Firebase** (NoSQL)
```typescript
import { initializeApp } from 'firebase/app'
const app = initializeApp(config)
```

3. **AWS RDS** (PostgreSQL/MySQL)
```typescript
import { Pool } from 'pg'
const pool = new Pool(config)
```

### API Rate Limiting
Add rate limiting to protect your backend:

```typescript
// pages/api/analytics/[domain].ts
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 h'),
})

export default async function handler(req, res) {
  const { success } = await ratelimit.limit(req.ip)
  if (!success) return res.status(429).json({ error: 'Rate limited' })
  // Handle request
}
```

## Security Checklist

- [ ] HTTPS enforced (automatic on Vercel)
- [ ] Security headers set (in next.config.mjs)
- [ ] CORS properly configured
- [ ] Input validation (Zod ready)
- [ ] API authentication (if using backend)
- [ ] Secrets in environment variables
- [ ] No console.logs with sensitive data
- [ ] Service Worker HTTPS only

## Backup & Recovery

### Version Control
```bash
git push origin main  # Always commit before deploy
git tag v1.0.0
git push origin v1.0.0
```

### Rollback
```bash
# Vercel auto-keeps previous builds
# Click "Redeploy" in Vercel dashboard

# Or rollback code
git revert <commit-hash>
git push origin main
```

## Monitoring Dashboard

### Key Metrics to Track
1. **Web Vitals**: LCP, FCP, CLS
2. **Performance**: Build time, bundle size
3. **Errors**: 404s, 5xxs, JS errors
4. **Usage**: Page views, unique visitors, search queries

## Support & Troubleshooting

### Common Issues

**Service Worker not registering**
- Check browser console
- Ensure HTTPS (required for SW)
- Check `public/service-worker.js` exists

**Charts not rendering**
- Check console for Recharts errors
- Verify mock data in `lib/mock-data.ts`
- Check theme colors in globals.css

**Dark mode not working**
- Check `next-themes` is initialized
- Verify `suppressHydrationWarning` in `<html>`
- Clear browser cache

**PWA not installable**
- Check manifest.json is valid
- Icons must be square PNGs
- Must be HTTPS

## Contact & Resources

- **Docs**: See README.md
- **Issues**: GitHub Issues
- **Vercel Support**: vercel.com/help
- **Next.js Docs**: nextjs.org/docs

---

**Happy Deploying! 🚀**
