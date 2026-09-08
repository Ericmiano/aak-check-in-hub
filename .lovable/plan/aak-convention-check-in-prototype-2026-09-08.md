# AAK Convention Check-In Prototype

## Goal
Replace the blank preview with an interactive visual prototype based on the selected **Professional Staff Hub** direction. The prototype will demonstrate a clearer, faster convention check-in experience without connecting to Google Sheets yet.

## What will be built
- A responsive staff dashboard using the selected Convention Warmth palette:
  - Convention red `#E11D48`
  - Charcoal `#333333`
  - Warm background `#F4EEE5`
  - Soft neutral `#D8C8B6`
- Space Grotesk headings and DM Sans body text.
- Official AAK identity in the header, with the 2026 convention mark presented as the event identity.
- Three working prototype views:
  1. **Register** — full name, email, phone, and organization fields with badge-generation feedback.
  2. **Check-in / Scan** — prominent QR scanning area, manual lookup fallback, and clear success/error states.
  3. **Attendance Overview** — registered and checked-in totals plus a compact recent-arrivals view.
- A quick badge lookup area accessible from the main registration screen.
- Responsive behavior for desktop, tablet, and phone, with large touch targets for event staff.
- Restrained transitions and decisive visual feedback for successful actions, with reduced-motion support.

## Prototype behavior
- Tabs switch between all three views.
- Registration validates required fields and shows a realistic generated-badge confirmation.
- Badge search returns representative attendee results.
- Scanner controls demonstrate ready, scanning, success, and error states without opening a real camera.
- Attendance figures use sample data and update locally during the session where useful to demonstrate the flow.

## Visual structure
- Dark charcoal branded header with AAK and convention identities.
- Red active states and primary actions against warm neutral surfaces.
- Main registration workspace paired with compact live stats and lookup tools.
- Flat, operational sections with small-radius controls; no decorative gradients or nested cards.

## Technical details
- Implemented as the `/` page in the existing React app.
- Semantic design tokens will be defined in the global stylesheet rather than hardcoded throughout the page.
- Official logo artwork will be stored as project assets rather than hotlinked.
- Page metadata will identify the AAK Convention Check-In prototype.
- No database, authentication, camera access, or Google Sheets connection is included in this prototype phase.

## Verification
- Check all interactions in the live preview.
- Verify desktop and mobile layouts for overflow, readable text, and reachable controls.
- Confirm the AAK colors, logos, selected typography, and all major prototype states render correctly.
