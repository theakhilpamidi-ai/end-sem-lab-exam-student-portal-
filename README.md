# Student Portal

React (Vite) + Express + MongoDB with JWT cookie auth.

## Run locally
1. `npm install`
2. Edit `.env` (copied from `.env.example`): set `MONGODB_URI` and a long random `JWT_SECRET`.
3. `npm run dev` — site at http://localhost:5173, API at http://localhost:5000

Requires Node 20.6+ (uses `--env-file`) and a running MongoDB (local or Atlas).

## Production
`npm run build`, then run with `NODE_ENV=production npm start`. Express serves `dist/`.
