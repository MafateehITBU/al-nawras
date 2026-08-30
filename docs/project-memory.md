# Al Nawras Intellectual Property — Project Memory

> **Source of truth** for architecture decisions, implementation status, and technical context.
> Read this document before starting any new task. Update it after significant changes.

**Last updated:** 2026-08-29  
**Current phase:** Phase 7 — Public Website (header/footer) 🚧

---

## 1. Project Overview

Al Nawras Intellectual Property is a full-stack Next.js application containing:

- Public-facing bilingual website (English / Arabic)
- Administrative dashboard with role-based permissions
- RESTful API routes
- PostgreSQL database via Prisma ORM
- Cloudinary for media storage
- Deployed on Vercel with Neon PostgreSQL

---

## 2. Technology Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js (App Router) | 16.3.3 | Single application, no separate backend |
| Language | TypeScript | 5.x | Strict mode enabled |
| Styling | Tailwind CSS | 4.x | CSS-first config via `@import "tailwindcss"` |
| Database | PostgreSQL | — | Local dev + Neon in production |
| ORM | Prisma | 6.19.x | `prisma-client-js` generator, Neon-compatible |
| Validation | Zod | 4.x | Shared schemas for API and forms |
| Media | Cloudinary | 2.x | Image and document uploads |
| Auth | Auth.js (NextAuth v5) | beta | JWT sessions, credentials provider |
| Deployment | Vercel | — | Serverless, with `prisma generate` in build |
| Formatting | Prettier + ESLint | — | Prettier integrated via eslint-config-prettier |

---

## 3. Architecture Decisions

### 3.1 Single Next.js Application

All public website, admin dashboard, and API logic live in one Next.js project. No separate Express/PERN backend.

### 3.2 App Router Route Organization

```
app/
├── [locale]/           # Public site — /en/*, /ar/* (Phase 7)
├── admin/              # Admin dashboard — /admin/*
├── api/                # API routes — /api/*
├── layout.tsx          # Root layout
├── sitemap.ts          # Public sitemap
├── robots.ts           # Crawler rules
└── globals.css
```

### 3.3 Library Organization

```
lib/
├── api/                # Standardized API responses and error handling
├── auth/               # Authentication (Phase 3)
├── authorization/      # Permission system (Phase 3)
├── db/                 # Prisma client singleton
├── services/           # Business logic layer
├── validations/        # Zod schemas
├── utils/              # Shared utilities
└── env.ts              # Environment variable validation (lazy)

constants/
├── index.ts            # App-wide constants
└── permissions.ts      # Permission labels and helpers

types/                  # Shared TypeScript types (re-exports Prisma types)
prisma/                 # Schema, migrations, seed
docs/                   # project-memory.md, architecture.md
```

### 3.4 API Response Standard

All API routes return `{ success, data }` or `{ success: false, error: { code, message, details? } }`.

### 3.5 Database Connection

- `DATABASE_URL` — pooled connection for application queries
- `DIRECT_URL` — direct connection for Prisma migrations
- Local dev: both point to `localhost:5432/al-nawras`
- Prisma client singleton in `lib/db/prisma.ts`

### 3.6 Bilingual Content Strategy

Separate fields per language (`nameEn` / `nameAr`, `titleEn` / `titleAr`, etc.) rather than JSON blobs. Enables indexing, type safety, and straightforward querying.

### 3.7 Website Settings — Normalized Structure

Static website info split into focused tables rather than one monolithic settings document:

| Model | Purpose |
|-------|---------|
| `WebsiteSettings` | Singleton (id=1): business hours, contact email |
| `WebsitePhone` | Multiple phone numbers with sort order |
| `WebsiteAddress` | Multiple bilingual addresses |
| `WebsiteMapLocation` | Multiple lat/lng map pins |
| `WebsiteSocialLink` | One row per platform (LinkedIn, Facebook, Instagram, X) |

### 3.8 Cloudinary Asset Storage

