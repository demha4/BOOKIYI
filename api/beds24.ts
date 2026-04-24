/**
 * ════════════════════════════════════════════════════════════════════
 *  Beds24 API — Serverless Proxy (V2 API with OAuth)
 * ════════════════════════════════════════════════════════════════════
 */

const BEDS24_V2 = "https://beds24.com/api/v2";

const REFRESH_TOKEN =
  process.env.BEDS24_REFRESH_TOKEN ||
  "yVEI6oUzOlrQWQyUjbGFqwXQM/Vz3JzC0eiUyfdvG4n3jRkWT2qh2CcKSGeepYB/Bh38+jEX1nUIS3TOEyh8h+nYRO0j0o/xfqLvTsuueBh2yeL4FYbn/ZK0m2aicRQ0767wyUuvaWyjkZUxcVBPmxq6+RlSZ4IVt7cIQsknLx4=";

const PROPERTY_ID = process.env.BEDS24_PROPERTY_ID || "309994";

let accessTokenCache: { token: string; expiresAt: number } | null = null;

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

async function getAccessToken(): Promise<string> {
  if (accessTokenCache && accessTokenCache.expiresAt > Date.now() + 300000) {
    return accessTokenCache.token;
  }
  const res = await fetch(`${BEDS24_V2}/authentication/token`, {
    method: "GET",
    headers: {
      accept: "application/json",
      refreshToken: REFRESH_TOKEN,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get access token: ${res.status} ${text}`);
  }
  const data = await res.json();
  accessTokenCache = {
    token: data.token,
    expiresAt: Date.now() + (data.expiresIn || 3600) * 1000,
  };
  return data.token;
}

async function callBeds24V2(
  endpoint: string,
  options: RequestInit = {}
): Promise<unknown> {
  const token = await getAccessToken();
  const res = await fetch(`${BEDS24_V2}${endpoint}`, {
    ...options,
    headers: {
      ...((options.headers as Record<string, string>) || {}),
      accept: "application/json",
      "content-type": "application/json",
      token: token,
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
      `Beds24 ${res.status}: ${typeof json === "object" ? JSON.stringify(json) : text}`
    );
  }
  return json;
}

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
      case "property": {
        const data = await callBeds24V2(`/properties/${PROPERTY_ID}`, { method: "GET" });
        res.status(200).json(data);
        return;
      }

      case "availability":
      case "getAvailabilities":
      case "rates":
      case "getRatesAvailabilities": {
        const checkIn = (params.checkIn || params.startDate || "").split("T")[0].slice(0, 10);
        const checkOut = (params.checkOut || params.endDate || "").split("T")[0].slice(0, 10);

        if (!checkIn || !checkOut) {
          res.status(400).json({ error: "checkIn & checkOut required" });
          return;
        }

        // Guard: never send past dates to Beds24
        const today = new Date().toISOString().slice(0, 10);
        const safeArrival = checkIn < today ? today : checkIn;
        const safeDeparture = checkOut <= safeArrival
          ? new Date(new Date(safeArrival).getTime() + 86400000).toISOString().slice(0, 10)
          : checkOut;

        // HOSTEL LOGIC: Always check with numAdults=1
        // We check if each room has at least 1 bed available.
        // Guest distribution across rooms is handled by the frontend — 
        // Beds24 should NOT filter rooms by total group size.
        const offerParams = new URLSearchParams();
        offerParams.append("roomId", "645890");
        offerParams.append("roomId", "645891");
        offerParams.append("roomId", "645892");
        offerParams.append("arrival", safeArrival);
        offerParams.append("departure", safeDeparture);
        offerParams.append("numAdults", "1"); // Always 1 — per-room availability, not per-group

        console.log("[Beds24] Availability check (hostel mode, numAdults=1):", { safeArrival, safeDeparture });

        const data = await callBeds24V2(`/inventory/rooms/offers?${offerParams.toString()}`, { method: "GET" });
        res.status(200).json(data);
        return;
      }

      case "createBooking": {
        if (req.method !== "POST") {
          res.status(405).json({ error: "POST required for createBooking" });
          return;
        }
        let body: any = req.body;
        if (typeof body === "string") {
          try { body = JSON.parse(body); } catch { body = {}; }
        }
        if (!body || typeof body !== "object") {
          res.status(400).json({ error: "Invalid body" });
          return;
        }
        const { rooms: roomAssignments, guestFirstName, guestName, guestEmail, guestPhone, notes, status = "request", price } = body;
        if (!Array.isArray(roomAssignments) || roomAssignments.length === 0) {
          res.status(400).json({ error: "rooms[] required" });
          return;
        }
        if (!guestEmail || !guestName) {
          res.status(400).json({ error: "guestName & guestEmail required" });
          return;
        }

        const today = new Date().toISOString().slice(0, 10);
        const rawArrival = String(roomAssignments[0].firstNight).slice(0, 10);
        const rawDeparture = String(roomAssignments[0].lastNight).slice(0, 10);
        const arrival = rawArrival < today ? today : rawArrival;
        const departure = rawDeparture <= arrival
          ? new Date(new Date(arrival).getTime() + 86400000).toISOString().slice(0, 10)
          : rawDeparture;

        // V2 POST /bookings expects an ARRAY with correct V2 field names
        const bookingPayload = [{
          propertyId: Number(PROPERTY_ID),
          roomId: Number(roomAssignments[0].roomId),
          arrival,
          departure,
          status,
          numAdult: roomAssignments.reduce((sum: number, r: any) => sum + Number(r.numAdult || 1), 0),
          numChild: roomAssignments.reduce((sum: number, r: any) => sum + Number(r.numChild || 0), 0),
          firstName: guestFirstName || "",
          lastName: guestName,
          email: guestEmail,
          phone: guestPhone || "",
          notes: notes || "",
          referer: "tamount-website",
          ...(typeof price === "number" && Number.isFinite(price) ? { price } : {}),
        }];

        console.log("[Beds24] Creating booking:", JSON.stringify(bookingPayload));

        const data: any = await callBeds24V2("/bookings", {
          method: "POST",
          body: JSON.stringify(bookingPayload),
        });

        console.log("[Beds24] Booking response:", JSON.stringify(data));

        // V2 returns array of created bookings
        const bookingArr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [data];
        const bookingId = bookingArr[0]?.id || bookingArr[0]?.bookId || null;

        if (bookingId) {
          res.status(200).json({ success: true, booking: { id: bookingId }, raw: data });
        } else {
          res.status(200).json({ success: true, booking: { id: null }, raw: data });
        }
        return;
      }

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

      case "debug": {
        const checkIn = (params.checkIn || todayPlus(7)).split("T")[0].slice(0, 10);
        const checkOut = (params.checkOut || todayPlus(10)).split("T")[0].slice(0, 10);
        const numAdults = params.numAdults || "1";
        const offerParams = new URLSearchParams();
        offerParams.append("roomId", "645890");
        offerParams.append("roomId", "645891");
        offerParams.append("roomId", "645892");
        offerParams.append("arrival", checkIn);
        offerParams.append("departure", checkOut);
        offerParams.append("numAdults", numAdults);
        const [property, offers] = await Promise.all([
          callBeds24V2(`/properties/${PROPERTY_ID}`, { method: "GET" }).catch((e) => ({ ERROR: String(e) })),
          callBeds24V2(`/inventory/rooms/offers?${offerParams.toString()}`, { method: "GET" }).catch((e) => ({ ERROR: String(e) })),
        ]);
        res.status(200).json({ query: { checkIn, checkOut, numAdults }, property, offers });
        return;
      }

      default:
        res.status(400).json({ error: "Unknown action. Use: property | availability | rates | createBooking | ping | debug" });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Beds24 proxy error:", message);
    res.status(500).json({ error: message });
  }
}
