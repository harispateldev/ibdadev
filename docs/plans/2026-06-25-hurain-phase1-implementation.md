# Hurain Phase 1 — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a production-ready single-vendor e-commerce platform for a Saudi Arabia client — customer storefront, admin dashboard, and backend API — in 8 weeks.

**Architecture:** 4 separate repos (`hurain-types`, `hurain-api`, `hurain-web`, `hurain-admin`) with a shared private npm package for TypeScript types. Backend is a Fastify modular monolith. Frontends are Next.js with Arabic/RTL from day one.

**Tech Stack:** Fastify · MongoDB · Redis · BullMQ · Next.js 14 · Ant Design · Tailwind · GSAP · next-intl · Moyasar · Cloudflare R2 · Sharp · FFmpeg · Resend · AWS Bahrain

---

## Ownership Key

- **[LEAD]** — You (backend + architecture + DevOps)
- **[HIRE]** — Frontend developer
- **[BOTH]** — Pair or sequential

---

## Pre-Project Setup (Before Day 1)

### Task 0: External Accounts (LEAD — Must Be Done Before Project Starts)

**Step 1: Register Unifonic or Taqnyat**
- Go to unifonic.com or taqnyat.sa
- Register business account with Saudi business details
- Request SMS sandbox credentials
- Expected: sandbox API key and sender ID within 1-3 days

**Step 2: Register Moyasar merchant account**
- Go to moyasar.com
- Register and request sandbox access
- Expected: `publishable_key` and `secret_key` for sandbox

**Step 3: Request Aramex sandbox**
- Go to aramex.com/developers
- Register for Developer Portal
- Expected: sandbox credentials within 3-5 business days

**Step 4: Create AWS Bahrain account and IAM**
```bash
# After AWS account created, create IAM user for deployment
aws iam create-user --user-name hurain-deploy
aws iam attach-user-policy --user-name hurain-deploy \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
aws iam create-access-key --user-name hurain-deploy
# Save AccessKeyId and SecretAccessKey
```

**Step 5: Create Cloudflare R2 bucket**
- Cloudflare dashboard → R2 → Create bucket: `hurain-media`
- Create API token with R2 read/write permissions
- Save endpoint URL, access key ID, secret access key

**Step 6: Get GitHub organization ready**
- Create GitHub org: `hurain-platform` (or use personal account)
- Enable GitHub Package Registry for private packages
- Generate a Personal Access Token with `packages:write` and `packages:read` scopes

---

## Week 1 — Foundation + RTL Proof of Concept

### Task 1: Create `hurain-types` Repo (LEAD)

**Files:**
- Create: `hurain-types/package.json`
- Create: `hurain-types/tsconfig.json`
- Create: `hurain-types/src/index.ts`
- Create: `hurain-types/src/product.ts`
- Create: `hurain-types/src/order.ts`
- Create: `hurain-types/src/user.ts`
- Create: `hurain-types/src/cart.ts`
- Create: `hurain-types/src/erp.ts`

**Step 1: Initialise repo**
```bash
mkdir hurain-types && cd hurain-types
git init
npm init -y
```

**Step 2: Configure package.json for GitHub Package Registry**
```json
{
  "name": "@hurain/types",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "restricted"
  },
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  }
}
```

**Step 3: Create tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

**Step 4: Write core types**

`src/user.ts`:
```typescript
export interface User {
  _id: string
  name: string
  nameAr: string
  email: string
  phone: string
  role: 'customer' | 'admin'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Address {
  _id: string
  userId: string
  label: string
  labelAr: string
  street: string
  streetAr: string
  city: string
  cityAr: string
  region: string
  postalCode: string
  isDefault: boolean
}
```

`src/product.ts`:
```typescript
export interface ProductImage {
  thumbnail: string
  medium: string
  large: string
  original: string
}

export interface ProductReview {
  _id: string
  userId: string
  userName: string
  rating: number
  comment: string
  commentAr: string
  createdAt: string
}

export interface Product {
  _id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  price: number
  compareAtPrice?: number
  sku: string
  category: string
  categoryAr: string
  images: ProductImage[]
  videoUrl?: string
  videoPoster?: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockQty: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

`src/cart.ts`:
```typescript
export interface CartItem {
  productId: string
  name: string
  nameAr: string
  price: number
  quantity: number
  image: string
  inStock: boolean
}

export interface Cart {
  _id: string
  userId: string
  items: CartItem[]
  subtotal: number
  updatedAt: string
}
```

`src/order.ts`:
```typescript
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface OrderItem {
  productId: string
  name: string
  nameAr: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  _id: string
  orderId: string
  userId: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  vatAmount: number
  vatRate: number
  total: number
  currency: 'SAR'
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string
  moyasarPaymentId?: string
  shippingAddress: {
    name: string
    phone: string
    street: string
    city: string
    region: string
    postalCode: string
  }
  trackingNumber?: string
  courier?: 'aramex' | 'dhl'
  invoiceUrl?: string
  notes?: string
  createdAt: string
  updatedAt: string
}
```

`src/erp.ts`:
```typescript
import { Product } from './product'
import { Order } from './order'
import { User } from './user'

