import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   TYPE DEFINITIONS
   ═══════════════════════════════════════════════════════════════ */

export type GuestType = "male" | "female" | "couple";

export interface GuestProfile {
  id: string;
  label: string;       // "Guest 1", "Guest 2" etc. (auto-generated)
  type: GuestType;
  roomId: string | null;
}

export interface AddonSelection {
  quantity: number;
  perGuest?: Record<string, number>;
}

export interface BookingState {
  /* Guest counts by type */
  maleCount: number;
  femaleCount: number;
  coupleCount: number;
  /* Generated guest list */
  guests: GuestProfile[];
  /* Dates */
  checkIn: string;
  checkOut: string;
  /* Package (null = "Room Only") */
  packageId: string | null;
  /* Add-ons */
  addOns: Record<string, AddonSelection>;
  addonMode: "group" | "person";
  /* Contact details */
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequests: string;
  promoCode: string;
}

/* ─── Build guest array from counts ─── */
function buildGuests(
  maleCount: number,
  femaleCount: number,
  coupleCount: number,
  existingGuests: GuestProfile[]
): GuestProfile[] {
  const guests: GuestProfile[] = [];
  let n = 1;

  // Males
  for (let i = 0; i < maleCount; i++) {
    const existing = existingGuests.find(
      (g) => g.type === "male" && !guests.some((x) => x.id === g.id)
    );
    guests.push(
      existing
        ? { ...existing, label: `Guest ${n}` }
        : { id: `g${Date.now()}-${n}`, label: `Guest ${n}`, type: "male", roomId: null }
    );
    n++;
  }

  // Females
  for (let i = 0; i < femaleCount; i++) {
    const existing = existingGuests.find(
      (g) => g.type === "female" && !guests.some((x) => x.id === g.id)
    );
    guests.push(
      existing
        ? { ...existing, label: `Guest ${n}` }
        : { id: `g${Date.now()}-${n}`, label: `Guest ${n}`, type: "female", roomId: null }
    );
    n++;
  }

  // Couples (each couple = 1 guest entry but counts as 2 persons)
  for (let i = 0; i < coupleCount; i++) {
    const existing = existingGuests.find(
      (g) => g.type === "couple" && !guests.some((x) => x.id === g.id)
    );
    guests.push(
      existing
        ? { ...existing, label: `Couple ${i + 1}` }
        : { id: `g${Date.now()}-${n}`, label: `Couple ${i + 1}`, type: "couple", roomId: null }
    );
    n++;
  }

  return guests;
}

const defaultState: BookingState = {
  maleCount: 0,
  femaleCount: 0,
  coupleCount: 0,
  guests: [],
  checkIn: "",
  checkOut: "",
  packageId: null,
  addOns: {},
  addonMode: "group",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  specialRequests: "",
  promoCode: "",
};

interface BookingContextType {
  booking: BookingState;
  setBooking: (update: Partial<BookingState>) => void;
  resetBooking: () => void;
  setGuestCounts: (male: number, female: number, couple: number) => void;
  updateGuest: (id: string, update: Partial<GuestProfile>) => void;
  setPackage: (packageId: string | null) => void;
  setAddonMode: (mode: "group" | "person") => void;
  setAddonGroupQty: (addonId: string, qty: number) => void;
  setAddonGuestQty: (addonId: string, guestId: string, qty: number) => void;
  clearAllRoomAssignments: () => void;
  nights: number;
  totalPersons: number; // males + females + (couples × 2)
  totalGuests: number;  // number of guest entries (couples = 1)
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBookingState] = useState<BookingState>(defaultState);

  const setBooking = useCallback((update: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...update }));
  }, []);

  const resetBooking = useCallback(() => {
    setBookingState(defaultState);
  }, []);

  /* ─── Set guest counts and rebuild guest array ─── */
  const setGuestCounts = useCallback((male: number, female: number, couple: number) => {
    setBookingState((prev) => {
      const newGuests = buildGuests(
        Math.max(0, male),
        Math.max(0, female),
        Math.max(0, couple),
        prev.guests
      );
      return {
        ...prev,
        maleCount: Math.max(0, male),
        femaleCount: Math.max(0, female),
        coupleCount: Math.max(0, couple),
        guests: newGuests,
      };
    });
  }, []);

  const updateGuest = useCallback((id: string, update: Partial<GuestProfile>) => {
    setBookingState((prev) => ({
      ...prev,
      guests: prev.guests.map((g) => (g.id === id ? { ...g, ...update } : g)),
    }));
  }, []);

  const clearAllRoomAssignments = useCallback(() => {
    setBookingState((prev) => ({
      ...prev,
      guests: prev.guests.map((g) => ({ ...g, roomId: null })),
    }));
  }, []);

  /* ─── Package ─── */
  const setPackage = useCallback((packageId: string | null) => {
    setBookingState((prev) => ({ ...prev, packageId }));
  }, []);

  /* ─── Addon Management ─── */
  const setAddonMode = useCallback((mode: "group" | "person") => {
    setBookingState((prev) => ({ ...prev, addonMode: mode }));
  }, []);

  const setAddonGroupQty = useCallback((addonId: string, qty: number) => {
    setBookingState((prev) => ({
      ...prev,
      addOns: {
        ...prev.addOns,
        [addonId]: {
          ...prev.addOns[addonId],
          quantity: Math.max(0, qty),
        },
      },
    }));
  }, []);

  const setAddonGuestQty = useCallback((addonId: string, guestId: string, qty: number) => {
    setBookingState((prev) => {
      const existing = prev.addOns[addonId] || { quantity: 0, perGuest: {} };
      const perGuest = { ...(existing.perGuest || {}), [guestId]: Math.max(0, qty) };
      const totalQty = Object.values(perGuest).reduce((s, v) => s + v, 0);
      return {
        ...prev,
        addOns: {
          ...prev.addOns,
          [addonId]: { quantity: totalQty, perGuest },
        },
      };
    });
  }, []);

  /* ─── Computed ─── */
  const nights =
    booking.checkIn && booking.checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const totalPersons =
    booking.maleCount + booking.femaleCount + booking.coupleCount * 2;

  const totalGuests = booking.guests.length;

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBooking,
        resetBooking,
        setGuestCounts,
        updateGuest,
        setPackage,
        setAddonMode,
        setAddonGroupQty,
        setAddonGuestQty,
        clearAllRoomAssignments,
        nights,
        totalPersons,
        totalGuests,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
