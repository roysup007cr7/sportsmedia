# Deploying Sports Media

Vercel runs static files and Node/Python functions. It does not run a JVM with a
database, so the two halves go to two places:

| Part | Goes to | Cost |
|---|---|---|
| `frontend/` (the site + admin panel) | Vercel | free |
| `backend/` (Spring Boot + database) | Render or Railway | free tier |

---

## Step 1 — backend on Render

1. Push this project to a GitHub repo.
2. Render → **New → Blueprint** → pick the repo. It reads `backend/render.yaml`
   and creates the web service plus a free Postgres database.
3. Once the database exists, open it and copy the host and database name, then
   set this on the web service:

   ```
   DB_URL = jdbc:postgresql://HOST:5432/DBNAME
   ```

   Render shows the connection string as `postgres://…` — Spring needs the
   `jdbc:postgresql://` form above. `DB_USER` and `DB_PASS` are filled in for you.
4. Set `ADMIN_PASS` to a real password.
5. Deploy. You get an address like `https://sportsmedia-api.onrender.com`.

The free tier sleeps after 15 minutes idle and takes ~40 seconds to wake. For a
live-match site that's noticeable, so move to the $7 plan or Railway once you
have traffic.

**Railway instead:** New Project → Deploy from repo → root directory `backend`.
It detects the Dockerfile. Add a MySQL or Postgres plugin and set the same four
variables. No sleeping on Railway's paid-as-you-go plan.

## Step 2 — frontend on Vercel

1. Vercel → **Add New → Project** → same repo.
2. **Root Directory:** `frontend`. Framework preset: **Other**. No build command.
3. Deploy. You get `https://something.vercel.app`.

## Step 3 — connect the two

Edit one line at the top of both `frontend/index.html` and `frontend/admin.html`:

```html
<script>window.SM_API = "https://sportsmedia-api.onrender.com/api";</script>
```

Commit and push — Vercel redeploys on its own.

Then on Render set:

```
CORS_ORIGINS = https://your-project.vercel.app,https://*.vercel.app
```

Wildcards work, so preview deploys keep working too.

## Step 4 — first login

- Panel: `https://your-project.vercel.app/admin`
- Username `supriyo`, password whatever you set as `ADMIN_PASS`.
- Go to **Site settings** and fill in **Public address** with your Vercel URL.
  That makes shared match links point at the real site. Until you fill it, the
  page builds share links from whatever address the visitor is on, which also
  works fine.

Your channels are already set as defaults:

- WhatsApp: `https://whatsapp.com/channel/0029VbDbRJg9MF94wETZ7u0l`
- Telegram: `https://t.me/sportsmedialive1`

They power the footer icons and the join popup. Change them anytime in
**Site settings → Social channels**.

## Later: your own domain

Buy one (a `.com` is ~₹900/year, `.in` cheaper), add it in Vercel → Settings →
Domains, and add it to `CORS_ORIGINS` on Render. Nothing else changes.

## Note on third-party embeds

The player iframe is sandboxed, which blocks pop-unders and redirects from the
source site — better for your viewers, but a few embed providers misbehave under
it. If a link loads blank, tell me and I'll add a per-match "trusted embed"
toggle that relaxes the sandbox for just that match.
