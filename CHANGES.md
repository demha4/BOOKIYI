# Tamount Surf House — Content Refresh

Update pass: replaced placeholder content with real, verified data from Booking.com (8.5/10, 85+ reviews), Hostelworld (8.7/10), and Google/Tripadvisor for the Anza area.

## Files changed

### `src/data/content.ts`
- **`siteInfo`** — address updated to `Bloc B, Dalas Anza, Agadir, Morocco`. Tagline updated to "4 minutes' walk to Anza Beach" (real distance per Booking listing — was previously "3 minutes").
- **`testimonials`** — replaced 5 made-up reviews with **8 real, verified guest reviews** paraphrased from Booking.com and Hostelworld. Includes the real staff names that appear repeatedly across guest reviews (Heda, Abdelwahd). Countries reflect actual reviewer nationalities (Russia, USA, Italy, France, Germany, UK, Morocco).
- **`reviewStats`** — new export. Aggregate scores from the real Booking listing (cleanliness 8.8, staff 9.3, location 9.0, value 9.0, wifi 8.8).
- **`rooms`** — descriptions updated to mention real features per Booking listing: privacy curtains on bunks, lockable lockers, shared bathroom with shower.
- **`experiences`** — replaced generic list with 8 real activities sourced from local Anza/Agadir options (Paradise Valley, Sand Dunes, Hammam, Souk Anza, Skate Park, etc.). Used proper lucide icon names (`Mountain`, `Sunset`, `Sparkles`).
- **`faqs`** — answers updated with real data: 4 minutes / 400 m to beach (not 3 min), cash payment EUR/MAD (per Booking T&Cs), airport 27 km, breakfast confirmed buffet with vegetarian/vegan options, WiFi rated 8.8/10.
- **`whyChooseUs`** — "3 min" → "4 min" (real distance), "100% Local hosted" replaced with "9.3 Staff rating" (real Booking subscore).

### `src/pages/Experiences.tsx`
- Replaced the experience list with **9 real local activities**:
  1. **Surf Lesson at Anza** — €30, coached 2-hour session at Anza beach
  2. **Paradise Valley** — €30, half-day trip with lunch
  3. **Timlalin Sand Dunes** — €30, sunset trip with sandboarding and dinner
  4. **Hammam & Massage** — €25, local Moroccan ritual
  5. **Souk Anza** — Free, walking distance weekly market
  6. **Taghazout Skate Park** — €5, sunset session
  7. **Sunset Yoga** — €10, rooftop Vinyasa flow
  8. **Airport Transfer** — €25, 27 km transfer to AGA
  9. **Laundry Service** — €5/load
- Reorganized into 4 logical groups: Water & surf · Land adventures · Wellness & chill · Services
- Removed the made-up "in-house skate ramp" claim (replaced with the real Taghazout skate park, which Booking guests do actually use).

### `src/pages/Home.tsx`
- **Review header**: "4.9 / 5 · Based on 200+ reviews from Google & Booking.com" → "8.5 / 10 · Based on 85+ verified reviews on Booking.com & Hostelworld" (real numbers).
- **Hero "What makes it easy" cards**: replaced the in-house skate ramp claim with **Hammam & Reset**. Replaced generic "Local Adventures" with specific **Paradise Valley & Dunes**. WiFi card now references the real 8.8/10 guest rating.
- Imports updated: removed unused `Zap` icon; added `Sparkles` and `Mountain`.

## Files added

### `BOOKING-IMAGES.md`
A drop-in guide for replacing the placeholder photos with real Booking.com ones. Maps each of the 9 image slots in `/public/images/` to what to look for in Booking's gallery, with fallbacks if a slot's ideal photo isn't available.

## Files NOT changed

The actual `/public/images/*.jpg` photos are **unchanged**. Booking.com's image CDN blocks server-side scraping (anti-bot, JavaScript-rendered gallery), so the photos themselves still need to be downloaded and dropped in manually — see `BOOKING-IMAGES.md` for the exact filename mapping.

## Verified

- ✅ `npx tsc --noEmit` passes with no errors
- ✅ `npx vite build` succeeds (634 KB gzipped to 183 KB)
- ✅ All `content.ts` exports preserved — no breaking changes for consumers (`Home.tsx`, `Rooms.tsx`, `Gallery.tsx`, `Faq.tsx`, `Contact.tsx`, `BookNow.tsx`, `PackageSurfCamp.tsx`, `PackageBedAndBreakfast.tsx`, `Navbar.tsx`, `Footer.tsx`)

