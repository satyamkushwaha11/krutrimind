# krutrimind.com

Modern Next.js 14 (App Router) marketing site for **krutrimind** — an AI-agent, automation and engineering consultancy.

## Highlights
- App Router, server components, full SEO (metadata API, sitemap, robots, JSON-LD)
- All copy/content driven by [data/content.json](data/content.json) — no code edits to change text
- Separate admin panel at `/admin` to edit content live (JSON file is the store for now)
- Tailwind CSS, gradient + glassmorphism aesthetic, fully responsive

## Quick start
```bash
npm install
cp .env.local.example .env.local   # already provided for dev
npm run dev
```
Open <http://localhost:3000> for the site, <http://localhost:3000/admin> for the panel.

## Admin
- Credentials are env-driven: `ADMIN_USERNAME` / `ADMIN_PASSWORD`
- Sessions: HMAC-signed httpOnly cookie (secret in `ADMIN_SESSION_SECRET`)
- All `/admin/*` and `PUT /api/content` are protected by [middleware.ts](middleware.ts)
- Changes are persisted to `data/content.json` via the `/api/content` route

Default dev creds (change before deploying!):
```
admin / krutri@2026
```

## Migrating to a real backend later
The whole content layer goes through [lib/content.ts](lib/content.ts). Swap the JSON file for a DB call (Supabase, Postgres, etc.) and nothing else has to change.
# krutrimind
