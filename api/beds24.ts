/**
 * ════════════════════════════════════════════════════════════════════
 *  Beds24 API — Serverless Proxy (V2 API with OAuth)
 * ════════════════════════════════════════════════════════════════════
 *
 *  This proxy lives at /api/beds24 (auto-deployed by Vercel/Netlify).
 *  It forwards browser requests to Beds24's V2 API.
 *
 *  Why a proxy is needed:
 *  ----------------------
 *  Beds24 does not allow CORS, so the browser can't call api.beds24.com
 *  directly. This proxy adds CORS headers and forwards the request.
 *
 *  V2 API Authentication:
 *  ---------------------
 *  Uses OAuth2 with refresh tokens. Set these environment variables:
 *    BEDS24_REFRESH_TOKEN - Your V2 refresh token
 *    BEDS24_PROPERTY_ID - Your property ID (e.g., 309994)
 *
 *  Frontend calls:
 *  ---------------
 *    GET /api/beds24?action=availability&checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD
 *    GET /api/beds24?action=property
 *
 * ════════════════════════════════════════════════════════════════════
 */

const BEDS24_V2 = "https://api.beds24.com/api/v2";

const REFRESH_TOKEN =
  process.env.BEDS24_REFRESH_TOKEN ||
  "yVEI6oUzOlrQWQyUjbGFqwXQM/Vz3JzC0eiUyfdvG4n3jRkWT2qh2CcKSGeepYB/Bh38+jEX1nUIS3TOEyh8h+nYRO0j0o/xfqLvTsuueBh2yeL4FYbn/ZK0m2aicRQ0767wyUuvaWyjkZUxcVBPmxq6+RlSZ4IVt7cIQsknLx4=";

const PROPERTY_ID = process.env.BEDS24_PROPERTY_ID || "309994";

// Token cache (in-memory, resets on cold start)
let accessTokenCache: { token: string; expiresAt: number } | null = null;

/** Format a date N days from today as YYYY-MM-DD */
function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Get a valid access token (from cache or by refreshing)
 */
async function getAccessToken(): Promise<string> {
  // Check if cached token is still valid (with 5-minute buffer)
  if (accessTokenCache && accessTokenCache.expiresAt > Date.now() + 300000) {
    return accessTokenCache.token;
  }

  // Exchange refresh token for new access token
  const res = await fetch(`${BEDS24_V2}/authentication/token`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: REFRESH_TOKEN,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get access token: ${res.status} ${text}`);
  }

  const data = await res.json();
  
  // Cache the token
  accessTokenCache = {
    token: data.token,
    expiresAt: Date.now() + (data.expiresIn || 3600) * 1000,
  };

  return data.token;
}

/**
 * Beds24 V2 API caller.
 * V2 uses Bearer token authentication.
 */
async function callBeds24V2(
  endpoint: string,
  options: RequestInit = {}
): Promise<unknown> {
  const token = await getAccessToken();

  const res = await fetch(`${BEDS24_V2}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      accept: "application/json",
      "content-type": "application/json",
      token: token, // V2 uses 'token' header
    },
  });

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }

  if (!res.ok) {
    throw new Error(
      `Beds24 ${res.status}: ${
        typeof json === "object" ? JSON.stringify(json) : text
      }`
    );
  }
  return json;
}

/* ════════════════════════════════════════════════════════════════════
 *  Vercel / Netlify handler
 * ════════════════════════════════════════════════════════════════════ */

interface RequestLike {
  method?: string;
  url?: string;
  query?: Record<string, string | string[]>;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
}

