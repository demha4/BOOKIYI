/**
 * ════════════════════════════════════════════════════════════════════
 *  Beds24 API V1 — Direct Browser Calls (No Proxy)
 * ════════════════════════════════════════════════════════════════════
 *
 *  This module calls Beds24 API directly from the browser.
 *  No server/proxy needed — works on localhost, Arena, any host.
 *
 *  ⚠️  SECURITY NOTE: Your propKey is visible in browser Network tab.
 *      This is FINE FOR TESTING. Before production, move to Vercel
 *      serverless functions to hide credentials.
 *
 *  Beds24 API V1 Docs: https://beds24.com/api/v1/
 * ════════════════════════════════════════════════════════════════════
 */

/* ─────────────────────────  CONFIG — YOUR CREDENTIALS  ───────────────────────── */

const PROP_KEY = "309994_c899dbfecb010174618f9d942595a9b9f09fa5a250a1b0fa";
const PROPERTY_ID = "309994";
// Use proxy API instead of direct Beds24 calls (avoids CORS issues)
const API_BASE = import.meta.env.PROD ? "/api/beds24" : "/api/beds24";

/* ─────────────────────────  TYPES  ───────────────────────── */

export interface RoomLiveData {
  available: number;
  totalPrice: number;
  avgNightly: number;
  minStay: number;
}

export interface Beds24BookingPayload {
  roomId: number | string;
  arrival: string;
  departure: string;
  numAdult: number;
  numChild?: number;
  guestFirstName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestComments?: string;
  referer?: string;
  status?: 1 | 2 | 3;
}

/* ─────────────────────────  HELPERS  ───────────────────────── */

function eachDate(start: string, end: string): string[] {
  const out: string[] = [];
  const s = new Date(start);
  const e = new Date(end);
  for (let d = new Date(s); d < e; d.setDate(d.getDate() + 1)) {
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

async function callBeds24<T>(
  action: string,
  params: Record<string, string | number> = {},
  init?: RequestInit
): Promise<T> {
  // When using proxy, just pass action and params
  const queryParams = new URLSearchParams({
    action,
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ),
  });

  const url = `${API_BASE}?${queryParams.toString()}`;

  if (import.meta.env.DEV) {
    console.log(`[Beds24] Calling proxy API: ${url}`);
  }

  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`[Beds24] API error ${res.status}:`, err);
    throw new Error(`Beds24 API ${res.status}: ${err}`);
  }

  return (await res.json()) as T;
}

/* ═════════════════════════  PUBLIC API  ═════════════════════════ */

/**
 * Fetch live availability + prices for ALL rooms.
 * Returns: { roomId: { available, totalPrice, avgNightly, minStay } }
 */
export async function getLiveRoomData(
  checkIn: string,
  checkOut: string,
  numAdults: number = 1
): Promise<Record<string, RoomLiveData>> {
  if (!checkIn || !checkOut) return {};

  const nights = eachDate(checkIn, checkOut);
  const numNights = nights.length || 1;

  try {
    const [availData, ratesData] = await Promise.all([
      callBeds24<Record<string, Record<string, number | string>>>(
        "getAvailabilities",
        { checkIn, checkOut }
      ).catch((err) => {
        console.error("[Beds24] Availability fetch failed:", err);
        return {};
      }),
      callBeds24<Record<string, { price?: number; price1?: number; numAvail?: number; minStay?: number }>>(
        "getRatesAvailabilities",
        { checkIn, checkOut, numAdults }
      ).catch((err) => {
        console.error("[Beds24] Rates fetch failed:", err);
        return {};
      }),
    ]);

    const result: Record<string, RoomLiveData> = {};
    const allRoomIds = new Set<string>([
      ...Object.keys(availData),
      ...Object.keys(ratesData),
    ]);

    for (const roomId of allRoomIds) {
      if (!/^\d+$/.test(roomId)) continue;

      // Availability: minimum across all nights
      const dailyAvail = (availData as any)[roomId] || {};
      const dateValues: number[] = [];
      for (const date of nights) {
        const raw = dailyAvail[date];
        const num =
          typeof raw === "number"
            ? raw
            : typeof raw === "string" && raw !== ""
            ? Number(raw)
            : NaN;
        if (Number.isFinite(num)) dateValues.push(num);
      }
      const minAvail = dateValues.length === 0 ? -1 : Math.min(...dateValues);

      // Pricing
      const rateInfo = (ratesData as any)[roomId] || {};
      let totalPrice = 0;
      const ratePrice = Number(rateInfo.price);
      const ratePrice1 = Number(rateInfo.price1);
      if (Number.isFinite(ratePrice) && ratePrice > 0) {
        totalPrice = ratePrice;
      } else if (Number.isFinite(ratePrice1) && ratePrice1 > 0) {
        totalPrice = ratePrice1 * numNights;
      }

      result[roomId] = {
        available: minAvail,
        totalPrice,
        avgNightly: numNights ? totalPrice / numNights : 0,
        minStay: Number(rateInfo.minStay) || 1,
      };
    }

    if (import.meta.env.DEV) {
      console.log("[Beds24] Live data parsed:", result);
      console.log("[Beds24] Raw availability:", availData);
      console.log("[Beds24] Raw rates:", ratesData);
    }

    return result;
  } catch (err) {
    console.error("[Beds24] getLiveRoomData failed:", err);
    return {};
  }
}

/**
 * Quick availability check (no prices).
 */