export interface IERPAdapter {
  syncProduct(product: Product): Promise<void>
  syncOrder(order: Order): Promise<void>
  getInventory(sku: string): Promise<number>
  syncCustomer(user: User): Promise<void>
}

export class NullERPAdapter implements IERPAdapter {
  async syncProduct(product: Product): Promise<void> {
    console.log('[ERP:NullAdapter] syncProduct called', { sku: product.sku })
  }
  async syncOrder(order: Order): Promise<void> {
    console.log('[ERP:NullAdapter] syncOrder called', { orderId: order.orderId })
  }
  async getInventory(sku: string): Promise<number> {
    console.log('[ERP:NullAdapter] getInventory called', { sku })
    return 0
  }
  async syncCustomer(user: User): Promise<void> {
    console.log('[ERP:NullAdapter] syncCustomer called', { userId: user._id })
  }
}
```

`src/index.ts`:
```typescript
export * from './user'
export * from './product'
export * from './cart'
export * from './order'
export * from './erp'
```

**Step 5: Install TypeScript and build**
```bash
npm install -D typescript
npm run build
# Expected: dist/ folder created with .js and .d.ts files
```

**Step 6: Publish to GitHub Package Registry**
```bash
# Create .npmrc
echo "@hurain:registry=https://npm.pkg.github.com" > .npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> .npmrc
echo ".npmrc" >> .gitignore

npm publish
# Expected: Package published to @hurain/types
```

**Step 7: Commit**
```bash
git add -A
git commit -m "feat: initial @hurain/types package — core domain interfaces and NullERPAdapter"
```

---

### Task 2: Create `hurain-api` Repo — Skeleton (LEAD)

**Files:**
- Create: `hurain-api/package.json`
- Create: `hurain-api/tsconfig.json`
- Create: `hurain-api/src/app.ts`
- Create: `hurain-api/src/server.ts`
- Create: `hurain-api/src/plugins/db.ts`
- Create: `hurain-api/src/plugins/redis.ts`
- Create: `hurain-api/src/plugins/auth.ts`
- Create: `hurain-api/.env.example`
- Create: `hurain-api/docker-compose.yml`
- Create: `hurain-api/Dockerfile`

**Step 1: Initialise and install dependencies**
```bash
mkdir hurain-api && cd hurain-api
git init
npm init -y

# Core
npm install fastify @fastify/jwt @fastify/cookie @fastify/cors @fastify/helmet \
  @fastify/rate-limit @fastify/multipart @fastify/swagger @fastify/swagger-ui \
  mongoose ioredis bullmq @hurain/types

# Dev
npm install -D typescript ts-node-dev @types/node
```

**Step 2: Create tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

**Step 3: Create .env.example**
```env
PORT=3001
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/hurain
REDIS_URL=redis://localhost:6379

JWT_SECRET=change-this-in-production
JWT_REFRESH_SECRET=change-this-too

CLOUDFLARE_R2_ENDPOINT=
CLOUDFLARE_R2_ACCESS_KEY=
CLOUDFLARE_R2_SECRET_KEY=
CLOUDFLARE_R2_BUCKET=hurain-media

MOYASAR_SECRET_KEY=
MOYASAR_PUBLISHABLE_KEY=
MOYASAR_WEBHOOK_SECRET=

SMS_PROVIDER=unifonic
UNIFONIC_APP_SID=
UNIFONIC_SENDER_ID=

RESEND_API_KEY=
EMAIL_FROM=noreply@hurain.com

SENTRY_DSN=
```

**Step 4: Create docker-compose.yml**
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mongodb_data:
  redis_data:
```

**Step 5: Create src/plugins/db.ts**
```typescript
import fp from 'fastify-plugin'
import mongoose from 'mongoose'

export default fp(async (fastify) => {
  await mongoose.connect(process.env.MONGODB_URI!)
  fastify.log.info('MongoDB connected')

  fastify.addHook('onClose', async () => {
    await mongoose.disconnect()
  })
})
```

**Step 6: Create src/plugins/redis.ts**
```typescript
import fp from 'fastify-plugin'
import Redis from 'ioredis'

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis
  }
}

export default fp(async (fastify) => {
  const redis = new Redis(process.env.REDIS_URL!)
  fastify.decorate('redis', redis)

  fastify.addHook('onClose', async () => {
    await redis.quit()
  })
})
```

**Step 7: Create src/app.ts**
```typescript
import Fastify from 'fastify'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import dbPlugin from './plugins/db'
import redisPlugin from './plugins/redis'

export async function buildApp() {
  const app = Fastify({ logger: { level: 'info' } })

  await app.register(helmet)
  await app.register(cors, { origin: process.env.ALLOWED_ORIGINS?.split(',') })
  await app.register(rateLimit, { max: 100, timeWindow: '1 minute' })
  await app.register(swagger, {
    openapi: { info: { title: 'Hurain API', version: '1.0.0' } }
  })
  await app.register(swaggerUi, { routePrefix: '/docs' })
  await app.register(dbPlugin)
  await app.register(redisPlugin)

  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }))

  return app
}
```

