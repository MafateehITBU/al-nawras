# Al Nawras — Architecture Overview

> Companion to [`project-memory.md`](./project-memory.md). Read both before starting new work.

## Application Structure

```
app/
├── [locale]/               Public site — /en/*, /ar/* (Phase 7)
│   ├── layout.tsx          WebsiteShell (header + footer), fonts, RTL
│   ├── page.tsx            Home (placeholder)
│   ├── services/           Services listing (placeholder)
│   ├── blog/               Blog listing (placeholder)
│   └── contact/            Contact (placeholder)
├── admin/
│   ├── layout.tsx          Providers (session, toasts, dialogs)
│   ├── login/              Auth page (no dashboard shell)
│   └── (dashboard)/        Protected dashboard routes
│       ├── layout.tsx      DashboardShell (sidebar + header)
│       └── …               Module pages
├── api/
│   ├── auth/               NextAuth handlers
│   ├── admin/              Protected admin APIs
│   └── contact-enquiries/  Public enquiry submission
├── sitemap.ts              Locale-aware sitemap
└── robots.ts               Crawler rules (disallow /admin, /api)
```

## Public Website (Phase 7)

| Concern | Location | Notes |
|---------|----------|-------|
| Locales | `constants/index.ts`, `lib/i18n/config.ts` | `en`, `ar`; default `en` |
| UI strings | `lib/i18n/dictionaries.ts` | Static copy per locale |
| DB content | `lib/i18n/content.ts` | `pickLocalizedField(entity, field, locale)` |
| Routing | `middleware.ts` | Redirects `/foo` → `/en/foo`; admin/API excluded |
| Nav constants | `constants/website-nav.ts` | Header, footer company/quick links, legal paths |
| Logo assets | `constants/website-assets.ts` | Navbar vs footer logo paths |
| Fonts | `lib/fonts/website.ts`, `public/fonts/` | Self-hosted variable fonts |
| Theme | `app/website.css`, `constants/website-theme.ts` | Brand CSS variables + CTA animation |
| SEO | `lib/seo/metadata.ts` | `buildWebsiteMetadata()` per page |
| Services menu data | `getPublicServicesMenu()` | Server-fetched in `[locale]/layout.tsx`, passed to header |
| Header | `components/website/website-header.tsx` | Client — sticky nav, mega menu, mobile drawer |
| Footer | `components/website/website-footer.tsx` | Server — CMS contact/social; client social icons sub-component |
| Primary CTA | `components/website/primary-button.tsx` | Reusable `#27A8E1` button with glass hover |

## Layer Responsibilities

| Layer | Location | Responsibility |
|-------|----------|----------------|
| UI | `components/ui/`, `components/dashboard/` | Presentation, reusable design system |
| Client state | `components/providers/`, hooks | Toasts, dialogs, unsaved changes |
| API client | `lib/api/client.ts` | Typed fetch wrapper for admin APIs |
| Services | `lib/services/` | Business logic (server-only) |
| Auth | `lib/auth/`, `lib/authorization/` | Sessions, permissions |
| Validation | `lib/validations/` | Shared Zod schemas |
| Database | `prisma/`, `lib/db/` | Schema, Prisma client |

## Dashboard Design System

- **Tokens:** CSS variables in `app/globals.css`, constants in `constants/dashboard-theme.ts`
- **Colors:** Primary `#27A8E1`, Secondary `#FAA628`, Background `#F4F6FE`
- **Navigation:** Permission-filtered via `constants/dashboard-nav.ts` + `hasPermission()`
- **Logo:** `components/dashboard/logo.tsx` → `public/logo-mark.svg` (replaceable)

## Security Model

1. **Middleware** — locale redirect for public paths; redirects unauthenticated users from `/admin/*`
2. **API routes** — `withAuth` / `withPermission` wrappers
3. **Dashboard UI** — `Can`, `useCan`, filtered sidebar (UX only; API is authoritative)

## Key Reusable UX Patterns

- **Notifications:** `lib/utils/notify.ts` (Sonner)
- **Confirm dialogs:** `useConfirm()`, `useDeleteConfirm()`
- **Unsaved changes:** `useUnsavedChanges()`, `GuardedLink`, `beforeunload`
- **Forms:** `FormField`, Zod schemas from `lib/validations/`

## Deployment

- **Vercel** — Next.js app
- **Neon** — PostgreSQL (`DATABASE_URL` + `DIRECT_URL`)
- **Cloudinary** — Media storage
