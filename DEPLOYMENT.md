# DEPLOYMENT.md: Pre-launch and deployment guide

**Version:** 1.0  
**Last updated:** June 2026

---

## Pre-deploy checklist (SPEC.md section 17)

Run this checklist before pushing to production:

- [x] Domain purchased and configured
  - Domain: joannamjoseph.com
  - DNS configured to point to Vercel
  
- [x] joanna.jpg in public/
  - Profile image present
  - Optimized for web
  
- [x] Project screenshots in public/images/ as .webp
  - vesper.webp
  - grandma.webp
  - Additional project images as needed
  
- [x] Pixel logo / favicon wired in
  - public/favicon.svg configured in layout.tsx
  - Appears in browser tab
  
- [x] OG image at public/og.png
  - 1200×630px
  - Wired in metadata
  
- [x] Real cv.pdf in public/
  - Latest resume uploaded
  - Download link functional
  
- [x] Sentry DSN in Vercel env vars
  - SENTRY_AUTH_TOKEN set
  - NEXT_PUBLIC_SENTRY_DSN set
  
- [ ] vesper description completed
  - Full project details in content/data.ts
  
- [ ] grandma description completed
  - Full project details in content/data.ts
  
- [ ] Two remaining public repos added
  - GitHub repo links in projects section
  
- [ ] Google Search Console connected
  - Site verified
  - Sitemap submitted
  
- [ ] Lighthouse on live URL confirms all scores
  - Performance ≥ 95
  - Accessibility = 100
  - Best Practices ≥ 95
  - SEO = 100

---

## Environment variables

**Production (Vercel):**

```env
NEXT_PUBLIC_SENTRY_DSN=https://[your-dsn]@sentry.io/[project-id]
SENTRY_AUTH_TOKEN=[your-token]
```

**Local development (.env.local):**

```env
NEXT_PUBLIC_SENTRY_DSN=https://[your-dsn]@sentry.io/[project-id]
```

---

## Vercel setup

1. **Project configured in vercel.json:**
   - Framework: Next.js
   - Regions: lhr1 (London)
   - Auto-deploy enabled for main branch

2. **Build settings:**
   - Build command: `npm run build`
   - Start command: `npm start`
   - Output directory: `.next`

3. **Environment variables:**
   - Set NEXT_PUBLIC_SENTRY_DSN in project settings
   - Set SENTRY_AUTH_TOKEN in project settings

4. **Domains:**
   - Primary: joannamjoseph.com
   - Alias: www.joannamjoseph.com (optional)

---

## Pre-launch health checks

All of these must pass before merging to main:

```bash
npm run lint        # Zero ESLint warnings
npm run type-check  # Zero TypeScript errors
npm run test        # All tests passing
npm run build       # Next.js build succeeds
npm run build-storybook  # Storybook builds
```

---

## Deployment process

### 1. Final verification (local)

```bash
git checkout main
git pull
npm run lint && npm run type-check && npm run test && npm run build
```

### 2. Merge PR

```bash
gh pr merge [PR-NUMBER] --squash --delete-branch
```

### 3. Vercel auto-deploys

- Vercel detects push to main
- Triggers build and deployment
- Creates preview URL
- Deploys to production once build passes

### 4. Verify deployment

```bash
# Check live URL
https://joannamjoseph.com

# Run Lighthouse CI
npm run lhci
```

---

## Post-launch steps

### Day 1

- [ ] Verify site is live at joannamjoseph.com
- [ ] Test all links (internal, external, downloads)
- [ ] Verify analytics are working
- [ ] Check Sentry is receiving events
- [ ] Test form submissions (if applicable)
- [ ] Verify SEO tags with browser inspector
- [ ] Check mobile layout on real device

### Day 7

- [ ] Monitor Sentry for errors
- [ ] Review analytics for traffic patterns
- [ ] Check Core Web Vitals in PageSpeed Insights
- [ ] Verify all project links and descriptions are accurate

### Ongoing

- [ ] Update project descriptions as work evolves
- [ ] Monitor Lighthouse scores monthly
- [ ] Review analytics quarterly
- [ ] Update CV in public/ as needed

---

## Troubleshooting

### Build fails on Vercel

1. Check Vercel build logs: https://vercel.com/dashboard
2. Verify environment variables are set
3. Run `npm run build` locally to reproduce
4. Push fix to main branch

### Site is slow

1. Run Lighthouse CI locally: `npm run lhci`
2. Check Core Web Vitals in production
3. Review bundle analysis in Vercel Analytics
4. Optimize largest components

### Sentry not receiving errors

1. Verify SENTRY_AUTH_TOKEN is set in Vercel
2. Verify NEXT_PUBLIC_SENTRY_DSN is set and valid
3. Check browser console for initialization errors
4. Review Sentry project settings

---

## Rollback procedure

If production deployment has critical issues:

1. Revert PR in GitHub: `git revert [COMMIT-SHA]`
2. Merge revert PR to main
3. Vercel redeploys previous version automatically
4. Investigate issue on staging/local before re-deploying

---

## Monitoring

### Services

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Sentry:** https://sentry.io/organizations/[org]/issues/
- **Google Search Console:** https://search.google.com/search-console
- **Google Analytics:** https://analytics.google.com/

### Key metrics to monitor

- Lighthouse Performance score (target: ≥ 95)
- Lighthouse Accessibility score (target: 100)
- Core Web Vitals (FCP < 1.2s, TBT < 150ms, CLS < 0.1)
- Error rate in Sentry (should be 0%)
- Organic search traffic (Google Search Console)
