# Bolt's Journal

## 2025-02-14 - Server Components Refactor
**Learning:** In Next.js App Router, the root `page.tsx` often defaults to Client Component if it uses animations or interactive elements. Splitting these into smaller Client Components allows the root page to be a Server Component, significantly reducing the initial bundle size for static content (like SEO text, backgrounds, and layout).
**Action:** Always check `page.tsx` for `"use client"`. If present, identify the interactive parts and extract them to `components/` so the page itself can remain a Server Component.