Images and attachments store Cloudinary metadata in the database:
- `*Url` — public delivery URL
- `*PublicId` — for deletion/replacement via Cloudinary API
- `attachmentFormat` — optional, for document type tracking

Upload logic centralized in `lib/cloudinary/`:
- `client.ts` — SDK configuration (lazy init)
- `validation.ts` — file type and size validation
- `upload.ts` — upload, delete, replace helpers

Cloudinary folders:
- `al-nawras/admin-profiles` — admin profile images
- `al-nawras/blogs/images` — blog featured images
- `al-nawras/blogs/attachments` — blog document attachments

Upload limits (see `constants/index.ts`):
- Images: 5 MB max (JPEG, PNG, WebP, GIF)
- Documents: 10 MB max (PDF, DOC, DOCX)

### 3.9 Authentication

- **Auth.js (NextAuth v5)** with Credentials provider for admin login
- **JWT session strategy** (8-hour max age, serverless-compatible)
- Passwords hashed with **bcryptjs** (12 salt rounds)
- Inactive admins rejected at login
- Session stores `admin` object (public fields only, no passwordHash)
- JWT callback avoids DB calls (Edge middleware compatible)
- API routes validate session against DB via `validateSessionAdmin()`

### 3.10 Authorization

- `SUPER_ADMIN` role bypasses all permission checks
- Regular admins require explicit `Permission` enum values
- Centralized helpers: `hasPermission()`, `requirePermission()`, `requireSuperAdmin()`
- API route wrappers: `withAuth()`, `withPermission()`
- Admin management rules:
  - Only super admins can create/assign `SUPER_ADMIN` role
  - Regular admins with `MANAGE_ADMINS` cannot manage super admin accounts
  - Admins cannot deactivate, change role, or delete themselves

### 3.11 Contact Enquiry → Service Relationship

`ContactEnquiry.serviceId` links enquiry type to an actual `Service` record (not a free-text field).

### 3.12 Slug & Reading Time

Auto-generated slugs via `lib/utils/index.ts`. Reading time stored as `readingTimeMinutes` on Blog, calculated at create/update time.

---

## 4. Database Schema

**Status:** ✅ Complete — migration `20260829065019_init` applied

### Enums

| Enum | Values |
|------|--------|
| `AdminRole` | `SUPER_ADMIN`, `ADMIN` |
| `Permission` | `MANAGE_ADMINS`, `MANAGE_BLOGS`, `MANAGE_SERVICES`, `MANAGE_CONTACT_ENQUIRIES`, `MANAGE_WEBSITE_SETTINGS` |
| `EnquiryStatus` | `NEW`, `READ`, `ARCHIVED` |
| `SocialPlatform` | `LINKEDIN`, `FACEBOOK`, `INSTAGRAM`, `X` |

### Models

| Model | Table | Key Fields & Relationships |
|-------|-------|---------------------------|
| `Admin` | `admins` | email (unique), phoneNumber, passwordHash, role, permissions[], isActive |
| `WebsiteSettings` | `website_settings` | Singleton id=1: businessHours, contactEmail |
| `WebsitePhone` | `website_phones` | phoneNumber, label, sortOrder |
| `WebsiteAddress` | `website_addresses` | addressEn, addressAr, label, sortOrder |
| `WebsiteMapLocation` | `website_map_locations` | latitude, longitude, label, sortOrder |
| `WebsiteSocialLink` | `website_social_links` | platform (unique), url |
| `BlogCategory` | `blog_categories` | nameEn, nameAr, slug (unique) |
| `Blog` | `blogs` | bilingual content, slug, categoryId → BlogCategory, Cloudinary refs |
| `ServiceCategory` | `service_categories` | nameEn, nameAr, slug (unique) |
| `Service` | `services` | categoryId, nameEn/Ar, heroTitleEn/Ar, heroDescriptionEn/Ar, overviewTitleEn/Ar, overviewDescriptionEn/Ar, strategic benefits |
| `ServiceStrategicBenefit` | `service_strategic_benefits` | icon, bilingual title/description, serviceId (cascade delete) |
| `ContactEnquiry` | `contact_enquiries` | contact info, serviceId → Service, status enum |

