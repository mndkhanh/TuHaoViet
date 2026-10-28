# AGENTS.md

## Repo Shape

- Two main implementations exist:
  - `be/` + `fe/`: primary backend/frontend split
  - `phat-work/`: self-contained version (backend serves its own `public/`)
- Both follow the same pattern: **plain Node.js (`http` module) + static HTML/JS** (no frameworks, no Express).

## How to Run

### Backend (primary)

```
cd be
npm install
npm start
```

- Runs on `http://localhost:3000`
- Serves API under `/api/*`

### Frontend (preferred setup)

- Backend is expected to serve frontend files.
- Copy `fe/` into backend as `public/` if not already present:

```
cp -r fe be/public
cd be
node server.js
```

- Then open: `http://localhost:3000`

### Alternative frontend dev

- Open HTML files directly or use Live Server
- Requires backend running separately (CORS/proxy may be needed)

## Key Constraints (Non-Obvious)

- **No external dependencies** are expected (keep backend pure Node.js unless explicitly required)
- Backend routing and logic live entirely in a single file: `server.js`
- Data is persisted via JSON files under `data/`
  - These are read/write at runtime (not immutable fixtures)

## Data + API Behavior

- Core APIs (from `be/server.js`):
  - `GET /api/game` → returns game data **without answers**
  - `POST /api/submit` → server validates answers (answers must never leak to FE)
  - `POST /api/register` → writes to `participants.json`
- Many game mechanics rely on **server-side validation and randomization**

## Game Architecture

- Multiple games share the same backend pattern but different JSON files:
  - `game1-quiz.json`
  - `game2-matrix.json`
  - `game3-crossword.json`
  - etc.
- Some games require **randomized sets per session** (e.g. matrix puzzles)
  - Do not move this logic to frontend

## Frontend Patterns

- Pure vanilla JS, no bundler, no module system
- All API calls assume same-origin (`/api/...`)
- State is often stored in `localStorage` (e.g. participant info)

## Deployment

- Supports:
  - Docker (`Dockerfile` in both root and subprojects)
  - Render (`render.yaml`)
- When deploying backend-only, ensure `public/` exists or UI will be missing

## Common Pitfalls

- Forgetting to copy `fe/` into `be/public/` → blank UI
- Accidentally exposing correct answers in API responses
- Adding libraries (Express, etc.) that break the intended minimal stack
- Treating JSON data as static instead of runtime-mutated storage

## Where to Look First

- `be/server.js` → real source of truth for API + flow
- `be/data/*.json` → actual game structure and formats
- `fe/app.js` (or per-page JS) → how frontend consumes APIs
- `.agents/instruction.md` → full product/game design spec
