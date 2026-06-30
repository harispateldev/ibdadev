# Hurain E-Commerce Platform — Phase 1 Design Document

**Date:** 2026-06-25
**Status:** Approved
**Author:** IbdaDev
**Client:** Hurain (Saudi Arabia)

---

## 1. Project Overview

Hurain is a premium single-vendor e-commerce platform for a Saudi Arabia-based client. Phase 1 delivers the full customer-facing storefront, admin dashboard, and backend API. Mobile (React Native) and ERP integration are architected for but deferred to Phase 2.

**Design inspiration:** PlayStation.com, Apple.com, Porsche.com — cinematic, premium, animated.
**Languages:** Arabic (RTL, primary) + English (LTR) — non-negotiable from day one.
**Timeline:** 8 weeks, 2-person team (lead + one hire).
**Contract type:** Fixed-price.

---

## 2. Repository Architecture

**Decision: 4 separate repos + 1 shared types repo.**

Monorepo was evaluated and rejected — the team size, fixed-price model, and deadline favour isolated repos with a shared types package over Turborepo complexity.

| Repo | Stack | Purpose |
|------|-------|---------|
| `hurain-web` | Next.js 14 App Router | Customer storefront |
| `hurain-admin` | Next.js Pages Router + Ant Design | Admin dashboard |
| `hurain-mobile` | Expo + React Native | iOS + Android (Phase 2) |
| `hurain-api` | Node.js + Fastify | Backend — all business logic |
| `hurain-types` | TypeScript only | Shared types + Zod validators |

### Why `hurain-types` as a separate package

`Product`, `Order`, `User`, `Cart`, `Address` are used across all apps. A private npm package published to GitHub Package Registry gives every repo type safety without monorepo tooling. When a type changes — bump version, each repo updates independently.

---

## 3. Backend Architecture — `hurain-api`

### Framework Decision: Fastify over Express and NestJS

| | Express | Fastify | NestJS |
|--|---------|---------|--------|
| Speed | ~20k req/s | ~50k req/s | ~15k req/s |
| TypeScript | Bolted on | First-class | First-class |
| Validation | Manual | Schema-based (built-in) | class-validator |
| Security | Manual | Rejects invalid input by default | Manual |
| Team learning curve | None | Low | High |

**Fastify chosen.** Express is outdated for production e-commerce. NestJS has too much overhead for a 2-person team on a 2-month deadline. Fastify's schema-first approach means security and validation are built into every endpoint.

### Database Layer

| Store | Tool | Purpose |
|-------|------|---------|
| Primary DB | MongoDB + Mongoose | Product catalogue (flexible schema per category), orders, users |
| Cache + Queue | Redis + BullMQ | API response caching, session blacklist, async jobs, rate limiting |

**MongoDB indexes defined at project start — not retrofitted:**
```
products:  { category, price, rating, isActive, createdAt }
products:  { name: "text", description: "text" }   ← full-text search
orders:    { userId, status, createdAt }
orders:    { orderId } unique
users:     { phone } unique, { email } unique
```

### Modular Monolith Structure

```
hurain-api/
  src/
    modules/
      auth/         ← OTP, JWT, refresh tokens
      products/     ← catalogue, search, categories
      orders/       ← cart, checkout, order lifecycle
      payments/     ← Moyasar, VAT, invoices
      users/        ← profiles, addresses, reviews
      logistics/    ← Aramex + DHL, tracking
      erp/          ← IERPAdapter + NullERPAdapter (Phase 1)
      admin/        ← admin-specific endpoints
    plugins/        ← Fastify plugins (db, redis, auth, swagger)
    jobs/           ← BullMQ job definitions
    schemas/        ← JSON schemas (Fastify validation)
    utils/
    app.ts
    server.ts
  Dockerfile
  docker-compose.yml
```

Each module can be extracted into a microservice in Phase 2 — boundaries are clean.

### Full Backend Stack

