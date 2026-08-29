# Al Nawras Intellectual Property

Full-stack Next.js application for Al Nawras Intellectual Property — public website, admin dashboard, and API.

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4**
- **PostgreSQL** + **Prisma ORM**
- **Cloudinary** (media)
- **Vercel** (hosting) + **Neon** (database)

## Getting Started

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your local PostgreSQL credentials and other values.

3. Install dependencies and generate Prisma client:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Project Documentation

See [`docs/project-memory.md`](docs/project-memory.md) for architecture decisions, implementation status, and development guidelines.

## Development Phases

| Phase | Description           | Status      |
| ----- | --------------------- | ----------- |
| 1     | Project Foundation    | Complete    |
| 2     | Database Schema       | Complete    |
| 3     | Core Backend (Auth)   | Complete    |
| 4     | Content APIs          | Complete    |
| 5     | File Uploads          | Complete    |
| 6     | Admin Dashboard       | In Progress |
| 7     | Public Website        | Pending     |
| 8     | Production Prep       | Pending     |

## Scripts

| Command              | Description           |
| -------------------- | --------------------- |
| `npm run dev`        | Development server    |
| `npm run build`      | Production build      |
| `npm run lint`       | ESLint                |
| `npm run format`     | Prettier              |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio`  | Prisma Studio         |
