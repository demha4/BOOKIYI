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