---

## Pass 2 — Navbar + legal pages (Apr 25, 2026)

### `src/data/content.ts`
- **`navLinks`** — added `{ label: "Packages", path: "/packages" }` between Surf and Experiences. The mobile menu and Footer's "Explore" column both iterate over `navLinks`, so they pick this up automatically.

### `src/components/Footer.tsx`
- Removed the duplicate hardcoded `<Link to="/packages">` (now in `navLinks`, no longer needed).
- Converted the **Privacy Policy** and **Terms of Service** placeholders from `<span>`s to real `<Link>`s pointing to `/privacy` and `/terms`.

### `src/pages/Privacy.tsx` (new)
Original Privacy Policy in the same plain-language voice as the rest of the site. Covers: who we are, what we collect (name/email/phone, ID for legal guest registration, messages, basic analytics), why we collect it, who we share with (Moroccan authorities for legal registration, booking platforms, hosting/booking-tool service providers), how long we keep it, user rights (access, correction, deletion), cookies (technical only), changes, and contact. Last updated date: April 2026.

> **Note on the source:** Booking.com's actual Privacy Policy is copyrighted, so the content here is **original** — written in the site's voice, but reflecting the real facts of how a small Moroccan hostel operates (legal guest registration, etc.).

### `src/pages/Terms.tsx` (new)
Original Terms of Service covering: about the terms, booking confirmation, payment (cash EUR/MAD on arrival per real Booking listing), cancellation (free up to 24 hr per Booking's "free cancellation" listing), check-in/out times (12:00–24:00 in / by 12:00 out per Booking), who can stay (children welcome, no bachelor parties, no pets, no extra beds — all per the real Booking listing), house rules, surf lessons & risks, personal belongings, limits of responsibility, website use, governing law (Morocco / Agadir courts), changes, and contact.

### `src/App.tsx`
- Added imports for `Privacy` and `Terms`.
- Added two new routes: `/privacy` → `<Privacy />` and `/terms` → `<Terms />`.

### `public/sitemap.xml`
- Added `/privacy` and `/terms` URLs with low priority (0.3) and yearly `changefreq` — appropriate for legal pages.

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2171 modules, 650 KB → 186 KB gzipped)
- ✅ Desktop nav: 8 links + Book Now button still fits at the `xl:` breakpoint (1280 px+) within the 1240 px container
- ✅ Mobile menu: picks up Packages automatically (iterates `navLinks`)
- ✅ Footer "Explore" column: picks up Packages automatically (iterates `navLinks`)

---

## Pass 3 — 404 page + booking copy clarity (Apr 26, 2026)

### `src/pages/NotFound.tsx` (new)
Surf-themed 404 page. Headline: "Couldn't catch the wave." Animated wave icon, "404 · Lost at sea" kicker, two primary CTAs (**Back to home** in charcoal, **See availability** in ocean blue), plus a row of secondary jump links (Rooms / Surf / Packages / Experiences / Contact). Uses the same `pt-32 sm:pt-36 bg-cream` shell and motion patterns as the rest of the site.

### `src/App.tsx`
- Imported `NotFound`.
- Added catch-all `<Route path="*" element={<NotFound />} />` at the end of the routes list. Any unknown URL now lands on the 404 page instead of a blank screen.

### `src/pages/BookNow.tsx` — confirmation message tone
- **Old:** "Please include your name as the payment reference. Send proof of payment to **tamountsurfhouse@gmail.com** to confirm."
- **New:** "Use your name as the payment reference. Once we receive the transfer, we'll get back to you within 24 hours to confirm your booking."

Removes the demand to send proof to a Gmail address (looked unofficial), softens the tone, and shifts the burden from the guest ("you must send proof") to the host ("we'll get back to you").

### `src/pages/BookNow.tsx` — confirmed vs. request distinction
The two payment options now make the **guarantee** explicit, which is the real difference between them:

| | Old badge | New badge |
|---|---|---|
| **Pay 30% Deposit** | "Confirmed instantly" | "Room guaranteed" |
| **Pay on Arrival** | "Pending confirmation" | "Request only" |

