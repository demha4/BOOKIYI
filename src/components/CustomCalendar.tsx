import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomCalendarProps {
  checkIn: string;
  checkOut: string;
  onSelect: (checkIn: string, checkOut: string) => void;
}

function getMonthData(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDay.getDay(); // 0 = Sunday
  const daysInMonth = lastDay.getDate();
  return { startDayOfWeek, daysInMonth };
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function CustomCalendar({ checkIn, checkOut, onSelect }: CustomCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const { startDayOfWeek, daysInMonth } = useMemo(
    () => getMonthData(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;
  if (checkInDate) checkInDate.setHours(0, 0, 0, 0);
  if (checkOutDate) checkOutDate.setHours(0, 0, 0, 0);

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const clicked = new Date(viewYear, viewMonth, day);
    clicked.setHours(0, 0, 0, 0);
    if (clicked < today) return;

    const clickedStr = clicked.toISOString().split("T")[0];

    if (!checkIn || (checkIn && checkOut)) {
      // Start new selection
      onSelect(clickedStr, "");
    } else if (checkIn && !checkOut) {
      const ci = new Date(checkIn);
      ci.setHours(0, 0, 0, 0);
      if (clicked.getTime() === ci.getTime()) {
        onSelect("", "");
      } else if (clicked > ci) {
        onSelect(checkIn, clickedStr);
      } else {
        onSelect(clickedStr, "");
      }
    }
  };

  const isInRange = (day: number) => {
    if (!checkInDate || !checkOutDate) return false;
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    return d > checkInDate && d < checkOutDate;
  };

  const isCheckIn = (day: number) => {
    if (!checkInDate) return false;
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === checkInDate.getTime();
  };

  const isCheckOut = (day: number) => {
    if (!checkOutDate) return false;
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === checkOutDate.getTime();
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  return (
    <div className="bg-white rounded-2xl border border-sand-dark/20 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goPrevMonth}
          className="p-1.5 rounded-lg hover:bg-sand/50 transition-colors"
          type="button"
        >
          <ChevronLeft size={20} className="text-charcoal" />
        </button>
        <span className="font-serif text-lg font-semibold text-charcoal">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          onClick={goNextMonth}
          className="p-1.5 rounded-lg hover:bg-sand/50 transition-colors"
          type="button"
        >
          <ChevronRight size={20} className="text-charcoal" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="text-center text-xs font-medium text-stone py-1">
            {wd}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const past = isPast(day);
          const inRange = isInRange(day);
          const checkin = isCheckIn(day);
          const checkout = isCheckOut(day);

          return (
            <button
              key={day}
              onClick={() => !past && handleDayClick(day)}
              disabled={past}
              type="button"
              className={`
                aspect-square rounded-lg text-sm font-medium transition-all
                flex items-center justify-center
                ${past ? "text-stone/30 cursor-not-allowed" : "cursor-pointer hover:scale-105"}
                ${inRange ? "bg-ocean/10 text-ocean-dark" : ""}
                ${checkin ? "bg-sunset text-white shadow-md" : ""}
                ${checkout ? "bg-ocean text-white shadow-md" : ""}
                ${!past && !inRange && !checkin && !checkout ? "text-charcoal hover:bg-sand/40" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-4 pt-3 border-t border-sand-dark/10 text-xs text-stone">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-sunset" />
          Check-in
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-ocean" />
          Check-out
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-ocean/10" />
          Selected
        </div>
      </div>
    </div>
  );
}
