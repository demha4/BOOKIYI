import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Users, ChevronRight, Check, Bed, Package, Plus,
  Minus, Shield, Clock, CreditCard, ArrowLeft,
  Waves, Sun, Plane, Dumbbell, Sparkles,
  User, Mail, Phone, FileText, Heart, X,
  ToggleLeft, ToggleRight, ChevronDown, AlertCircle, CheckCircle2,
  Copy, Loader2, Building2, Banknote, Timer, UserCheck,
} from "lucide-react";
import { useBooking, type GuestType, type GuestProfile } from "../contexts/BookingContext";
import CustomCalendar from "../components/CustomCalendar";
import { rooms, packages } from "../data/content";
import { submitBookingToBeds24 } from "../services/beds24";
import { useLiveAvailability } from "../hooks/useLiveAvailability";
import { LiveSyncBanner } from "../components/LiveSyncIndicator";
import { AlertTriangle } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   BANK TRANSFER CONFIG — update with real details
   ═══════════════════════════════════════════════════════════════ */
const BANK_DETAILS = {
  bankName: "CIH Bank",
  accountName: "ABDELWAHD BALLOUCH",
  iban: "MA64 2300 1046 2196 3211 0002 0097",
  swift: "CIHMMAMC",
  reference: "Booking deposit",
};

/* ═══════════════════════════════════════════════════════════════
   ADD-ONS
   ═══════════════════════════════════════════════════════════════ */
interface AddonDef {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: "fixed" | "perNight" | "perSession";
  icon: React.ReactNode;
  maxPerUnit: number;
}

const ADDONS: AddonDef[] = [
  { id: "surf-lesson", name: "Surf Lesson", description: "With coach, plus free evening surfing", price: 30, priceUnit: "perSession", icon: <Waves size={18} />, maxPerUnit: 10 },
  { id: "paradise-valley", name: "Paradise Valley", description: "Valley trip with lunch included", price: 30, priceUnit: "fixed", icon: <Sparkles size={18} />, maxPerUnit: 10 },
  { id: "sand-dunes", name: "Sand Dunes", description: "Dunes trip with dinner included", price: 30, priceUnit: "fixed", icon: <Sun size={18} />, maxPerUnit: 10 },
  { id: "airport-pickup", name: "Taxi", description: "Taxi / airport transfer support", price: 25, priceUnit: "fixed", icon: <Plane size={18} />, maxPerUnit: 1 },
  { id: "skate-park", name: "Skate Park Sunset", description: "Sunset skate park session", price: 5, priceUnit: "fixed", icon: <Dumbbell size={18} />, maxPerUnit: 10 },
];

/* ═══════════════════════════════════════════════════════════════
   GUEST TYPE CONFIG — lucide icons only
   ═══════════════════════════════════════════════════════════════ */
