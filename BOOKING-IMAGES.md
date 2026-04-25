# Real Photos from Booking.com — Drop-in Guide

This guide tells you exactly which Booking.com photo to save under which filename, so the site picks them up automatically with no code changes needed.

## How to do it

1. Open **https://www.booking.com/hotel/ma/tamount-surf-house.html** in your browser.
2. Click the photo grid to open the gallery (it shows ~20–30 photos).
3. For each photo you want to use: right-click → **Save image as...** → save to `/public/images/` with the **exact filename** from the table below.
4. Save each image at roughly **1408 × 768 px** (or larger — the site will scale them down). JPEGs around 200–300 KB each is the sweet spot.
5. Commit and deploy. No code changes needed.

> **Tip:** If a Booking photo is portrait-oriented, the site will still display it (it uses `object-fit: cover`), but landscape photos look best in the hero, gallery, and card layouts.

---

## File-by-file mapping

The site uses **9 image slots**. Pick the strongest Booking photo for each role:

| Filename | Used for | What to look for in Booking's gallery |
|---|---|---|
| `hero-surf.jpg` | **Homepage hero** (full-screen background) + Progression Week pack | The most evocative shot you have — ideally Anza beach with surfers, or the house exterior at golden hour. This is the first thing visitors see, so pick the strongest landscape image. |
| `surf-camp.jpg` | Beginner Week pack card + community gallery tile | A group / community / rooftop hangout shot. Booking usually has at least one photo of guests on the terrace or breakfast scene. |
| `yoga-sunset.jpg` | Rooftop gallery tile + Sunset Yoga experience modal | The **rooftop terrace**. Booking has several rooftop shots — pick the one with the best sky / sunset / ocean glimpse. |
| `hostel-living.jpg` | The Rooftop Triple room card + common-area gallery tile + Hammam experience modal + Airport Transfer modal | The **shared common area / lounge / kitchen**. Couches, dining table, the social space. |
| `private-room.jpg` | The Double Room card + gallery tile + Laundry Service modal | The **double room** — bed, window, the quiet corner shot. |
| `dorm-room.jpg` | The Anza Dorm card + dorm gallery tile | The **dormitory** — bunk beds with privacy curtains, lockers visible if possible. |
| `moroccan-sunset.jpg` | Paradise Valley experience modal + Sand Dunes card + scenery gallery tile | A scenic / outdoors shot — Anza coastline, sunset, or anything with mountains. (If Booking only has interior shots, you can use a screenshot of the rooftop view.) |
| `surf-lesson.jpg` | Surf Start pack card + Surf Lesson experience modal + gallery tile | A surf-related shot. If Booking doesn't have a surf-specific photo, use the strongest exterior / building / street shot of the house. |
| `og-tamount.jpg` | **Social-share preview** (Open Graph meta) | A 1200 × 630 px landscape image that summarizes the place — usually the same as `hero-surf.jpg` cropped to that aspect ratio. Used when someone shares the site on WhatsApp / Facebook / Slack. **Important: keep this filename and dimensions exactly.** |

---

## If Booking doesn't have a photo for a slot

You can repeat. The site doesn't break if two slots use the same image — for example, you might use the same rooftop shot for both `yoga-sunset.jpg` and `surf-camp.jpg`. Just make sure all 9 filenames exist in `/public/images/` so nothing 404s.

Common fallbacks:
- **No surf shots in Booking gallery?** → Use the building exterior for `surf-lesson.jpg` and a beach screenshot from Google Maps Street View for `hero-surf.jpg`.
- **No outdoor / scenery shots?** → Use the rooftop image for `moroccan-sunset.jpg`.

---

## After you drop in the files

1. Test locally: `npm run dev` → check `/`, `/rooms`, `/experiences`, `/gallery`.
2. Hard-refresh the browser (Ctrl+Shift+R) — old images cache aggressively.
3. Deploy. Vercel will pick up the new `/public/images/` files automatically.

---

## Optional: source photos directly from the property

Since this is your own property, the cleanest path is to ask Abdelwahd for the **original high-resolution photos** (not the Booking-compressed versions). Booking's gallery thumbnails are 800–1000 px wide, while we want at least 1408 px for the hero. If he can send the originals via WhatsApp or Drive, the site will look noticeably sharper than what Booking serves up.

If you can get those originals, the same filename mapping above still applies — just save them at `/public/images/<filename>.jpg` and you're done.