**Step 8: Create src/server.ts**
```typescript
import 'dotenv/config'
import { buildApp } from './app'

const start = async () => {
  const app = await buildApp()
  await app.listen({ port: Number(process.env.PORT) || 3001, host: '0.0.0.0' })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

**Step 9: Add scripts to package.json**
```json
"scripts": {
  "dev": "ts-node-dev --respawn src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

**Step 10: Start Docker and test**
```bash
docker compose up -d
npm run dev
curl http://localhost:3001/health
# Expected: {"status":"ok","timestamp":"..."}
```

**Step 11: Commit**
```bash
git add -A
git commit -m "feat: Fastify skeleton — MongoDB, Redis, health check, Swagger"
```

---

### Task 3: Create `hurain-web` Repo — Skeleton (HIRE)

**Files:**
- Create: `hurain-web/` (Next.js project)
- Create: `hurain-web/src/app/[locale]/layout.tsx`
- Create: `hurain-web/src/app/[locale]/page.tsx`
- Create: `hurain-web/src/i18n/routing.ts`
- Create: `hurain-web/src/middleware.ts`
- Create: `hurain-web/messages/en.json`
- Create: `hurain-web/messages/ar.json`

**Step 1: Bootstrap Next.js**
```bash
npx create-next-app@latest hurain-web \
  --typescript --tailwind --app --src-dir \
  --import-alias "@/*" --no-eslint
cd hurain-web
```

**Step 2: Install core packages**
```bash
npm install next-intl @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @tanstack/react-query zustand gsap @gsap/react framer-motion \
  react-hook-form zod @hookform/resolvers @hurain/types
npm install -D @types/gsap
```

**Step 3: Configure next-intl routing — src/i18n/routing.ts**
```typescript
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always'
})
```

**Step 4: Create middleware.ts**
```typescript
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
```

**Step 5: Create app/[locale]/layout.tsx**
```typescript
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'
import { IBM_Plex_Arabic, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const ibmPlexArabic = IBM_Plex_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
  variable: '--font-arabic'
})

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir}>
      <body className={`${inter.variable} ${ibmPlexArabic.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

**Step 6: Create RTL proof of concept component**

Create `src/components/sections/HeroProofOfConcept.tsx`:
```typescript
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

export function HeroProofOfConcept() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const locale = useLocale()
  const isRTL = locale === 'ar'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center bg-black">
      <h1
        ref={titleRef}
        className="text-6xl font-bold text-white"
        style={{ fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-inter)' }}
      >
        {isRTL ? 'حُريْن — التسوق الفاخر' : 'Hurain — Premium Shopping'}
      </h1>
    </section>
  )
}
```

**Step 7: Test RTL renders correctly**
```bash
npm run dev
# Open http://localhost:3000/ar — verify Arabic text renders RTL
# Open http://localhost:3000/en — verify English renders LTR
# Verify GSAP animation fires on scroll
# Verify no layout shift on Arabic text (font loaded correctly)
```

**Step 8: Commit**
```bash
git add -A
git commit -m "feat: Next.js skeleton — next-intl RTL/LTR, IBM Plex Arabic, GSAP RTL proof of concept"
```

---

### Task 4: Create `hurain-admin` Repo — Skeleton (HIRE)

**Files:**
- Create: `hurain-admin/` (Next.js Pages Router project)
- Create: `hurain-admin/pages/_app.tsx`
- Create: `hurain-admin/pages/index.tsx`
- Create: `hurain-admin/components/layout/AdminLayout.tsx`

**Step 1: Bootstrap Next.js (Pages Router)**
```bash
npx create-next-app@latest hurain-admin \
  --typescript --no-tailwind --no-app --src-dir \
  --import-alias "@/*"
cd hurain-admin
```

**Step 2: Install Ant Design**
```bash
npm install antd @ant-design/icons @ant-design/charts \
  @tanstack/react-query axios @hurain/types
```

**Step 3: Configure pages/_app.tsx**
```typescript
import type { AppProps } from 'next/app'
import { ConfigProvider, theme } from 'antd'
import arEG from 'antd/locale/ar_EG'
import enUS from 'antd/locale/en_US'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import 'antd/dist/reset.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const [locale] = useState<'ar' | 'en'>('ar')

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={locale === 'ar' ? arEG : enUS}
        direction={locale === 'ar' ? 'rtl' : 'ltr'}
        theme={{ algorithm: theme.defaultAlgorithm }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </QueryClientProvider>
  )
}
```

**Step 4: Create AdminLayout.tsx**
```typescript
import { Layout, Menu } from 'antd'
import {
  DashboardOutlined, ShoppingOutlined, UserOutlined,
  OrderedListOutlined, InboxOutlined
} from '@ant-design/icons'
import { useRouter } from 'next/router'

const { Sider, Content, Header } = Layout

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const menuItems = [
    { key: '/admin', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/admin/products', icon: <ShoppingOutlined />, label: 'Products' },
    { key: '/admin/orders', icon: <OrderedListOutlined />, label: 'Orders' },
    { key: '/admin/customers', icon: <UserOutlined />, label: 'Customers' },
    { key: '/admin/stock', icon: <InboxOutlined />, label: 'Stock' },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ color: 'white', padding: 16, fontWeight: 700 }}>Hurain Admin</div>
        <Menu
          theme="dark"
          selectedKeys={[router.pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px' }} />
        <Content style={{ margin: 24, padding: 24, background: '#fff' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
```

**Step 5: Test admin renders**
```bash
npm run dev
# Open http://localhost:3002
# Verify Ant Design sidebar renders
# Verify Arabic locale direction is RTL
```

**Step 6: Commit**
```bash
git add -A
git commit -m "feat: admin skeleton — Ant Design, RTL ConfigProvider, admin layout shell"
```

---

### Task 5: GitHub Actions CI for All Repos (LEAD)

Create `.github/workflows/ci.yml` in each repo:

**Step 1: Create CI workflow (same for all repos, copy to each)**
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          registry-url: 'https://npm.pkg.github.com'
      - run: npm ci
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - run: npm run build
```

**Step 2: Add GitHub secret for package registry**
- Each repo → Settings → Secrets → `GITHUB_TOKEN` (auto-provided)
- Add `NPM_TOKEN` secret with your GitHub PAT for installing `@hurain/types`

**Step 3: Commit to each repo**
```bash
git add .github/
git commit -m "ci: add GitHub Actions build workflow"
```

---

## Week 2 — Auth System

### Task 6: User Model + OTP Model (LEAD)

**Files:**
- Create: `hurain-api/src/modules/auth/models/user.model.ts`
- Create: `hurain-api/src/modules/auth/models/otp.model.ts`
- Create: `hurain-api/src/modules/auth/models/refresh-token.model.ts`

**Step 1: Create user.model.ts**
```typescript
import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  nameAr: string
  email?: string
  phone?: string
  passwordHash?: string
  role: 'customer' | 'admin'
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  email: { type: String, sparse: true, unique: true, lowercase: true },
  phone: { type: String, sparse: true, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

userSchema.index({ email: 1 })
userSchema.index({ phone: 1 })

export const UserModel = mongoose.model<IUser>('User', userSchema)
```

**Step 2: Create otp.model.ts**
```typescript
import mongoose, { Schema, Document } from 'mongoose'

export interface IOTP extends Document {
  phone: string
  code: string
  expiresAt: Date
  attempts: number
  verified: boolean
}

const otpSchema = new Schema<IOTP>({
  phone: { type: String, required: true, index: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  attempts: { type: Number, default: 0 },
  verified: { type: Boolean, default: false }
})

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const OTPModel = mongoose.model<IOTP>('OTP', otpSchema)
```

**Step 3: Create refresh-token.model.ts**
```typescript
import mongoose, { Schema, Document } from 'mongoose'

export interface IRefreshToken extends Document {
  userId: string
  token: string
  expiresAt: Date
  isRevoked: boolean
}

const refreshTokenSchema = new Schema<IRefreshToken>({
  userId: { type: String, required: true, index: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  isRevoked: { type: Boolean, default: false }
})

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const RefreshTokenModel = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema)
```

**Step 4: Commit**
```bash
git add src/modules/auth/models/
git commit -m "feat: user, OTP, and refresh token models with indexes"
```

---

### Task 7: Auth Service — OTP + JWT (LEAD)

**Files:**
- Create: `hurain-api/src/modules/auth/auth.service.ts`
- Create: `hurain-api/src/modules/auth/sms.service.ts`

**Step 1: Install auth dependencies**
```bash
npm install bcryptjs jsonwebtoken crypto-js
npm install -D @types/bcryptjs @types/jsonwebtoken
```

**Step 2: Create sms.service.ts**
```typescript
import axios from 'axios'

export class SMSService {
  async sendOTP(phone: string, code: string): Promise<void> {
    if (process.env.SMS_PROVIDER === 'unifonic') {
      await axios.post('https://api.unifonic.com/rest/SMS/messages', {
        AppSid: process.env.UNIFONIC_APP_SID,
        SenderID: process.env.UNIFONIC_SENDER_ID,
        Body: `Your Hurain verification code is: ${code}. Valid for 10 minutes.`,
        Recipient: phone
      })
    }
    // Log in development
    console.log(`[SMS] OTP for ${phone}: ${code}`)
  }
}
```

**Step 3: Create auth.service.ts**
```typescript
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { UserModel } from './models/user.model'
import { OTPModel } from './models/otp.model'
import { RefreshTokenModel } from './models/refresh-token.model'
import { SMSService } from './sms.service'
import { Redis } from 'ioredis'

export class AuthService {
  private sms = new SMSService()

  constructor(private redis: Redis) {}

  async sendOTP(phone: string): Promise<void> {
    // Rate limit: 5 attempts per 10 minutes
    const key = `otp:rate:${phone}`
    const attempts = await this.redis.incr(key)
    if (attempts === 1) await this.redis.expire(key, 600)
    if (attempts > 5) throw new Error('Too many OTP requests. Try again in 10 minutes.')

    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await OTPModel.deleteMany({ phone })
    await OTPModel.create({ phone, code, expiresAt })
    await this.sms.sendOTP(phone, code)
  }

  async verifyOTP(phone: string, code: string): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    const otp = await OTPModel.findOne({ phone, verified: false })
    if (!otp) throw new Error('OTP not found or already used')
    if (otp.expiresAt < new Date()) throw new Error('OTP expired')
    if (otp.attempts >= 5) throw new Error('Too many incorrect attempts')
    if (otp.code !== code) {
      await OTPModel.updateOne({ _id: otp._id }, { $inc: { attempts: 1 } })
      throw new Error('Invalid OTP')
    }

    await OTPModel.updateOne({ _id: otp._id }, { verified: true })

    let user = await UserModel.findOne({ phone })
    if (!user) {
      user = await UserModel.create({ phone, name: 'Customer', nameAr: 'عميل', role: 'customer' })
    }

    return this.generateTokenPair(user)
  }

  async loginWithEmail(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    const user = await UserModel.findOne({ email, isActive: true })
    if (!user || !user.passwordHash) throw new Error('Invalid credentials')

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) throw new Error('Invalid credentials')

    return this.generateTokenPair(user)
  }

  private async generateTokenPair(user: any) {
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    )

    const refreshToken = crypto.randomBytes(64).toString('hex')
    await RefreshTokenModel.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    })

    return {
      accessToken,
      refreshToken,
      user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    const tokenDoc = await RefreshTokenModel.findOne({ token: refreshToken, isRevoked: false })
    if (!tokenDoc || tokenDoc.expiresAt < new Date()) throw new Error('Invalid refresh token')

    const user = await UserModel.findById(tokenDoc.userId)
    if (!user) throw new Error('User not found')

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    )

    return { accessToken }
  }

  async logout(refreshToken: string): Promise<void> {
    await RefreshTokenModel.updateOne({ token: refreshToken }, { isRevoked: true })
  }
}
```

**Step 5: Commit**
```bash
git add src/modules/auth/
git commit -m "feat: auth service — OTP send/verify, email login, JWT + refresh token"
```

---

### Task 8: Auth Routes (LEAD)

**Files:**
- Create: `hurain-api/src/modules/auth/auth.routes.ts`
- Modify: `hurain-api/src/app.ts`

**Step 1: Create auth.routes.ts**
```typescript
import { FastifyInstance } from 'fastify'
import { AuthService } from './auth.service'

