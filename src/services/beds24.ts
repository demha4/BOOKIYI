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
  price?: number;
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
    // V2 API: single call returns both availability and pricing
    const offersResponse = await callBeds24<{
      success: boolean;
      data: Array<{
        roomId: number;
        propertyId: number;
        offers: Array<{
          offerId: number;
          offerName: string;
          price: number;
          unitsAvailable: number;
        }>;
      }>;
    }>("getRatesAvailabilities", { checkIn, checkOut, numAdults }).catch((err) => {
      console.error("[Beds24] Offers fetch failed:", err);
      return { success: false, data: [] };
    });

    const result: Record<string, RoomLiveData> = {};

    if (offersResponse?.data && Array.isArray(offersResponse.data)) {
      for (const room of offersResponse.data) {
        const roomId = String(room.roomId);
        const bestOffer = room.offers?.[0]; // take first/best offer

        if (!bestOffer) continue;

        const totalPrice = Number(bestOffer.price) || 0;
        const unitsAvailable = Number(bestOffer.unitsAvailable) || 0;

        result[roomId] = {
          available: unitsAvailable,
          totalPrice: totalPrice,
          avgNightly: numNights > 0 ? totalPrice / numNights : totalPrice,
          minStay: 1,
        };
      }
    }

    if (import.meta.env.DEV) {
      console.log("[Beds24] Live data parsed:", result);
      console.log("[Beds24] Raw V2 offers response:", offersResponse);
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
    const offersResponse = await callBeds24<{
      success: boolean;
      data: Array<{
        roomId: number;
        offers: Array<{ unitsAvailable: number }>;
      }>;
    }>("getAvailabilities", { checkIn, checkOut });

    const result: Record<string, number> = {};
    if (offersResponse?.data && Array.isArray(offersResponse.data)) {
      for (const room of offersResponse.data) {
        result[String(room.roomId)] = room.offers?.[0]?.unitsAvailable ?? 0;
      }
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
  price?: number;
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
  try {
    const payload = {
      rooms: input.rooms.map((room) => ({
        roomId: room.roomId,
        numAdult: room.numAdult,
        numChild: room.numChild || 0,
        firstNight: input.checkIn,
        lastNight: input.checkOut,
      })),
      guestFirstName: input.guestFirstName || "",
      guestName: input.guestName,
      guestEmail: input.guestEmail,
      guestPhone: input.guestPhone || "",
      notes: input.notes || "",
      status: input.status === 1 ? "confirmed" : "request",
      price: typeof input.price === "number" ? input.price : undefined,
    };

    const res = await fetch(`${API_BASE}?action=createBooking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data?.success) {
      const ids = Array.isArray(data.booking?.ids)
        ? data.booking.ids.map(String)
        : data.booking?.id
          ? [String(data.booking.id)]
          : [];

      return {
        success: true,
        bookingIds: ids,
        raw: data,
      };
    }

    return {
      success: false,
      errors: [data?.error || "Booking creation failed"],
      raw: data,
    };
  } catch (err) {
    return {
      success: false,
      errors: [err instanceof Error ? err.message : "Network error"],
    };
  }
}
