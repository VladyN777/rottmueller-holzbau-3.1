# Deploying Rottmüller Holzbau v2 on Vercel

## One‑time
1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).

## On Vercel
1. New Project → Import your repo.
2. **Framework Preset:** Vite
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. Environment Variables: (none required).

## SPA Routing
`vercel.json` contains a rewrite that sends all routes to `/index.html`:
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Local test
```bash
npm i
npm run build
npm run preview
```