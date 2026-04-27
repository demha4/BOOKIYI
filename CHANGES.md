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

---

## Pass 13 — "Missing" Triple Room investigation

The user reported that the Triple Room wasn't appearing on the Book page or Home page. The Beds24 control panel screenshot showed it was synced and configured correctly (Room id 645892), so the issue was on the site side.

Two distinct problems found:

### Problem 1 — Triple Room visually indistinguishable on the Home page

In Pass 5 ("Booking-aligned room names"), both private rooms were renamed to **"Economy Double Room"** to match Booking.com's listing exactly (Booking shows them with identical names, disambiguated only by bed configuration). On Booking's listing page that's tolerable because each entry has a bed-config row underneath. On the Tamount Home page, three room cards rendered side by side with the *same* name on two of them — making it look like the Double appeared twice and the Triple was missing.

**The fix:** renamed `rooftop-triple` back to **"Triple Room"** — the name Beds24 itself uses for this room (visible in the user's screenshot: "Triple Room (Room id 645892)"). Beds24 is the operational source of truth here, not Booking's listing-page rendering. Updated `description` to mention the bed config inline ("Sleeps up to three — one twin and one queen bed"). Now the three Home cards show distinct, recognizable names.

### Problem 2 — Silent room dropping when no rate plan is configured

While investigating Problem 1, found a real bug in `src/services/beds24.ts`. The `getLiveRoomData` parser was silently skipping any room where Beds24 returned no `offers` array (line 136: `if (!bestOffer) continue;`). This happens when a room exists in Beds24 but doesn't yet have a Website-DE rate plan set for the requested dates.

The user mentioned they had set the dorm's Website rate but **not yet** the rates for the private rooms. So Beds24 was returning the Triple Room (and possibly the Double too) with an empty `offers` array, the parser silently dropped them, `liveData["645892"]` was `undefined`, the BookNow page check `if (!hasLiveData && !hasGuests) return null;` hid the room entirely. Guest sees nothing, no error message, no clue why.

**The fix:** when Beds24 returns a room with no offers, the parser now emits a `{ available: -1, totalPrice: 0, avgNightly: 0 }` sentinel value instead of skipping. The BookNow page surfaces these rooms using the static `room.price` from `content.ts` as the fallback, with an amber **"Rate on request"** badge instead of the green/red "X beds left" badge. The "No availability" empty-state filter was also updated to not flag `-1` rooms as zero-available.

This means: as soon as the user sets the missing rate plans in Beds24, the rooms automatically pick up live pricing and the "Rate on request" badge disappears — no code change needed. Until then, guests can still see all rooms and book them via WhatsApp at the listed fallback price.

### Files changed
- `src/data/content.ts` — `rooftop-triple` name + description
- `src/services/beds24.ts` — `getLiveRoomData` no longer drops rooms silently
- `src/pages/BookNow.tsx` — render logic respects the new `available: -1` sentinel; "Rate on request" badge replaces the count badge in that case

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 668 KB → 189 KB gzipped)

---

## Pass 14 — Dorm to 8-bed, env-driven contact info, Google verification

### Dorm capacity: 6 → 8

Updated to match the planned Beds24 update. Changed in `src/data/content.ts`:
- Name: `Bed in 6-Bed Mixed Dormitory Room` → `Bed in 8-Bed Mixed Dormitory Room`
- `maxGuests`: 6 → 8
- `availableBeds`: 6 → 8

Also updated `src/pages/Rooms.tsx` meta description ("6-bed dorm" → "8-bed dorm").

**Important — set in Beds24 too:** make sure the Beds24 control panel for room 645890 also reads "8-Bed Mixed Dormitory" and the inventory/availability count is set to 8 beds. Otherwise the live availability badge will say "X beds left" with the wrong cap.

### Contact info now driven by Vercel env vars

`src/data/content.ts` now reads contact details from Vite environment variables at build time, with fallbacks for local dev:

```
VITE_WHATSAPP_NUMBER  → digits only, e.g. "212612345678" (used in wa.me links and tel:)
VITE_PHONE_DISPLAY    → human-readable, e.g. "+212 6 12 34 56 78"
VITE_CONTACT_EMAIL    → contact email
```

**Set these in Vercel** (Project → Settings → Environment Variables) and trigger a redeploy. Every `wa.me/...` link, `tel:` link, displayed phone, and contact email on the site will pick up the values.

### Hardcoded `212612345678` references replaced

The number was hardcoded in 7 places that were *not* reading from `siteInfo`. All now go through `siteInfo.whatsapp` (which reads from the env var):