export async function authRoutes(fastify: FastifyInstance) {
  const authService = new AuthService(fastify.redis)

  fastify.post('/auth/otp/send', {
    schema: {
      body: {
        type: 'object',
        required: ['phone'],
        properties: { phone: { type: 'string', pattern: '^\\+966[0-9]{9}$' } }
      }
    }
  }, async (req, reply) => {
    const { phone } = req.body as { phone: string }
    await authService.sendOTP(phone)
    return reply.send({ message: 'OTP sent' })
  })

  fastify.post('/auth/otp/verify', {
    schema: {
      body: {
        type: 'object',
        required: ['phone', 'code'],
        properties: {
          phone: { type: 'string' },
          code: { type: 'string', minLength: 6, maxLength: 6 }
        }
      }
    }
  }, async (req, reply) => {
    const { phone, code } = req.body as { phone: string; code: string }
    const result = await authService.verifyOTP(phone, code)
    return reply.send(result)
  })

  fastify.post('/auth/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 }
        }
      }
    }
  }, async (req, reply) => {
    const { email, password } = req.body as { email: string; password: string }
    const result = await authService.loginWithEmail(email, password)
    return reply.send(result)
  })

  fastify.post('/auth/refresh', async (req, reply) => {
    const { refreshToken } = req.body as { refreshToken: string }
    const result = await authService.refreshAccessToken(refreshToken)
    return reply.send(result)
  })

  fastify.post('/auth/logout', async (req, reply) => {
    const { refreshToken } = req.body as { refreshToken: string }
    await authService.logout(refreshToken)
    return reply.send({ message: 'Logged out' })
  })
}
```

**Step 2: Register routes in app.ts — add after plugins:**
```typescript
import { authRoutes } from './modules/auth/auth.routes'
// inside buildApp():
await app.register(authRoutes, { prefix: '/api/v1' })
```

**Step 3: Test manually**
```bash
# Send OTP
curl -X POST http://localhost:3001/api/v1/auth/otp/send \
  -H "Content-Type: application/json" \
  -d '{"phone":"+966501234567"}'