| Concern | Tool | Reason |
|---------|------|--------|
| Framework | Fastify | Fastest Node.js framework, schema-first security |
| Database | MongoDB + Mongoose | Flexible product schema, mature ODM |
| Cache + Queue | Redis + BullMQ | Caching, sessions, async jobs |
| Auth | JWT (15min) + Refresh Token (30 days) | Stateless, Redis blacklist for revocation |
| OTP / SMS | Unifonic or Taqnyat | Saudi-local, compliant, reliable |
| Payment | Moyasar | Only Saudi gateway with MADA — non-negotiable |
| Email | Resend | Best deliverability, developer-friendly |
| File Storage | Cloudflare R2 | No egress fees, global CDN, S3-compatible |
| Image processing | Sharp | Fastest Node.js image processor |
| Video processing | FFmpeg (BullMQ job) | Async compression, never blocks requests |
| Logging | Pino | Built into Fastify, structured JSON |
| Error tracking | Sentry | Production error visibility |
| API docs | Fastify Swagger | Auto-generated from schemas — critical for ERP team later |
| Security headers | @fastify/helmet | OWASP headers |
| Rate limiting | @fastify/rate-limit | Per-route, Redis-backed |

### Payment Gateway: Moyasar

MADA is the Saudi national debit card network. Over 70% of Saudi online transactions use MADA. Stripe does not support MADA. Moyasar supports MADA + Visa + Mastercard + Apple Pay + STC Pay. This is a non-negotiable decision for the Saudi market.

### ERP — Adapter Pattern (Future-Safe)

ERP system not yet decided by client. The adapter interface is defined in `@hurain/types` Week 1 and remains stable regardless of what ERP is chosen.

```typescript
// hurain-types/src/erp.ts
interface IERPAdapter {
  syncProduct(product: Product): Promise<void>
  syncOrder(order: Order): Promise<void>
  getInventory(sku: string): Promise<number>
  syncCustomer(user: User): Promise<void>
}
```

Phase 1 ships with `NullERPAdapter` — logs all calls via BullMQ, does nothing. When client decides ERP (SAP, Odoo, Oracle, custom), one class implements this interface. Zero changes to rest of system.

### Deployment

**AWS Bahrain (me-south-1)** — closest AWS region to Saudi Arabia. Required for Saudi PDPL compliance (Personal Data Protection Law) regarding data residency.

---

## 4. Frontend Architecture

### `hurain-web` — Customer Storefront

**Framework:** Next.js 14 App Router
- ISR for product and category pages — Google indexes static HTML, cache revalidates every 60 seconds
- Server Components for data fetching, Client Components only where interactivity required
- `generateStaticParams` for top products at build time, fallback for the rest

| Concern | Tool | Reason |
|---------|------|--------|
| Styling | Tailwind CSS | RTL support via `dir` attribute, consistent with team skill |
| Animation | GSAP + Framer Motion | GSAP for scroll/timeline, Framer for component transitions |
| Server state | TanStack Query | Caching, background refetch, infinite scroll |
| Client state | Zustand | Cart, wishlist, UI state — lightweight |
| i18n / RTL | next-intl | Best Next.js i18n, URL-based locale (`/ar/`, `/en/`) |
| Forms | React Hook Form + Zod | Shares same Zod schemas as backend |
| UI primitives | Radix UI | Accessible, unstyled — full design control |

### `hurain-admin` — Admin Dashboard

**Framework:** Next.js Pages Router (not App Router)

Ant Design components have known hydration issues with Next.js App Router. Admin is a protected internal tool — no SSR or SEO needed. Pages Router lets Ant Design work exactly as documented and avoids the friction entirely.

| Concern | Tool | Reason |
|---------|------|--------|
| UI components | Ant Design v5 | Pre-built admin components — table, form, date picker, upload, modal |
| Charts | Ant Design Charts | Revenue + order volume — no additional library needed |
| Tables | Ant Design Table | Sort, filter, pagination, row selection, expandable rows — built in |
| Forms | Ant Design Form | Built-in validation, field arrays, dynamic fields |
| State | TanStack Query + Zustand | Data fetching and UI state |
| RTL | `ConfigProvider direction="rtl"` | Ant Design native RTL support |

---

## 5. Image and Video Pipeline

### Image Pipeline