### Indexes

- `admins`: email (unique), isActive
- `blogs`: slug (unique), categoryId, publishedAt
- `blog_categories`: slug (unique)
- `service_categories`: slug (unique)
- `services`: categoryId
- `contact_enquiries`: status, serviceId, createdAt
- `service_strategic_benefits`: serviceId + sortOrder
- Sort order indexes on phones, addresses, map locations

### Cascade / Restrict Behavior

- Blog → BlogCategory: `onDelete: Restrict`
- Service → ServiceCategory: `onDelete: Restrict`
- ServiceStrategicBenefit → Service: `onDelete: Cascade`
- ContactEnquiry → Service: `onDelete: Restrict`

---

## 5. API Structure

| Method | Endpoint | Auth | Permission | Description |
|--------|----------|------|------------|-------------|
| GET | `/api/health` | — | — | Health check |
| GET/POST | `/api/auth/[...nextauth]` | — | — | Auth.js handlers |
| GET | `/api/admin/me` | ✅ | — | Current admin profile |
| GET | `/api/admin/admins` | ✅ | MANAGE_ADMINS | List admins (paginated) |
| POST | `/api/admin/admins` | ✅ | MANAGE_ADMINS | Create admin |
| GET | `/api/admin/admins/[id]` | ✅ | MANAGE_ADMINS | Get admin by ID |
| PATCH | `/api/admin/admins/[id]` | ✅ | MANAGE_ADMINS | Update admin |
| DELETE | `/api/admin/admins/[id]` | ✅ | MANAGE_ADMINS | Delete admin |

### Website Settings (`MANAGE_WEBSITE_SETTINGS`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/website` | Get all website content |
| PATCH | `/api/admin/website/settings` | Update singleton settings |
| GET/POST | `/api/admin/website/phones` | List / create phones |
| GET/PATCH/DELETE | `/api/admin/website/phones/[id]` | Phone CRUD |
| GET/POST | `/api/admin/website/addresses` | List / create addresses |
| GET/PATCH/DELETE | `/api/admin/website/addresses/[id]` | Address CRUD |
| GET/POST | `/api/admin/website/map-locations` | List / create map pins |
| GET/PATCH/DELETE | `/api/admin/website/map-locations/[id]` | Map location CRUD |
| GET | `/api/admin/website/social-links` | List social links |
| GET/PATCH | `/api/admin/website/social-links/[id]` | Update social link URL |

### Blogs (`MANAGE_BLOGS`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/admin/blog-categories` | List / create categories |
| GET/PATCH/DELETE | `/api/admin/blog-categories/[id]` | Category CRUD |
| GET/POST | `/api/admin/blogs` | List / create blogs |
| GET/PATCH/DELETE | `/api/admin/blogs/[id]` | Blog CRUD |

### Services (`MANAGE_SERVICES`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/admin/service-categories` | List / create categories |
| GET/PATCH/DELETE | `/api/admin/service-categories/[id]` | Category CRUD |
| GET/POST | `/api/admin/services` | List / create services (with benefits) |
| GET/PATCH/DELETE | `/api/admin/services/[id]` | Service CRUD (benefits replace on PATCH) |

### Contact Enquiries

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact-enquiries` | — | Public enquiry submission |
| GET | `/api/admin/contact-enquiries` | ✅ MANAGE_CONTACT_ENQUIRIES | List enquiries |
| GET/PATCH/DELETE | `/api/admin/contact-enquiries/[id]` | ✅ | Enquiry CRUD (PATCH: status) |

### File Uploads (authenticated admin)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/uploads/images` | Upload image (multipart: `file`, optional `folder`) |
| POST | `/api/admin/uploads/documents` | Upload document (multipart: `file`, optional `folder`) |
| DELETE | `/api/admin/uploads` | Delete asset (JSON: `publicId`, `resourceType`) |

---

## 6. Seed Data