# Expected: {"message":"OTP sent"} and code logged in console

# Verify OTP (use code from console log)
curl -X POST http://localhost:3001/api/v1/auth/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"phone":"+966501234567","code":"123456"}'
# Expected: {"accessToken":"...","refreshToken":"...","user":{...}}
```

**Step 4: Test invalid phone is rejected by schema**
```bash
curl -X POST http://localhost:3001/api/v1/auth/otp/send \
  -H "Content-Type: application/json" \
  -d '{"phone":"invalid"}'
# Expected: 400 Bad Request — Fastify schema rejects it automatically
```

**Step 5: Commit**
```bash
git add src/modules/auth/auth.routes.ts src/app.ts
git commit -m "feat: auth routes — OTP send/verify, email login, refresh, logout"
```

---

### Task 9: Auth Pages — Web Frontend (HIRE)

**Files:**
- Create: `hurain-web/src/app/[locale]/(auth)/login/page.tsx`
- Create: `hurain-web/src/app/[locale]/(auth)/signup/page.tsx`
- Create: `hurain-web/src/app/[locale]/(auth)/reset-password/page.tsx`
- Create: `hurain-web/src/components/auth/OTPForm.tsx`
- Create: `hurain-web/src/components/auth/EmailLoginForm.tsx`
- Create: `hurain-web/src/lib/api.ts`

**Step 1: Create API client — src/lib/api.ts**
```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'

