# Run doc — Jayakarta (preview dev server)

## Reproducing the uncommitted artifacts

This worktree **is** the main checkout (`/Users/ibnindra/Documents/Jayakarta`), so the
required env file already exists in place — nothing to copy. For a fresh clone, the
procedure is:

1. Copy the env file into the project root:
   ```
   cp .env.example .env    # atau minta .env dari main checkout
   ```
   Required keys (jangan commit nilai sebenarnya): `TURSO_DATABASE_URL`,
   `TURSO_AUTH_TOKEN`, `SECRET`, `NEXT_PUBLIC_CLIENT`, `NEXT_PUBLIC_ENVIRONMENT`,
   `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ADMIN_EMAILS`.
2. Install dependencies:
   ```
   npm install
   ```
3. Jalankan migrasi database Turso (idempotent — membuat/menambah kolom `orders`,
   `purchases`, seed `products`):
   ```
   node --env-file=.env scripts/migrate.mjs
   ```

## Running the server (preview)

Port default: **3000** (bebas di worktree ini). Dev server dijalankan sebagai
launchd job `jayakarta-preview` supaya bertahan melewati sesi agent:

```
launchctl remove jayakarta-preview 2>/dev/null
launchctl submit -l jayakarta-preview -- /bin/sh -c \
  'cd /Users/ibnindra/Documents/Jayakarta && /Users/ibnindra/.nvm/versions/node/v24.13.1/bin/node node_modules/next/dist/bin/next dev --webpack -p 3000 >> /tmp/jayakarta-preview.log 2>&1'
```

Cek sehat:
```
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/   # -> 200
lsof -iTCP:3000 -sTCP:LISTEN -P -n | tail -1                      # node <pid> LISTEN
```

Log server: `/tmp/jayakarta-preview.log`

Menghentikan preview:
```
launchctl remove jayakarta-preview
```

### Gotcha yang sudah teruji (jangan ulangi)

- `nohup cmd & disown` dari shell agent → proses di-reap oleh command runner.
- `launchctl submit` dengan script **file** sebagai argumen → exit 126.
- `launchctl submit` dengan `exec` di dalam `-c` string → exit 1/126.
- Redirect log **ke dalam direktori proyek** (`.freebuff/…`) di bawah launchd →
  gagal diam-diam (log kosong). Selalu redirect ke `/tmp`.
- Bentuk yang TERBUKTI bekerja: `launchctl submit -l <label> -- /bin/sh -c 'cd <proyek> && <node-absolut> node_modules/next/dist/bin/next dev --webpack -p 3000 >> /tmp/<log> 2>&1'` (tanpa `exec`, log di `/tmp`).
- Path absolut node: `/Users/ibnindra/.nvm/versions/node/v24.13.1/bin/node`
  (PATH default launchd tidak mengandung nvm).