Helper text now clearly states:
- **Deposit option:** "A €X deposit locks in your room. The dates are blocked for you the moment we receive it — no risk of someone else booking over you."
- **Arrival option:** "No deposit, no guarantee. Your dates stay open — if someone else books with a deposit before we reply, the room may be gone."

Summary callout updated to "Your room will be GUARANTEED" / "Your booking will be a REQUEST" with explanations that reflect the real business mechanic: the deposit is what protects both sides — guest from being bumped, host from no-shows.

Success messages also softened:
- "Booking Confirmed!" → "Your room is being secured!"
- "Booking Request Received!" → "Request received!"
- Bottom-of-summary subtext: "Full amount on check-in · Booking pending confirmation" → "Full amount on arrival · Request only — room not guaranteed"

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 658 KB → 187 KB gzipped)
- ✅ Catch-all route placed last so existing routes still take priority

---

## Pass 4 — Real photos + booking copy revert (Apr 26, 2026)

### `public/images/` — replaced all stock placeholders with real property photos
Processed 28 source photos provided by the host into 20 web-optimized images:

**Pipeline:**
- Subtle global enhancement: brightness +2%, contrast +4%, saturation +5%, UnsharpMask (radius 0.8, percent 80, threshold 3)
- Center-cover crop to consistent 1400×1050 (or 1200×630 for OG)
- JPEG quality 85, progressive, optimized
- Total folder size: 5.2 MB across 21 images (avg ~250 KB each)

**Mapping (source → site filename):**

| Site slot | Source photo | Notes |
|---|---|---|
| `hero-surf.jpg` | Waves.jpg | Surfer + jet ski + Anza wave (also used for OG) |
| `surf-camp.jpg` | The Door.jpg | Three coloured boards at the entrance — *the* brand image |
| `yoga-sunset.jpg` | Rooftop.jpg | Berber rugs, floor cushions, plants on the rooftop |
| `hostel-living.jpg` | Commun Space.jpg | Editorial flatlay: laptop + Moroccan tea + Berber rug |
| `private-room.jpg` | Double Room.jpg | Moroccan-styled double, Berber painting, pom-pom throw |
| `dorm-room.jpg` | Dorms.jpg | Wooden bunks + guitar + rattan chandelier |
| `triple-room.jpg` | Triple Room (2).jpg | NEW slot — was previously sharing `hostel-living.jpg` |
| `moroccan-sunset.jpg` | Activities (4).jpg | Sunset at the dunes |
| `surf-lesson.jpg` | Activities(2).jpg | Berber on camel + surfer in background |
| `og-tamount.jpg` | Waves.jpg (1200×630) | Social-share preview |

**Bonus images now available for gallery / experiences:**
`breakfast.jpg`, `kitchen.jpg`, `bathroom.jpg`, `lockers.jpg`, `rooftop-view.jpg`, `anza-coast.jpg`, `argan-goats.jpg`, `sand-dunes.jpg`, `timlalin.jpg`, `outdoor-trip.jpg`

### `src/data/content.ts`
- **`rooms[1].image`**: `/images/hostel-living.jpg` → `/images/triple-room.jpg` (Triple Room now has its own real photo).
- **`galleryImages`**: expanded from 8 to 18 photos, organized into 5 categories (Surf, Rooftop, Rooms, Hostel, Trips). The Gallery page picks up the new categories and photos automatically.

### `src/pages/Experiences.tsx`
Updated 4 experience modal images to use real, fitting photos:
- **Paradise Valley**: `moroccan-sunset.jpg` → `argan-goats.jpg` (countryside)
- **Sand Dunes**: `hero-surf.jpg` → `sand-dunes.jpg` (actual dunes)
- **Hammam**: `hostel-living.jpg` → `bathroom.jpg` (Moroccan-tiled wellness vibe)
- **Airport Transfer**: `hostel-living.jpg` → `outdoor-trip.jpg` (off-road vehicle shot)

### `src/pages/BookNow.tsx` — revert
- Restored the original "Confirmed instantly" badge on the deposit option (was briefly changed to "Room guaranteed" in pass 3).
- Kept the clarifying helper text about *why* the deposit confirms instantly (it locks the dates so no one else can book over the guest), so both the punchy badge and the operational clarity are preserved.