```
Admin uploads image
       ↓
@fastify/multipart receives file
       ↓
Sharp processes synchronously:
  → thumbnail  300×300   WebP  quality 80
  → medium     800×800   WebP  quality 85
  → large     1600×900   WebP  quality 90
  → original   stored as fallback
       ↓
All 4 versions → Cloudflare R2
       ↓
MongoDB stores { thumbnail, medium, large, original } URLs per product
       ↓
Next.js <Image> component serves correct size per viewport
via Cloudflare CDN automatically
```

**Result:** A 5MB JPEG upload becomes a 40KB WebP thumbnail on mobile listing pages.

**Next.js config:**
```typescript
// next.config.mjs
images: {
  remotePatterns: [{ hostname: 'your-bucket.r2.cloudflarestorage.com' }]
}
```

The `<Image>` component handles lazy loading, blur placeholder, and responsive `srcset` automatically. Raw `<img>` tags are prohibited.

### Video Pipeline (Product Videos)

```
Admin uploads product video
       ↓
Raw file saved to R2 immediately (upload does not block)
       ↓
BullMQ job queued
       ↓
FFmpeg processes async:
  → compress to H.264 + AAC
  → 1080p max resolution
  → generate poster frame at 0:01
  → output + poster stored to R2
       ↓
MongoDB product updated with { videoUrl, videoPoster }
```

**Frontend video component:**
```tsx
<video
  src={product.videoUrl}
  poster={product.videoPoster}
  controls
  preload="none"    // does not download until user presses play
  playsInline
/>
```

`preload="none"` is mandatory — a listing page with 20 products must not download 20 videos on load.

---

## 6. Performance Architecture

Performance is designed in from day one, not audited and fixed in Week 8.

```
Client → Cloudflare CDN → Next.js ISR → Redis Cache → Fastify API → MongoDB
                                               ↑
                                          BullMQ jobs
                                   (email, PDF, image, video, ERP sync)
```

| Layer | Optimisation |
|-------|-------------|
| CDN | Cloudflare — images, video, static assets served from edge |
| Pages | Next.js ISR — product pages are static HTML, rebuilt in background |
| API responses | Redis cache — category listings, search results (60s TTL) |
| Images | WebP, 4 responsive sizes, lazy loaded via Next.js `<Image>` |
| Video | FFmpeg-compressed, `preload="none"`, poster frame |
| Fonts | `next/font` with `display: swap`, Arabic + Latin preloaded |
| Async work | BullMQ — PDF generation, email, image processing never block API responses |

**Performance targets (checked from Week 3, not Week 8):**
- Lighthouse mobile score: 85+ on all key pages
- LCP: under 2.5 seconds
- CLS: under 0.1
- FID: under 100ms

---

## 7. Security Architecture

| Concern | Implementation |
|---------|---------------|
| Transport | HTTPS enforced sitewide, Cloudflare proxy |
| Headers | `@fastify/helmet` — CSP, HSTS, X-Frame-Options |
| Auth | JWT (15min expiry) + refresh token (30 days, Redis blacklist) |
| OTP | Rate limited — 5 attempts per phone per 10 minutes (Redis-backed) |
| Input validation | Fastify JSON Schema — every endpoint rejects malformed requests |
| Payment webhooks | Moyasar signature verification on every webhook — not optional |
| Admin access | Role-based middleware on all `/admin/*` routes |
| Data | Saudi PDPL compliance — data stored in AWS Bahrain |

---

## 8. Arabic / RTL Strategy

- `next-intl` handles URL-based locale switching (`/ar/`, `/en/`)
- `dir="rtl"` applied at `<html>` level — CSS logical properties used throughout
- IBM Plex Arabic loaded via `next/font` alongside Latin typeface
- Arabic SEO: `lang="ar"`, `dir="rtl"`, Arabic meta titles and descriptions per page
- GSAP animations verified in RTL context — proof of concept built Week 1
- RTL regression: every component tested in Arabic before it ships, not at end of project

---

## 9. Revised 8-Week Delivery Plan

### Pre-Project Dependencies (Before Day 1)

| Task | Owner |
|------|-------|
| Unifonic/Taqnyat account registered | Lead |
| Moyasar merchant account registered | Lead |
| Aramex + DHL sandbox credentials requested | Lead |
| Client signs content delivery milestone (20 products by Week 5) | Client |
| Figma ownership agreed — who designs, when | Lead / Client |
| AWS Bahrain account active | Lead |
| Cloudflare R2 bucket created | Lead |

