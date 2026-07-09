# Clear Energy Take-Home Project

## What this is
This is a monorepo for the Clear Energy 3-app take-home assignment. It contains skeletons for three apps (Customer, Driver, Admin) and a shared package.

## Hard Requirements
- **Monorepo:** Uses npm workspaces with `apps/*` and `packages/*`.
- **Language:** TypeScript only.
- **Packages:** One shared package (`packages/shared/`).
- **Component:** One shared `OrderCard` component with 3 modes (one for each app).
- **API Client:** Typed API client with error handling, abort signals, and idempotency handling.
- **Screens:** 3 Expo screens (one for each app) with 4 states each.
- **Testing:** One unit test.
- **Documentation:** A well-structured README.

## Explicit Out-of-Scope Items
- No Authentication.
- No Real Backend (using json-server instead).
- No Payments.
- No pixel-perfect iOS styling.
- No Hindi language support.
- No push notifications.
- No extra tests beyond the required unit test.
- No End-to-End (E2E) testing.

## Current Folder Structure
```
clear-energy-takehome/
  ├── apps/
  │   ├── customer/
  │   ├── driver/
  │   └── admin-mobile/
  ├── packages/
  │   └── shared/
  ├── reference/
  │   ├── mockups/
  │   │   ├── customer_orders.html
  │   │   ├── driver_trip.html
  │   │   └── admin_pending.html
  │   └── openapi.yaml
  ├── docs/
  ├── mock-api.json
  └── AGENT.md
```

## Progress So Far
- [x] Initialized empty project folder.
- [x] Scaffolded monorepo folder structure.
- [x] Setup root `package.json` with npm workspaces.
- [x] Created `mock-api.json` and verified with `json-server`.
- [x] Initialized local git repository.
- [x] Created this `AGENT.md` to track project progress.