### Removed
- `BOOKING-IMAGES.md` — no longer needed; we have real photos now, mapped directly.
- `public/images/og-tamount.png` — stale leftover; `og-tamount.jpg` is the active 1200×630 social image.

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 660 KB → 188 KB gzipped)
- ✅ All 20 images present in `/public/images/`, total 5.2 MB
- ✅ Hero image visually checked — natural ocean tones after enhancement-tuning revision

---

## Pass 5 — Booking-aligned room names + clean mobile menu (Apr 26, 2026)

### `src/data/content.ts`
**Room names now match Booking.com exactly:**

| Internal `id` | Old name | New name (matches Booking listing) |
|---|---|---|
| `anza-dorm` | The Anza Dorm | **Bed in 6-Bed Mixed Dormitory Room** |
| `double-room` | The Double Room | **Economy Double Room** (1 queen bed) |
| `rooftop-triple` | The Rooftop Triple | **Economy Double Room** (1 twin + 1 queen) |

Note: the two private rooms now share the same display name ("Economy Double Room"), exactly as on Booking. They're disambiguated by their `features[0]` ("1 queen bed" vs "1 twin bed and 1 queen bed"), price (€30 vs €35), image, and unique URL slug — same disambiguation pattern Booking itself uses.

Also corrected dorm size: `maxGuests: 8 / availableBeds: 8` → `6 / 6` to match the real Booking listing ("6-Bed Mixed Dormitory").

**Added social field:**
- `siteInfo.social.instagram` — currently set to `https://www.instagram.com/tamountsurfhouse/`. Update if the real handle is different.

### `src/components/Navbar.tsx`
**Removed duplicate logo + close icon in the mobile menu.** When the drawer was open, the user saw two logos (one in the top navbar, one inside the drawer panel) and two ways to close (the X in the top navbar, plus another X inside the drawer header). Now the drawer panel just contains the link list and CTAs — the navbar at the top remains visible and its hamburger-turned-X serves as the single close action. Cleaner, less visually noisy.

**Added contact footer to the mobile menu:**
- WhatsApp / phone number row (taps to open chat)
- Email row (taps to open mail client)
- Three round social icon buttons at the bottom: **Instagram**, **WhatsApp**, **Phone**

The Instagram glyph is inlined as an SVG component (`InstagramIcon`) because lucide-react v1.8.0 doesn't ship brand icons (a deliberate choice on lucide's side for trademark reasons).

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 658 KB → 188 KB gzipped)
- ✅ `room.name` is used only for display (not as a React `key`) — duplicate names are safe
- ✅ Logo import retained for the top navbar (still used there)

---

## Pass 6 — UI polish (button sizing, content order, mobile menu density)

### `src/pages/Home.tsx` — Image 1: Contact CTA buttons resized
The "Message on WhatsApp" and "Get Directions" buttons in the Direct Booking dark card were oversized (`py-4 text-base sm:text-lg`) compared to every other CTA on the site. Brought them down to `py-3.5 text-sm sm:text-base` so they match the standard pattern (Check availability, Ask a question, etc.) — looks proportional now instead of dominating the card. Reduced their inline icon sizes from `20`/`18` → `18`/`16` to match.

### Packages — Image 2: "Minimum stay" promoted to the top
Both on the Home page (B&B + Surf Camp) and on the Packages page (`Packages.tsx`), the minimum-stay info was previously the *last* line above the buttons — buried. Moved it to the top of each card so guests see the commitment level before reading anything else:

- **Home.tsx** — "Minimum stay" now sits inline with the badge (badge on the left, minimum stay on the right, both small/secondary). Removed the old line above the buttons.
- **Packages.tsx** — "Minimum stay" appears as a small kicker line right above the title (e.g. "Minimum stay: 1 night" → `Bed & Breakfast`). Removed the old bordered-divider block at the bottom.

### `src/pages/Home.tsx` — Image 3: Experience card price moved
Reordered the activity card content from `location → title → description → price → buttons` to `location → title → price → description → buttons`. The price now sits directly under the title where the eye expects it, instead of being squeezed between the description and the CTAs.

### `src/components/Navbar.tsx` — Image 4: Compact mobile menu
The drawer's link list was using full-width white "buttons" per item (`bg-white rounded-2xl px-4 py-3.5`), eating ~62 px each. With 8 nav links + CTAs + contact footer + socials, the drawer overflowed the viewport on most phones.

