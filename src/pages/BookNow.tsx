import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Users, ChevronRight, Check, Bed, Package, Plus,
  Minus, Shield, Clock, CreditCard, MessageCircle, ArrowLeft,
  Waves, Sun, Plane, UtensilsCrossed, Dumbbell, Sparkles,
  User, Mail, Phone, FileText, Tag, Heart, X,
  ToggleLeft, ToggleRight, ChevronDown, AlertCircle, CheckCircle2,
  Copy,
} from "lucide-react";
import { useBooking, type GuestType, type GuestProfile } from "../contexts/BookingContext";
import CustomCalendar from "../components/CustomCalendar";
import { rooms, packages, getFilteredRooms } from "../data/content";
import { submitBookingToBeds24 } from "../services/beds24";
import { useLiveAvailability } from "../hooks/useLiveAvailability";
import { LiveSyncIndicator, LiveSyncBanner } from "../components/LiveSyncIndicator";
import { Wifi, WifiOff, Loader2, AlertTriangle } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ADD-ONS CONFIGURATION
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
  { id: "surf-lesson", name: "Surf Lesson", description: "2hr session with ISA-certified instructor + board & wetsuit", price: 25, priceUnit: "perSession", icon: <Waves size={18} />, maxPerUnit: 10 },
  { id: "yoga-class", name: "Yoga Class", description: "Sunset rooftop yoga — all levels, mats provided", price: 10, priceUnit: "perSession", icon: <Sun size={18} />, maxPerUnit: 10 },
  { id: "airport-pickup", name: "Airport Pickup", description: "Private transfer from Agadir Al Massira Airport", price: 30, priceUnit: "fixed", icon: <Plane size={18} />, maxPerUnit: 1 },
  { id: "breakfast-upgrade", name: "Breakfast Upgrade", description: "Daily continental + Moroccan breakfast", price: 5, priceUnit: "perNight", icon: <UtensilsCrossed size={18} />, maxPerUnit: 1 },
  { id: "equipment-rental", name: "Equipment Rental", description: "Premium surfboard + wetsuit for your stay", price: 10, priceUnit: "perNight", icon: <Dumbbell size={18} />, maxPerUnit: 1 },
  { id: "massage", name: "Moroccan Massage", description: "1hr traditional massage to relax after surfing", price: 35, priceUnit: "fixed", icon: <Sparkles size={18} />, maxPerUnit: 5 },
];

/* ═══════════════════════════════════════════════════════════════
   GUEST TYPE HELPERS
   ═══════════════════════════════════════════════════════════════ */
