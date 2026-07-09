# 2026-07-09 Schema Fix

## The Issue
During the initial project setup, the reference files (`reference/openapi.yaml` and `reference/mockups/*.html`) were created as empty (0-byte) placeholder files, meaning the real content was never actually written to disk. Because of this, the shared package types and the `OrderCard` component were built without access to the real schema, leading to incorrect field names, missing fields, and incorrect enum values.

## Corrections Made (First Pass)
1. **Types**: Added proper TypeScript interfaces for `Order`, `TripStop`, and `PendingAction` in `packages/shared/src/types/index.ts` to reflect the true schema defined in the actual `openapi.yaml`. Exported these types in `packages/shared/index.ts`.
2. **OrderCard Component**: 
   - Updated the `OrderCardProps` to use the true `Order` type instead of an inline ad-hoc type.
   - Updated the rendered fields to match the real schema:
     - Replaced `order.customerId` with `order.customerName`.
     - Replaced the array-based `order.items` with the object-based `order.sku` (rendering `code`, `name`, and `qty`).
3. **App Screens**:
   - `apps/customer/App.tsx`: Updated the API fetch query parameter from `customerId` to `customerName` to match the real schema.
   - `apps/driver/App.tsx`: Updated the API fetch query parameter from `status=pending` (which is invalid according to the real schema) to a valid enum value (`status=placed`).

## Follow-up Correction: Deeper Endpoint Misuse
The first pass audit fixed the `Order` type but missed a deeper issue: `apps/driver` and `apps/admin-mobile` were incorrectly repurposing the `GET /orders` endpoint and reusing the `Order` type, instead of hitting their own dedicated endpoints defined in `openapi.yaml`. 

**Corrections Made:**
1. **Customer App**: Reverted the customer query back to `GET /orders?customerId=c-001` to align strictly with the schema requirement. 
2. **Driver App**: Switched `apps/driver/App.tsx` from `GET /orders` to `GET /trips?driverId=d-101`. Updated the state to store `TripStop[]`.
3. **Admin App**: Switched `apps/admin-mobile/App.tsx` from `GET /orders` to `GET /pending-actions?adminId=a-201`. Updated the state to store `PendingAction[]`.
4. **OrderCard Component Refactoring**: Redesigned `OrderCardProps` as a discriminated union so that:
   - `mode="customer"` expects an `order: Order` and renders order details.
   - `mode="driver"` expects a `tripStop: TripStop` and renders `address`, `distanceKm`, and `etaMin` (sorted sequence).
   - `mode="admin"` expects an `actionItem: PendingAction` and renders `priority`, `action`, and displays a red breach warning when `ageMinutes > slaMinutes`.

## Final Correction: Mock API Data Fix
As a culmination of the schema mismatches, `mock-api.json` itself was discovered to be a fabricated placeholder that didn't align with the real `openapi.yaml`. 
**Corrections Made:**
- Entirely replaced the content of `mock-api.json` with realistic, non-empty data arrays for `"orders"`, `"trips"`, and `"pending-actions"` containing appropriate records to ensure that `GET /orders?customerId=c-001`, `GET /trips?driverId=d-101`, and `GET /pending-actions?adminId=a-201` all return correct, non-404 mock responses.
