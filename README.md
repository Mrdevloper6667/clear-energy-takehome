# Clear Energy Take-Home Monorepo

## Setup Steps
1. Navigate to the root directory: `cd clear-energy-takehome`
2. Install all dependencies across the monorepo: `npm install`
3. Start the mock backend server: `npx json-server mock-api.json --port 4000`
4. Start any of the three apps using their respective workspaces:
   - Customer App: `npm start -w apps/customer`
   - Driver App: `npm start -w apps/driver`
   - Admin App: `npm start -w apps/admin-mobile`
5. To run the shared utility tests: `npm run test -w packages/shared`

## Tech Choices
- **npm workspaces**: We chose native npm workspaces instead of Turborepo or Nx. This keeps the monorepo extremely minimal and focused strictly on the prompt's requirements without over-engineering the build pipeline.
- **TypeScript Only**: End-to-end type safety, especially for the API client and the `OrderCard` shared component.

## What Was Cut & Why
To strictly focus on the core requirements of the prompt within a constrained timeframe, the following were intentionally excluded:
- **Auth, Payments & Real Backend**: Out of scope for this frontend architecture task; simulated via `mock-api.json`.
- **Pixel-perfect iOS Styling**: Focused on the structural 4 states per screen rather than cosmetic precision.
- **Hindi Localization & Push Notifications**: Explicitly omitted to avoid feature creep.
- **Extra Tests & E2E**: Kept to exactly one functional unit test (`formatPrice.ts`) as per the "One unit test" constraint.

## AI Usage Summary
Used an AI Coding Assistant (Antigravity) to rapidly scaffold the monorepo, configure npm workspaces, and generate boilerplate code. The AI created `OrderCard.tsx`, the typed `ApiClient`, the `mock-api.json`, and initialized the 3 Expo apps. I accepted most of the structural generation but actively steered the AI to enforce the strict exclusions (no Turborepo, 1 unit test only, etc.).

## Actual Hours Spent
1 hour
