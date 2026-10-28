# Tự Hào Việt

An educational Vietnamese website about the Party's leadership of the nationwide revolution, 1965–1975. SOURCE.md is the content authority; preserve the supplied source text. hero.png is the visual reference and main hero artwork. The palette is deep red, warm gold and ivory.

## Architecture
- Plain Node.js HTTP backend: be/server.js. No external backend dependencies.
- Vanilla HTML, CSS and JavaScript: fe/. The server prefers be/public/ when present; keep both copies synchronized.
- fe/index.html, fe/tuhaoviet.css and fe/landing.js implement a game-only landing page with direct play links.
- Do not add public knowledge sections, timelines, reading material or source readers. SOURCE.md is private authoring input for game questions.
- be/data/game1-quiz.json through game4-challenge.json contain questions and server-only answers.
- Session keys: tuhaoviet_participant and currentParticipant.
- Registration, scores and durations are persisted atomically to participants.json. Do not overwrite runtime data for content updates.
- phat-work/ is a preserved reference implementation, outside the active site.

## Games
1. Dấu mốc lịch sử: five multiple-choice questions.
The former matrix game is removed. Do not restore its cards, routes or leaderboard scores.
2. Giải mã thống nhất: five rows revealing PARIS.
3. Đường tới toàn thắng: eight stations about 1965–1975.

Existing internal round IDs are retained for compatibility. Never expose answer keys in game GET payloads. The leaderboard uses server-sent events.

## Run and verify
Admin: `/admin` uses HTTP Basic authentication, username `admin`, password from `ADMIN_PASSWORD`. Local secrets are in ignored `be/.env`; production uses Fly secrets. Destructive requests require an admin action header and typed confirmation. Never commit credentials or clear real participants during testing.
Fly deployment instructions: `DEPLOY.md`. Use the root `fly.toml` only, one Machine in Singapore, and the persistent `/data` volume. Redeployments must preserve participants. Verify admin behavior with `node scratch/verify-admin.mjs` (isolated temporary data).
Run node server.js from be/, then open http://localhost:3000.
Run node scratch/verify-site.mjs from the project root for route and three-game flow checks. It uses a separate temporary runtime-data directory.
The content maintenance script scratch/retheme-content.mjs regenerates the historical game datasets, and synchronizes fe/ to be/public/. Update that script if intentionally changing those datasets.

## Scope
Work in TuHaoViet only. Do not modify the sibling VietFamily repository. Keep UI copy in Vietnamese. Use SOURCE.md for historical claims; retain nuanced discussion of setbacks and lessons as well as successes. Do not add frameworks or npm dependencies without a concrete need.