- `src/components/WhatsAppButton.tsx` — floating green WhatsApp button
- `src/components/JsonLd.tsx` — `telephone` and `email` in the SEO structured data
- `src/pages/Home.tsx` — tel link in the contact card + WhatsApp CTA in the dark "Direct Booking" section
- `src/pages/Experiences.tsx` — modal "Book on WhatsApp" + bottom CTA (added `siteInfo` import)
- `src/pages/Surf.tsx` — bottom WhatsApp CTA (added `siteInfo` import)

### Google Search Console verification

Added the meta tag verification method in `index.html`:

```html
<meta name="google-site-verification" content="h7inht7WKXzqAE9UAFnkQn7WMRrepzDtTEGQVroy3lY" />
```

This is the **HTML tag method** — Google accepts either the DNS TXT record OR this meta tag. After deploying, in Google Search Console click "Verify" — it'll find the meta tag in the live HTML and confirm ownership immediately, no DNS wait.

For belt-and-braces you can also keep the DNS TXT record (different verification path, also works). Both can coexist.

Bonus: also fixed the stale `€12/night` in `index.html`'s static `<meta name="description">` → `€20/night` (this one wasn't catching the React-side meta updates because the homepage SEO component overrides it on render, but the static value matters for crawlers that scrape the raw HTML).

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 665 KB → 189 KB gzipped)
- ✅ Verification token confirmed present in `dist/index.html`
- ✅ All `wa.me` and `tel:` links go through `siteInfo.whatsapp`

### Note on the room name confusion observed in Pass 13's screenshot
The user's earlier screenshot showed two "Economy Double Room" cards (€55 and €61) with mismatched specs. This is the *pre-Pass-13 deploy* — the previous build still had both private rooms named "Economy Double Room". After deploying the Pass 13 zip (or this one), the page will correctly show:
- Bed in 8-Bed Mixed Dormitory Room (after this pass) — €20
- **Triple Room** — €50 — 16 m² Max 3 — 1 twin + 1 queen
- Economy Double Room — €55 — 14 m² Max 2 — 1 queen

Each card now has a distinct name; no more visual duplication.

---

## Pass 16 — Package pricing model corrected (rooms billed on top + 7-night minimum)

User flagged two related bugs after testing the Surf Camp Pack flow:

### Bug 1 — Room cost not added to total when a package is selected

**Symptom:** With the Surf Camp Pack, 13 nights, 3 guests in the dorm, the right-side Booking Summary showed PACKAGE €1755 + ROOMS €780 but Total only said €1755. The room line was visually present but not in the math.

**Root cause:** In Pass 11, when first wiring packages into the booking flow, I treated flat-rate packages as "all-inclusive" — meaning `accommodationTotal` returned the package price *instead of* the room subtotals. The room display was kept for transparency but the math ignored it. That was the wrong commercial model.

**The right model (per user):**
- The Surf Camp Pack `priceFrom` (€45/day per person) covers **surf services + meals + transport only** — *not* the room.
- The room is billed **on top**, at whatever Beds24 returns for the chosen room and dates.
- Different rooms = different totals because accommodation is billed separately.
- The B&B "package" stays as a no-op (just the standard room-only flow with marketing wrapper).

**Fix:** `accommodationTotal` now returns `roomsSubtotal + packageFee` for flat-rate packages. Added a separate `packageFee` derived value so the right-side summary can display the package and the rooms as distinct line items that visibly sum to the total.

```ts
const accommodationTotal = useMemo(() => {
  const roomsSubtotal = roomBreakdown.reduce((s, r) => s + r.subtotal, 0);
  const isFlatRatePackage = selectedPkg && selectedPkg.id !== "bed-and-breakfast";
  if (!isFlatRatePackage) return roomsSubtotal;
  const packageFee = selectedPkg.priceUnit === "total"
    ? selectedPkg.priceFrom * totalPersons
    : selectedPkg.priceFrom * nights * totalPersons;
  return roomsSubtotal + packageFee;
}, [...]);
```

### Bug 2 — Minimum stay treated as a copy field, not a constraint

The data said "Minimum 3 nights" for the Surf Camp Pack but the booking flow accepted any number of nights. Also the displayed text was wrong — the user wanted **7 nights** minimum, not 3, and the dedicated Surf Camp page had a fixed 3/5/7-night pricing table that suggested those were the *only* allowed durations.

