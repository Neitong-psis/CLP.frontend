# QBTECH Frontend

Frontend for **QBTECH**, an e-learning platform with three roles — **admin**, **educator**, and **learner**. Built with [Next.js](https://nextjs.org) 16 (App Router, Turbopack) and React 19.

> This app currently runs entirely on mock data (`src/lib/mock/mock-mode.ts`), so it's fully usable without a backend running. The `NEXT_PUBLIC_API_BASE_URL` variable below is wired up for when real backend integration is enabled.

## Tech stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS v4, Radix UI, `class-variance-authority`
- **Forms/validation:** react-hook-form + zod, `@tanstack/react-form`
- **i18n:** next-intl (English / Khmer)
- **Testing:** Vitest + Testing Library
- **Deployment:** Vercel

## Prerequisites

- Node.js **>= 20.9** (required by Next.js 16)
- npm (the project is checked in with `package-lock.json`; other package managers aren't guaranteed to resolve identically)
- Git

## Installation

```bash
git clone https://github.com/Neitong-psis/QBTECH.frontend.git
cd QBTECH.frontend
npm ci
```

Use `npm ci` rather than `npm install` for a clean install that matches the lockfile exactly (this is also what CI/Vercel uses — see `vercel.json`).

## Environment variables

Create a `.env.local` file in the project root (this file is gitignored and never committed):

```bash
# Backend API origin. The versioned base (${BASE}/api/v1) is built once in
# src/lib/api/config.ts — never hardcode endpoints elsewhere. Not required
# for local development while mock mode is enabled (see note above).
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

# Google OAuth login. Set these to your own Google OAuth client credentials,
# or omit them to leave Google sign-in disabled.
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=false

# Optional: bypass role-based route protection (src/proxy.ts) for local
# testing across roles without logging in as each one.
# NEXT_PUBLIC_DEMO_MODE=true
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server uses Turbopack and hot-reloads on file changes.

## Available scripts

| Script                 | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| `npm run dev`          | Start the dev server (Turbopack) on port 3000                         |
| `npm run build`        | Production build                                                      |
| `npm run start`        | Serve the production build (run `build` first)                        |
| `npm run lint`         | ESLint (`src`, zero warnings allowed)                                 |
| `npm run lint:fix`     | ESLint with autofix                                                   |
| `npm run format`       | Format the repo with Prettier                                         |
| `npm run format:check` | Check formatting without writing                                      |
| `npm run type-check`   | TypeScript check (`tsc --noEmit`)                                     |
| `npm run check`        | Runs type-check + lint + format:check — must pass before a PR is done |
| `npm run test`         | Run the Vitest test suite                                             |
| `npm run clean`        | Remove `.next` and `out` build artifacts                              |

Before opening a PR, run:

```bash
npm run check
npm run test
```

## Building for production

```bash
npm run build
npm run start
```

`next build` output is written to `.next/`. `npm run start` serves that build on port 3000 (override with `PORT=<port> npm run start`).

## Deployment (Vercel)

This project is configured for [Vercel](https://vercel.com) via `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "devCommand": "next dev",
  "installCommand": "npm ci"
}
```

**Deploying:**

1. Import the repository in the [Vercel dashboard](https://vercel.com/new), or link it locally with the [Vercel CLI](https://vercel.com/docs/cli):
   ```bash
   npm i -g vercel
   vercel link
   ```
2. Add the environment variables from the [Environment variables](#environment-variables) section in the Vercel project settings (Production/Preview/Development as appropriate).
3. Push to the branch connected to the Vercel project (or run `vercel --prod`) to deploy.

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for platform-agnostic deployment options.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