export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }))
    throw new Error(error.message)
  }
  return res.json()
}
```

**Step 2: Create OTPForm.tsx**
```typescript
'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { apiCall } from '@/lib/api'

export function OTPForm() {
  const t = useTranslations('auth')
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await apiCall('/auth/otp/send', {
        method: 'POST',
        body: JSON.stringify({ phone: `+966${phone}` })
      })
      setStep('code')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await apiCall<{ accessToken: string; user: any }>('/auth/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ phone: `+966${phone}`, code })
      })
      localStorage.setItem('accessToken', result.accessToken)
      window.location.href = '/'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (step === 'phone') {
    return (
      <form onSubmit={handleSendOTP} className="space-y-4">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t('phonePlaceholder')}
          className="w-full border rounded-lg px-4 py-3"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? t('sending') : t('sendOTP')}
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleVerifyOTP} className="space-y-4">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={t('codePlaceholder')}
        maxLength={6}
        className="w-full border rounded-lg px-4 py-3 text-center text-2xl tracking-widest"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? t('verifying') : t('verify')}
      </button>
    </form>
  )
}
```

**Step 3: Add messages**

`messages/en.json`:
```json
{
  "auth": {
    "phonePlaceholder": "Phone number (5XXXXXXXX)",
    "sendOTP": "Send Code",
    "sending": "Sending...",
    "codePlaceholder": "Enter 6-digit code",
    "verify": "Verify",
    "verifying": "Verifying..."
  }
}
```

`messages/ar.json`:
```json
{
  "auth": {
    "phonePlaceholder": "رقم الجوال (5XXXXXXXX)",
    "sendOTP": "إرسال الرمز",
    "sending": "جارٍ الإرسال...",
    "codePlaceholder": "أدخل الرمز المكون من 6 أرقام",
    "verify": "تحقق",
    "verifying": "جارٍ التحقق..."
  }
}
```

**Step 4: Test in Arabic and English**
```bash
# Open http://localhost:3000/ar/login — verify Arabic placeholder and RTL layout
# Open http://localhost:3000/en/login — verify English and LTR
# Submit with invalid phone — verify error state
```

**Step 5: Commit**
```bash
git add -A
git commit -m "feat: OTP login form — bilingual AR/EN, RTL-aware, connects to API"
```

---

## Week 3 — Products + Homepage + Moyasar Spike

### Task 10: Product Model + Image Upload Pipeline (LEAD)

**Files:**
- Create: `hurain-api/src/modules/products/models/product.model.ts`
- Create: `hurain-api/src/modules/products/image.service.ts`
- Create: `hurain-api/src/modules/products/products.service.ts`
- Create: `hurain-api/src/modules/products/products.routes.ts`

**Step 1: Install image and storage dependencies**
```bash
npm install sharp @aws-sdk/client-s3 @aws-sdk/lib-storage multer
npm install -D @types/multer
```

**Step 2: Create product.model.ts**
```typescript
import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  price: number
  compareAtPrice?: number
  sku: string
  category: string
  categoryAr: string
  images: {
    thumbnail: string
    medium: string
    large: string
    original: string
  }[]
  videoUrl?: string
  videoPoster?: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockQty: number
  isActive: boolean
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  description: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  price: { type: Number, required: true },
  compareAtPrice: Number,
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  categoryAr: { type: String, required: true },
  images: [{
    thumbnail: String,
    medium: String,
    large: String,
    original: String
  }],
  videoUrl: String,
  videoPoster: String,
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  stockQty: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

productSchema.index({ category: 1, price: 1, rating: -1, isActive: 1 })
productSchema.index({ name: 'text', nameAr: 'text', description: 'text', descriptionAr: 'text' })

export const ProductModel = mongoose.model<IProduct>('Product', productSchema)
```

**Step 3: Create image.service.ts**
```typescript
import sharp from 'sharp'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!
  }
})

const CDN_BASE = process.env.CLOUDFLARE_R2_PUBLIC_URL || ''

async function uploadToR2(buffer: Buffer, key: string, contentType: string): Promise<string> {
  await s3.send(new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
    Key: key,
    Body: buffer,
    ContentType: contentType
  }))
  return `${CDN_BASE}/${key}`
}