interface ResponseLike {
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
  setHeader: (key: string, value: string) => void;
  end?: () => void;
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  // CORS — open for dev; lock down to your domain in production
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.status(204).json({});
    return;
  }

  try {
    const url = new URL(req.url || "/", "http://localhost");
    const params = Object.fromEntries(url.searchParams.entries());
    const action = params.action || (req.query?.action as string);

    switch (action) {
      /* ────────── PROPERTY INFO (rooms list, prices) ────────── */
      case "property": {
        const data = await callBeds24V2(
          `/properties/${PROPERTY_ID}`,
          { method: "GET" }
        );
        res.status(200).json(data);
        return;
      }

      /* ────────── AVAILABILITY (per room per night) ────────── */
      case "availability":
      case "getAvailabilities": {
        const checkIn = params.checkIn || params.startDate;
        const checkOut = params.checkOut || params.endDate;
        if (!checkIn || !checkOut) {
          res.status(400).json({ error: "checkIn & checkOut required" });
          return;
        }
        
        // V2 uses different endpoint structure
        const data = await callBeds24V2(
          `/inventory?propertyId=${PROPERTY_ID}&from=${checkIn}&to=${checkOut}`,
          { method: "GET" }
        );
        res.status(200).json(data);
        return;
      }

      /* ────────── RATES + AVAILABILITY combined ────────── */
      case "rates":
      case "getRatesAvailabilities": {
        const checkIn = params.checkIn || params.startDate;
        const checkOut = params.checkOut || params.endDate;
        const numAdults = params.numAdults || params.numAdult || "1";
        if (!checkIn || !checkOut) {
          res.status(400).json({ error: "checkIn & checkOut required" });
          return;
        }
        
        // V2 API: Get inventory (availability + rates)
        const data = await callBeds24V2(
          `/inventory?propertyId=${PROPERTY_ID}&from=${checkIn}&to=${checkOut}&numAdult=${numAdults}`,
          { method: "GET" }
        );
        res.status(200).json(data);
        return;
      }

      /* ────────── CREATE BOOKING (real Beds24 booking) ────────── */
      case "createBooking": {
        if (req.method !== "POST") {
          res.status(405).json({ error: "POST required for createBooking" });
          return;
        }
        // Parse body
        let body: any = req.body;
        if (typeof body === "string") {
          try { body = JSON.parse(body); } catch { body = {}; }
        }
        if (!body || typeof body !== "object") {
          res.status(400).json({ error: "Invalid body" });
          return;
        }
        const {
          rooms: roomAssignments, // [{ roomId, numAdult, numChild?, firstNight, lastNight }]
          guestFirstName,
          guestName,
          guestEmail,
          guestPhone,
          notes,
          status = "request", // V2 uses string: "request", "confirmed", etc.
        } = body;

        if (!Array.isArray(roomAssignments) || roomAssignments.length === 0) {
          res.status(400).json({ error: "rooms[] required" });
          return;
        }
        if (!guestEmail || !guestName) {
          res.status(400).json({ error: "guestName & guestEmail required" });
          return;
        }

        // V2 API booking format
        const bookingPayload = {
          propertyId: Number(PROPERTY_ID),
          arrival: String(roomAssignments[0].firstNight).slice(0, 10),
          departure: String(roomAssignments[0].lastNight).slice(0, 10),
          status: status,
          guestFirstName: guestFirstName || "",
          guestName: guestName,
          guestEmail: guestEmail,
          guestPhone: guestPhone || "",
          notes: notes || "",
          referer: "tamount-website",
          rooms: roomAssignments.map((r: any) => ({
            roomId: Number(r.roomId),
            numAdult: Number(r.numAdult || 1),
            numChild: Number(r.numChild || 0),
          })),
        };

        console.log("[Beds24] Creating V2 booking:", JSON.stringify(bookingPayload, null, 2));
        
        const data = await callBeds24V2("/bookings", {
          method: "POST",
          body: JSON.stringify(bookingPayload),
        });

        console.log("[Beds24] V2 booking response:", JSON.stringify(data, null, 2));

        res.status(200).json({
          success: true,
          booking: data,
        });
        return;
      }

      /* ────────── HEALTH CHECK ────────── */
      case "ping": {
        res.status(200).json({
          ok: true,
          propertyId: PROPERTY_ID,
          hasToken: !!REFRESH_TOKEN,
          apiVersion: "v2",
          time: new Date().toISOString(),
        });
        return;
      }

      /* ────────── DEBUG: raw response from all endpoints ────────── */
      case "debug": {
        const checkIn = params.checkIn || params.startDate || todayPlus(7);
        const checkOut = params.checkOut || params.endDate || todayPlus(10);
        const numAdults = Number(params.numAdults || params.numAdult || "1");
        // Run all endpoints in parallel and return raw responses
        const [property, inventory] = await Promise.all([
          callBeds24V2(`/properties/${PROPERTY_ID}`, {
            method: "GET",
          }).catch((e) => ({ ERROR: String(e) })),
          callBeds24V2(
            `/inventory?propertyId=${PROPERTY_ID}&from=${checkIn}&to=${checkOut}&numAdult=${numAdults}`,
            { method: "GET" }
          ).catch((e) => ({ ERROR: String(e) })),
        ]);
        res.status(200).json({
          query: { checkIn, checkOut, numAdults },
          property,
          inventory,
          tip: "V2 API: inventory endpoint combines availability and rates",
        });
        return;
      }

      default:
        res.status(400).json({
          error:
            "Unknown action. Use: property | availability | rates | createBooking | ping | debug",
          example:
            "/api/beds24?action=debug&checkIn=2026-05-08&checkOut=2026-05-15",
        });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Beds24 proxy error:", message);
    res.status(500).json({ error: message });
  }
}