**What changed:**
- Replaced individual button-like backgrounds with clean text rows separated by a `divide-y` line — same pattern Apple/Stripe use for compact navigation lists. Each row is now `px-2 py-3` instead of `px-4 py-3.5`.
- Active route is shown via text color (`text-ocean`) instead of a full blue pill, since the pill was visually heavy.
- Reduced B&B / Book Now CTA padding from `py-4` → `py-3`.
- Contact rows (WhatsApp / email) are now flat text rows with icons, no individual backgrounds — keeps continuity with the link list above.
- Social icon buttons reduced from 44×44 → 36×36 (still tap-target compliant — Apple HIG minimum is 44, but mobile web tolerates 36 for secondary icons).
- Added `max-h-[calc(100vh-6rem)] overflow-y-auto` so on truly small phones the panel scrolls instead of clipping.
- Trimmed motion delays (`i * 0.04` instead of `0.05`) so the staggered entry animation finishes faster — feels snappier with denser content.

Result: the entire menu (8 nav links + 2 CTAs + 2 contact rows + 3 social icons + dividers) fits in roughly 540 px on mobile, well under typical 700 px+ viewport heights, with scroll as the safety net.

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 659 KB → 188 KB gzipped)

---

## Pass 8 — Booking flow pricing fixes (Apr 26, 2026)

### Bug 1 — Per-person add-on pricing was double-counted

**Symptom (from user screenshot):** 2 guests, Guest 1 selects 1 surf lesson, Guest 2 selects 0. The line subtotal correctly showed €30, but the right-side "Booking Summary → Add-ons" line showed **€60**. So the customer sees two different totals on the same screen.

**Root cause:** In `usePriceBreakdown` (`BookNow.tsx`), the addon total was computing `price × quantity × totalPersons` for non-airport addons. But `setAddonGuestQty` (in `BookingContext.tsx`) already sums per-guest quantities into `quantity`. Multiplying by `totalPersons` again was double-counting in per-person mode and over-counting in group mode (a group buying 2 lessons doesn't pay for "2 lessons × N people").

**Fix:** Removed the `× totalPersons` multiplier entirely. New formula in both `addonsTotal` and the right-side line item:
- Standard add-on: `price × quantity`
- Per-night add-on: `price × quantity × nights`

`quantity` is already the right number in both modes (group mode = items the group booked, person mode = sum of per-guest selections), so no further multiplication is correct.

Also removed the now-misleading "× N guests" suffix from the Booking Summary line item display.

### Bug 2 — Taxi could be selected per-guest, multiplying the flat fare

**Symptom:** In per-person mode, each guest had a `+/-` selector for the taxi/airport-pickup add-on. Two guests adding "1 taxi each" would compute as €50 (2 × €25) when in reality there's still only one taxi ride.

**Why it was wrong:** Taxi is paid per drive, not per seat. One taxi covers up to 5 guests for €25 flat. The taxi already had `maxPerUnit: 1` to prevent the group from booking 2 taxis, but the per-person UI bypassed that.

**Fix:** Force the taxi (`addon.id === "airport-pickup"`) to always show the **group selector** (one +/- counter, max 1), regardless of whether the user is in Per Group or Per Person mode. When the user is in Per Person mode, an italic helper line appears on the taxi card: *"Flat rate — covers up to 5 guests in one ride"*, so the inconsistency is explained rather than silent.

### Verified math (post-fix)
- Group of 2, 1 surf lesson booked → **€30** ✓
- Group of 2, 2 surf lessons booked → **€60** ✓
- Per-person mode: G1 picks 1 lesson, G2 picks 0 → **€30** ✓
- Per-person mode: both pick 1 lesson → **€60** ✓
- Taxi (any mode, any group size 1–5) → **€25 flat** ✓

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 659 KB → 188 KB gzipped)

---

## Pass 9 — Beds24 pricing flow + auto-reset (Apr 26, 2026)

### Goal
Tighten the contract between the frontend and Beds24 per spec: displayed total = exact price sent to Beds24, no stale state, extras are visible inside the booking as descriptions.

### What was already correct (untouched)
- `price.total` (rooms + extras) is sent in the `price` field of the createBooking payload — `BookNow.tsx` line 522.
- The serverless proxy (`api/beds24.ts`) splits that single price across multiple rooms proportionally when a booking spans more than one room (V2 API requires an array of room-bookings, but the *sum* of their `price` shares always equals the original `price.total` thanks to the last-row-takes-the-remainder rounding).
- An audit line `Final total sent to Beds24: €X` already lived in the notes for traceability.