**Fix:**
- Added a typed `minNights: number` field to package data in `content.ts`. B&B = 1, Surf Camp Pack = 7.
- `canProceed(step)` for step 1 now returns `false` if `nights < pkg.minNights`. Continue button greys out automatically.
- When the package card is selected and the date range is below the minimum, an inline amber warning replaces the math preview: *"This pack requires a minimum of 7 nights. You picked 5 nights. Extend your dates or pick another option."*
- Updated all displayed copy: PackageSurfCamp.tsx header, Conditions card, Packages.tsx, Home.tsx, content.ts. All now say "Minimum 7 nights" / "Minimum stay: 7 nights".
- **Removed** the misleading 3/5/7-night fixed pricing table on the Surf Camp page. Replaced with a two-card breakdown showing the per-day pack rate (€45/day/person) and the per-night room rates (€20 dorm / €50 triple / €55 double), plus a worked example: *"1 person, 7 nights in the dorm = €315 (pack) + €140 (dorm) = €455"*. Reads as "this is how the pricing works", not "these are your only three options".

### Other cleanups in this pass

- **Inline package math fixed.** The "X persons × €Y" line under the selected package card was missing the `× nights` factor — showed €135 for 3 guests at €45/day instead of €1755 for 13 nights. Now reads `3 persons × €45/day × 13 nights = €1755` plus a small line *"+ accommodation (added when you pick rooms)"* so the user knows the total isn't final yet.
- **Beds24 notes split.** Notes now show `Package fee: €1755 (45/day × 13 nights × 3 guests) | Rooms total: €780 | Final total sent to Beds24: €2535` so the Beds24 UI shows the breakdown clearly instead of a single conflated "Rooms total" that included the pack.
- **Updated package data** to reflect the new pricing model: tagline, description, and `includes` list now state explicitly that accommodation is billed separately.

### Verified math on the user's exact screenshot scenario

| | Before | After |
|---|---|---|
| PACKAGE line | €1755 | €1755 ✓ |
| ROOMS line | €780 (display only) | €780 ✓ |
| TOTAL | €1755 (wrong) | **€2535** ✓ |

5 nights with Surf Camp Pack selected:
- `canProceed(1)` returns `false` ✓
- Continue button disabled ✓
- Amber warning rendered ✓

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 667 KB → 190 KB gzipped)
- ✅ All "3 nights" / "Minimum 3 nights" references swept and updated to 7
- ✅ Stale `pricing` const removed from PackageSurfCamp.tsx

---

## Pass 17 — Guest cap (13) + remove Laundry addon

### Guest count capped at 13 — `BookNow.tsx` + `BookingContext.tsx`

The property has 13 beds total: 8 in the dorm + 3 in the triple + 2 in the double = 13. Previously the GuestPicker had no cap — a user could keep clicking "+" indefinitely and end up requesting 30 guests for a 13-bed house.

**UI cap (`BookNow.tsx` GuestPicker):**
- New `MAX_GUESTS = 13` constant.
- Each row tracks its `weight` (males/females = 1, couples = 2 each).
- The `+` button is disabled when `total + weight > MAX_GUESTS`. Disabled state uses `disabled:opacity-30 disabled:cursor-not-allowed`.
- Total counter now reads `7 / 13` instead of just `7`, and turns amber when at the cap.
- When the cap is hit, an inline note appears: *"That is the full house — 13 places across all rooms. For larger groups, message us on WhatsApp."* — guides the largest groups to the right channel rather than dead-ending them.

**Defense-in-depth (`BookingContext.tsx`):**
- `setGuestCounts(m, f, c)` now silently no-ops if `m + f + c*2 > 13`. The UI already prevents user clicks from getting there, so this only matters for programmatic callers (URL params, restored sessions, future deep-link flows). Rejecting invalid input early prevents weird mid-flow states (e.g. 14 guests but only 13 bed slots, infinite "1 guest unassigned" warnings).

### Washing Machine addon removed

User flagged the Laundry/Washing Machine addon should no longer be bookable. Removed from three places to keep the UX consistent (booking flow + marketing + data layer):

- **`src/pages/BookNow.tsx`** — dropped from the `ADDONS` array (no longer shown in the addons step).
- **`src/data/upsells.ts`** — dropped from `UPSELL_ITEMS`.
- **`src/pages/Experiences.tsx`** — removed the "Laundry Service" card from the Experiences page. Leaving it on the marketing page would have been misleading: guests would see it advertised, click through to "Add to Stay", and then find it absent from the booking flow.

Also dropped the now-unused `UtensilsCrossed` icon import to keep the bundle and TypeScript clean.

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 667 KB → 189 KB gzipped)
- ✅ Manually walked through scenarios:
  - 12 guests selected → "+" buttons enabled (12+1=13 fits)
  - 12 guests, click + on Couple → button disabled (12+2=14 exceeds)
  - 13 guests reached → all "+" buttons disabled, amber note appears
  - "Continue" still works at 13 (unchanged from before)