Run with `npm run db:seed`. Creates:

| Resource | Default |
|----------|---------|
| Super Admin | `admin@alnawras.com` / `Admin@123456` |
| WebsiteSettings | Business hours + contact email |
| Social links | Empty placeholders for all 4 platforms |

Override via `SEED_SUPER_ADMIN_EMAIL` and `SEED_SUPER_ADMIN_PASSWORD` env vars.

---

## 7. Features Completed

### Phase 1 — Project Foundation ✅

- Next.js, TypeScript, Tailwind, ESLint, Prettier, Prisma foundation
- API response/error helpers, utilities, route scaffolding, documentation

### Phase 2 — Database ✅

- [x] Full Prisma schema with 12 models and 4 enums
- [x] Initial migration and seed script

### Phase 3 — Core Backend ✅

- [x] Auth.js v5 with credentials provider and JWT sessions
- [x] Password hashing (bcryptjs)
- [x] Session validation with live DB check on API requests
- [x] Permission system (`hasPermission`, `requirePermission`, `requireSuperAdmin`)
- [x] API route wrappers (`withAuth`, `withPermission`, `withHandler`)
- [x] Zod validation schemas (common, auth, admin)
- [x] Phone number validation (libphonenumber-js, E.164 format)
- [x] Admin service layer with business rules
- [x] Admin CRUD API (list, create, read, update, delete)
- [x] Middleware protecting `/admin/*` and `/api/admin/*` routes
- [x] `/api/admin/me` current admin endpoint

### Phase 4 — Content APIs ✅

- [x] Website settings CRUD (settings, phones, addresses, map locations, social links)
- [x] Blog categories CRUD with auto-generated slugs
- [x] Blogs CRUD with auto slugs and reading time calculation
- [x] Service categories CRUD with auto-generated slugs
- [x] Services CRUD with nested strategic benefits
- [x] Contact enquiries admin CRUD + public POST endpoint
- [x] Zod validation schemas for all content resources (`lib/validations/content.ts`)
- [x] Service layer for all content resources
- [x] Pagination, search, and filtering on list endpoints

### Phase 5 — File Upload System ✅

- [x] Cloudinary SDK integration (`lib/cloudinary/`)
- [x] Reusable upload, delete, and replace helpers
- [x] File type and size validation
- [x] Image upload endpoint (`POST /api/admin/uploads/images`)
- [x] Document upload endpoint (`POST /api/admin/uploads/documents`)
- [x] Asset deletion endpoint (`DELETE /api/admin/uploads`)
- [x] Organized Cloudinary folders per resource type
- [x] `replaceCloudinaryAsset()` helper for future use in update flows

### Phase 6 — Admin Dashboard (Foundation) ✅

- [x] Dashboard route structure: `admin/(dashboard)/` + separate login
- [x] Design token system (CSS variables + `constants/dashboard-theme.ts`)
- [x] Reusable UI component library (`components/ui/`)
- [x] Dashboard shell: sidebar, header, responsive mobile nav, collapsible sidebar
- [x] Permission-aware navigation (`constants/dashboard-nav.ts`)
- [x] Logo component + placeholder SVG (`public/logo-mark.svg`)
- [x] Login page with credentials sign-in
- [x] Toast notifications (Sonner via `lib/utils/notify.ts`)
- [x] Reusable confirm dialog (`useConfirm`, `useDeleteConfirm`)
- [x] Unsaved changes protection (`useUnsavedChanges`, `GuardedLink`, `beforeunload`)
- [x] Admin session context (`useAdminSession`, `useCan`, `Can`)
- [x] API client helper (`lib/api/client.ts`)
- [x] Dashboard home placeholder
- [x] Account profile placeholder
- [x] `docs/architecture.md` created

#### Phase 6 — Remaining Dashboard Modules ✅

