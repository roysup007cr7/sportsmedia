# Sports Media

A sports streaming portal with a Spring Boot backend and an admin panel.
Owner and administrator: **Supriyo Roy**.

## What's in the box

```
sportsmedia/
├── backend/            Spring Boot 3.3 · Java 17 · JPA · JWT
│   ├── pom.xml
│   └── src/main/java/com/supriyoroy/sportsmedia/
│       ├── model/      Sport, League, MatchEntity, Comment, AdSlot,
│       │               SiteSetting, AdminUser, NewsPost, ContactMessage, PaymentOrder
│       ├── repo/       Spring Data repositories
│       ├── service/    MatchService, SettingsService, ScheduleSyncService, PaymentService
│       ├── controller/ AuthController, PublicController, AdminController
│       ├── security/   JwtService, JwtAuthFilter
│       └── config/     SecurityConfig, DataSeeder
└── frontend/
    ├── index.html      the public site
    └── admin.html      the admin panel
```

## Run it

**1. Backend**

```bash
cd backend
./mvnw spring-boot:run          # or: mvn spring-boot:run
```

It starts on `http://localhost:8080` with a file-based H2 database, so nothing
else has to be installed. First boot creates the admin account and sample data.

Default login: `supriyo` / `Admin@12345` — change it immediately:

```bash
curl -X POST "http://localhost:8080/api/auth/change-password?username=supriyo&currentPassword=Admin@12345&newPassword=YourNewPassword"
```

**2. Frontend**

Open `frontend/index.html` in a browser, or serve the folder:

```bash
cd frontend && python3 -m http.server 5500
```

Then the site is at `http://localhost:5500` and the panel at
`http://localhost:5500/admin.html`. If the backend isn't running, the site
shows demo fixtures instead of a blank page.

## Switch to MySQL for production

```bash
export DB_URL="jdbc:mysql://localhost:3306/sportsmedia?useSSL=false&serverTimezone=UTC"
export DB_USER=root
export DB_PASS=yourpassword
export JWT_SECRET="a-long-random-string-at-least-32-characters"
export CORS_ORIGINS="https://yoursite.com"
```

## Automatic schedule

Fixtures come from football-data.org (free tier covers LaLiga, Champions League,
Premier League, Serie A, Bundesliga — Indian leagues are added by hand or from a
paid provider such as API-Football).

```bash
export FOOTBALL_API_ENABLED=true
export FOOTBALL_API_TOKEN=your_key_from_football-data.org
```

The job runs every 30 minutes and also on demand from **Dashboard → Pull fixtures
from API**. Three guarantees: fixtures are matched by external id so nothing
duplicates, your stream links are never overwritten, and any match you have
edited by hand is left completely alone.

A second job runs every minute and flips UPCOMING → LIVE at kick-off and
LIVE → FINISHED 2h45m later, so the live and full-time badges stay honest even
for matches you added yourself.

## The bits you asked about

| You asked for | Where it is |
|---|---|
| Stream links controlled by admin | Dashboard → Quick stream links (paste, Save) |
| Kick-off in the viewer's own time | Browser converts the stored UTC time; time zone shown in Settings |
| Live / finished badge | Card badge, driven by match status |
| Share every match | Share button → WhatsApp, Telegram, X, Facebook, copy link, native share |
| WhatsApp + Telegram popup | Admin → Site settings → Join popup |
| Ad space (Adsterra, Monetag) | Admin → Ad slots; six positions, code injected and executed |
| Viewer opinions | Fan wall + per-match comments, held for your approval |
| Categories | Admin → Sports and leagues; chips filter the schedule |
| Search, refresh, settings | Header icons on every page |
| Payments (GPay, Paytm) | Admin → Payments; UPI deep link now, gateway later |
| About / contact / privacy / disclaimer | Footer links; text editable in Admin → Site settings |

## Before you go live

- Change the admin password and `JWT_SECRET`.
- Put the API behind HTTPS and set `CORS_ORIGINS` to your real domain.
- Only publish streams you hold rights to, or that the rights holder allows you
  to embed. The disclaimer page and the takedown route exist for a reason —
  keep the contact address working.