export async function processAndUploadImage(buffer: Buffer): Promise<{
  thumbnail: string
  medium: string
  large: string
  original: string
}> {
  const id = randomUUID()

  const [thumbnail, medium, large, original] = await Promise.all([
    sharp(buffer).resize(300, 300, { fit: 'cover' }).webp({ quality: 80 }).toBuffer()
      .then(buf => uploadToR2(buf, `products/${id}/thumbnail.webp`, 'image/webp')),
    sharp(buffer).resize(800, 800, { fit: 'inside' }).webp({ quality: 85 }).toBuffer()
      .then(buf => uploadToR2(buf, `products/${id}/medium.webp`, 'image/webp')),
    sharp(buffer).resize(1600, 900, { fit: 'inside' }).webp({ quality: 90 }).toBuffer()
      .then(buf => uploadToR2(buf, `products/${id}/large.webp`, 'image/webp')),
    uploadToR2(buffer, `products/${id}/original`, 'image/jpeg')
  ])

  return { thumbnail, medium, large, original }
}
```

**Step 4: Commit**
```bash
git add src/modules/products/
git commit -m "feat: product model with indexes, Sharp image pipeline to Cloudflare R2"
```

---

### Task 11: Moyasar Sandbox Spike (LEAD)

**Goal:** Verify Moyasar sandbox works before Week 5. Do NOT build the full integration — just confirm the API responds correctly.

**Step 1: Install axios (if not already)**
```bash
npm install axios
```

**Step 2: Create a one-off test script**

Create `scripts/test-moyasar.ts`:
```typescript
import axios from 'axios'

async function testMoyasar() {
  try {
    const response = await axios.post(
      'https://api.moyasar.com/v1/payments',
      {
        amount: 1000, // 10 SAR in halalas
        currency: 'SAR',
        description: 'Test payment',
        callback_url: 'https://example.com/callback',
        source: {
          type: 'creditcard',
          name: 'Test User',
          number: '4111111111111111',
          cvc: '123',
          month: '12',
          year: '2030'
        }
      },
      {
        auth: {
          username: process.env.MOYASAR_SECRET_KEY!,
          password: ''
        }
      }
    )
    console.log('✅ Moyasar sandbox responded:', response.data.status)
  } catch (err: any) {
    console.error('❌ Moyasar error:', err.response?.data || err.message)
  }
}