export async function checkAvailability(
  checkIn: string,
  checkOut: string
): Promise<Record<string, number>> {
  if (!checkIn || !checkOut) return {};

  try {
    const data = await callBeds24<Record<string, Record<string, number | string>>>(
      "getAvailabilities",
      { checkIn, checkOut }
    );

    const nights = eachDate(checkIn, checkOut);
    const result: Record<string, number> = {};

    for (const [roomId, daily] of Object.entries(data)) {
      if (!/^\d+$/.test(roomId)) continue;
      let minAvail = Infinity;
      for (const date of nights) {
        const v = daily[date];
        const num = typeof v === "number" ? v : typeof v === "string" ? Number(v) : 0;
        minAvail = Math.min(minAvail, num);
      }
      result[roomId] = Number.isFinite(minAvail) ? minAvail : 0;
    }

    return result;
  } catch (err) {
    console.error("[Beds24] checkAvailability failed:", err);
    return {};
  }
}

/**
 * Create a booking via Beds24 API (setBooking).
 */
export async function createBooking(
  payload: Beds24BookingPayload
): Promise<{ success: boolean; bookingId?: string; error?: string }> {
  try {
    const params = new URLSearchParams({
      propKey: PROP_KEY,
      propertyId: PROPERTY_ID,
    });

    const bookingParams = new URLSearchParams({
      roomId: String(payload.roomId),
      firstNight: payload.arrival,
      lastNight: payload.departure,
      numAdult: String(payload.numAdult),
      numChild: String(payload.numChild || 0),
      guestFirstName: payload.guestFirstName,
      guestName: payload.guestName,
      guestEmail: payload.guestEmail,
      guestPhone: payload.guestPhone,
      guestComments: payload.guestComments || "",
      referer: payload.referer || "tamount-website",
      status: String(payload.status ?? 1),
    });

    const url = `${API_BASE}/setBooking?${params.toString()}&${bookingParams.toString()}`;

    if (import.meta.env.DEV) {
      console.log(`[Beds24] Creating booking: ${url}`);
    }

    const res = await fetch(url, { method: "POST" });
    const data = await res.json();

    if (data?.[0]?.success) {
      return { success: true, bookingId: data[0].new?.id };
    }

    return {
      success: false,
      error: data?.[0]?.errors?.[0]?.message || "Booking creation failed",
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}

/* ═════════════════════════  URL BUILDERS  ═════════════════════════ */

export function buildBeds24Url(
  checkIn: string,
  nights: number,
  numAdult: number,
  roomId?: string | number
): string {
  const params = new URLSearchParams({
    propid: PROPERTY_ID,
    lang: "en",
    referer: "tamount-surfhouse",
  });
  if (checkIn) params.set("checkin", checkIn);
  if (nights > 0) params.set("numnight", String(nights));
  if (numAdult > 0) params.set("numadult", String(numAdult));
  if (roomId) params.set("roomid", String(roomId));
  return `https://beds24.com/booking2.php?${params.toString()}`;
}

export function buildWhatsAppUrl(message: string): string {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "212612345678";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* ═════════════════════════  HIGH-LEVEL BOOKING SUBMISSION  ═════════════════════════ */

export interface RoomBookingInput {
  roomId: number | string;
  numAdult: number;
  numChild?: number;
}

export interface SubmitBookingInput {
  rooms: RoomBookingInput[];
  checkIn: string;
  checkOut: string;
  guestFirstName?: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  notes?: string;
  status?: 0 | 1;
}

export interface SubmitBookingResult {
  success: boolean;
  bookingIds?: string[];
  errors?: string[];
  fallback?: "whatsapp";
  raw?: unknown;
}

export async function submitBookingToBeds24(
  input: SubmitBookingInput
): Promise<SubmitBookingResult> {
  const lastNight = new Date(input.checkOut);
  lastNight.setDate(lastNight.getDate() - 1);
  const lastNightStr = lastNight.toISOString().slice(0, 10);

  try {
    const bookingPromises = input.rooms.map((room) => {
      const params = new URLSearchParams({
        propKey: PROP_KEY,
        propertyId: PROPERTY_ID,
        roomId: String(room.roomId),
        firstNight: input.checkIn,
        lastNight: lastNightStr,
        numAdult: String(room.numAdult),
        numChild: String(room.numChild || 0),
        guestFirstName: input.guestFirstName || "",
        guestName: input.guestName,
        guestEmail: input.guestEmail,
        guestPhone: input.guestPhone || "",
        guestComments: input.notes || "",
        referer: "tamount-website",
        status: String(input.status ?? 0),
      });

      const url = `${API_BASE}/setBooking?${params.toString()}`;
      return fetch(url, { method: "POST" }).then((res) => res.json());
    });

    const results = await Promise.all(bookingPromises);
    const bookingIds: string[] = [];
    const errors: string[] = [];

    results.forEach((result, index) => {
      if (result?.[0]?.success) {
        bookingIds.push(result[0].new?.id || `unknown-${index}`);
      } else {
        errors.push(result?.[0]?.errors?.[0]?.message || `Room ${index + 1} failed`);
      }
    });

    return {
      success: bookingIds.length > 0,
      bookingIds: bookingIds.length > 0 ? bookingIds : undefined,
      errors: errors.length > 0 ? errors : undefined,
      raw: results,
    };
  } catch (err) {
    return {
      success: false,
      errors: [err instanceof Error ? err.message : "Network error"],
      fallback: "whatsapp",
    };
  }
}
