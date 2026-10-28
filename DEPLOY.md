# Deploy Tự Hào Việt to Fly.io

Run all Fly commands from the repository root (`TuHaoViet`), not `be/`.
The root `fly.toml` is the only Fly configuration. App name: `tu-hao-viet`.
If that globally unique name is already taken by someone else, choose a different
name in `fly.toml` and use it consistently below.

## First deployment

```powershell
fly auth login
fly apps create tu-hao-viet
fly volumes create tuhaoviet_data --app tu-hao-viet --region sin --size 1
```

If the app or volume already exists in your account, reuse it.
Set `ADMIN_PASSWORD` through Fly secrets. This PowerShell prompt keeps the
password out of shell history and Git; Fly reads it through stdin:

```powershell
$adminSecret = Read-Host 'Admin password' -AsSecureString
$secretPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($adminSecret)
try {
  $secretText = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($secretPointer)
  "ADMIN_PASSWORD=$secretText" | fly secrets import --app tu-hao-viet --stage
} finally {
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($secretPointer)
  Remove-Variable adminSecret, secretPointer, secretText -ErrorAction SilentlyContinue
}

fly config validate
fly deploy --app tu-hao-viet --ha=false
fly scale count 1 --app tu-hao-viet
fly status --app tu-hao-viet
fly checks list --app tu-hao-viet
```

Visit `https://tu-hao-viet.fly.dev/` and `https://tu-hao-viet.fly.dev/admin`.
Admin username is `admin`; password is the secret you entered.

## Data behavior

- Local participant records and `.env` files are excluded from Git and Docker.
- `/data/participants.json` uses the mounted volume in Singapore. Scores survive
  restarts and deployments; redeployment never clears participants.
- Run **one Machine only**: JSON files and leaderboard SSE are local to that Machine.
  Independent volumes do not replicate scores.
- Immediate deployment briefly stops the app while replacing it, preventing
  overlapping writers. In-progress browser timers are not persisted.
- The Machine can stop when idle and start on traffic. An open leaderboard
  connection can keep it active.
- `/admin` clears live user data only after you type `XOA TAT CA`. This includes
  profiles, scores, progress and in-memory attempts, but not Fly volume snapshots.
- Individual participant deletion also requires admin authentication.

## Local admin

Node.js 22+ loads `be/.env` when it exists. Copy `be/.env.example` to `be/.env`,
set `ADMIN_PASSWORD`, then restart `npm start` from `be/`.
Open `http://localhost:3000/admin`; the browser asks for credentials.
Admin returns 503 without a configured password and 401 for invalid credentials.

## Subsequent releases

```powershell
node scratch/verify-site.mjs
node scratch/verify-admin.mjs
fly deploy --app tu-hao-viet --ha=false
```

References: [Fly configuration](https://fly.io/docs/reference/configuration/),
[Fly secrets](https://fly.io/docs/apps/secrets/),
[Fly volumes](https://fly.io/docs/volumes/overview/).
