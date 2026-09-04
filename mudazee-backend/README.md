# MUDAZEE Backend

Production-ready backend for the MUDAZEE luxury perfume e-commerce platform.

## Stack

- **Runtime:** Node.js + TypeScript, Express
- **Database:** PostgreSQL via Prisma ORM
- **Cache / Queues:** Redis (guest cart TTL cache, distributed rate limiting)
- **Auth:** JWT access tokens (15m) + rotating refresh tokens (30d, stored hashed in DB), role-based access (`ADMIN`, `CUSTOMER`)
- **Validation:** Zod, enforced via a shared `validate()` middleware on body/query/params

## Project layout

```
prisma/
  schema.prisma        # all data models
  seed.ts               # demo admin user, stores, shipping rules, a product + tester box
src/
  config/env.ts          # typed, validated environment access
  lib/                   # prisma client, redis client, jwt helpers
  utils/                 # AppError, response helpers, id/slug generators
  middleware/             # auth, validate, error handling, redis-backed rate limiting
  modules/
    auth/                 # register, login, refresh (rotation), logout, /me
    products/              # public catalog: list+filter+sort, get by slug, custom-box templates
    stores/                 # public: list active branches
    cart/                    # authenticated cart + guest-cart sync/merge
    orders/                   # checkout (guest + auth), tracking, order history, shipping calc
    newsletter/                # subscribe
    admin/                      # protected CMS: products, orders, stores, banners
  routes/index.ts               # mounts every module under API_PREFIX
  app.ts                         # express app factory (helmet, cors, compression, morgan)
  server.ts                       # boot + graceful shutdown
```

## Getting started

```bash
cp .env.example .env        # fill in DATABASE_URL, REDIS_URL, JWT secrets
npm install
npm run prisma:generate
npm run prisma:migrate      # creates tables from schema.prisma
npm run prisma:seed         # optional demo data (admin login: admin@mudazee.com / Admin@12345)
npm run dev                 # http://localhost:4000/api/v1/health
```

Build & run for production:

```bash
npm run build
npm start
```

## Auth flow

1. `POST /auth/register` or `POST /auth/login` → returns `{ user, accessToken, refreshToken }`.
2. Send `Authorization: Bearer <accessToken>` on protected routes.
3. When the access token expires, `POST /auth/refresh` with the refresh token rotates it (old one is revoked, a new pair is issued).
4. `POST /auth/logout` revokes the given refresh token.

Admin-only routes additionally require `role: ADMIN` on the JWT (`authorize("ADMIN")` middleware).

## Key endpoints

### Public catalog
- `GET  /api/v1/products?category=men&season=summer&isBestSeller=true&sort=price_asc&page=1&pageSize=20`
- `GET  /api/v1/products/:slug`
- `GET  /api/v1/products/custom-boxes` — curated tester-box templates + eligible products
- `GET  /api/v1/stores` — active branches only
- `POST /api/v1/newsletter/subscribe`

### Cart & checkout
- `GET   /api/v1/cart` (auth) — current user's cart
- `POST  /api/v1/cart/sync` (auth) — merge a client-held guest cart into the server cart on login
- `POST  /api/v1/cart/items` / `PATCH /items/:itemId` / `DELETE /items/:itemId` (auth)
- `POST  /api/v1/orders` — guest or authenticated checkout; validates stock, applies vouchers, calculates city-based shipping, deducts inventory transactionally
- `GET   /api/v1/orders/track/:trackingId` — public order tracking, no auth required
- `GET   /api/v1/orders` (auth) — the logged-in customer's order history

### Admin CMS (`Authorization: Bearer <admin access token>`)
- `GET/POST /api/v1/admin/products`, `GET/PATCH/DELETE /api/v1/admin/products/:id`
- `GET /api/v1/admin/orders`, `PATCH /api/v1/admin/orders/:id/status`
- `GET/POST/PATCH/DELETE /api/v1/admin/stores(/:id)`
- `GET/POST/PATCH/DELETE /api/v1/admin/banners(/:id)`

## Order/checkout design notes

- **Stock deduction is race-safe.** Instead of read-then-write, `POST /orders` uses a guarded
  `updateMany({ where: { stockQuantity: { gte: qty } }, data: { decrement: qty } })` inside a
  Prisma interactive transaction. If the affected row count is 0, the whole transaction throws
  and rolls back — so two simultaneous checkouts for the last unit can never both succeed.
- **Custom Tester Boxes** are modeled as a `CustomBoxTemplate` (fixed price, `slotsCount` = how
  many products the customer must pick) with a `CustomBoxOption` join table listing eligible
  products. At checkout, each selected component also deducts stock from its underlying product.
- **Shipping** is city-based (`ShippingRule` table), defaulting to a nationwide flat fee if no
  rule exists for the given city; Karachi ships same-day per the seeded rule. Orders above a
  city's free-shipping threshold have shipping waived automatically.
- **Vouchers** support percent or fixed-amount discounts, minimum order thresholds, expiry, and
  usage caps, and are debited exactly once per order inside the same transaction as stock.
- **Guest checkout** requires `guestEmail` + `guestPhone` in place of a user session; authenticated
  checkout pulls the user id from the JWT instead. Both produce a public `trackingId` for
  `GET /orders/track/:trackingId`.

## Error handling

All errors funnel through one `errorHandler` middleware:
- `AppError` (thrown deliberately in services) → status/code/message as defined at the throw site.
- `ZodError` → `400 VALIDATION_ERROR` with field-level detail.
- Known Prisma errors (`P2002` unique constraint, `P2025` not found) → mapped to `409`/`404`.
- Anything else is logged server-side and returned as an opaque `500 INTERNAL_ERROR`
  (stack trace included only when `NODE_ENV !== production`).

## Rate limiting

`express-rate-limit` backed by a shared Redis store (`rate-limit-redis`), so limits hold across
multiple API instances behind a load balancer:
- General public API: 300 req / 15 min / IP
- Auth endpoints: 20 req / 15 min / IP
- Order creation: 10 req / min / IP