### What changed

**1. Extras now include the line price in notes** (`BookNow.tsx`):
- Before: `Extras: Surf Lesson x2, Airport Transfer x1`
- After: `Extras: Surf Lesson x2 - €60, Airport Transfer x1 - €25`

The line-total math is the *same* function used by `addonsTotal` (`price × quantity`, plus `× nights` for per-night items), so the prices in the notes always match what's in the `price` field. Also added an explicit `Rooms total: €X` and `Extras total: €X` line so the breakdown in Beds24 is fully self-explanatory.

**2. Auto-reset to Room Selection on guest/date changes** (`BookNow.tsx`):
A new `useEffect` watches `booking.checkIn`, `booking.checkOut`, and `totalPersons`. When any of those change *while the user is past Step 2 (Rooms)*, it:
- Snaps `step` back to 2
- Calls `clearAllRoomAssignments()` so guests aren't assigned to rooms that may have stale prices/availability
- Calls a new `clearAddOns()` that empties `booking.addOns`
- Resets `paymentChoice` to `null` so the user re-confirms after seeing fresh totals
- Calls `refreshAvailability()` to force the live price fetch

The effect uses a `useRef` to track the previous "key" of `(checkIn|checkOut|totalPersons)`, so it does *not* fire on initial mount — only on real user-driven changes.

**3. New `clearAddOns()` action on `BookingContext`:**
Added to the context interface, implemented as `setAddOns: {}`, exposed through the provider value. This makes it a first-class operation usable from anywhere in the booking flow.

### Final booking payload — what Beds24 actually receives

For a 2-night stay, 2 male guests, 1 Economy Double Room (€110/night × 2 = €220) + 1 Bed in dorm (€20/night × 2 = €40), with 1 Surf Lesson (€30) and 1 Airport Transfer (€25):

```json
[
  {
    "propertyId": 309994,
    "roomId": 645891,
    "arrival": "2026-04-27",
    "departure": "2026-04-29",
    "status": "request",
    "numAdult": 1,
    "numChild": 0,
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "[email protected]",
    "phone": "+212600000000",
    "notes": "Payment: Pay on arrival | Guests: Guest 1 (Male), Guest 2 (Male) | Rooms total: €260 | Extras: Surf Lesson x1 - €30, Airport Transfer x1 - €25 | Extras total: €55 | Final total sent to Beds24: €315 | Room booking 1/2",
    "referer": "tamount-website",
    "price": 157.50
  },
  {
    "propertyId": 309994,
    "roomId": 645890,
    "arrival": "2026-04-27",
    "departure": "2026-04-29",
    "status": "request",
    "numAdult": 1,
    "numChild": 0,
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "[email protected]",
    "phone": "+212600000000",
    "notes": "Payment: Pay on arrival | Guests: Guest 1 (Male), Guest 2 (Male) | Rooms total: €260 | Extras: Surf Lesson x1 - €30, Airport Transfer x1 - €25 | Extras total: €55 | Final total sent to Beds24: €315 | Room booking 2/2",
    "referer": "tamount-website",
    "price": 157.50
  }
]
```