testMoyasar()
```

**Step 3: Run the spike**
```bash
MOYASAR_SECRET_KEY=sk_test_xxx npx ts-node scripts/test-moyasar.ts
# Expected: ✅ Moyasar sandbox responded: initiated (or similar)
# If error: document the exact error and resolve before Week 5
```

**Step 4: Document result**
- If successful: note the payment flow (initiated → callback → verify)
- If error: open Moyasar support ticket immediately

**Step 5: Delete script and commit note**
```bash
rm scripts/test-moyasar.ts
git commit -m "chore: Moyasar sandbox spike complete — flow verified, ready for Week 5"
```

---

### Task 12: Homepage + Product Listing (HIRE)

**Files:**
- Create: `hurain-web/src/app/[locale]/page.tsx`
- Create: `hurain-web/src/components/sections/HeroSection.tsx`
- Create: `hurain-web/src/components/sections/FeaturedProducts.tsx`
- Create: `hurain-web/src/components/products/ProductCard.tsx`
- Create: `hurain-web/src/app/[locale]/products/page.tsx`

**Step 1: Create ProductCard.tsx**
```typescript
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Product } from '@hurain/types'

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale()
  const name = locale === 'ar' ? product.nameAr : product.name
  const image = product.images[0]

  return (
    <Link href={`/${locale}/products/${product._id}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        {image && (
          <Image
            src={image.medium}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL={image.thumbnail}
          />
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium">
              {locale === 'ar' ? 'غير متاح' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-medium text-gray-900 truncate">{name}</h3>
        <p className="text-lg font-bold mt-1">
          {product.price.toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-SA')} SAR
        </p>
      </div>
    </Link>
  )
}
```

**Step 2: Run Lighthouse on homepage**
```bash
# After building homepage:
npx lighthouse http://localhost:3000/en --output=json --output-path=./lighthouse-report.json
# Check: performance score, LCP, CLS
# Document results — this is the Week 3 baseline
```

**Step 3: Commit**
```bash
git add -A
git commit -m "feat: homepage with hero, featured products, product listing page — bilingual AR/EN"
```

---

## Weeks 4–8 — Task Summary

> Tasks 4–8 follow the same pattern above. Each task has: Files → Steps with code → Test command → Commit. Below is the task list. Full code available on request per task.

---

### Week 4 Tasks

**Task 13: Product Detail Page + Video Player (HIRE)**
- Files: `src/app/[locale]/products/[id]/page.tsx`, `src/components/products/VideoPlayer.tsx`
- Key: `preload="none"`, poster frame, bilingual description, image gallery

**Task 14: Video Upload Pipeline — FFmpeg BullMQ Job (LEAD)**
- Files: `src/jobs/video-process.job.ts`, `src/modules/products/video.service.ts`
- Key: FFmpeg compress async, extract poster at 0:01, upload both to R2, update product

**Task 15: Search Endpoint + Full-Text Index (LEAD)**
- Files: `src/modules/products/search.service.ts`, `src/modules/products/products.routes.ts`
- Key: MongoDB `$text` search, filter by price/category/rating, paginated results

**Task 16: Search Page + Filters (HIRE)**
- Files: `src/app/[locale]/search/page.tsx`, `src/components/products/FilterSidebar.tsx`
- Key: URL-based filters, bilingual category names, skeleton loading

**Task 17: Admin Product Table + CRUD (HIRE)**
- Files: `pages/admin/products/index.tsx`, `pages/admin/products/create.tsx`
- Key: Ant Design Table with sort/filter, React Dropzone for image upload, bilingual fields

**Task 18: Staging Environment — AWS Bahrain (LEAD)**
- Docker build and push to ECR, ECS task definition, ALB, Route 53, SSL certificate

---

### Week 5 Tasks

**Task 19: Cart Model + Endpoints (LEAD)**
- Files: `src/modules/orders/models/cart.model.ts`, `src/modules/orders/cart.routes.ts`

**Task 20: Cart Page (HIRE)**
- Files: `src/app/[locale]/cart/page.tsx`
- Key: Optimistic quantity updates, VAT preview, empty cart state

**Task 21: Order Model + VAT + Shipping (LEAD)**
- Files: `src/modules/orders/models/order.model.ts`, `src/modules/orders/order.service.ts`
- Key: 15% VAT, flat-rate shipping, unique orderId generation

**Task 22: Multi-Step Checkout (HIRE)**
- Files: `src/app/[locale]/checkout/page.tsx`
- Key: 3-step (address → delivery → pay), saved addresses, VAT line visible

**Task 23: Moyasar Full Integration (LEAD)**
- Files: `src/modules/payments/moyasar.service.ts`, `src/modules/payments/payment.routes.ts`
- Key: Initiate payment, webhook handler with signature verification, update order on success

**Task 24: k6 Load Test (LEAD)**
- File: `scripts/load-test.js`
- Target: 500 concurrent users on product listing, all responses <500ms

---

### Week 6 Tasks

**Task 25: PDF Invoice Generation (LEAD)**
- Files: `src/jobs/invoice.job.ts`
- Key: pdfkit, bilingual (Arabic + English sections), order summary, VAT breakdown

**Task 26: Email Service — Resend (LEAD)**
- Files: `src/modules/notifications/email.service.ts`
- Key: Order confirmation email, invoice attached, bilingual HTML template

**Task 27: Customer Dashboard (HIRE)**
- Files: `src/app/[locale]/account/orders/page.tsx`
- Key: Order history list, order detail with status, invoice download link

**Task 28: Admin Overview Dashboard + Charts (HIRE)**
- Files: `pages/admin/index.tsx`
- Key: Ant Design Charts — revenue by day, orders by status, top products

**Task 29: Integration Tests — Checkout Flow (LEAD)**
- Files: `tests/checkout.integration.test.ts`
- Key: Full flow — add to cart → checkout → Moyasar mock payment → invoice generated → email queued
- Run: `npm test` must pass before Week 6 ends

**Task 30: Full Arabic RTL Walkthrough (HIRE)**
- Walk every page at `/ar/*`, document any layout breaks, fix before Week 7

---

### Week 7 Tasks

**Task 31: Aramex/DHL Manual Dispatch (LEAD)**
- Files: `src/modules/logistics/aramex.service.ts`, `src/modules/logistics/logistics.routes.ts`
- Key: Create shipment, get tracking number, update order with trackingNumber

**Task 32: Stock Management (LEAD + HIRE)**
- API: `PATCH /admin/products/:id/stock` endpoint
- Admin UI: stock toggle and quantity field in product edit page

**Task 33: Lighthouse Audit + Performance Fixes (HIRE)**
- Run Lighthouse on: homepage, product listing, product detail, checkout
- Fix any score below 85 on mobile

**Task 34: Technical SEO (BOTH)**
- `sitemap.xml` via next-sitemap
- `robots.txt`
- Per-page meta tags + OG images (Arabic + English)
- Verify `lang` and `dir` attributes in HTML output

**Task 35: Bull Board Admin UI (LEAD)**
- Install `@bull-board/fastify`, mount at `/admin/jobs` behind admin auth

---

### Week 8 — Buffer + Deploy

**Task 36: Production Deploy Checklist (LEAD)**
```
□ All env vars set in production (AWS Secrets Manager or Parameter Store)
□ MongoDB Atlas production cluster (or AWS DocumentDB)
□ Redis production instance (AWS ElastiCache)
□ Cloudflare R2 CORS policy configured for production domain
□ Moyasar webhook URL updated to production
□ Sentry DSN configured, test error fires and appears in Sentry
□ SSL certificate active on production domain
□ Cloudflare proxy enabled on DNS
□ Health check endpoint monitored (AWS Route 53 health check)
```

**Task 37: End-to-End Smoke Test (BOTH)**
```
□ Register via OTP (Arabic phone number)
□ Browse products in Arabic
□ Search for a product in Arabic
□ Add to cart
□ Complete checkout with Moyasar test card
□ Receive order confirmation email with PDF invoice
□ Admin: see order, update status
□ Admin: view customer account
□ All above repeated in English (/en/)
```

---

## Critical Rules For Both Developers

1. **RTL is tested on every component before it merges** — not at end of sprint
2. **Business logic lives in `hurain-api` only** — frontends call the API, they never calculate VAT, validate business rules, or touch the database
3. **Every image uses Next.js `<Image>`** — no raw `<img>` tags on product content
4. **Video always has `preload="none"`** — never downloads until user presses play
5. **Every API endpoint has a Fastify JSON Schema** — schema validation is the first line of defence
6. **Moyasar webhook handler verifies the signature** — this is a security requirement, not optional
7. **Commits are small and frequent** — one feature = one commit, not one sprint = one commit

---

*Implementation plan complete. Ready to execute.*
