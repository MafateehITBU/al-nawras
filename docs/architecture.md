# Al Nawras — Architecture Overview

> Companion to [`project-memory.md`](./project-memory.md). Read both before starting new work.

## Application Structure

```
app/
├── (website)/              Public site (Phase 7)
├── admin/
│   ├── layout.tsx          Providers (session, toasts, dialogs)
│   ├── login/              Auth page (no dashboard shell)
│   └── (dashboard)/        Protected dashboard routes
│       ├── layout.tsx      DashboardShell (sidebar + header)
│       └── …               Module pages
└── api/
    ├── auth/               NextAuth handlers
    ├── admin/              Protected admin APIs
    └── contact-enquiries/  Public enquiry submission
```

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

1. **Middleware** — redirects unauthenticated users from `/admin/*`
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