const guestTypeConfig: Record<GuestType, { label: string; emoji: string; icon: React.ReactNode; color: string; bg: string; border: string; dot: string }> = {
  male:   { label: "Male",   emoji: "👨", icon: <User size={16} />,  color: "text-blue-600", bg: "bg-blue-50",  border: "border-blue-200", dot: "bg-blue-500" },
  female: { label: "Female", emoji: "👩", icon: <User size={16} />,  color: "text-pink-500", bg: "bg-pink-50",  border: "border-pink-200", dot: "bg-pink-500" },
  couple: { label: "Couple", emoji: "💑", icon: <Heart size={16} />, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", dot: "bg-orange-500" },
};

/* ═══════════════════════════════════════════════════════════════
   PRICE CALCULATION HOOK
   ═══════════════════════════════════════════════════════════════ */
function usePriceBreakdown() {
  const { booking, nights, totalPersons } = useBooking();

  const roomBreakdown = useMemo(() => {
    const roomMap = new Map<string, string[]>();
    booking.guests.forEach((g) => {
      if (g.roomId) {
        const existing = roomMap.get(g.roomId) || [];
        existing.push(g.id);
        roomMap.set(g.roomId, existing);
      }
    });
    const breakdown: { room: typeof rooms[0]; guestIds: string[]; subtotal: number }[] = [];
    roomMap.forEach((guestIds, roomId) => {
      const room = rooms.find((r) => r.id === roomId);
      if (room) {
        const subtotal = room.type === "dorm"
          ? room.price * nights * guestIds.length
          : room.price * nights;
        breakdown.push({ room, guestIds, subtotal });
      }
    });
    return breakdown;
  }, [booking.guests, nights]);

  const selectedPkg = packages.find((p) => p.id === booking.packageId);

  const accommodationTotal = useMemo(() => {
    if (selectedPkg) {
      return selectedPkg.priceUnit === "total"
        ? selectedPkg.priceFrom * totalPersons
        : selectedPkg.priceFrom * nights * totalPersons;
    }
    return roomBreakdown.reduce((sum, r) => sum + r.subtotal, 0);
  }, [selectedPkg, roomBreakdown, nights, totalPersons]);

  const addonsTotal = useMemo(() => {
    return Object.entries(booking.addOns).reduce((sum, [id, sel]) => {
      const addon = ADDONS.find((a) => a.id === id);
      if (!addon || sel.quantity <= 0) return sum;
      if (addon.priceUnit === "perNight") return sum + addon.price * sel.quantity * nights;
      return sum + addon.price * sel.quantity;
    }, 0);
  }, [booking.addOns, nights]);

  return { selectedPkg, roomBreakdown, accommodationTotal, addonsTotal, total: accommodationTotal + addonsTotal };
}

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */
function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function buildWhatsAppMessage(
  booking: ReturnType<typeof useBooking>["booking"],
  nights: number,
  total: number,
  roomBreakdown: ReturnType<typeof usePriceBreakdown>["roomBreakdown"]
) {
  const selectedPkg = packages.find((p) => p.id === booking.packageId);
  let msg = `*New Booking Request — TAMOUNT Surf House*\n\n`;
  msg += `*Dates:* ${fmtDate(booking.checkIn)} → ${fmtDate(booking.checkOut)} (${nights} nights)\n`;
  msg += `*Guests:* ${booking.maleCount} Male, ${booking.femaleCount} Female, ${booking.coupleCount} Couple(s)\n\n`;

  if (selectedPkg) {
    msg += `*Package:* ${selectedPkg.name}\n`;
  }

  // Room assignments
  if (roomBreakdown.length > 0) {
    msg += `*Room Assignments:*\n`;
    roomBreakdown.forEach((rb) => {
      const guestLabels = rb.guestIds.map((gId) => {
        const g = booking.guests.find((x) => x.id === gId);
        return g ? `${guestTypeConfig[g.type].label} - ${g.label}` : gId;
      }).join(", ");
      msg += `• ${rb.room.name}: ${guestLabels} — €${rb.subtotal}\n`;
    });
  }

  const addonLines = Object.entries(booking.addOns)
    .filter(([, sel]) => sel.quantity > 0)
    .map(([id, sel]) => {
      const a = ADDONS.find((ad) => ad.id === id);
      if (!a) return "";
      if (sel.perGuest && Object.keys(sel.perGuest).length > 0) {
        const details = Object.entries(sel.perGuest).filter(([, q]) => q > 0)
          .map(([gId, q]) => { const g = booking.guests.find((x) => x.id === gId); return `${g?.label}: x${q}`; }).join(", ");
        return `• ${a.name}: ${details}`;
      }
      return `• ${a.name} x${sel.quantity}`;
    }).filter(Boolean);

  if (addonLines.length) msg += `\n*Add-ons:*\n${addonLines.join("\n")}\n`;

  msg += `\n*Contact:* ${booking.contactName || "—"}\n`;
  msg += `*Email:* ${booking.contactEmail || "—"}\n`;
  msg += `*Phone:* ${booking.contactPhone || "—"}\n`;
  if (booking.specialRequests) msg += `\n*Requests:* ${booking.specialRequests}\n`;
  msg += `\n*Estimated Total:* €${total}\n`;
  msg += `\nPlease confirm availability 🏄`;
  return msg;
}

/* ═══════════════════════════════════════════════════════════════
   STEPS
   ═══════════════════════════════════════════════════════════════ */
const STEPS = [
  { n: 1, label: "Package", icon: <Package size={16} /> },
  { n: 2, label: "Rooms", icon: <Bed size={16} /> },
  { n: 3, label: "Add-ons", icon: <Sparkles size={16} /> },
  { n: 4, label: "Details", icon: <FileText size={16} /> },
  { n: 5, label: "Confirm", icon: <Check size={16} /> },
];

/* ═══════════════════════════════════════════════════════════════
   GUEST PICKER POPOVER (always accessible in top bar)
   Like the screenshot: Couples +/-, Females +/-, Males +/-
   ═══════════════════════════════════════════════════════════════ */
function GuestPicker({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { booking, setGuestCounts } = useBooking();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rows: { key: GuestType; label: string; emoji: string; count: number }[] = [
    { key: "couple", label: "Couples", emoji: "💑", count: booking.coupleCount },
    { key: "female", label: "Females", emoji: "👩", count: booking.femaleCount },
    { key: "male", label: "Males", emoji: "👨", count: booking.maleCount },
  ];

  const total = booking.maleCount + booking.femaleCount + booking.coupleCount * 2;

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
      className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 p-5 w-72 z-[100]">
      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-700 flex items-center gap-2">
              <span className="text-lg">{r.emoji}</span> {r.label}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (r.key === "couple") setGuestCounts(booking.maleCount, booking.femaleCount, Math.max(0, r.count - 1));
                  else if (r.key === "female") setGuestCounts(booking.maleCount, Math.max(0, r.count - 1), booking.coupleCount);
                  else setGuestCounts(Math.max(0, r.count - 1), booking.femaleCount, booking.coupleCount);
                }}
                disabled={r.count <= 0}
                className="w-9 h-9 rounded-full border-2 border-stone-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-ocean hover:text-ocean transition-all"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center font-bold text-stone-800 text-lg">{r.count}</span>
              <button
                onClick={() => {
                  if (r.key === "couple") setGuestCounts(booking.maleCount, booking.femaleCount, r.count + 1);
                  else if (r.key === "female") setGuestCounts(booking.maleCount, r.count + 1, booking.coupleCount);
                  else setGuestCounts(r.count + 1, booking.femaleCount, booking.coupleCount);
                }}
                className="w-9 h-9 rounded-full border-2 border-stone-300 flex items-center justify-center hover:border-ocean hover:text-ocean transition-all"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-stone-200 mt-4 pt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-stone-700">Total</span>
        <span className="font-bold text-ocean text-lg">{total}</span>
      </div>

      <button onClick={onClose}
        className="w-full mt-3 py-2 text-sm font-semibold text-ocean hover:bg-ocean/5 rounded-xl transition-all">
        Close
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATE PICKER POPOVER (for the top bar)
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
    const ci = booking.checkIn || new Date().toISOString().split("T")[0];
    const co = new Date(new Date(ci).getTime() + n * 86400000).toISOString().split("T")[0];
    setBooking({ checkIn: ci, checkOut: co });
  };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
      className="absolute top-full right-0 md:left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 p-5 w-[340px] z-[100]">
      
      {/* Quick nights */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickNights.map((n) => (
          <button key={n} onClick={() => setQuickNights(n)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              nights === n ? "bg-ocean text-white" : "bg-stone-100 text-stone-600 hover:bg-ocean/10"
            }`}>
            {n} nights
          </button>
        ))}
      </div>

      <CustomCalendar
        checkIn={booking.checkIn}
        checkOut={booking.checkOut}
        onSelect={(ci, co) => setBooking({ checkIn: ci, checkOut: co })}
      />

      {nights > 0 && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl text-sm">
          <p className="font-semibold text-green-800">{fmtDate(booking.checkIn)} → {fmtDate(booking.checkOut)}</p>
          <p className="text-green-600 text-xs">{nights} night{nights > 1 ? "s" : ""}</p>
        </div>
      )}

      {/* Promo Code */}
      <div className="mt-3">
        <div className="relative">
          <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input type="text" placeholder="Promo code" value={booking.promoCode}
            onChange={(e) => setBooking({ promoCode: e.target.value.toUpperCase() })}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:ring-2 focus:ring-ocean/30 focus:border-ocean outline-none text-xs" />
        </div>
      </div>

      <button onClick={onClose}
        className="w-full mt-3 py-2 text-sm font-semibold text-ocean hover:bg-ocean/5 rounded-xl transition-all">
        Done
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INLINE GUEST CHIPS (assignment directly on room card)
   No dropdown — all guests visible as tappable chips.
   ═══════════════════════════════════════════════════════════════ */
function GuestChipsAssignment({
  roomId, roomName, roomGenderPolicy, guests, maxGuests, onAssignGuest, onUnassignGuest,
}: {
  roomId: string;
  roomName: string;
  roomGenderPolicy: string;
  guests: GuestProfile[];
  maxGuests: number;
  onAssignGuest: (guestId: string, roomId: string) => void;  // moves guest here (from anywhere)
  onUnassignGuest: (guestId: string) => void;                // removes from any room
}) {
  const assignedHere = guests.filter((g) => g.roomId === roomId);
  const isFull = assignedHere.length >= maxGuests;

  // Determine eligibility per guest based on gender policy
  const isEligible = (g: GuestProfile) => {
    switch (roomGenderPolicy) {
      case "male": return g.type === "male";
      case "female": return g.type === "female";
      case "mixed": return g.type === "male" || g.type === "female";
      case "any": return true;
      default: return true;
    }
  };

  const eligibleGuests = guests.filter(isEligible);

  if (eligibleGuests.length === 0) {
    return (
      <div className="mt-3 p-3 bg-stone-50 rounded-xl text-center">
        <p className="text-xs text-stone-500">No guests in your group can stay in this room type</p>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-dashed border-stone-200">
      <div className="flex items-center justify-between mb-2.5">
        <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
          Tap to assign guests
        </label>
        <span className={`text-xs font-bold ${isFull ? "text-amber-600" : "text-stone-400"}`}>
          {assignedHere.length}/{maxGuests} {isFull && "· Full"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {eligibleGuests.map((g) => {
          const isHere = g.roomId === roomId;
          const isElsewhere = g.roomId !== null && g.roomId !== roomId;
          const cfg = guestTypeConfig[g.type];

          // Disabled only if: room is full AND this guest isn't already in it
          const blocked = isFull && !isHere;

          const handleClick = () => {
            if (blocked) return;
            if (isHere) onUnassignGuest(g.id);     // tap again to remove
            else onAssignGuest(g.id, roomId);      // tap to assign (moves from elsewhere if needed)
          };

          return (
            <button
              key={g.id}
              onClick={handleClick}
              disabled={blocked}
              title={
                blocked ? "Room is full"
                : isHere ? "Tap to remove from this room"
                : isElsewhere ? `Currently in another room — tap to move here`
                : "Tap to assign to this room"
              }
              className={`group inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold border-2 transition-all active:scale-95 ${
                isHere
                  ? `${cfg.bg} ${cfg.border} ${cfg.color} shadow-sm`
                  : blocked
                  ? "bg-stone-50 border-stone-200 text-stone-300 cursor-not-allowed"
                  : isElsewhere
                  ? "bg-white border-stone-200 text-stone-400 hover:border-ocean/40 hover:text-stone-600"
                  : "bg-white border-stone-300 text-stone-600 hover:border-ocean hover:bg-ocean/5 hover:text-ocean"
              }`}
            >
              {/* Status icon */}
              {isHere ? (
                <span className={`w-4 h-4 rounded-full ${cfg.dot} flex items-center justify-center text-white shrink-0`}>
                  <Check size={10} strokeWidth={3} />
                </span>
              ) : (
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  blocked ? "border-stone-200" : isElsewhere ? "border-stone-300" : "border-stone-400 group-hover:border-ocean"
                }`}>
                  {!blocked && <Plus size={10} strokeWidth={3} className={isElsewhere ? "text-stone-300" : "text-stone-400 group-hover:text-ocean"} />}
                </span>
              )}

              <span>{g.label}</span>

              {/* Show where they are if elsewhere */}
              {isElsewhere && (
                <span className="text-[10px] text-stone-400 italic">→ move here</span>
              )}

              {/* Remove X when assigned here */}
              {isHere && (
                <X size={11} className="text-stone-500 hover:text-red-500 ml-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {isFull && (
        <p className="text-[11px] text-amber-600 mt-2 flex items-center gap-1">
          <AlertCircle size={11} /> {roomName} is full — remove a guest to add a different one
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function BookNow() {
  const [step, setStep] = useState(1);
  const [searchParams] = useSearchParams();
  const ctx = useBooking();
  const { booking, setBooking, setGuestCounts, updateGuest, setPackage, setAddonMode, setAddonGroupQty, setAddonGuestQty, nights, totalPersons } = ctx;
  const price = usePriceBreakdown();

  // ─── LIVE Beds24 availability + prices with auto-refresh ───
  const { 
    liveData, 
    loading: liveLoading, 
    error: liveError, 
    isLive,
    lastUpdated,
    refresh: refreshAvailability 
  } = useLiveAvailability(
    booking.checkIn, 
    booking.checkOut, 
    totalPersons || 1,
    30000 // Auto-refresh every 30 seconds
  );

  // Popovers
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const closeGuestPicker = useCallback(() => setGuestPickerOpen(false), []);
  const closeDatePicker = useCallback(() => setDatePickerOpen(false), []);

  // ─── Booking submission state ───
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    bookingIds?: string[];
    errors?: string[];
    fallback?: "whatsapp";
  } | null>(null);

  /**
   * Build per-room aggregation: { roomId → numAdult }
   * Multiple guests assigned to the same room get summed.
   */
  const buildRoomAssignments = () => {
    const map = new Map<string, number>();
    for (const g of booking.guests) {
      if (!g.roomId) continue;
      const room = rooms.find((r) => r.id === g.roomId);
      if (!room) continue;
      // Skip if no Beds24 ID (would fail server-side)
      if (!room.beds24RoomId) continue;
      const count = g.type === "couple" ? 2 : 1;
      map.set(room.beds24RoomId, (map.get(room.beds24RoomId) || 0) + count);
    }
    return Array.from(map.entries()).map(([roomId, numAdult]) => ({ roomId, numAdult }));
  };

  /**
   * Submit booking to Beds24 via /api/beds24 proxy.
   * On success → show confirmation screen.
   * On failure or demo mode → fall back to WhatsApp.
   */
  const handleConfirmBooking = async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitResult(null);

    const roomAssignments = buildRoomAssignments();

    if (roomAssignments.length === 0) {
      setSubmitting(false);
      setSubmitResult({
        success: false,
        errors: ["No rooms assigned. Please go back and assign guests to rooms."],
      });
      return;
    }

    // Split contact name into first + last (Beds24 wants both)
    const fullName = booking.contactName.trim();
    const parts = fullName.split(/\s+/);
    const guestFirstName = parts.length > 1 ? parts.slice(0, -1).join(" ") : "";
    const guestName = parts.length > 1 ? parts[parts.length - 1] : fullName;

    // Build a notes block with package + add-ons context for the host
    const notesLines: string[] = [];
    if (booking.packageId) {
      const pkg = packages.find((p) => p.id === booking.packageId);
      if (pkg) notesLines.push(`Package: ${pkg.name}`);
    }
    notesLines.push(
      `Guests: ${booking.guests
        .map((g, i) => `${g.type === "couple" ? "Couple" : "Guest"} ${i + 1} (${g.type})`)
        .join(", ")}`
    );
    // Add-ons summary
    const addonQty = (id: string): number => {
      const sel = booking.addOns[id];
      if (!sel) return 0;
      if (booking.addonMode === "group") return sel.quantity || 0;
      return Object.values(sel.perGuest || {}).reduce(
        (s: number, v) => s + (Number(v) || 0),
        0
      );
    };
    const activeAddons = ADDONS.filter((a) => addonQty(a.id) > 0);
    if (activeAddons.length) {
      notesLines.push(
        `Add-ons (${booking.addonMode}): ` +
          activeAddons.map((a) => `${a.name} ×${addonQty(a.id)}`).join(", ")
      );
    }
    if (booking.specialRequests) notesLines.push(`Special: ${booking.specialRequests}`);
    notesLines.push(`Estimated total: €${price.total}`);

    const result = await submitBookingToBeds24({
      rooms: roomAssignments,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guestFirstName,
      guestName,
      guestEmail: booking.contactEmail,
      guestPhone: booking.contactPhone,
      notes: notesLines.join(" | "),
      status: 0, // Request — host confirms before charging
    });

    setSubmitting(false);
    setSubmitResult(result);

    // Auto-redirect to WhatsApp on demo mode / proxy failure
    if (!result.success && result.fallback === "whatsapp") {
      const msg = buildWhatsAppMessage(booking, nights, price.total, price.roomBreakdown);
      window.open(
        `https://wa.me/212612345678?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    }
  };

  // Pre-select from URL params
  useEffect(() => {
    const pkg = searchParams.get("package");
    if (pkg) { setPackage(pkg); }
  }, [searchParams, setPackage]);

  /* ─── Navigation ─── */
  const canProceed = (s: number) => {
    switch (s) {
      case 1: // Package — must have guests, dates, and a selection
        return totalPersons > 0 && nights > 0 && (booking.packageId !== null || true); // package OR room-only
      case 2: { // Rooms — all guests assigned
        if (booking.packageId) return booking.guests.every((g) => g.roomId !== null);
        return booking.guests.every((g) => g.roomId !== null);
      }
      case 3: return true; // Add-ons optional
      case 4: return booking.contactName.trim() !== "" && booking.contactEmail.trim() !== "";
      default: return true;
    }
  };

  const goNext = () => { if (canProceed(step) && step < 5) setStep(step + 1); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goBack = () => { if (step > 1) setStep(step - 1); window.scrollTo({ top: 0, behavior: "smooth" }); };

  /* ─── Guest room assignment handlers ─── */
  // Assign a guest to a room (auto-moves them if they were in another room)
  const assignGuestToRoom = (guestId: string, roomId: string) => {
    updateGuest(guestId, { roomId });
  };
  // Remove a guest from any room (sets roomId to null)
  const unassignGuest = (guestId: string) => {
    updateGuest(guestId, { roomId: null });
  };

  /* ─── Filtered rooms based on all guest types ─── */
  const filteredRooms = useMemo(() => {
    const guestTypes = new Set(booking.guests.map((g) => g.type));
    const allRoomIds = new Set<string>();
    guestTypes.forEach((type) => {
      getFilteredRooms(type).forEach((r) => allRoomIds.add(r.id));
    });
    return rooms.filter((r) => allRoomIds.has(r.id));
  }, [booking.guests]);

  /* ─── Unassigned guests ─── */
  const unassignedGuests = booking.guests.filter((g) => g.roomId === null);

  // Whether to show "you must add guests first" state
  const noGuests = totalPersons === 0;
  const noDates = nights === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white pt-20 pb-32">
      <div className="max-w-5xl mx-auto px-4">

        {/* ═══ HEADER ═══ */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-ocean mb-2">Book Your Stay</h1>
          <p className="text-stone-500 text-sm">TAMOUNT Surf House — Anza, Agadir</p>
        </motion.div>

        {/* ═══ LIVE SYNC STATUS BANNER ═══ */}
        {isLive && (
          <div className="mb-6">
            <LiveSyncBanner
              lastUpdated={lastUpdated}
              loading={liveLoading}
              error={liveError}
              onRetry={refreshAvailability}
            />
          </div>
        )}

        {/* ═══ STICKY TOP BAR — Guests + Dates (always visible) ═══ */}
        <div className="sticky top-16 md:top-20 z-40 mb-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-stone-200 p-3 md:p-4 flex items-center gap-3 flex-wrap">
            
            {/* Guest Picker Button */}
            <div className="relative">
              <button
                onClick={() => { setGuestPickerOpen(!guestPickerOpen); setDatePickerOpen(false); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all text-sm font-medium ${
                  guestPickerOpen ? "border-ocean bg-ocean/5 text-ocean" : 
                  totalPersons > 0 ? "border-ocean/30 bg-ocean/5 text-ocean" : "border-stone-300 text-stone-600 hover:border-ocean"
                }`}
              >
                <Users size={18} />
                <span className="font-semibold">
                  {totalPersons > 0 ? `Guests: ${totalPersons}` : "Add Guests"}
                </span>
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

            {/* Guest type pills */}
            {totalPersons > 0 && (
              <div className="hidden md:flex items-center gap-1.5">
                {booking.maleCount > 0 && (
                  <span className="text-[11px] px-2 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-semibold">
                    👨 {booking.maleCount}
                  </span>
                )}
                {booking.femaleCount > 0 && (
                  <span className="text-[11px] px-2 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-500 font-semibold">
                    👩 {booking.femaleCount}
                  </span>
                )}
                {booking.coupleCount > 0 && (
                  <span className="text-[11px] px-2 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-semibold">
                    💑 {booking.coupleCount}
                  </span>
                )}
              </div>
            )}

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-stone-200" />

            {/* Date Picker Button */}
            <div className="relative">
              <button
                onClick={() => { setDatePickerOpen(!datePickerOpen); setGuestPickerOpen(false); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all text-sm font-medium ${
                  datePickerOpen ? "border-ocean bg-ocean/5 text-ocean" :
                  nights > 0 ? "border-ocean/30 bg-ocean/5 text-ocean" : "border-stone-300 text-stone-600 hover:border-ocean"
                }`}
              >
                <Calendar size={18} />
                <span className="font-semibold">
                  {nights > 0 ? `${fmtDate(booking.checkIn)} — ${nights}n` : "Select Dates"}
                </span>
                <ChevronDown size={14} className={`transition-transform ${datePickerOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {datePickerOpen && <DatePicker isOpen={datePickerOpen} onClose={closeDatePicker} />}
              </AnimatePresence>
            </div>

            {/* Price display (right side) */}
            {price.total > 0 && (
              <div className="ml-auto text-right hidden md:block">
                <p className="text-xl font-display font-bold text-ocean">€{price.total}</p>
                {nights > 0 && <p className="text-[10px] text-stone-400">≈ €{Math.round(price.total / nights)}/night</p>}
              </div>
            )}
          </motion.div>
        </div>

        {/* ═══ ALERT: Need guests & dates ═══ */}
        {(noGuests || noDates) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <AlertCircle size={20} className="text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">
                {noGuests && noDates ? "Select your guests and dates to get started" :
                 noGuests ? "Add guests first using the selector above" :
                 "Select your dates using the calendar above"}
              </p>
              <p className="text-xs text-amber-600 mt-0.5">Use the buttons above to set up your booking</p>
            </div>
          </motion.div>
        )}

        {/* ═══ PROGRESS BAR ═══ */}
        {!noGuests && !noDates && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              {STEPS.map((s, i) => (
                <React.Fragment key={s.n}>
                  <button
                    onClick={() => { if (s.n < step) setStep(s.n); }}
                    className={`flex flex-col items-center gap-1 transition-all ${
                      s.n === step ? "scale-110" : s.n < step ? "cursor-pointer" : "opacity-40"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      s.n < step ? "bg-green-500 text-white" : s.n === step ? "bg-ocean text-white shadow-lg shadow-ocean/30" : "bg-stone-200 text-stone-400"
                    }`}>
                      {s.n < step ? <Check size={16} /> : s.icon}
                    </div>
                    <span className={`text-[10px] md:text-xs font-semibold ${s.n === step ? "text-ocean" : "text-stone-400"}`}>{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 rounded ${s.n < step ? "bg-green-400" : "bg-stone-200"}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* ═══ LAYOUT: Main + Sidebar ═══ */}
        {!noGuests && !noDates && (
          <div className="flex flex-col lg:flex-row gap-6">

            {/* ─── MAIN PANEL ─── */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

                  {/* ══════════════════════════════════════════
                     STEP 1: PACKAGE — Choose Package or Room Only
                     ══════════════════════════════════════════ */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100">
                        <h2 className="text-xl font-display font-bold text-stone-800 mb-2 flex items-center gap-2">
                          <Package className="text-ocean" size={22} /> Choose your experience
                        </h2>
                        <p className="text-stone-500 text-sm mb-6">Pick a surf package for the full experience, or go room-only for maximum flexibility</p>

                        {/* Room Only Card */}
                        <motion.button
                          onClick={() => setPackage(null)}
                          className={`w-full text-left border-2 rounded-2xl p-5 mb-4 transition-all ${
                            booking.packageId === null ? "border-ocean bg-ocean/5 shadow-md shadow-ocean/10" : "border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                              booking.packageId === null ? "bg-ocean text-white" : "bg-stone-100 text-stone-400"
                            }`}>
                              <Bed size={24} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-stone-800 text-lg">Room Only</h3>
                              <p className="text-sm text-stone-500">Just accommodation — choose your room in the next step</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              booking.packageId === null ? "bg-ocean border-ocean text-white" : "border-stone-300"
                            }`}>
                              {booking.packageId === null && <Check size={14} />}
                            </div>
                          </div>
                        </motion.button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-6">
                          <div className="flex-1 h-px bg-stone-200" />
                          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Or choose a package</span>
                          <div className="flex-1 h-px bg-stone-200" />
                        </div>

                        {/* Packages */}
                        <div className="space-y-4">
                          {packages.map((pkg) => {
                            const isSelected = booking.packageId === pkg.id;
                            const pkgPrice = pkg.priceUnit === "total"
                              ? pkg.priceFrom * totalPersons
                              : pkg.priceFrom * nights * totalPersons;

                            return (
                              <motion.button key={pkg.id} layout
                                onClick={() => setPackage(isSelected ? null : pkg.id)}
                                className={`w-full text-left border-2 rounded-2xl overflow-hidden transition-all ${
                                  isSelected ? "border-ocean shadow-md shadow-ocean/10" : "border-stone-200 hover:border-stone-300"
                                }`}
                              >
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

                                    {/* Total for this group */}
                                    {isSelected && (
                                      <div className="mt-3 p-2 bg-ocean/10 rounded-lg">
                                        <p className="text-xs font-semibold text-ocean">
                                          {totalPersons} person{totalPersons > 1 ? "s" : ""} × €{pkg.priceFrom}/{pkg.priceUnit === "total" ? "person" : "person/night"}
                                          {pkg.priceUnit !== "total" ? ` × ${nights} nights` : ""} = <span className="text-sm">€{pkgPrice}</span>
                                        </p>
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

                  {/* ══════════════════════════════════════════
                     STEP 2: ROOMS — Assign Guests to Rooms
                     ══════════════════════════════════════════ */}
                  {step === 2 && (
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100">
                      <h2 className="text-xl font-display font-bold text-stone-800 mb-2 flex items-center gap-2">
                        <Bed className="text-ocean" size={22} /> Assign guests to rooms
                      </h2>
                      <p className="text-stone-500 text-sm mb-2">
                        {booking.packageId
                          ? "Now assign each guest to their preferred room"
                          : "Select a room for each guest — rooms are filtered by guest type"}
                      </p>

                      {/* Guest legend */}
                      <div className="flex flex-wrap gap-2 mb-4 p-3 bg-stone-50 rounded-xl">
                        <span className="text-xs font-semibold text-stone-500 mr-1">Your guests:</span>
                        {booking.guests.map((g) => {
                          const cfg = guestTypeConfig[g.type];
                          const assigned = g.roomId !== null;
                          return (
                            <span key={g.id} className={`text-[11px] px-2.5 py-1 rounded-full border font-semibold flex items-center gap-1 ${
                              assigned ? `${cfg.bg} ${cfg.border} ${cfg.color}` : "bg-amber-50 border-amber-200 text-amber-700"
                            }`}>
                              {assigned ? <Check size={10} /> : <AlertCircle size={10} />}
                              {cfg.emoji} {g.label}
                            </span>
                          );
                        })}
                      </div>

                      {/* Unassigned Warning */}
                      {unassignedGuests.length > 0 && (
                        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
                          <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-amber-800">
                              {unassignedGuests.length} guest{unassignedGuests.length > 1 ? "s" : ""} not assigned yet
                            </p>
                            <p className="text-xs text-amber-600 mt-0.5">
                              Tap a guest chip on any room below to assign them
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Loading State */}
                      {liveLoading && (
                        <div className="text-center py-12">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-ocean border-t-transparent mb-3"></div>
                          <p className="text-stone-600 font-medium">Checking live availability from Beds24...</p>
                          <p className="text-stone-400 text-sm mt-1">This takes a few seconds</p>
                        </div>
                      )}

                      {/* No Rooms Available */}
                      {!liveLoading && filteredRooms.filter((room) => {
                        const live = liveData[room.beds24RoomId];
                        const liveAvail = live?.available ?? 0;
                        const hasLiveAvailData = isLive && live && typeof liveAvail === "number";
                        return hasLiveAvailData && liveAvail > 0;
                      }).length === 0 && booking.guests.length > 0 && (
                        <div className="text-center py-12 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
                          <AlertCircle className="mx-auto text-amber-500 mb-3" size={48} strokeWidth={1.5} />
                          <h3 className="text-lg font-bold text-stone-800 mb-2">No rooms available for these dates</h3>
                          <p className="text-stone-500 text-sm mb-4 max-w-md mx-auto">
                            All rooms are currently booked for your selected dates. Please try different dates or contact us directly.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <button
                              onClick={() => setDatePickerOpen(true)}
                              className="px-4 py-2.5 bg-ocean text-white rounded-xl font-semibold text-sm hover:bg-ocean/90 transition-colors"
                            >
                              📅 Change Dates
                            </button>
                            <a
                              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "212612345678"}?text=${encodeURIComponent(
                                `Hi! I checked availability for ${booking.checkIn} to ${booking.checkOut} but no rooms are available. What are my options?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 bg-green-500 text-white rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                            >
                              💬 Contact on WhatsApp
                            </a>
                          </div>
                        </div>
                      )}

                      {/* API Error / Not Connected */}
                      {!liveLoading && liveError && booking.guests.length > 0 && (
                        <div className="text-center py-12 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200">
                          <AlertTriangle className="mx-auto text-amber-600 mb-3" size={48} strokeWidth={1.5} />
                          <h3 className="text-lg font-bold text-stone-800 mb-2">Unable to check availability</h3>
                          <p className="text-stone-500 text-sm mb-4 max-w-md mx-auto">
                            We couldn't connect to our booking system. This usually means the site isn't deployed on Vercel yet.
                          </p>
                          <p className="text-amber-700 text-xs font-mono bg-amber-100 inline-block px-3 py-1.5 rounded-lg mb-4">
                            {liveError}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <a
                              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "212612345678"}?text=${encodeURIComponent(
                                `Hi! I want to book for ${booking.checkIn} to ${booking.checkOut} (${totalPersons} guests). Can you check availability?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 bg-green-500 text-white rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                            >
                              💬 Book via WhatsApp
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Room Cards */}
                      <div className="space-y-4">
                        {filteredRooms.map((room) => {
                          const assignedHere = booking.guests.filter((g) => g.roomId === room.id);
                          const hasGuests = assignedHere.length > 0;

                          // ─── LIVE DATA REQUIRED (no static fallback) ───
                          const live = liveData[room.beds24RoomId];
                          const livePrice = live?.avgNightly && live.avgNightly > 0 ? live.avgNightly : room.price;
                          const liveAvail = live?.available ?? 0;
                          const hasLiveAvailData = isLive && live && typeof liveAvail === "number";
                          
                          // HIDE room if: no live data OR availability is 0 (and no guests already assigned)
                          const isUnavailable = !hasLiveAvailData || liveAvail === 0;
                          if (isUnavailable && !hasGuests) return null;

                          return (
                            <motion.div key={room.id} layout
                              className={`border-2 rounded-2xl transition-all ${
                                hasGuests ? "border-ocean shadow-md shadow-ocean/10" : "border-stone-200 hover:border-stone-300"
                              }`}
                            >
                              <div className="flex flex-col md:flex-row">
                                {/* Room Image — only this gets overflow-hidden, not the parent */}
                                <div className="md:w-48 h-40 md:h-auto relative overflow-hidden md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none">
                                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                                  <div className="absolute top-2 left-2 flex gap-1">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                      room.type === "dorm" ? "bg-blue-500/90 text-white" : "bg-amber-500/90 text-white"
                                    }`}>{room.type === "dorm" ? "Shared Dorm" : "Private"}</span>
                                  </div>
                                  {room.genderPolicy !== "any" && (
                                    <div className="absolute top-2 right-2">
                                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                        room.genderPolicy === "male" ? "bg-blue-600/90 text-white" :
                                        room.genderPolicy === "female" ? "bg-pink-500/90 text-white" :
                                        "bg-purple-500/90 text-white"
                                      }`}>
                                        {room.genderPolicy === "male" ? "♂ Male" : room.genderPolicy === "female" ? "♀ Female" : "Mixed"}
                                      </span>
                                    </div>
                                  )}
                                  {hasGuests && (
                                    <div className="absolute bottom-2 right-2">
                                      <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-ocean text-white">
                                        {assignedHere.length}/{room.maxGuests}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Room Info */}
                                <div className="flex-1 p-5">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h3 className="font-bold text-stone-800 text-lg">{room.name}</h3>
                                      <p className="text-xs text-stone-500">{room.size} · Max {room.maxGuests} guest{room.maxGuests > 1 ? "s" : ""}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-xl font-bold text-ocean">€{Math.round(livePrice)}</p>
                                      <p className="text-[10px] text-stone-400 uppercase">
                                        {room.type === "dorm" ? "/ bed / night" : "/ room / night"}
                                      </p>
                                      {hasLiveAvailData && (
                                        <p className={`text-[10px] font-semibold mt-0.5 ${
                                          (liveAvail ?? 99) <= 2 ? "text-red-600" : "text-green-600"
                                        }`}>
                                          {liveAvail} {room.type === "dorm" ? "bed" : "unit"}{liveAvail !== 1 ? "s" : ""} left
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <p className="text-sm text-stone-500 mb-3 line-clamp-2">{room.description}</p>

                                  {/* Features */}
                                  <div className="flex flex-wrap gap-1.5 mb-3">
                                    {room.features.slice(0, 5).map((f) => (
                                      <span key={f} className="px-2 py-0.5 bg-stone-100 rounded-full text-[10px] text-stone-600 font-medium">{f}</span>
                                    ))}
                                  </div>

                                  {/* Price Calc */}
                                  {hasGuests && nights > 0 && (
                                    <div className="text-xs text-ocean font-semibold mb-1">
                                      {room.type === "dorm"
                                        ? `${assignedHere.length} bed${assignedHere.length > 1 ? "s" : ""} × ${nights} night${nights > 1 ? "s" : ""} = €${room.price * assignedHere.length * nights}`
                                        : `€${room.price} × ${nights} night${nights > 1 ? "s" : ""} = €${room.price * nights}`
                                      }
                                    </div>
                                  )}

                                  {/* Inline guest chips — no dropdown, no clipping */}
                                  <GuestChipsAssignment
                                    roomId={room.id}
                                    roomName={room.name}
                                    roomGenderPolicy={room.genderPolicy}
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

                  {/* ══════════════════════════════════════════
                     STEP 3: EXTRAS — Add-ons
                     ══════════════════════════════════════════ */}
                  {step === 3 && (
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100">
                      <h2 className="text-xl font-display font-bold text-stone-800 mb-2 flex items-center gap-2">
                        <Sparkles className="text-ocean" size={22} /> Add extras to your trip
                      </h2>
                      <p className="text-stone-500 text-sm mb-4">Enhance your experience with activities & services</p>

                      {/* Per Group / Per Person Toggle */}
                      <div className="flex items-center gap-2 mb-6 p-2 bg-stone-50 rounded-xl">
                        <button onClick={() => setAddonMode("group")}
                          className={`flex-1 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                            booking.addonMode === "group" ? "bg-white shadow-sm text-ocean" : "text-stone-500 hover:text-stone-700"
                          }`}><ToggleLeft size={16} /> Per Group</button>
                        <button onClick={() => setAddonMode("person")}
                          className={`flex-1 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                            booking.addonMode === "person" ? "bg-white shadow-sm text-ocean" : "text-stone-500 hover:text-stone-700"
                          }`}><ToggleRight size={16} /> Per Person</button>
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

                              {booking.addonMode === "group" ? (
                                <div className="flex items-center justify-end gap-3 mt-3">
                                  <button onClick={() => setAddonGroupQty(addon.id, sel.quantity - 1)} disabled={sel.quantity <= 0}
                                    className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center disabled:opacity-30 hover:bg-stone-50"><Minus size={14} /></button>
                                  <span className="w-8 text-center font-bold text-stone-800">{sel.quantity}</span>
                                  <button onClick={() => setAddonGroupQty(addon.id, sel.quantity + 1)} disabled={sel.quantity >= addon.maxPerUnit}
                                    className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center disabled:opacity-30 hover:bg-stone-50"><Plus size={14} /></button>
                                </div>
                              ) : (
                                <div className="mt-3 space-y-2 pl-1">
                                  {booking.guests.map((guest) => {
                                    const gQty = sel.perGuest?.[guest.id] || 0;
                                    return (
                                      <div key={guest.id} className="flex items-center justify-between py-1">
                                        <span className="text-xs font-medium text-stone-600 flex items-center gap-1.5">
                                          <span className={`w-2 h-2 rounded-full ${guestTypeConfig[guest.type].dot}`} />
                                          {guest.label}
                                          <span className="text-stone-400">({guestTypeConfig[guest.type].label})</span>
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <button onClick={() => setAddonGuestQty(addon.id, guest.id, gQty - 1)} disabled={gQty <= 0}
                                            className="w-7 h-7 rounded border border-stone-200 flex items-center justify-center disabled:opacity-30 text-xs"><Minus size={12} /></button>
                                          <span className="w-6 text-center text-sm font-bold">{gQty}</span>
                                          <button onClick={() => setAddonGuestQty(addon.id, guest.id, gQty + 1)} disabled={gQty >= addon.maxPerUnit}
                                            className="w-7 h-7 rounded border border-stone-200 flex items-center justify-center disabled:opacity-30 text-xs"><Plus size={12} /></button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}

                              {sel.quantity > 0 && (
                                <p className="text-right text-xs text-ocean font-semibold mt-2">
                                  Subtotal: €{addon.priceUnit === "perNight" ? addon.price * sel.quantity * nights : addon.price * sel.quantity}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-xs text-stone-400 mt-4 text-center">All add-ons are optional. Skip this step if you prefer.</p>
                    </div>
                  )}

                  {/* ══════════════════════════════════════════
                     STEP 4: DETAILS — Contact Info
                     ══════════════════════════════════════════ */}
                  {step === 4 && (
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100">
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
                        <div>
                          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1 block">Special Requests</label>
                          <textarea value={booking.specialRequests} onChange={(e) => setBooking({ specialRequests: e.target.value })}
                            placeholder="Allergies, late check-in, extra bed..." rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ocean/30 focus:border-ocean outline-none text-sm bg-cream/50 resize-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ══════════════════════════════════════════
                     STEP 5: CONFIRM — Summary & Book
                     ══════════════════════════════════════════ */}
                  {step === 5 && (
                    <div className="space-y-4">
                      {/* Summary Card */}
                      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100">
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

                        {/* Guest Summary */}
                        <div className="mb-4 p-3 bg-stone-50 rounded-xl">
                          <p className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Guests</p>
                          <div className="flex flex-wrap gap-2">
                            {booking.maleCount > 0 && <span className="text-xs px-2 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-semibold">👨 {booking.maleCount} Male{booking.maleCount > 1 ? "s" : ""}</span>}
                            {booking.femaleCount > 0 && <span className="text-xs px-2 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-500 font-semibold">👩 {booking.femaleCount} Female{booking.femaleCount > 1 ? "s" : ""}</span>}
                            {booking.coupleCount > 0 && <span className="text-xs px-2 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-semibold">💑 {booking.coupleCount} Couple{booking.coupleCount > 1 ? "s" : ""}</span>}
                          </div>
                        </div>

                        {/* Package */}
                        {price.selectedPkg && (
                          <div className="mb-4 p-3 bg-ocean/5 border border-ocean/20 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xs font-bold text-ocean uppercase">Package</span>
                                <p className="font-semibold text-stone-800">{price.selectedPkg.name}</p>
                              </div>
                              <span className="font-bold text-ocean text-lg">€{price.accommodationTotal}</span>
                            </div>
                          </div>
                        )}

                        {/* Rooms by assignment */}
                        {price.roomBreakdown.length > 0 && (
                          <div className="space-y-3 mb-4">
                            <h3 className="text-sm font-bold text-stone-600 uppercase tracking-wider">Room Assignments</h3>
                            {price.roomBreakdown.map((rb) => (
                              <div key={rb.room.id} className="p-3 border border-stone-200 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                      rb.room.type === "dorm" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                                    }`}>{rb.room.type}</span>
                                    <span className="font-semibold text-stone-800 text-sm">{rb.room.name}</span>
                                  </div>
                                  <span className="font-bold text-ocean">€{rb.subtotal}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {rb.guestIds.map((gId) => {
                                    const g = booking.guests.find((x) => x.id === gId);
                                    if (!g) return null;
                                    return (
                                      <span key={gId} className={`text-xs px-2 py-0.5 rounded-full border ${guestTypeConfig[g.type].bg} ${guestTypeConfig[g.type].border} ${guestTypeConfig[g.type].color} font-medium`}>
                                        {guestTypeConfig[g.type].emoji} {g.label}
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
                            <h3 className="text-sm font-bold text-stone-600 uppercase tracking-wider mb-2">Add-ons</h3>
                            {Object.entries(booking.addOns).filter(([, s]) => s.quantity > 0).map(([id, sel]) => {
                              const a = ADDONS.find((x) => x.id === id);
                              if (!a) return null;
                              const lineTotal = a.priceUnit === "perNight" ? a.price * sel.quantity * nights : a.price * sel.quantity;
                              return (
                                <div key={id} className="flex items-center justify-between py-1.5 text-sm">
                                  <span className="text-stone-600">{a.name} ×{sel.quantity}</span>
                                  <span className="font-semibold text-stone-800">€{lineTotal}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Total */}
                        <div className="border-t-2 border-dashed border-stone-200 pt-4 mt-4">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-stone-800">Total</span>
                            <span className="text-2xl font-display font-bold text-ocean">€{price.total}</span>
                          </div>
                          <p className="text-xs text-stone-400 mt-1">Add-ons payable on arrival unless booked online</p>
                        </div>
                      </div>

                      {/* Contact Info Preview */}
                      <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
                        <h3 className="text-sm font-bold text-stone-600 uppercase tracking-wider mb-3">Contact Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-stone-600"><User size={14} className="text-ocean" /> {booking.contactName}</div>
                          <div className="flex items-center gap-2 text-stone-600"><Mail size={14} className="text-ocean" /> {booking.contactEmail}</div>
                          {booking.contactPhone && <div className="flex items-center gap-2 text-stone-600"><Phone size={14} className="text-ocean" /> {booking.contactPhone}</div>}
                          {booking.specialRequests && <div className="flex items-center gap-2 text-stone-600 sm:col-span-2"><FileText size={14} className="text-ocean" /> {booking.specialRequests}</div>}
                        </div>
                      </div>

                      {/* ═══ BOOKING ACTIONS / RESULT ═══ */}
                      {submitResult?.success ? (
                        /* ─── SUCCESS SCREEN ─── */
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 rounded-3xl p-6 sm:p-8 text-center"
                        >
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                            <CheckCircle2 size={36} className="text-white" />
                          </div>
                          <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-800 mb-2">
                            Booking Request Received! 🌊
                          </h3>
                          <p className="text-stone-600 max-w-md mx-auto mb-5">
                            Thanks {booking.contactName.split(" ")[0]}! Your reservation is in our system.
                            We'll review and send you a payment link within <strong>1 hour</strong> at{" "}
                            <strong>{booking.contactEmail}</strong>.
                          </p>

                          {submitResult.bookingIds && submitResult.bookingIds.length > 0 && (
                            <div className="bg-white rounded-2xl p-4 mb-5 inline-block">
                              <div className="text-xs text-stone-500 uppercase tracking-wider mb-1">
                                Booking Reference{submitResult.bookingIds.length > 1 ? "s" : ""}
                              </div>
                              <div className="font-mono font-bold text-ocean text-lg flex items-center gap-2 justify-center flex-wrap">
                                {submitResult.bookingIds.map((id) => (
                                  <span key={id} className="bg-ocean/10 px-3 py-1 rounded-lg">
                                    #{id}
                                  </span>
                                ))}
                                <button
                                  onClick={() => navigator.clipboard?.writeText(submitResult.bookingIds!.join(", "))}
                                  className="text-stone-400 hover:text-ocean transition-colors"
                                  title="Copy"
                                >
                                  <Copy size={14} />
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                            <a
                              href={`https://wa.me/212612345678?text=${encodeURIComponent(
                                `Hi! I just made a booking request${
                                  submitResult.bookingIds?.length
                                    ? ` (Ref: ${submitResult.bookingIds.join(", ")})`
                                    : ""
                                }. My name is ${booking.contactName}. Looking forward to it! 🏄`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 py-3.5 bg-green-500 text-white rounded-2xl font-bold text-sm hover:bg-green-600 transition-all"
                            >
                              <MessageCircle size={18} /> Chat with us on WhatsApp
                            </a>
                            <a
                              href="/"
                              className="flex items-center justify-center gap-2 py-3.5 bg-white text-stone-700 border-2 border-stone-200 rounded-2xl font-bold text-sm hover:bg-stone-50 transition-all"
                            >
                              Back to Home
                            </a>
                          </div>

                          <p className="text-xs text-stone-500 mt-5">
                            📧 A confirmation email is on its way. Add-ons listed above are payable on arrival
                            unless included in your payment link.
                          </p>
                        </motion.div>
                      ) : (
                        <>
                          {/* ─── ERROR / WHATSAPP FALLBACK NOTICE ─── */}
                          {submitResult && !submitResult.success && (
                            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex gap-3 items-start">
                              <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                              <div className="flex-1 text-sm">
                                <p className="font-semibold text-amber-900 mb-1">
                                  {submitResult.fallback === "whatsapp"
                                    ? "Live booking unavailable — opened WhatsApp instead"
                                    : "We couldn't process your booking online"}
                                </p>
                                {submitResult.errors?.map((e, i) => (
                                  <p key={i} className="text-amber-800 text-xs">{e}</p>
                                ))}
                                <p className="text-amber-800 text-xs mt-1">
                                  No worries — message us on WhatsApp and we'll book you in manually within minutes.
                                </p>
                              </div>
                            </div>
                          )}

                          {/* ─── PRIMARY ACTION ─── */}
                          <button
                            onClick={handleConfirmBooking}
                            disabled={submitting}
                            className={`w-full flex items-center justify-center gap-2 py-5 rounded-2xl font-bold text-base transition-all shadow-lg ${
                              submitting
                                ? "bg-stone-300 text-stone-500 cursor-not-allowed shadow-none"
                                : "bg-gradient-to-r from-ocean to-ocean-dark text-white hover:shadow-ocean/30 hover:scale-[1.01]"
                            }`}
                          >
                            {submitting ? (
                              <>
                                <Loader2 size={20} className="animate-spin" />
                                Sending your booking…
                              </>
                            ) : (
                              <>
                                <Check size={20} /> Confirm Booking — €{price.total}
                                <ChevronRight size={18} />
                              </>
                            )}
                          </button>

                          {/* ─── ALTERNATIVE: WHATSAPP ─── */}
                          <a
                            href={`https://wa.me/212612345678?text=${encodeURIComponent(
                              buildWhatsAppMessage(booking, nights, price.total, price.roomBreakdown)
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-green-500 text-green-600 rounded-2xl font-semibold text-sm hover:bg-green-50 transition-all"
                          >
                            <MessageCircle size={18} /> Or book via WhatsApp instead
                          </a>

                          <p className="text-center text-xs text-stone-500 mt-2">
                            🔒 Your booking is sent as a request. We'll confirm and email a secure payment link within 1 hour.
                          </p>

                          {/* Trust Badges */}
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

              {/* ═══ NAVIGATION BUTTONS ═══ */}
              <div className="flex justify-between items-center mt-6">
                {step > 1 ? (
                  <button onClick={goBack} className="flex items-center gap-2 px-5 py-3 rounded-xl text-stone-600 hover:bg-stone-100 font-semibold text-sm transition-all">
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : <div />}

                {step < 5 ? (
                  <button onClick={goNext} disabled={!canProceed(step)}
                    className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all ${
                      canProceed(step)
                        ? "bg-ocean text-white hover:bg-ocean-dark shadow-lg shadow-ocean/20"
                        : "bg-stone-200 text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                ) : null}
              </div>
            </div>

            {/* ─── SIDEBAR (Desktop only) ─── */}
            <div className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-44 bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
                <h3 className="font-display font-bold text-stone-800 mb-4 text-sm">Booking Summary</h3>

                {/* Dates */}
                {nights > 0 && (
                  <div className="flex items-center gap-2 text-sm mb-3 pb-3 border-b border-stone-100">
                    <Calendar size={14} className="text-ocean" />
                    <span className="text-stone-600">{fmtDate(booking.checkIn)} → {fmtDate(booking.checkOut)}</span>
                  </div>
                )}

                {/* Guests */}
                <div className="mb-3 pb-3 border-b border-stone-100">
                  <p className="text-xs font-semibold text-stone-500 uppercase mb-2">Guests ({totalPersons})</p>
                  <div className="flex flex-wrap gap-1">
                    {booking.maleCount > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-semibold">👨 ×{booking.maleCount}</span>}
                    {booking.femaleCount > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-pink-500 font-semibold">👩 ×{booking.femaleCount}</span>}
                    {booking.coupleCount > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-semibold">💑 ×{booking.coupleCount}</span>}
                  </div>
                </div>

                {/* Package */}
                {price.selectedPkg && (
                  <div className="mb-3 pb-3 border-b border-stone-100">
                    <p className="text-xs font-semibold text-stone-500 uppercase mb-1">Package</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-600">{price.selectedPkg.name}</span>
                      <span className="font-semibold">€{price.accommodationTotal}</span>
                    </div>
                  </div>
                )}

                {/* Room Breakdown */}
                {price.roomBreakdown.length > 0 && (
                  <div className="mb-3 pb-3 border-b border-stone-100">
                    <p className="text-xs font-semibold text-stone-500 uppercase mb-2">Rooms</p>
                    {price.roomBreakdown.map((rb) => (
                      <div key={rb.room.id} className="mb-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-stone-600">{rb.room.name}</span>
                          <span className="font-semibold">€{rb.subtotal}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {rb.guestIds.map((gId) => {
                            const g = booking.guests.find((x) => x.id === gId);
                            if (!g) return null;
                            return (
                              <span key={gId} className={`text-[9px] px-1.5 py-0.5 rounded-full ${guestTypeConfig[g.type].bg} ${guestTypeConfig[g.type].color} font-medium`}>
                                {guestTypeConfig[g.type].emoji} {g.label}
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
                  <div className="mb-3 pb-3 border-b border-stone-100">
                    <p className="text-xs font-semibold text-stone-500 uppercase mb-1">Add-ons</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-600">Extras</span>
                      <span className="font-semibold">€{price.addonsTotal}</span>
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-stone-800">Total</span>
                  <span className="text-xl font-display font-bold text-ocean">€{price.total}</span>
                </div>

                {nights > 0 && price.total > 0 && (
                  <p className="text-[10px] text-stone-400 text-right mt-1">
                    ≈ €{Math.round(price.total / nights)} / night
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
