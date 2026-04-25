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