- [x] Dashboard home with real statistics (`/admin`, `GET /api/admin/stats`)
- [x] Admin management pages (`/admin/admins`)
- [x] Website information management (`/admin/website`)
- [x] Blog categories & blogs — TipTap rich text, EN/AR tabs (`/admin/blog-categories`, `/admin/blogs`)
- [x] Service categories & services — Iconify icon selector (`/admin/service-categories`, `/admin/services`)
- [x] Contact enquiries management (`/admin/contact-enquiries`)
- [x] Map location selector — Leaflet + OpenStreetMap + Nominatim geocoding proxy
- [x] File upload UI components (`ImageUploadField`, `DocumentUploadField`) wired to Phase 5 APIs

#### Phase 6 Step 6 — Website Information ✅

- [x] `/admin/website` page with permission `MANAGE_WEBSITE_SETTINGS`
- [x] General settings: business hours, contact email (unsaved-changes aware)
- [x] Phone numbers CRUD (modal forms, delete confirm)
- [x] Addresses CRUD (bilingual EN/AR)
- [x] Map locations CRUD with interactive map picker
- [x] Social links editor (LinkedIn, Facebook, Instagram, X)
- [x] Leaflet + OpenStreetMap tiles (`components/features/map/`)
- [x] Nominatim geocode proxy: `GET /api/admin/geocode/search`, `GET /api/admin/geocode/reverse`
- [x] Dependencies: `leaflet`, `react-leaflet`, `@types/leaflet`

#### Phase 6 — Dashboard Modules (Complete) ✅

- [x] Centered modal dialogs (`dialog[open]` CSS in `globals.css`)
- [x] Sort order hidden from all admin forms (backend defaults preserved)
- [x] Shared: `LocaleTabs`, `SearchToolbar`, `RichTextEditor` (TipTap), `IconPicker` (Iconify)
- [x] Upload fields used in admin profile, blog featured image & attachments
- [x] Dependencies: `@tiptap/react`, `@tiptap/starter-kit`, `@iconify/react`

---

## 8. Pending Features

### Phase 7 — Public Website (Foundation) ✅

- [x] Locale-based routing: `/en`, `/ar` via `app/[locale]/`
- [x] Middleware locale redirect + admin auth in one `middleware.ts`
- [x] Bilingual dictionaries (`lib/i18n/dictionaries.ts`) + `pickLocalizedField()` for DB content
- [x] Self-hosted fonts (Hanken Grotesk + Inter) — no Google Fonts on public site
- [x] Website design tokens (`app/globals.css`, `app/website.css`, `constants/website-theme.ts`)
- [x] SEO helper (`lib/seo/metadata.ts`) + `sitemap.ts` + `robots.ts`
- [x] Placeholder pages for Home, Services, Blog, Contact — awaiting UX/UI designs

### Phase 7 — Header, Mega Menu, Mobile Nav & Footer ✅

- [x] Sticky header with subtle opacity (`bg-website-surface/95`)
- [x] Centered desktop nav: Home, About Us, Services (mega menu), Contact Us, AR/EN switcher
- [x] Active nav underline + primary color via `lib/website/paths.ts`
- [x] `PrimaryButton` with direction-aware glass hover animation (`app/website.css`)
- [x] Data-driven Services mega menu (`getPublicServicesMenu()` in `service.service.ts`)
- [x] Mobile drawer: EN slides from right, AR slides from left; Escape closes; body scroll lock
- [x] Footer 4-column layout matching UX/UI — CMS data for contact + social links
- [x] Separate logo assets: `NavbarLogo` (`/logo-navbar.png` or CMS upload) vs `FooterLogo` (`/logo.png`)
- [x] Placeholder routes: `/about`, `/privacy-policy`, `/terms-and-conditions`
- [x] Dynamic service detail route: `/services/[slug]`

### Phase 7 — Service Details Page ✅