The two `price` shares (157.50 + 157.50) sum exactly to €315, which is the total displayed to the user.

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 659 KB → 188 KB gzipped)
- ✅ Reset logic is mount-safe (won't trigger on first render)
- ✅ `addonsTotal` math is identical to the per-line math in notes — no rounding mismatch possible

### Known issue, NOT fixed in this pass — flagging it for you
**Your Beds24 refresh token is committed in plaintext** in `api/beds24.ts` line 11, with the property ID at line 13. This means anyone who clones the GitHub repo (it's public — `demha4/BOOKIYI`) has full booking-creation access to your Beds24 account. After deploying this pass, please:
1. Log into Beds24 → API → revoke that refresh token
2. Generate a new one
3. Set it in Vercel as `BEDS24_REFRESH_TOKEN` env var (Settings → Environment Variables)
4. Edit `api/beds24.ts` to remove the hardcoded fallback strings — leave only `process.env.BEDS24_REFRESH_TOKEN || ""` so the code crashes loudly if the env var is missing instead of silently using a leaked token.

Same for the property ID — though that's less sensitive than the token, it shouldn't be in source.

---

## Pass 10 — Restore "per-group" multiplication (the previous fix went too far)

### What broke in Pass 8
When fixing the per-person double-count bug, I removed the `× totalPersons` multiplier from **both** modes. But group mode legitimately needs that multiplier, because per the spec:

> per group = the whole group wants the session/service
> per person = only one person or selected persons want the service

So if a group of 2 selects "2 surf lessons" in group mode, the intent is "we each want 2 lessons" → 4 sessions × €30 = €120. After Pass 8, the system was charging €60 (the price for 2 sessions total, shared between two people, which doesn't match how surf lessons work).

### What changed in Pass 10
Pricing now branches by **mode** and treats taxi as a flat-fare exception:

```
calcAddonLineTotal(addon, quantity, mode, totalPersons, nights):
  if addon is taxi (airport-pickup):
    return price × quantity × nightlyMultiplier
  if mode === "group":
    return price × quantity × nightlyMultiplier × totalPersons
  else (per-person):
    return price × quantity × nightlyMultiplier
```

### Single source of truth
Extracted the calculation into one helper (`calcAddonLineTotal`) used in **four** places that previously each had their own copy of the math:

1. `addonsTotal` (the running total used for the booking grand-total)
2. The inline "Subtotal: €X" line under each addon card
3. The right-side Booking Summary line items
4. The `Extras: ... - €X` lines in the notes sent to Beds24

This guarantees no drift: whatever the user sees in the addon card is exactly what's in the right-side summary, exactly what's in the booking total, and exactly what gets written into the Beds24 notes for audit.

### Math verification (all 5 scenarios)

| Scenario | Group size | Mode | Quantity | Expected | Calc | Result |
|---|---|---|---|---|---|---|
| Group, 2 lessons each | 2 | group | 2 | €120 | 30×2×2 | ✓ |
| Group, 1 lesson each | 2 | group | 1 | €60 | 30×1×2 | ✓ |
| Per-person, only G1 takes 1 | 2 | person | 1 (sum) | €30 | 30×1 | ✓ |
| Per-person, both take 1 | 2 | person | 2 (sum) | €60 | 30×2 | ✓ |
| Taxi (any mode) | 4 | any | 1 | €25 | 25×1 | ✓ |

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 659 KB → 188 KB gzipped)
- ✅ All 4 callers refactored to use `calcAddonLineTotal` — no math repeated

---

## Pass 11 — Beds24 brand removal + real packages on Book page + 3-row pricing table

### `src/components/LiveSyncIndicator.tsx`
Dropped "Synced with Beds24 • " from the live availability label. Now just shows "Last updated 27 seconds ago" — no provider name exposed to guests.

### `src/data/content.ts` — `packages` array replaced
Removed the three fake packages (`surf-start`, `beginner-week`, `progression-week`). Replaced with the **two real packages** that match the homepage and the dedicated detail pages:

- **bed-and-breakfast** — Flexible, minimum 1 night, from €12/night. Includes accommodation, daily Moroccan breakfast, rooftop terrace, bed linen + towels, fast WiFi, 24/7 reception.
- **surf-camp-pack** — Minimum 3 nights, from €45/night. Includes accommodation, breakfast + dinner, daily surf lessons, board + wetsuit, transport to spots, video analysis.

### Link updates (3 places)
All references to the deleted `beginner-week` updated to `surf-camp-pack`:
- `src/pages/Home.tsx` line ~410
- `src/pages/Packages.tsx` line ~32 (`bookPath`)
- `src/pages/PackageSurfCamp.tsx` line ~69 (CTA)

### `src/pages/BookNow.tsx` — B&B is room-only, not a flat-rate package
The "bed-and-breakfast" package id is treated as the standard room-by-room flow — `accommodationTotal` only applies the flat-rate package price for *real* package bundles like `surf-camp-pack`. Selecting B&B in the package step doesn't override room pricing, so a guest who picks B&B + Double Room pays the actual Double Room rate from Beds24, not a synthetic "€12 × persons" total.

### `src/pages/PackageSurfCamp.tsx` — pricing table now 3 rows
Removed the "Private room (solo occupancy)" row. The hostel only has 3 real accommodation types (Dorm, Economy Double = 1 queen, Economy Double = 1 twin + 1 queen / triple), so the table now matches reality:
- Dorm bed
- Double room (per person, 2 sharing)
- Triple room (per person, 3 sharing)

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 659 KB → 188 KB gzipped)
- ✅ All `/book/package/*` links resolve to real package ids

---

## Pass 12 — Real Beds24 prices + package detail content enrichment

### Room price update — `src/data/content.ts`
Static fallback prices now reflect the real Beds24 numbers. The site uses live Beds24 pricing whenever the API is reachable, but these static numbers are what shows during the brief loading state and on pages that don't query Beds24 (Footer, Home hero copy, meta descriptions, etc.):

| Room | Old fallback | New fallback | Source |
|---|---|---|---|
| Bed in 6-Bed Mixed Dormitory | €12 | **€20** | Beds24 Website-DE rate |
| Economy Double (1 queen) | €30 | **€55** | Beds24 OTA rate (will drop when Website rate is set) |
| Economy Double (1 twin + 1 queen) | €35 | **€50** | Beds24 OTA rate (will drop when Website rate is set) |

Once the Website-DE rates are set in Beds24 for the private rooms (the user said this is pending), the live API will return the lower numbers and the displayed prices will follow automatically without code changes.

### Static "From €X" copy updated across the site
Every place that hard-coded the old prices now reflects €20 dorm / €50–€55 private:

- `Footer.tsx` — three lines in the contact column
- `JsonLd.tsx` — `priceRange` for SEO structured data: `€12 - €150` → `€20 - €150`
- `SEO.tsx` — default site meta description
- `Rooms.tsx` — page meta description
- `Home.tsx` — homepage meta description + B&B card "From €12" → "From €20"
- `PackageBedAndBreakfast.tsx` — meta description, hero "From €12 / night" → "From €20 / night", subheadline "private rooms from €30" → "from €50"
- `Packages.tsx` — page meta description + B&B card price label
- `data/content.ts` — `packages[0].priceFrom` for B&B: 12 → 20

Surf-related prices (board rental, surf lessons) were left untouched — those are unrelated to Beds24 room rates.

### Package detail pages — content enrichment in Tamount style

Per your direction (Q1: adapt the screenshot content into Tamount's existing visual style, not copy waveshuntersurfhouse's orange/dark layout), I added a **Conditions of Reservation** card to both detail pages, matching the cream-and-blue card style already used everywhere else on the site.

**`PackageBedAndBreakfast.tsx`** — added two new cards before the final WhatsApp CTA:

1. *Conditions of Reservation* — Check-in 12:00 PM, Check-out 10:00 AM, no deposit required for direct bookings, free cancellation up to 24 hours, ID on arrival per Moroccan law. Friendly footer about late arrivals being fine.
2. *Available on Request* — The activities not yet in the experiences page but doable through trusted local partners: camel/horse riding on the beach, quad & buggy adventures, sandboarding at Timlalin dunes, traditional hammam & massage, day surf trips, cultural tours, sunrise/sunset yoga.

**`PackageSurfCamp.tsx`** — added one Conditions card before the final CTA:

Check-in 12:00 PM, Check-out 10:00 AM, minimum 3 nights, 30% deposit confirms instantly, free cancellation up to 7 days before, ID on arrival. Footer line clarifying what's *not* in the pack ("Lunches, extra activities, airport transfer, and personal insurance are not included") — same disclaimer your screenshot shows under the pricing table.

Both cards use:
- The standard `bg-white rounded-[2rem] border border-stone-200 shadow-sm` card style
- Lucide icons (`Clock`, `LogIn`, `LogOut`, `Check`) in the `bg-[#E8F4F8] text-ocean` icon-tile style used elsewhere
- `<strong className="text-charcoal">` for the time values to make them pop without breaking the muted body text

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 664 KB → 189 KB gzipped)
- ✅ All static price references in sync with the new Beds24 numbers
- ✅ Live Beds24 pricing still drives the booking flow — these are display-only fallbacks

### Note on the OTA rates for private rooms
Double €55 and Triple €50 are the OTA channel rates from your Beds24 screenshot. The Website-DE rate (€3.50 lower per night, per your spec) hasn't been configured yet for these rooms. Once you set those in Beds24, the live API will return the lower number and the booking page will reflect it automatically. The static fallbacks here are conservative — guests will see the lower live price as soon as availability loads.

If you want me to lower these static fallbacks too once you've set the Website rates, just send the new numbers and I'll update them.
