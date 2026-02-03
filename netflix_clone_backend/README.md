# netflix_clone_backend

Minimal Node.js + Express (TypeScript) backend that powers an admin board/API for the Netflix clone.

## Features
- Token-protected admin routes under `/admin`
- REST API under `/admin/api`
  - `GET /admin/api/health`
  - `GET /admin/api/feature-flags`, `POST /admin/api/feature-flags`
  - `GET /admin/api/content`, `POST /admin/api/content`, `PUT /admin/api/content/:id`, `DELETE /admin/api/content/:id`
  - `GET /admin/api/mock-data`, `POST /admin/api/mock-data` (seed/reset)
- Optional static admin dashboard at `/admin` (simple HTML that calls the API)
- In-memory + JSON file storage (stored under `data/`)

## Requirements
- Node.js 18+

## Environment
Copy `.env.example` to `.env` and set:
- `PORT` (default `4000`)
- `ADMIN_API_TOKEN` (required)
- `CORS_ORIGIN` (default `http://localhost:3000`)

## Install & run
```bash
npm install
npm run dev
```

Build & run production:
```bash
npm run build
npm start
```

## Auth
All `/admin` routes require an Authorization header:

`Authorization: Bearer <ADMIN_API_TOKEN>`

## Notes
- Data is persisted to `data/featureFlags.json` and `data/content.json` on each write.
- `POST /admin/api/mock-data` resets both feature flags and content to known seed data.
"