const guestConfig: Record<GuestType, {
  label: string;
  icon: React.ReactNode;
  chipIcon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  dot: string;
  showType: boolean;  // whether to show type badge in chip
}> = {
  male:   { label: "Male",   icon: <User size={16} />,   chipIcon: <User size={12} />,   color: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-300",   dot: "bg-blue-500",  showType: true },
  female: { label: "Female", icon: <User size={16} />,   chipIcon: <User size={12} />,   color: "text-rose-600",   bg: "bg-rose-50",   border: "border-rose-300",   dot: "bg-rose-500",  showType: true },
  couple: { label: "",       icon: <Heart size={16} />,  chipIcon: <User size={12} />,   color: "text-stone-700",  bg: "bg-stone-50",  border: "border-stone-300",  dot: "bg-stone-500", showType: false },
};

/* ═══════════════════════════════════════════════════════════════
   ADDON PRICING — single source of truth
   ═══════════════════════════════════════════════════════════════
   Used by: addonsTotal calculation, the inline subtotal under each
   addon card, and the right-side Booking Summary line item.

   Rules:
   - Taxi / airport-pickup: flat fare, one fare regardless of headcount.
     (covers up to 5 guests in one ride per Tamount's policy)
   - Group mode (other addons): "we want X for each member of the group"
     → multiply by totalPersons.
   - Per-person mode (other addons): quantity is already the SUM of
     each guest's individual selections (handled by setAddonGuestQty),
     so we don't multiply by headcount again — that would double-count.
   - Per-night addons multiply by nights on top of the above.
*/
function calcAddonLineTotal(
  addon: AddonDef,
  quantity: number,
  mode: "group" | "person",
  totalPersons: number,
  nights: number
): number {
  if (quantity <= 0) return 0;
  const nightlyMultiplier = addon.priceUnit === "perNight" ? nights : 1;
  // Flat-fare items: one fare regardless of group size or mode.
  if (addon.id === "airport-pickup") {
    return addon.price * quantity * nightlyMultiplier;
  }
  // Group mode: each group member gets one of the addon.
  if (mode === "group") {
    return addon.price * quantity * nightlyMultiplier * totalPersons;
  }
  // Per-person mode: quantity already encodes the right count.
  return addon.price * quantity * nightlyMultiplier;
}

/* ═══════════════════════════════════════════════════════════════
   PRICE CALCULATION HOOK
   ═══════════════════════════════════════════════════════════════ */
function usePriceBreakdown(liveData: Record<string, { avgNightly?: number; totalPrice?: number }> = {}) {
  const { booking, nights, totalPersons } = useBooking();

  const roomBreakdown = useMemo(() => {
    const roomMap = new Map<string, string[]>();
    booking.guests.forEach((g) => {
      if (g.roomId) {
        const list = roomMap.get(g.roomId) || [];
        list.push(g.id);
        roomMap.set(g.roomId, list);
      }
    });
    const breakdown: { room: typeof rooms[0]; guestIds: string[]; subtotal: number; unitPrice: number }[] = [];
    roomMap.forEach((guestIds, roomId) => {
      const room = rooms.find((r) => r.id === roomId);
      if (room) {
        const live = liveData[room.beds24RoomId];
        const unitPrice = live?.avgNightly && live.avgNightly > 0 ? live.avgNightly : room.price;
        const subtotal = room.type === "dorm"
          ? unitPrice * nights * guestIds.length
          : unitPrice * nights;
        breakdown.push({ room, guestIds, subtotal, unitPrice });
      }
    });
    return breakdown;
  }, [booking.guests, nights, liveData]);

  const selectedPkg = packages.find((p) => p.id === booking.packageId);

  const accommodationTotal = useMemo(() => {
    // Two contributions to the accommodation total:
    //   1. Room subtotals (always — sum of each assigned room × nights × occupants)
    //   2. Flat-rate package fee (only for packages other than B&B)
    //
    // The Surf Camp Pack is a per-day surf-services + meals fee that bills
    // ON TOP OF the chosen room. Different rooms = different totals because
    // accommodation is billed separately. B&B is just the marketing label
    // for the standard room-by-room flow — no flat fee.
    const roomsSubtotal = roomBreakdown.reduce((sum, r) => sum + r.subtotal, 0);

    const isFlatRatePackage = selectedPkg && selectedPkg.id !== "bed-and-breakfast";
    if (!isFlatRatePackage) {
      return roomsSubtotal;
    }

    const packageFee = selectedPkg.priceUnit === "total"
      ? selectedPkg.priceFrom * totalPersons
      : selectedPkg.priceFrom * nights * totalPersons;

    return roomsSubtotal + packageFee;
  }, [selectedPkg, roomBreakdown, nights, totalPersons]);

  // Just the flat-rate package fee on its own (0 when no flat package is
  // selected). Used by the right-side summary to display Package and Rooms
  // as separate line items that visibly sum to accommodationTotal.
  const packageFee = useMemo(() => {
    const isFlatRatePackage = selectedPkg && selectedPkg.id !== "bed-and-breakfast";
    if (!isFlatRatePackage) return 0;
    return selectedPkg.priceUnit === "total"
      ? selectedPkg.priceFrom * totalPersons
      : selectedPkg.priceFrom * nights * totalPersons;
  }, [selectedPkg, nights, totalPersons]);

  const addonsTotal = useMemo(() => {
    return Object.entries(booking.addOns).reduce((sum, [id, sel]) => {
      const addon = ADDONS.find((a) => a.id === id);
      if (!addon || sel.quantity <= 0) return sum;
      return sum + calcAddonLineTotal(addon, sel.quantity, booking.addonMode, totalPersons, nights);
    }, 0);
  }, [booking.addOns, booking.addonMode, nights, totalPersons]);

  const total = accommodationTotal + addonsTotal;
  const depositAmount = Math.ceil(total * 0.3);

  return { selectedPkg, roomBreakdown, packageFee, accommodationTotal, addonsTotal, total, depositAmount };
}

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */
function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* ═══════════════════════════════════════════════════════════════
   STEPS
   ═══════════════════════════════════════════════════════════════ */
const STEPS = [
  { n: 1, label: "Package",  icon: <Package size={16} /> },
  { n: 2, label: "Rooms",    icon: <Bed size={16} /> },
  { n: 3, label: "Add-ons",  icon: <Sparkles size={16} /> },
  { n: 4, label: "Details",  icon: <FileText size={16} /> },
  { n: 5, label: "Payment",  icon: <CreditCard size={16} /> },
  { n: 6, label: "Confirm",  icon: <Check size={16} /> },
];

/* ═══════════════════════════════════════════════════════════════
   GUEST PICKER — Male / Female / Couple
   ═══════════════════════════════════════════════════════════════ */
function GuestPicker({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { booking, setGuestCounts } = useBooking();
  const ref = useRef<HTMLDivElement>(null);

  // Property has 13 beds total (8 dorm + 3 triple + 2 double).
  // Couples count as 2 toward this cap.
  const MAX_GUESTS = 13;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rows: { key: GuestType; label: string; icon: React.ReactNode; count: number; note?: string; weight: number }[] = [
    { key: "male",   label: "Males",   icon: <User size={16} />,  count: booking.maleCount,   weight: 1 },
    { key: "female", label: "Females", icon: <User size={16} />,  count: booking.femaleCount, weight: 1 },
    { key: "couple", label: "Couples", icon: <Heart size={16} />, count: booking.coupleCount, note: "2 guests each", weight: 2 },
  ];

  const total = booking.maleCount + booking.femaleCount + booking.coupleCount * 2;
  const atCap = total >= MAX_GUESTS;

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
      className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-stone-200 p-5 w-72 z-[100]">
      <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4">Select guests</p>
      <div className="space-y-4">
        {rows.map((r) => {
          // Adding this row's increment would push past the cap?
          const wouldExceed = total + r.weight > MAX_GUESTS;
          return (
          <div key={r.key} className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-700 flex items-center gap-2">
              <span className={guestConfig[r.key].color}>{r.icon}</span>
              {r.label}
              {r.note && <span className="text-[10px] text-stone-400">{r.note}</span>}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const { maleCount: m, femaleCount: f, coupleCount: c } = booking;
                  if (r.key === "male") setGuestCounts(Math.max(0, m - 1), f, c);
                  else if (r.key === "female") setGuestCounts(m, Math.max(0, f - 1), c);
                  else setGuestCounts(m, f, Math.max(0, c - 1));
                }}
                disabled={r.count <= 0}
                className="w-9 h-9 rounded-full border-2 border-stone-300 flex items-center justify-center disabled:opacity-30 hover:border-ocean hover:text-ocean transition-all"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center font-bold text-stone-800 text-lg">{r.count}</span>
              <button
                onClick={() => {
                  const { maleCount: m, femaleCount: f, coupleCount: c } = booking;
                  if (r.key === "male") setGuestCounts(m + 1, f, c);
                  else if (r.key === "female") setGuestCounts(m, f + 1, c);
                  else setGuestCounts(m, f, c + 1);
                }}
                disabled={wouldExceed}
                className="w-9 h-9 rounded-full border-2 border-stone-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-ocean hover:text-ocean transition-all"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          );
        })}
      </div>

      <div className="border-t border-stone-200 mt-4 pt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-stone-600">Total persons</span>
        <span className={`font-bold text-xl ${atCap ? "text-amber-600" : "text-ocean"}`}>{total} / {MAX_GUESTS}</span>
      </div>

      {atCap && (
        <p className="text-[11px] text-amber-700 mt-2 leading-5">
          That is the full house — 13 places across all rooms. For larger groups, message us on WhatsApp.
        </p>
      )}

      <button onClick={onClose}
        className="w-full mt-3 py-2.5 text-sm font-semibold text-white bg-ocean rounded-xl hover:bg-ocean/90 transition-all">
        Done
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATE PICKER POPOVER
   ═══════════════════════════════════════════════════════════════ */
function DatePicker({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { booking, setBooking } = useBooking();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickNights = [3, 5, 7, 10, 14];
  const nights = booking.checkIn && booking.checkOut
    ? Math.max(1, Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000))
    : 0;

  const setQuickNights = (n: number) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const ci = booking.checkIn || tomorrow.toISOString().split("T")[0];
    const co = new Date(new Date(ci).getTime() + n * 86400000).toISOString().split("T")[0];
    setBooking({ checkIn: ci, checkOut: co });
  };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
      className="absolute top-full right-0 md:left-0 mt-2 bg-white rounded-xl shadow-2xl border border-stone-200 p-5 w-[340px] z-[100]">
      <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">How long?</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {quickNights.map((n) => (
          <button key={n} onClick={() => setQuickNights(n)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              nights === n ? "bg-ocean text-white" : "bg-stone-100 text-stone-600 hover:bg-ocean/10"
            }`}>
            {n} nights
          </button>
        ))}
      </div>
      <CustomCalendar checkIn={booking.checkIn} checkOut={booking.checkOut}
        onSelect={(ci, co) => setBooking({ checkIn: ci, checkOut: co })} />
      {nights > 0 && (
        <div className="mt-3 p-3 bg-primary-50 border border-primary-200 rounded-lg text-sm">
          <p className="font-semibold text-charcoal">{fmtDate(booking.checkIn)} → {fmtDate(booking.checkOut)}</p>
          <p className="text-ocean text-xs">{nights} night{nights > 1 ? "s" : ""}</p>
        </div>
      )}
      <button onClick={onClose}
        className="w-full mt-3 py-2.5 text-sm font-semibold text-white bg-ocean hover:bg-ocean-dark rounded-lg transition-all">
        Done
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GUEST CHIP ASSIGNMENT — any guest to any room, no gender filter
   ═══════════════════════════════════════════════════════════════ */
function GuestChipsAssignment({
  roomId, roomName, guests, maxGuests, onAssignGuest, onUnassignGuest,
}: {
  roomId: string;
  roomName: string;
  guests: GuestProfile[];
  maxGuests: number;
  onAssignGuest: (guestId: string, roomId: string) => void;
  onUnassignGuest: (guestId: string) => void;
}) {
  const assignedHere = guests.filter((g) => g.roomId === roomId);
  const isFull = assignedHere.length >= maxGuests;

  if (guests.length === 0) {
    return (
      <div className="mt-3 p-3 bg-stone-50 rounded-xl text-center">
        <p className="text-xs text-stone-400">Add guests above to assign them</p>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-dashed border-stone-200">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
          <UserCheck size={12} /> Assign guests
        </span>
        <span className={`text-xs font-bold ${isFull ? "text-amber-600" : "text-stone-400"}`}>
          {assignedHere.length}/{maxGuests} {isFull && "· Full"}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {guests.map((g) => {
          const isHere = g.roomId === roomId;
          const isElsewhere = g.roomId !== null && g.roomId !== roomId;
          const blocked = isFull && !isHere;
          const cfg = guestConfig[g.type];

          return (
            <button
              key={g.id}
              onClick={() => {
                if (blocked) return;
                if (isHere) onUnassignGuest(g.id);
                else onAssignGuest(g.id, roomId);
              }}
              disabled={blocked}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all active:scale-95 ${
                isHere
                  ? `${cfg.bg} ${cfg.border} ${cfg.color} shadow-sm`
                  : blocked
                  ? "bg-stone-50 border-stone-200 text-stone-300 cursor-not-allowed"
                  : isElsewhere
                  ? "bg-white border-stone-200 text-stone-400 hover:border-ocean/40"
                  : "bg-white border-stone-300 text-stone-600 hover:border-ocean hover:bg-ocean/5 hover:text-ocean"
              }`}
            >
              {isHere
                ? <Check size={11} strokeWidth={3} />
                : blocked
                ? <X size={11} />
                : <Plus size={11} />
              }
              {cfg.showType && <span className={cfg.color}>{cfg.chipIcon}</span>}
              {g.label}
              {isElsewhere && <span className="text-[9px] text-stone-400 italic ml-0.5">→ move</span>}
              {isHere && <X size={10} className="ml-0.5 text-stone-400 hover:text-red-500" />}
            </button>
          );
        })}
      </div>
      {isFull && (
        <p className="text-[11px] text-amber-600 mt-2 flex items-center gap-1">
          <AlertCircle size={11} /> {roomName} is full
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAYMENT OPTION CARD
   ═══════════════════════════════════════════════════════════════ */
function PaymentOptionCard({
  selected, onClick, icon, title, badge, badgeColor, children,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  badge: string;
  badgeColor: string;
  children: React.ReactNode;
}) {
  return (
    <button onClick={onClick}
      className={`w-full text-left border-2 rounded-xl p-5 transition-all ${
        selected ? "border-ocean bg-ocean/5 shadow-md shadow-ocean/10" : "border-stone-200 hover:border-stone-300 bg-white"
      }`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
          selected ? "bg-ocean text-white" : "bg-stone-100 text-stone-500"
        }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-bold text-stone-800">{title}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${badgeColor}`}>
              {badge}
            </span>
          </div>
          <div className="text-sm text-stone-500">{children}</div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
          selected ? "bg-ocean border-ocean text-white" : "border-stone-300"
        }`}>
          {selected && <Check size={14} />}
        </div>
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function BookNow() {
  const [step, setStep] = useState(1);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const params = useParams<{ roomId?: string; packageId?: string }>();
  const ctx = useBooking();
  const { booking, setBooking, setGuestCounts, updateGuest, setPackage,
    setAddonMode, setAddonGroupQty, setAddonGuestQty,
    clearAllRoomAssignments, clearAddOns, nights, totalPersons } = ctx;

  const { liveData, loading: liveLoading, error: liveError, isLive, lastUpdated, refresh: refreshAvailability } =
    useLiveAvailability(booking.checkIn, booking.checkOut, totalPersons || 1, 30000);

  const price = usePriceBreakdown(liveData);

  const [guestPickerOpen, setGuestPickerOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const closeGuestPicker = useCallback(() => setGuestPickerOpen(false), []);
  const closeDatePicker = useCallback(() => setDatePickerOpen(false), []);

  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean; bookingIds?: string[]; errors?: string[];
  } | null>(null);

  /* ─── All rooms shown regardless of guest type ─── */
  const filteredRooms = useMemo(() => rooms, []);
  const unassignedGuests = booking.guests.filter((g) => g.roomId === null);
  const noGuests = totalPersons === 0;
  const noDates = nights === 0;

  /* ─── Auto-reset on guest/date change ───────────────────────────
     If the user changes dates or guest count after they have already
     picked rooms, the previous selection becomes stale (different
     pricing, possibly different availability). Snap them back to
     Step 2 (Rooms) and clear room assignments + add-ons + payment
     choice so they re-confirm everything against fresh Beds24 data.
     We track the prior values in a ref so we only fire on actual
     changes, not the initial mount. */
  const lastResetKey = useRef<string | null>(null);
  useEffect(() => {
    const key = `${booking.checkIn}|${booking.checkOut}|${totalPersons}`;
    if (lastResetKey.current === null) {
      lastResetKey.current = key;
      return;
    }
    if (lastResetKey.current === key) return;
    lastResetKey.current = key;

    // Only act if the user has progressed past room selection.
    if (step > 2) {
      clearAllRoomAssignments();
      clearAddOns();
      setBooking({ paymentChoice: null });
      setStep(2);
      // Force live availability to refetch with new params.
      refreshAvailability?.();
    }
    // refreshAvailability is intentionally omitted — including it
    // would create a loop because the hook returns a new fn each call.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.checkIn, booking.checkOut, totalPersons, step, clearAllRoomAssignments, clearAddOns, setBooking]);

  /* ─── Room assignments for submission ─── */
  const buildRoomAssignments = () => {
    const map = new Map<string, number>();
    for (const g of booking.guests) {
      if (!g.roomId) continue;
      const room = rooms.find((r) => r.id === g.roomId);
      if (!room?.beds24RoomId) continue;
      const count = g.type === "couple" ? 2 : 1;
      map.set(room.beds24RoomId, (map.get(room.beds24RoomId) || 0) + count);
    }
    return Array.from(map.entries()).map(([roomId, numAdult]) => ({ roomId, numAdult }));
  };

  /* ─── Submit booking ─── */
  const handleConfirmBooking = async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitResult(null);

    const roomAssignments = buildRoomAssignments();
    if (roomAssignments.length === 0) {
      setSubmitting(false);
      setSubmitResult({ success: false, errors: ["No rooms assigned."] });
      return;
    }

    const fullName = booking.contactName.trim();
    const parts = fullName.split(/\s+/);
    const guestFirstName = parts.length > 1 ? parts.slice(0, -1).join(" ") : "";
    const guestName = parts.length > 1 ? parts[parts.length - 1] : fullName;

    const isDeposit = booking.paymentChoice === "deposit";

    // Build per-line extras with prices, e.g.:
    //   "Surf Lesson x2 - €60"
    //   "Airport Transfer x1 - €25"
    // The line total uses the same math as price.addonsTotal so what
    // appears in the notes always matches the total sent in `price`.
    const selectedUpsellLines = Object.entries(booking.addOns)
      .filter(([, selection]) => selection.quantity > 0)
      .map(([id, selection]) => {
        const addon = ADDONS.find((item) => item.id === id);
        if (!addon) return null;
        const lineTotal = calcAddonLineTotal(addon, selection.quantity, booking.addonMode, totalPersons, nights);
        return `${addon.name} x${selection.quantity} - €${lineTotal}`;
      })
      .filter(Boolean) as string[];
    const selectedUpsellSummary = selectedUpsellLines.join(", ");

    const roomsSubtotal = price.accommodationTotal - price.packageFee;
    const notesLines = [
      `Payment: ${isDeposit ? "30% deposit via bank transfer" : "Pay on arrival"}`,
      booking.arrivalTime ? `Estimated arrival: ${booking.arrivalTime}` : "",
      booking.packageId ? `Package: ${packages.find((p) => p.id === booking.packageId)?.name}` : "",
      `Guests: ${booking.guests.map((g) => g.label).join(", ")}`,
      price.packageFee > 0 ? `Package fee: €${price.packageFee} (${price.selectedPkg?.priceFrom}/day × ${nights} nights × ${totalPersons} guests)` : "",
      `Rooms total: €${roomsSubtotal}`,
      selectedUpsellSummary ? `Extras: ${selectedUpsellSummary}` : "",
      price.addonsTotal > 0 ? `Extras total: €${price.addonsTotal}` : "",
      booking.specialRequests ? `Special requests: ${booking.specialRequests}` : "",
      `Final total sent to Beds24: €${price.total}`,
    ].filter(Boolean);

    const result = await submitBookingToBeds24({
      rooms: roomAssignments,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guestFirstName,
      guestName,
      guestEmail: booking.contactEmail,
      guestPhone: booking.contactPhone,
      notes: notesLines.join(" | "),
      status: isDeposit ? 1 : 0,
      price: price.total,
    });

    setSubmitting(false);
    setSubmitResult(result);
  };

  useEffect(() => {
    const pkg = params.packageId || searchParams.get("package");
    const roomOnly = location.pathname.includes("bed-and-breakfast");

    if (roomOnly) {
      setPackage(null);
      return;
    }

    if (pkg) setPackage(pkg);
  }, [location.pathname, params.packageId, searchParams, setPackage]);

  useEffect(() => {
    const presetRoomId = params.roomId || searchParams.get("room");
    if (!presetRoomId || booking.guests.length === 0) return;
    if (!rooms.some((room) => room.id === presetRoomId)) return;
    if (booking.guests.some((guest) => guest.roomId !== null)) return;

    booking.guests.forEach((guest) => updateGuest(guest.id, { roomId: presetRoomId }));
  }, [params.roomId, searchParams, booking.guests, updateGuest]);

  /* ─── Navigation ─── */
  const canProceed = (s: number) => {
    switch (s) {
      case 1: {
        if (totalPersons <= 0 || nights <= 0) return false;
        // Block Continue if a package is selected but the date range is shorter
        // than its minimum. The user can either extend dates or pick another pack.
        const pkg = packages.find((p) => p.id === booking.packageId);
        if (pkg?.minNights && nights < pkg.minNights) return false;
        return true;
      }
      case 2: return booking.guests.every((g) => g.roomId !== null);
      case 3: return true;
      case 4: return booking.contactName.trim() !== "" && booking.contactEmail.trim() !== "";
      case 5: return booking.paymentChoice !== null;
      default: return true;
    }
  };

  const goNext = () => {
    if (canProceed(step) && step < 6) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const goBack = () => {
    if (step > 1) { setStep(step - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };

  const assignGuestToRoom = (guestId: string, roomId: string) => updateGuest(guestId, { roomId });
  const unassignGuest = (guestId: string) => updateGuest(guestId, { roomId: null });

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white pt-28 sm:pt-32 lg:pt-36 pb-28 sm:pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-6">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-10">
          <h1 className="text-[2.2rem] sm:text-[2.8rem] md:text-5xl font-display font-bold text-ocean leading-[1.08] mb-2">Book Your Stay</h1>
          <p className="text-stone-500 text-sm sm:text-base">TAMOUNT Surf House — Anza, Agadir</p>
        </motion.div>

        {/* LIVE SYNC BANNER */}
        {isLive && (
          <div className="mb-8">
            <LiveSyncBanner lastUpdated={lastUpdated} loading={liveLoading} error={liveError} onRetry={refreshAvailability} />
          </div>
        )}

        {/* TOP BAR — guests + dates + live price */}
        <div className="mb-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 sm:p-5">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider hidden sm:inline">Your stay</span>

              {/* Guest Picker */}
              <div className="relative">
                <button onClick={() => { setGuestPickerOpen(!guestPickerOpen); setDatePickerOpen(false); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${
                    guestPickerOpen ? "border-ocean bg-ocean/5 text-ocean" :
                    totalPersons > 0 ? "border-ocean/30 bg-ocean/5 text-ocean" : "border-stone-300 text-stone-600 hover:border-ocean"
                  }`}>
                  <Users size={18} />
                  <span className="font-semibold">{totalPersons > 0 ? `Guests: ${totalPersons}` : "Add Guests"}</span>
                  {totalPersons > 0 && (
                    <button onClick={(e) => { e.stopPropagation(); setGuestCounts(0, 0, 0); }}
                      className="ml-1 hover:text-red-500"><X size={14} /></button>
                  )}
                  <ChevronDown size={14} className={`transition-transform ${guestPickerOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {guestPickerOpen && <GuestPicker isOpen={guestPickerOpen} onClose={closeGuestPicker} />}
                </AnimatePresence>
              </div>

              {/* Guest type mini pills */}
              {totalPersons > 0 && (
                <div className="hidden md:flex items-center gap-1.5">
                  {booking.maleCount > 0 && (
                    <span className="text-[11px] px-2 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-semibold flex items-center gap-1">
                      <User size={10} /> {booking.maleCount}M
                    </span>
                  )}
                  {booking.femaleCount > 0 && (
                    <span className="text-[11px] px-2 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-600 font-semibold flex items-center gap-1">
                      <User size={10} /> {booking.femaleCount}F
                    </span>
                  )}
                  {booking.coupleCount > 0 && (
                    <span className="text-[11px] px-2 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700 font-semibold flex items-center gap-1">
                      <Heart size={10} /> {booking.coupleCount}C
                    </span>
                  )}
                </div>
              )}

              <div className="hidden md:block w-px h-8 bg-stone-200" />

              {/* Date Picker */}
              <div className="relative">
                <button onClick={() => { setDatePickerOpen(!datePickerOpen); setGuestPickerOpen(false); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${
                    datePickerOpen ? "border-ocean bg-ocean/5 text-ocean" :
                    nights > 0 ? "border-ocean/30 bg-ocean/5 text-ocean" : "border-stone-300 text-stone-600 hover:border-ocean"
                  }`}>
                  <Calendar size={18} />
                  <span className="font-semibold">{nights > 0 ? `${fmtDate(booking.checkIn)} — ${nights}n` : "Select Dates"}</span>
                  <ChevronDown size={14} className={`transition-transform ${datePickerOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {datePickerOpen && <DatePicker isOpen={datePickerOpen} onClose={closeDatePicker} />}
                </AnimatePresence>
              </div>

              {price.total > 0 && (
                <div className="ml-auto text-right hidden md:block">
                  <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Live total</p>
                  <p className="text-xl font-display font-bold text-ocean leading-tight">€{price.total}</p>
                  {nights > 0 && <p className="text-[10px] text-stone-400">≈ €{Math.round(price.total / nights)}/night</p>}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ALERT: need setup */}
        {(noGuests || noDates) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <AlertCircle size={20} className="text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">
                {noGuests && noDates ? "Select your guests and dates to get started" :
                 noGuests ? "Add guests using the selector above" : "Select dates using the calendar above"}
              </p>
              <p className="text-xs text-amber-600 mt-0.5">Use the buttons above to set up your booking</p>
            </div>
          </motion.div>
        )}

        {/* PROGRESS BAR */}
        {!noGuests && !noDates && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {STEPS.map((s, i) => (
                <React.Fragment key={s.n}>
                  <button onClick={() => { if (s.n < step) setStep(s.n); }}
                    className={`flex flex-col items-center gap-1 transition-all ${
                      s.n === step ? "scale-110" : s.n < step ? "cursor-pointer" : "opacity-40"
                    }`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      s.n < step ? "bg-green-500 text-white" : s.n === step ? "bg-ocean text-white shadow-lg shadow-ocean/30" : "bg-stone-200 text-stone-400"
                    }`}>
                      {s.n < step ? <Check size={14} /> : s.icon}
                    </div>
                    <span className={`text-[9px] md:text-[10px] font-semibold ${s.n === step ? "text-ocean" : "text-stone-400"}`}>{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 rounded ${s.n < step ? "bg-green-400" : "bg-stone-200"}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* MAIN LAYOUT */}
        {!noGuests && !noDates && (
          <div className="flex flex-col lg:flex-row gap-6">

            {/* MAIN PANEL */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>

                  {/* ── STEP 1: PACKAGE ── */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-stone-100">
                        <h2 className="text-xl font-display font-bold text-stone-800 mb-2 flex items-center gap-2">
                          <Package className="text-ocean" size={22} /> Choose your experience
                        </h2>
                        <p className="text-stone-500 text-sm mb-6">Pick a surf package or go room-only for maximum flexibility</p>

                        {/* Room Only */}
                        <motion.button onClick={() => setPackage(null)}
                          className={`w-full text-left border-2 rounded-xl p-5 mb-4 transition-all ${
                            booking.packageId === null ? "border-ocean bg-ocean/5 shadow-md shadow-ocean/10" : "border-stone-200 hover:border-stone-300"
                          }`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                              booking.packageId === null ? "bg-ocean text-white" : "bg-stone-100 text-stone-400"
                            }`}>
                              <Bed size={24} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-stone-800 text-lg">Room Only</h3>
                              <p className="text-sm text-stone-500">Just accommodation — choose rooms in the next step</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              booking.packageId === null ? "bg-ocean border-ocean text-white" : "border-stone-300"
                            }`}>
                              {booking.packageId === null && <Check size={14} />}
                            </div>
                          </div>
                        </motion.button>

                        <div className="flex items-center gap-3 my-6">
                          <div className="flex-1 h-px bg-stone-200" />
                          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Or choose a package</span>
                          <div className="flex-1 h-px bg-stone-200" />
                        </div>

                        <div className="space-y-4">
                          {packages.map((pkg) => {
                            const isSelected = booking.packageId === pkg.id;
                            const pkgPrice = pkg.priceUnit === "total"
                              ? pkg.priceFrom * totalPersons
                              : pkg.priceFrom * nights * totalPersons;
                            return (
                              <motion.button key={pkg.id} layout onClick={() => setPackage(isSelected ? null : pkg.id)}
                                className={`w-full text-left border-2 rounded-xl overflow-hidden transition-all ${
                                  isSelected ? "border-ocean shadow-md shadow-ocean/10" : "border-stone-200 hover:border-stone-300"
                                }`}>
                                <div className="flex flex-col md:flex-row">
                                  <div className="md:w-44 h-36 md:h-auto overflow-hidden relative">
                                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                                    {isSelected && (
                                      <div className="absolute inset-0 bg-ocean/20 flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                                          <Check size={20} className="text-ocean" />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 p-5">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <h3 className="font-bold text-stone-800 text-lg">{pkg.name}</h3>
                                        <p className="text-xs text-stone-500">{pkg.duration} · {pkg.tagline}</p>
                                      </div>
                                      <div className="text-right shrink-0 ml-3">
                                        <p className="text-xl font-bold text-ocean">€{pkg.priceFrom}</p>
                                        <p className="text-[10px] text-stone-400 uppercase">
                                          / {pkg.priceUnit === "total" ? "person" : "person / night"}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="text-sm text-stone-500 mb-3">{pkg.description}</p>
                                    <ul className="text-xs text-stone-500 space-y-1">
                                      {pkg.includes.slice(0, 4).map((inc) => (
                                        <li key={inc} className="flex items-center gap-1.5"><Check size={12} className="text-green-500 shrink-0" />{inc}</li>
                                      ))}
                                      {pkg.includes.length > 4 && <li className="text-ocean font-semibold">+{pkg.includes.length - 4} more included</li>}
                                    </ul>
                                    {isSelected && (
                                      <div className="mt-3 space-y-2">
                                        {pkg.minNights && nights > 0 && nights < pkg.minNights ? (
                                          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                                            <p className="text-xs font-semibold text-amber-800 flex items-start gap-1.5">
                                              <AlertCircle size={12} className="mt-0.5 shrink-0" />
                                              <span>
                                                This pack requires a minimum of <strong>{pkg.minNights} nights</strong>. You picked {nights} night{nights > 1 ? "s" : ""}. Extend your dates or pick another option.
                                              </span>
                                            </p>
                                          </div>
                                        ) : (
                                          <div className="p-2 bg-ocean/10 rounded-lg">
                                            <p className="text-xs font-semibold text-ocean">
                                              {totalPersons} person{totalPersons > 1 ? "s" : ""} × €{pkg.priceFrom}/day × {nights} night{nights > 1 ? "s" : ""} = <span className="text-sm">€{pkgPrice}</span>
                                            </p>
                                            <p className="text-[10px] text-stone-500 mt-0.5">+ accommodation (added when you pick rooms)</p>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2: ROOMS ── */}
                  {step === 2 && (
                    <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-stone-100">
                      <h2 className="text-xl font-display font-bold text-stone-800 mb-2 flex items-center gap-2">
                        <Bed className="text-ocean" size={22} /> Assign guests to rooms
                      </h2>
                      <p className="text-stone-500 text-sm mb-4">
                        All room types are available. Assign each guest freely — gender is for reference only.
                      </p>

                      {/* Guest status legend */}
                      <div className="flex flex-wrap gap-2 mb-4 p-3 bg-stone-50 rounded-xl border border-stone-100">
                        <span className="text-xs font-semibold text-stone-500 mr-1 self-center">Guests:</span>
                        {booking.guests.map((g) => {
                          const cfg = guestConfig[g.type];
                          const assigned = g.roomId !== null;
                          return (
                            <span key={g.id} className={`text-[11px] px-2.5 py-1 rounded-full border font-semibold flex items-center gap-1.5 ${
                              assigned ? `${cfg.bg} ${cfg.border} ${cfg.color}` : "bg-amber-50 border-amber-200 text-amber-700"
                            }`}>
                              {assigned ? <Check size={10} /> : <AlertCircle size={10} />}
                              {cfg.showType && <span className={cfg.color}>{cfg.chipIcon}</span>}
                              {g.label}
                            </span>
                          );
                        })}
                      </div>

                      {unassignedGuests.length > 0 && (
                        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
                          <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                          <p className="text-sm text-amber-800">
                            <strong>{unassignedGuests.length} guest{unassignedGuests.length > 1 ? "s" : ""}</strong> not assigned yet — tap chips on any room below.
                          </p>
                        </div>
                      )}

                      {/* Loading */}
                      {liveLoading && (
                        <div className="text-center py-12">
                          <Loader2 className="inline-block animate-spin text-ocean mb-3" size={32} />
                          <p className="text-stone-600 font-medium">Checking live availability…</p>
                        </div>
                      )}

                      {/* No availability */}
                      {!liveLoading && filteredRooms.filter((room) => {
                        const live = liveData[room.beds24RoomId];
                        // -1 = rate plan not configured (still bookable on request)
                        // > 0 = real availability
                        return live && ((live.available ?? 0) > 0 || live.available === -1);
                      }).length === 0 && booking.guests.length > 0 && (
                        <div className="text-center py-12 bg-stone-50 rounded-xl border-2 border-dashed border-stone-200">
                          <AlertCircle className="mx-auto text-amber-500 mb-3" size={48} strokeWidth={1.5} />
                          <h3 className="text-lg font-bold text-stone-800 mb-2">No rooms available for these dates</h3>
                          <p className="text-stone-500 text-sm mb-4">Please try different dates or contact us directly.</p>
                          <button onClick={() => setDatePickerOpen(true)}
                            className="px-4 py-2.5 bg-ocean text-white rounded-xl font-semibold text-sm hover:bg-ocean/90">
                            Change Dates
                          </button>
                        </div>
                      )}

                      {!liveLoading && liveError && (
                        <div className="text-center py-8 bg-amber-50 rounded-xl border border-amber-200">
                          <AlertTriangle className="mx-auto text-amber-600 mb-2" size={36} strokeWidth={1.5} />
                          <p className="text-stone-600 text-sm">Could not load live availability — {liveError}</p>
                        </div>
                      )}

                      {/* Room Cards */}
                      <div className="space-y-4 mt-4">
                        {filteredRooms.map((room) => {
                          const assignedHere = booking.guests.filter((g) => g.roomId === room.id);
                          const hasGuests = assignedHere.length > 0;
                          const live = liveData[room.beds24RoomId];
                          const livePrice = live?.avgNightly && live.avgNightly > 0 ? live.avgNightly : room.price;
                          const liveAvail = live?.available ?? 0;
                          const hasLiveData = isLive && live && typeof liveAvail === "number";

                          if (!hasLiveData && !hasGuests) return null;
                          if (hasLiveData && liveAvail === 0 && !hasGuests) return null;

                          return (
                            <motion.div key={room.id} layout
                              className={`border-2 rounded-xl transition-all ${
                                hasGuests ? "border-ocean shadow-md shadow-ocean/10" : "border-stone-200 hover:border-stone-300"
                              }`}>
                              <div className="flex flex-col md:flex-row">
                                <div className="md:w-48 h-40 md:h-auto relative overflow-hidden md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none">
                                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                                  <div className="absolute top-2 left-2">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                      room.type === "dorm" ? "bg-blue-500/90 text-white" : "bg-amber-500/90 text-white"
                                    }`}>{room.type === "dorm" ? "Mixed Dorm" : "Private"}</span>
                                  </div>
                                  {hasGuests && (
                                    <div className="absolute bottom-2 right-2">
                                      <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-ocean text-white">
                                        {assignedHere.length}/{room.maxGuests}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 p-5">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h3 className="font-bold text-stone-800 text-lg">{room.name}</h3>
                                      <p className="text-xs text-stone-500">{room.size} · Max {room.maxGuests} guest{room.maxGuests > 1 ? "s" : ""}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-xl font-bold text-ocean">€{Math.round(livePrice)}</p>
                                      <p className="text-[10px] text-stone-400 uppercase">
                                        {room.type === "dorm" ? "/ guest / night" : "/ room / night"}
                                      </p>
                                      {hasLiveData && liveAvail >= 0 && (
                                        <p className={`text-[10px] font-semibold mt-0.5 ${
                                          (liveAvail ?? 99) <= 2 ? "text-red-600" : "text-green-600"
                                        }`}>
                                          {liveAvail} {room.type === "dorm" ? "bed" : "unit"}{liveAvail !== 1 ? "s" : ""} left
                                        </p>
                                      )}
                                      {hasLiveData && liveAvail === -1 && (
                                        <p className="text-[10px] font-semibold mt-0.5 text-amber-600">
                                          Rate on request
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-sm text-stone-500 mb-3 line-clamp-2">{room.description}</p>
                                  <div className="flex flex-wrap gap-1.5 mb-3">
                                    {room.features.slice(0, 5).map((f) => (
                                      <span key={f} className="px-2 py-0.5 bg-stone-100 rounded-full text-[10px] text-stone-600 font-medium">{f}</span>
                                    ))}
                                  </div>
                                  {hasGuests && nights > 0 && (
                                    <div className="text-xs text-ocean font-semibold mb-1">
                                      {room.type === "dorm"
                                        ? `${assignedHere.length} guest${assignedHere.length > 1 ? "s" : ""} × €${Math.round(livePrice)} × ${nights} night${nights > 1 ? "s" : ""} = €${Math.round(livePrice) * assignedHere.length * nights}`
                                        : `€${Math.round(livePrice)} × ${nights} night${nights > 1 ? "s" : ""} = €${Math.round(livePrice) * nights}`
                                      }
                                    </div>
                                  )}
                                  <GuestChipsAssignment
                                    roomId={room.id}
                                    roomName={room.name}
                                    guests={booking.guests}
                                    maxGuests={room.maxGuests}
                                    onAssignGuest={assignGuestToRoom}
                                    onUnassignGuest={unassignGuest}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── STEP 3: ADD-ONS ── */}
                  {step === 3 && (
                    <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-stone-100">
                      <h2 className="text-xl font-display font-bold text-stone-800 mb-2 flex items-center gap-2">
                        <Sparkles className="text-ocean" size={22} /> Add extras to your trip
                      </h2>
                      <p className="text-stone-500 text-sm mb-4">Enhance your experience — all optional</p>

                      <div className="flex items-center gap-2 mb-6 p-2 bg-stone-50 rounded-xl">
                        <button onClick={() => setAddonMode("group")}
                          className={`flex-1 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                            booking.addonMode === "group" ? "bg-white shadow-sm text-ocean" : "text-stone-500"
                          }`}>
                          <ToggleLeft size={16} /> Per Group
                        </button>
                        <button onClick={() => setAddonMode("person")}
                          className={`flex-1 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                            booking.addonMode === "person" ? "bg-white shadow-sm text-ocean" : "text-stone-500"
                          }`}>
                          <ToggleRight size={16} /> Per Person
                        </button>
                      </div>

                      <div className="space-y-3">
                        {ADDONS.map((addon) => {
                          const sel = booking.addOns[addon.id] || { quantity: 0 };
                          return (
                            <div key={addon.id} className={`border-2 rounded-xl p-4 transition-all ${sel.quantity > 0 ? "border-ocean/30 bg-ocean/5" : "border-stone-200"}`}>
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center shrink-0">{addon.icon}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-stone-800 text-sm">{addon.name}</h3>
                                    <span className="font-bold text-ocean whitespace-nowrap">
                                      €{addon.price}
                                      <span className="text-[10px] text-stone-400 font-normal ml-0.5">
                                        /{addon.priceUnit === "perNight" ? "night" : addon.priceUnit === "perSession" ? "session" : "once"}
                                      </span>
                                    </span>
                                  </div>
                                  <p className="text-xs text-stone-500 mt-0.5">{addon.description}</p>
                                </div>
                              </div>

                              {booking.addonMode === "group" || addon.id === "airport-pickup" ? (
                                <div className="flex items-center justify-between gap-3 mt-3">
                                  {addon.id === "airport-pickup" && booking.addonMode === "person" && (
                                    <span className="text-[11px] text-stone-500 italic">Flat rate — covers up to 5 guests in one ride</span>
                                  )}
                                  <div className="flex items-center gap-3 ml-auto">
                                    <button onClick={() => setAddonGroupQty(addon.id, sel.quantity - 1)} disabled={sel.quantity <= 0}
                                      className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center disabled:opacity-30 hover:bg-stone-50"><Minus size={14} /></button>
                                    <span className="w-8 text-center font-bold text-stone-800">{sel.quantity}</span>
                                    <button onClick={() => setAddonGroupQty(addon.id, sel.quantity + 1)} disabled={sel.quantity >= addon.maxPerUnit}
                                      className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center disabled:opacity-30 hover:bg-stone-50"><Plus size={14} /></button>
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-3 space-y-2 pl-1">
                                  {booking.guests.map((guest) => {
                                    const gQty = sel.perGuest?.[guest.id] || 0;
                                    const cfg = guestConfig[guest.type];
                                    return (
                                      <div key={guest.id} className="flex items-center justify-between py-1">
                                        <span className="text-xs font-medium text-stone-600 flex items-center gap-1.5">
                                          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                                          {cfg.showType && <span className={cfg.color}>{cfg.chipIcon}</span>}
                                          {guest.label}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <button onClick={() => setAddonGuestQty(addon.id, guest.id, gQty - 1)} disabled={gQty <= 0}
                                            className="w-7 h-7 rounded border border-stone-200 flex items-center justify-center disabled:opacity-30"><Minus size={12} /></button>
                                          <span className="w-6 text-center text-sm font-bold">{gQty}</span>
                                          <button onClick={() => setAddonGuestQty(addon.id, guest.id, gQty + 1)} disabled={gQty >= addon.maxPerUnit}
                                            className="w-7 h-7 rounded border border-stone-200 flex items-center justify-center disabled:opacity-30"><Plus size={12} /></button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}

                              {sel.quantity > 0 && (
                                <p className="text-right text-xs text-ocean font-semibold mt-2">
                                  Subtotal: €{calcAddonLineTotal(addon, sel.quantity, booking.addonMode, totalPersons, nights)}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── STEP 4: DETAILS ── */}
                  {step === 4 && (
                    <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-stone-100">
                      <h2 className="text-xl font-display font-bold text-stone-800 mb-2 flex items-center gap-2">
                        <FileText className="text-ocean" size={22} /> Your Details
                      </h2>
                      <p className="text-stone-500 text-sm mb-6">We'll use this info to confirm your booking</p>

                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1 block">Full Name *</label>
                          <div className="relative">
                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input type="text" value={booking.contactName} onChange={(e) => setBooking({ contactName: e.target.value })}
                              placeholder="Your name" className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ocean/30 focus:border-ocean outline-none text-sm bg-cream/50" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1 block">Email *</label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input type="email" value={booking.contactEmail} onChange={(e) => setBooking({ contactEmail: e.target.value })}
                              placeholder="you@email.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ocean/30 focus:border-ocean outline-none text-sm bg-cream/50" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1 block">Phone</label>
                          <div className="relative">
                            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input type="tel" value={booking.contactPhone} onChange={(e) => setBooking({ contactPhone: e.target.value })}
                              placeholder="+1 234 567 8900" className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ocean/30 focus:border-ocean outline-none text-sm bg-cream/50" />
                          </div>
                        </div>

                        {/* ARRIVAL TIME */}
                        <div>
                          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1 block flex items-center gap-1.5">
                            <Timer size={12} /> Estimated Arrival Time
                          </label>
                          <div className="relative">
                            <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input type="time" value={booking.arrivalTime} onChange={(e) => setBooking({ arrivalTime: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ocean/30 focus:border-ocean outline-none text-sm bg-cream/50" />
                          </div>
                          <p className="text-[11px] text-stone-400 mt-1 flex items-center gap-1">
                            <AlertCircle size={11} /> Helps us prepare your room. Check-in from 14:00.
                          </p>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1 block">Special Requests</label>
                          <textarea value={booking.specialRequests} onChange={(e) => setBooking({ specialRequests: e.target.value })}
                            placeholder="Allergies, late check-in, extra bed..." rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ocean/30 focus:border-ocean outline-none text-sm bg-cream/50 resize-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 5: PAYMENT ── */}
                  {step === 5 && (
                    <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-stone-100">
                      <h2 className="text-xl font-display font-bold text-stone-800 mb-2 flex items-center gap-2">
                        <CreditCard className="text-ocean" size={22} /> Choose Payment Option
                      </h2>
                      <p className="text-stone-500 text-sm mb-6">Select how you'd like to secure your booking</p>

                      <div className="space-y-4">
                        <PaymentOptionCard
                          selected={booking.paymentChoice === "deposit"}
                          onClick={() => setBooking({ paymentChoice: "deposit" })}
                          icon={<Banknote size={22} />}
                          title="Pay 30% Deposit Now"
                          badge="Confirmed instantly"
                          badgeColor="bg-green-100 text-green-700"
                        >
                          <p className="mb-2">A <strong className="text-stone-700">€{price.depositAmount}</strong> deposit locks in your room. The dates are blocked for you the moment we receive it — no risk of someone else booking over you.</p>
                          <p className="text-xs text-stone-400">Remaining €{price.total - price.depositAmount} payable on arrival. Deposit is refundable up to 7 days before check-in.</p>
                        </PaymentOptionCard>

                        {booking.paymentChoice === "deposit" && (
                          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-stone-50 border border-stone-200 rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-4">
                              <Building2 size={18} className="text-ocean" />
                              <span className="font-bold text-stone-800 text-sm">Bank Transfer Details</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              {[
                                ["Bank", BANK_DETAILS.bankName],
                                ["Account name", BANK_DETAILS.accountName],
                                ["IBAN", BANK_DETAILS.iban],
                                ["SWIFT/BIC", BANK_DETAILS.swift],
                                ["Amount", `€${price.depositAmount}`],
                                ["Reference", `${BANK_DETAILS.reference} — ${booking.contactName || "Your name"}`],
                              ].map(([label, value]) => (
                                <div key={label} className="flex items-start justify-between gap-4">
                                  <span className="text-stone-500 text-xs shrink-0">{label}</span>
                                  <span className="font-mono font-semibold text-stone-800 text-xs text-right">{value}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                              <p className="text-xs text-amber-800 flex items-start gap-1.5">
                                <AlertCircle size={12} className="mt-0.5 shrink-0" />
                                Use your name as the payment reference. Once we receive the transfer, we'll get back to you within 24 hours to confirm your booking.
                              </p>
                            </div>
                          </motion.div>
                        )}

                        <PaymentOptionCard
                          selected={booking.paymentChoice === "arrival"}
                          onClick={() => setBooking({ paymentChoice: "arrival" })}
                          icon={<Clock size={22} />}
                          title="Pay on Arrival"
                          badge="Request only"
                          badgeColor="bg-amber-100 text-amber-700"
                        >
                          <p>No deposit, no guarantee. Your dates stay <strong className="text-stone-700">open</strong> — if someone else books with a deposit before we reply, the room may be gone.</p>
                          <p className="text-xs text-stone-400 mt-1">We reply within 24 hours either way. Full amount paid in cash on arrival.</p>
                        </PaymentOptionCard>
                      </div>

                      {booking.paymentChoice && (
                        <div className="mt-6 p-4 bg-stone-50 border border-stone-200 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 size={16} className={booking.paymentChoice === "deposit" ? "text-green-500" : "text-amber-500"} />
                            <span className="font-semibold text-stone-800 text-sm">
                              {booking.paymentChoice === "deposit" ? "Your room will be GUARANTEED" : "Your booking will be a REQUEST"}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500">
                            {booking.paymentChoice === "deposit"
                              ? "Once we receive your deposit, the room is yours — fully blocked off for your dates. We'll send a confirmation by email within 24 hours."
                              : "Without a deposit we can't hold the room. We review every request, but a guest paying a deposit can take it before we reply. We'll be in touch within 24 hours either way."}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── STEP 6: CONFIRM ── */}
                  {step === 6 && (
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-stone-100">
                        <h2 className="text-xl font-display font-bold text-stone-800 mb-6 flex items-center gap-2">
                          <Check className="text-green-500" size={22} /> Booking Summary
                        </h2>

                        {/* Dates */}
                        <div className="flex items-center gap-3 mb-4 p-3 bg-stone-50 rounded-xl">
                          <Calendar size={18} className="text-ocean" />
                          <div>
                            <p className="font-semibold text-stone-800">{fmtDate(booking.checkIn)} → {fmtDate(booking.checkOut)}</p>
                            <p className="text-xs text-stone-500">{nights} night{nights > 1 ? "s" : ""} · {totalPersons} person{totalPersons > 1 ? "s" : ""}</p>
                          </div>
                        </div>

                        {/* Guests */}
                        <div className="mb-4 p-3 bg-stone-50 rounded-xl">
                          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Guests</p>
                          <div className="flex flex-wrap gap-2">
                            {booking.maleCount > 0 && (
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold flex items-center gap-1">
                                <User size={11} /> {booking.maleCount} Male{booking.maleCount > 1 ? "s" : ""}
                              </span>
                            )}
                            {booking.femaleCount > 0 && (
                              <span className="text-xs px-2 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-semibold flex items-center gap-1">
                                <User size={11} /> {booking.femaleCount} Female{booking.femaleCount > 1 ? "s" : ""}
                              </span>
                            )}
                            {booking.coupleCount > 0 && (
                              <span className="text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold flex items-center gap-1">
                                <Heart size={11} /> {booking.coupleCount} Couple{booking.coupleCount > 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Arrival time */}
                        {booking.arrivalTime && (
                          <div className="mb-4 p-3 bg-stone-50 rounded-xl flex items-center gap-2">
                            <Clock size={16} className="text-ocean" />
                            <span className="text-sm text-stone-700">Estimated arrival: <strong>{booking.arrivalTime}</strong></span>
                          </div>
                        )}

                        {/* Package */}
                        {price.selectedPkg && price.packageFee > 0 && (
                          <div className="mb-4 p-3 bg-ocean/5 border border-ocean/20 rounded-xl flex items-center justify-between">
                            <div>
                              <span className="text-xs font-bold text-ocean uppercase">Package</span>
                              <p className="font-semibold text-stone-800">{price.selectedPkg.name}</p>
                              <p className="text-xs text-stone-500 mt-0.5">€{price.selectedPkg.priceFrom}/day × {nights} night{nights > 1 ? "s" : ""} × {totalPersons} guest{totalPersons > 1 ? "s" : ""}</p>
                            </div>
                            <span className="font-bold text-ocean text-lg">€{price.packageFee}</span>
                          </div>
                        )}

                        {/* Rooms */}
                        {price.roomBreakdown.length > 0 && (
                          <div className="space-y-3 mb-4">
                            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Room Assignments</h3>
                            {price.roomBreakdown.map((rb) => (
                              <div key={rb.room.id} className="p-3 border border-stone-200 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                      rb.room.type === "dorm" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                                    }`}>{rb.room.type}</span>
                                    <span className="font-semibold text-stone-800 text-sm">{rb.room.name}</span>
                                  </div>
                                  <span className="font-bold text-ocean">€{Math.round(rb.subtotal)}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {rb.guestIds.map((gId) => {
                                    const g = booking.guests.find((x) => x.id === gId);
                                    if (!g) return null;
                                    const cfg = guestConfig[g.type];
                                    return (
                                      <span key={gId} className={`text-xs px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.color} font-medium flex items-center gap-1`}>
                                        {cfg.showType && cfg.chipIcon} {g.label}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add-ons */}
                        {price.addonsTotal > 0 && (
                          <div className="mb-4">
                            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Add-ons</h3>
                            {Object.entries(booking.addOns).filter(([, s]) => s.quantity > 0).map(([id, sel]) => {
                              const a = ADDONS.find((x) => x.id === id);
                              if (!a) return null;
                              const lineTotal = calcAddonLineTotal(a, sel.quantity, booking.addonMode, totalPersons, nights);
                              return (
                                <div key={id} className="flex items-center justify-between py-1.5 text-sm">
                                  <span className="text-stone-600">
                                    {a.name} ×{sel.quantity}
                                  </span>
                                  <span className="font-semibold">€{lineTotal}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Payment choice summary */}
                        <div className="mb-4 p-3 rounded-xl border flex items-center gap-3 ${booking.paymentChoice === 'deposit' ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}">
                          {booking.paymentChoice === "deposit"
                            ? <Banknote size={16} className="text-green-600 shrink-0" />
                            : <Clock size={16} className="text-amber-600 shrink-0" />
                          }
                          <div>
                            <p className={`text-sm font-semibold ${booking.paymentChoice === "deposit" ? "text-green-800" : "text-amber-800"}`}>
                              {booking.paymentChoice === "deposit" ? "30% Deposit via Bank Transfer" : "Pay on Arrival"}
                            </p>
                            <p className="text-xs text-stone-500">
                              {booking.paymentChoice === "deposit"
                                ? `Deposit: €${price.depositAmount} · Remaining: €${price.total - price.depositAmount} on arrival`
                                : "Full amount on arrival · Request only — room not guaranteed"}
                            </p>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="border-t-2 border-dashed border-stone-200 pt-4 mt-4">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-stone-800">Total</span>
                            <span className="text-2xl font-display font-bold text-ocean">€{price.total}</span>
                          </div>
                          {booking.paymentChoice === "deposit" && (
                            <p className="text-right text-xs text-green-700 font-semibold mt-1">Due now: €{price.depositAmount}</p>
                          )}
                          <p className="text-xs text-stone-400 mt-1">Add-ons payable on arrival unless booked online</p>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-100">
                        <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Contact Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-stone-600"><User size={14} className="text-ocean" /> {booking.contactName}</div>
                          <div className="flex items-center gap-2 text-stone-600"><Mail size={14} className="text-ocean" /> {booking.contactEmail}</div>
                          {booking.contactPhone && <div className="flex items-center gap-2 text-stone-600"><Phone size={14} className="text-ocean" /> {booking.contactPhone}</div>}
                          {booking.arrivalTime && <div className="flex items-center gap-2 text-stone-600"><Clock size={14} className="text-ocean" /> Arriving at {booking.arrivalTime}</div>}
                          {booking.specialRequests && <div className="flex items-center gap-2 text-stone-600 sm:col-span-2"><FileText size={14} className="text-ocean" /> {booking.specialRequests}</div>}
                        </div>
                      </div>

                      {/* Submit result */}
                      {submitResult?.success ? (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                          className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 sm:p-8 text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                            <CheckCircle2 size={36} className="text-white" />
                          </div>
                          <h3 className="font-display text-2xl font-bold text-stone-800 mb-2">
                            {booking.paymentChoice === "deposit" ? "Your room is being secured!" : "Request received!"}
                          </h3>
                          <p className="text-stone-600 max-w-md mx-auto mb-5">
                            Thanks {booking.contactName.split(" ")[0]}!{" "}
                            {booking.paymentChoice === "deposit"
                              ? "Complete the bank transfer using the details below — once it lands, your dates are locked in. We'll be in touch within 24 hours to confirm everything."
                              : "We've received your request and will get back to you within 24 hours."
                            }
                          </p>

                          {submitResult.bookingIds && submitResult.bookingIds.length > 0 && (
                            <div className="bg-white rounded-xl p-4 mb-5 inline-block">
                              <div className="text-xs text-stone-500 uppercase tracking-wider mb-1">Booking Reference</div>
                              <div className="font-mono font-bold text-ocean text-lg flex items-center gap-2 justify-center">
                                {submitResult.bookingIds.map((id) => (
                                  <span key={id} className="bg-ocean/10 px-3 py-1 rounded-lg">#{id}</span>
                                ))}
                                <button onClick={() => navigator.clipboard?.writeText(submitResult.bookingIds!.join(", "))}
                                  className="text-stone-400 hover:text-ocean"><Copy size={14} /></button>
                              </div>
                            </div>
                          )}

                          {booking.paymentChoice === "deposit" && (
                            <div className="bg-white border border-stone-200 rounded-xl p-4 mb-5 text-left">
                              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <Building2 size={12} /> Bank Transfer Instructions
                              </p>
                              <div className="space-y-1.5 text-sm">
                                {[
                                  ["Bank", BANK_DETAILS.bankName],
                                  ["Account", BANK_DETAILS.accountName],
                                  ["IBAN", BANK_DETAILS.iban],
                                  ["SWIFT", BANK_DETAILS.swift],
                                  ["Amount", `€${price.depositAmount}`],
                                  ["Reference", `${booking.contactName} - ${submitResult.bookingIds?.[0] || "booking"}`],
                                ].map(([label, value]) => (
                                  <div key={label} className="flex justify-between gap-4">
                                    <span className="text-stone-400 text-xs shrink-0">{label}</span>
                                    <span className="font-mono font-semibold text-stone-800 text-xs text-right">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <a href="/"
                            className="inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-white text-stone-700 border-2 border-stone-200 rounded-xl font-bold text-sm hover:bg-stone-50 transition-all">
                            Back to Home
                          </a>
                        </motion.div>
                      ) : (
                        <>
                          {submitResult && !submitResult.success && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex gap-3 items-start">
                              <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                              <div className="text-sm">
                                <p className="font-semibold text-red-900 mb-1">Booking failed — please try again</p>
                                {submitResult.errors?.map((e, i) => (
                                  <p key={i} className="text-red-800 text-xs">{e}</p>
                                ))}
                              </div>
                            </div>
                          )}

                          <button onClick={handleConfirmBooking} disabled={submitting}
                            className={`w-full flex items-center justify-center gap-2 py-5 rounded-xl font-bold text-base transition-all shadow-lg ${
                              submitting ? "bg-stone-300 text-stone-500 cursor-not-allowed shadow-none"
                              : "bg-gradient-to-r from-ocean to-ocean-dark text-white hover:shadow-ocean/30 hover:scale-[1.01]"
                            }`}>
                            {submitting ? (
                              <><Loader2 size={20} className="animate-spin" /> Sending your booking…</>
                            ) : (
                              <>
                                <Check size={20} />
                                {booking.paymentChoice === "deposit" ? `Confirm & Pay €${price.depositAmount} Deposit` : "Send Booking Request"}
                                <ChevronRight size={18} />
                              </>
                            )}
                          </button>

                          <div className="grid grid-cols-3 gap-3 mt-4">
                            {[
                              { icon: <Shield size={16} />, label: "Secure" },
                              { icon: <Clock size={16} />, label: "Fast Confirm" },
                              { icon: <CreditCard size={16} />, label: "Free Cancel" },
                            ].map((b) => (
                              <div key={b.label} className="flex flex-col items-center gap-1 p-3 bg-stone-50 rounded-xl">
                                <span className="text-green-600">{b.icon}</span>
                                <span className="text-[10px] text-stone-500 font-medium">{b.label}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

              {/* NAVIGATION */}
              <div className="flex justify-between items-center mt-6">
                {step > 1 ? (
                  <button onClick={goBack} className="flex items-center gap-2 px-5 py-3 rounded-xl text-stone-600 hover:bg-stone-100 font-semibold text-sm transition-all">
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : <div />}

                {step < 6 ? (
                  <button onClick={goNext} disabled={!canProceed(step)}
                    className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all ${
                      canProceed(step) ? "bg-ocean text-white hover:bg-ocean-dark shadow-lg shadow-ocean/20" : "bg-stone-200 text-stone-400 cursor-not-allowed"
                    }`}>
                    Continue <ChevronRight size={16} />
                  </button>
                ) : null}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-44 bg-white rounded-xl p-5 shadow-sm border border-stone-100">
                <h3 className="font-display font-bold text-stone-800 mb-4 text-sm">Booking Summary</h3>

                {nights > 0 && (
                  <div className="flex items-center gap-2 text-sm mb-3 pb-3 border-b border-stone-100">
                    <Calendar size={14} className="text-ocean" />
                    <span className="text-stone-600">{fmtDate(booking.checkIn)} → {fmtDate(booking.checkOut)}</span>
                  </div>
                )}

                <div className="mb-3 pb-3 border-b border-stone-100">
                  <p className="text-xs font-semibold text-stone-500 uppercase mb-2">Guests ({totalPersons})</p>
                  <div className="flex flex-wrap gap-1">
                    {booking.maleCount > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold flex items-center gap-1"><User size={9} /> {booking.maleCount}M</span>}
                    {booking.femaleCount > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-semibold flex items-center gap-1"><User size={9} /> {booking.femaleCount}F</span>}
                    {booking.coupleCount > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold flex items-center gap-1"><Heart size={9} /> {booking.coupleCount}C</span>}
                  </div>
                </div>

                {price.selectedPkg && (
                  <div className="mb-3 pb-3 border-b border-stone-100">
                    <p className="text-xs font-semibold text-stone-500 uppercase mb-1">Package</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-600">{price.selectedPkg.name}</span>
                      <span className="font-semibold">€{price.accommodationTotal}</span>
                    </div>
                  </div>
                )}

                {price.roomBreakdown.length > 0 && (
                  <div className="mb-3 pb-3 border-b border-stone-100">
                    <p className="text-xs font-semibold text-stone-500 uppercase mb-2">Rooms</p>
                    {price.roomBreakdown.map((rb) => (
                      <div key={rb.room.id} className="mb-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-stone-600">{rb.room.name}</span>
                          <span className="font-semibold">€{Math.round(rb.subtotal)}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {rb.guestIds.map((gId) => {
                            const g = booking.guests.find((x) => x.id === gId);
                            if (!g) return null;
                            const cfg = guestConfig[g.type];
                            return (
                              <span key={gId} className={`text-[9px] px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color} font-medium flex items-center gap-0.5`}>
                                {cfg.showType && cfg.chipIcon} {g.label}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {price.addonsTotal > 0 && (
                  <div className="mb-3 pb-3 border-b border-stone-100">
                    <p className="text-xs font-semibold text-stone-500 uppercase mb-1">Add-ons</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-600">Extras</span>
                      <span className="font-semibold">€{price.addonsTotal}</span>
                    </div>
                  </div>
                )}

                {booking.paymentChoice && (
                  <div className="mb-3 pb-3 border-b border-stone-100">
                    <p className="text-xs font-semibold text-stone-500 uppercase mb-1">Payment</p>
                    <p className={`text-xs font-semibold flex items-center gap-1 ${booking.paymentChoice === "deposit" ? "text-green-700" : "text-amber-700"}`}>
                      {booking.paymentChoice === "deposit" ? <Banknote size={11} /> : <Clock size={11} />}
                      {booking.paymentChoice === "deposit" ? `30% deposit (€${price.depositAmount})` : "Pay on arrival"}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-stone-800">Total</span>
                  <span className="text-xl font-display font-bold text-ocean">€{price.total}</span>
                </div>
                {nights > 0 && price.total > 0 && (
                  <p className="text-[10px] text-stone-400 text-right mt-1">≈ €{Math.round(price.total / nights)} / night</p>
                )}

                {step < 6 && (
                  <button
                    onClick={goNext}
                    disabled={!canProceed(step)}
                    className={`mt-5 w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold transition-all ${
                      canProceed(step)
                        ? "bg-ocean text-white hover:bg-ocean-dark shadow-lg shadow-ocean/20"
                        : "bg-stone-200 text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile summary bar — always visible while booking on small screens.
          Hides on desktop (lg+) where the right-side sidebar takes over. */}
      {!noGuests && !noDates && step < 6 && (
        <>
          {/* Spacer so content is not hidden under the fixed bar */}
          <div className="h-24 lg:hidden" aria-hidden="true" />
          <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 px-4 py-3 lg:hidden shadow-[0_-8px_24px_rgba(15,42,58,0.08)]">
            <div className="flex items-center justify-between gap-3 max-w-[1240px] mx-auto">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider leading-tight">
                  {nights > 0 ? `${nights} night${nights !== 1 ? "s" : ""} · ${totalPersons} guest${totalPersons !== 1 ? "s" : ""}` : "Select dates"}
                </p>
                <p className="text-xl font-display font-bold text-ocean leading-tight truncate">
                  {price.total > 0 ? `€${price.total}` : "—"}
                  {nights > 0 && price.total > 0 && (
                    <span className="text-xs font-medium text-stone-400 ml-1.5">≈ €{Math.round(price.total / nights)}/n</span>
                  )}
                </p>
              </div>
              <button
                onClick={goNext}
                disabled={!canProceed(step)}
                className={`shrink-0 flex items-center justify-center gap-1.5 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                  canProceed(step)
                    ? "bg-ocean text-white hover:bg-ocean-dark shadow-md shadow-ocean/20 active:scale-95"
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
              >
                Continue <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}