### Week 1 — Foundation + RTL Proof of Concept
- Day 1 morning: onboarding session (both)
- All 5 repos created, CI/CD active
- `@hurain/types`: ALL core interfaces + `IERPAdapter` + `NullERPAdapter` defined
- Fastify skeleton — plugins, logger, health check, Docker Compose
- MongoDB + Redis connected
- `hurain-web`: Next.js, Tailwind, next-intl, design tokens, navigation
- `hurain-admin`: Ant Design setup, layout shell
- **RTL proof of concept: one GSAP-animated section working in Arabic and English**

### Week 2 — Auth System
- Full OTP + email auth + JWT + refresh tokens
- Password reset
- Admin login + RBAC middleware
- Rate limiting on OTP endpoint
- Login, signup, password reset pages (bilingual)
- Admin login page

### Week 3 — Products + Homepage + Moyasar Spike
- Products API — CRUD, categories, search, filters
- Image pipeline (Sharp → R2) live
- Redis caching for category pages
- Homepage, product listing page
- **Moyasar sandbox: initiate one test payment, document issues**

### Week 4 — Product Detail + Search + Admin Catalogue + Staging Live
- Product detail, video pipeline (FFmpeg BullMQ job)
- Full-text search
- Reviews + ratings
- Product detail page, search page
- Admin: product table, create/edit, image upload
- **Staging on AWS Bahrain live**

### Week 5 — Cart + Checkout + Moyasar Full Integration
- Cart, order creation, VAT (15%), flat-rate shipping
- Moyasar full integration — payment, webhooks with signature verification
- Saved addresses
- Cart page, multi-step checkout, payment step, order confirmation
- Admin: order table
- **Client content delivery due (contractual milestone)**
- k6 load test — 500 concurrent users

### Week 6 — Invoices + Email + Customer Dashboard + Integration Tests
- PDF invoice (pdfkit BullMQ job)
- Resend email — order confirmation with invoice attached, bilingual
- Admin: customer table, overview stats, Ant Design Charts
- Customer dashboard — order history
- **Integration tests: full checkout → payment → invoice → email flow**
- **RTL regression: full Arabic walkthrough of every page**

### Week 7 — Logistics + Polish + Performance + SEO
- Aramex + DHL sandbox — manual dispatch
- Stock tracking (in-stock/out-of-stock)
- Bull Board job monitoring
- All loading states + error boundaries
- **Lighthouse audit: all key pages 85+ on mobile**
- **Core Web Vitals: LCP <2.5s, CLS <0.1**
- Sitemap, robots.txt, meta tags, OG images (Arabic + English)
- HTTPS verified on staging

### Week 8 — Buffer + Final QA + Production Deploy
- Fix anything that slipped
- Full end-to-end smoke test — every flow, Arabic + English
- OWASP top 10 security checklist
- Production deploy — AWS Bahrain
- DNS, HTTPS, Cloudflare proxy
- Client sign-off on staging
- Go-live
- Sentry + Pino monitoring confirmed

---

## 10. Risk Register

| Risk | Mitigation |
|------|-----------|
| Moyasar approval delay | Registered pre-project, spike Week 3 |
| OTP provider delay | Registered pre-project |
| Aramex/DHL sandbox delay | Requested pre-project |
| No Figma / design | Agreed pre-project — contractual blocker for Week 3 |
| Client content late | Formal contractual milestone — Week 5, in writing |
| GSAP + RTL issues | Discovered and resolved Week 1 |
| Hire ramp-up | Half day 1 onboarding |
| Week 8 overload | Real work ends Week 7, Week 8 is buffer |
| No testing | Integration tests written Week 6 alongside feature |
| ERP undefined | IERPAdapter in hurain-types Week 1, NullAdapter ships |

---

## 11. Phase 2 Preview (Out of Scope Now, Architected For)

- React Native mobile app (Expo — `hurain-mobile` repo ready)
- ERP adapter (interface defined — implement when client decides system)
- Seller portal / multi-vendor
- Returns and refunds workflow
- COD and BNPL payment methods
- AI product recommendations
- Loyalty programme
- Native push notifications

---

*Design approved. Next step: implementation plan via writing-plans skill.*
