import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type GuestType = "male" | "female" | "couple";
export type PaymentChoice = "deposit" | "arrival" | null;

export interface GuestProfile {
  id: string;
  label: string;       // "Guest 1 (Male)", "Couple 1"
  type: GuestType;
  roomId: string | null;
}

export interface AddonSelection {
  quantity: number;
  perGuest?: Record<string, number>;
}

export interface BookingState {
  maleCount: number;
  femaleCount: number;
  coupleCount: number;
  guests: GuestProfile[];
  checkIn: string;
  checkOut: string;
  packageId: string | null;
  addOns: Record<string, AddonSelection>;
  addonMode: "group" | "person";
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequests: string;
  promoCode: string;
  arrivalTime: string;          // e.g. "14:30"
  paymentChoice: PaymentChoice; // "deposit" | "arrival"
}

function buildGuests(
  maleCount: number,
  femaleCount: number,
  coupleCount: number,
  existingGuests: GuestProfile[]
): GuestProfile[] {
  const guests: GuestProfile[] = [];
  let n = 1;

  for (let i = 0; i < maleCount; i++) {
    const label = `Guest ${n} (Male)`;
    const existing = existingGuests.find((g) => g.type === "male" && g.label === label);
    guests.push(existing ?? { id: `g${Date.now()}-m${i}`, label, type: "male", roomId: null });
    n++;
  }

  for (let i = 0; i < femaleCount; i++) {
    const label = `Guest ${n} (Female)`;
    const existing = existingGuests.find((g) => g.type === "female" && g.label === label);
    guests.push(existing ?? { id: `g${Date.now()}-f${i}`, label, type: "female", roomId: null });
    n++;
  }

  // Each couple = 2 neutral guests (no gender label)
  for (let i = 0; i < coupleCount * 2; i++) {
    const label = `Guest ${n}`;
    const existing = existingGuests.find((g) => g.type === "couple" && g.label === label);
    guests.push(existing ?? { id: `g${Date.now()}-c${i}`, label, type: "couple", roomId: null });
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
  arrivalTime: "",
  paymentChoice: null,
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
  totalPersons: number;
  totalGuests: number;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBookingState] = useState<BookingState>(defaultState);

  const setBooking = useCallback((update: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...update }));
  }, []);

  const resetBooking = useCallback(() => setBookingState(defaultState), []);

  const setGuestCounts = useCallback((male: number, female: number, couple: number) => {
    setBookingState((prev) => ({
      ...prev,
      maleCount: Math.max(0, male),
      femaleCount: Math.max(0, female),
      coupleCount: Math.max(0, couple),
      guests: buildGuests(
        Math.max(0, male),
        Math.max(0, female),
        Math.max(0, couple),
        prev.guests
      ),
    }));
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

  const setPackage = useCallback((packageId: string | null) => {
    setBookingState((prev) => ({ ...prev, packageId }));
  }, []);

  const setAddonMode = useCallback((mode: "group" | "person") => {
    setBookingState((prev) => ({ ...prev, addonMode: mode }));
  }, []);

  const setAddonGroupQty = useCallback((addonId: string, qty: number) => {
    setBookingState((prev) => ({
      ...prev,
      addOns: {
        ...prev.addOns,
        [addonId]: { ...prev.addOns[addonId], quantity: Math.max(0, qty) },
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
        addOns: { ...prev.addOns, [addonId]: { quantity: totalQty, perGuest } },
      };
    });
  }, []);

  const nights =
    booking.checkIn && booking.checkOut
      ? Math.max(1, Math.ceil(
          (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        ))
      : 0;

  const totalPersons =
    booking.maleCount + booking.femaleCount + booking.coupleCount * 2;

  const totalGuests = booking.guests.length;

  return (
    <BookingContext.Provider value={{
      booking, setBooking, resetBooking, setGuestCounts, updateGuest,
      setPackage, setAddonMode, setAddonGroupQty, setAddonGuestQty,
      clearAllRoomAssignments, nights, totalPersons, totalGuests,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