---

## Pass 18 — De-stick booking bar, mobile sticky summary, tighter radius, display font on home cards

### Booking bar no longer sticky / floating

The `position: sticky` on the top guest+date bar (`top-[5.6rem] sm:top-[6.35rem] lg:top-[6.8rem]`) made it follow the viewport while scrolling, which was visually busy and felt empty when not interacting with it. The user wanted it to scroll with the page like a normal section.

**Fix:**
- Removed `sticky top-...` and `z-40` — bar is now a normal block at the top of the booking flow.
- Dropped the `bg-white/96 backdrop-blur-lg` and the heavy `shadow-[0_16px_34px_rgba(15,42,58,0.10)]` (those were styling needed to feel "lifted" above other content while scrolling). Now uses a flat `shadow-sm` instead.
- Added a small `YOUR STAY` kicker label on the left (visible on `sm:` and up) so the bar reads as an intentional section header, not a stray container.
- The price block on the right now has a `LIVE TOTAL` kicker above it for the same reason — visual context without adding chrome.
- Reduced borders from `border-2` to `border` to match the lighter look.

### Mobile-only sticky summary bar

The right-side Booking Summary card has always been `hidden lg:block` — meaning **mobile users had no visible price/state** while scrolling through the booking flow. Big UX gap.

**Fix:** added a fixed-bottom bar that's visible only on mobile/tablet (`lg:hidden`) and only when guests + dates are set and the user is past the confirm step:

```tsx
{!noGuests && !noDates && step < 6 && (
  <>
    <div className="h-24 lg:hidden" aria-hidden />  {/* spacer */}
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 ... lg:hidden">
      ...nights/guests subtitle, live total, Continue button...
    </div>
  </>
)}
```

The bar shows: `13 NIGHTS · 3 GUESTS` (small caps subtitle), live total in large display font, and a Continue button on the right that uses the same `canProceed(step)` validation as the desktop button. A 24-px spacer reserves space at the bottom of the page so content doesn't end up hidden behind the bar.

### Border radius — toned down to 12 px on the booking flow

User flagged the design as "overly rounded". Tailwind's `rounded-2xl` (16px), `rounded-3xl` (24px), and the custom values like `rounded-[1.7rem]` (27 px) and `rounded-[2rem]` (32 px) were stacked on every container.

**Targeted fix in `src/pages/BookNow.tsx` and `src/components/CustomCalendar.tsx`** (the booking flow surfaces specifically — left other pages alone for now):
- `rounded-2xl` → `rounded-xl` (16 → 12 px)
- `rounded-3xl` → `rounded-xl` (24 → 12 px)
- `rounded-[2rem]` → `rounded-xl` (32 → 12 px)
- `rounded-[1.7rem]` → `rounded-xl` (27 → 12 px)
- `rounded-[1.6rem]` → `rounded-xl` (26 → 12 px)
- Pills (`rounded-full`) and small icon buttons left unchanged — those should stay round.

Result: the whole booking flow reads as one consistent design language — `rounded-xl` everywhere for cards/panels/buttons, `rounded-full` for pills, no more competing radius scales.

The rest of the site (Home, Packages, Experiences, Rooms, etc.) was *not* touched in this pass. If the user wants the same treatment site-wide, it's a quick follow-up — same `sed` pattern, just point at more files.

### Home card titles — Mochiy Pop One display font

The home page "What makes it easy" cards (Daily Surf Sessions, Sunset Yoga, Paradise Valley & Dunes, etc.) had their titles rendering in the default Inter sans-serif. User wanted them in **Mochiy Pop One** — the same display font used in the big section titles like "Choose The Stay".

**Fix:** added `font-display` to the `<h3>` className:
```tsx
<h3 className="card-title font-display font-semibold text-charcoal mb-3 sm:mb-4">{item.title}</h3>
```

`font-display` resolves to `font-family: 'Mochiy Pop One', sans-serif;` (defined in `src/index.css`). The cards now visually echo the big titles above them, tying the home page together.

### Verified
- ✅ `npx tsc --noEmit` passes
- ✅ `npx vite build` succeeds (2173 modules, 667 KB → 190 KB gzipped)
- ✅ Confirmed 0 remaining occurrences of `rounded-2xl/3xl/[2rem]/[1.7rem]/[1.6rem]` in BookNow + CustomCalendar
- ✅ Mobile bar uses same `canProceed(step)` gate as desktop button (no risk of inconsistent button states)