- [x] `Service.slug` field — unique, auto-generated from `nameEn` on create/update (mirrors category slug logic)
- [x] Migration `20260829150000_add_service_slug` backfills existing rows
- [x] One reusable template at `app/[locale]/services/[slug]/page.tsx` — all services share the same layout
- [x] Section components under `components/website/service/`:
  - `ServiceHero` — shared `service-hero-bg.png` background, breadcrumb (Home link, Services non-link, current name)
  - `ServiceOverview` — two-column layout, expertise badge, overview image with `#F4F6FE` frame, description with logical `border-s`
  - `StrategicBenefitsSection` — dynamic benefits from DB, Iconify icons via `IconifyIcon` client wrapper
  - `WhyChooseSection` — static bilingual content in `lib/i18n/service-page-content.ts`
  - `RelatedServicesSection` — up to 3 same-category services, hidden when none
- [x] Data fetching: `getPublicServicePageData(slug)` returns service (with category + benefits) + related services in two queries
- [x] Related services: same `categoryId`, excludes current, max 3, ordered by `nameEn`
- [x] Card excerpts via `lib/utils/text.ts` → `excerptPlainText()` (strips HTML, truncates)
- [x] Mega menu + mobile nav links use slug via `getServiceDetailPath(service.slug, locale)`
- [x] Dynamic SEO metadata — title from service name, description from hero description excerpt, OG image from overview image
- [x] Sitemap includes all service slug URLs per locale
- [x] RTL/LTR via locale layout `dir` attribute; logical CSS properties (`border-s`, `-end`, `ps`) for direction-sensitive layout
- [ ] Page designs from user (Home, Blog detail, Contact)

### Phase 7 — About Us Page ✅

- [x] Static bilingual page at `app/[locale]/about/page.tsx` — no backend/API
- [x] Content in `lib/i18n/about-page-content.ts` (hero, 8 expertise cards, firm expertise points, SEO)
- [x] Sections under `components/website/about/`:
  - `AboutHero` — `about-hero-bg.png`, `PageBreadcrumb`, two-line title (white + secondary)
  - `AboutExpertise` — centered primary label with decorative lines, 3-column card grid (8 cards)
  - `ExpertiseCard` — `#F4F6FE` bg, `#BDC8D0` border, hover primary border + upward shift, Iconify icons
  - `FirmExpertise` — `#F4F6FE` section bg, `about.png`, direction-aware label line, 3 check points, `PrimaryButton` → contact
- [x] Reused: `PageBreadcrumb`, `PrimaryButton`, `IconifyIcon`, `website-container`, locale layout RTL/LTR
- [x] SEO via `buildWebsiteMetadata()` with localized title/description

### Phase 6 — Admin Dashboard (continued)
### Phase 8 — Production Preparation

---

## 9. Known Issues

- Super admin seed password is a development default — change before production
- Social link URLs seeded as empty strings — to be filled via dashboard
- Next.js 16 deprecates `middleware.ts` in favor of `proxy` — migrate when stable
- Admin login UI is a placeholder — full form in Phase 6
- Nominatim geocoding has usage limits — search is debounced; reverse geocode is best-effort on pin move

---

## 10. Default Credentials (Development)

| Field | Value |
|-------|-------|
| Email | `admin@alnawras.com` |
| Password | `Admin@123456` |
| Role | `SUPER_ADMIN` |

---

## 11. Development Commands

```bash
npm run dev          # Start development server
npm run build        # Generate Prisma client + production build
npm run db:migrate   # Run migrations (dev)
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

---

## 12. Change Log

| Date | Phase | Change |
|------|-------|--------|
| 2026-08-29 | 1 | Initial project foundation |
| 2026-08-29 | 2 | Full database schema, migration, seed, permission constants |
| 2026-08-29 | 3 | Auth.js authentication, authorization, admin CRUD API, validation schemas |
| 2026-08-29 | 4 | Content APIs — website, blogs, services, contact enquiries |
| 2026-08-29 | 5 | Cloudinary file upload system — images, documents, deletion |
| 2026-08-29 | 6 | Website information + Leaflet map picker |
| 2026-08-29 | 7 | Header, services mega menu, mobile nav, footer — UX/UI implementation |
| 2026-08-29 | 7 | About Us page — static bilingual template with expertise cards and firm expertise section |
