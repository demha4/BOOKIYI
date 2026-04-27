/**
 * useLiveRoomPrices — lightweight hook that fetches live nightly prices
 * for all rooms from Beds24 (next-7-days window) and exposes per-room
 * prices + the cheapest "from" price.
 *
 * Multiple pages (Home, Packages, PackageBedAndBreakfast, PackageSurfCamp)
 * use this so room prices shown across the site stay in sync with Beds24.
 *
 * Falls back to the static `room.price` from content.ts when the API
 * returns nothing or errors out.
 */
import { useEffect, useState } from "react";
import { getLiveRoomData, type RoomLiveData } from "../services/beds24";
import { rooms } from "../data/content";

export interface LiveRoomPrices {
  /** Per-room prices keyed by beds24RoomId */
  byRoomId: Record<string, number>;
  /** Per-room prices keyed by room.id (e.g. "anza-dorm") */
  byId: Record<string, number>;
  /** The cheapest nightly price across all rooms */
  cheapest: number;
  /** True while the initial fetch is in-flight */
  loading: boolean;
  /** Whether live data was successfully loaded */
  isLive: boolean;
}

export function useLiveRoomPrices(): LiveRoomPrices {
  const [data, setData] = useState<Record<string, RoomLiveData>>({});
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(tomorrow);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const result = await getLiveRoomData(
          tomorrow.toISOString().split("T")[0],
          nextWeek.toISOString().split("T")[0],
          1
        );

        if (!cancelled) {
          setData(result);
          setIsLive(Object.keys(result).length > 0);
        }
      } catch {
        // Silently fall back to static prices
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, []);

  // Build per-room price maps
  const byRoomId: Record<string, number> = {};
  const byId: Record<string, number> = {};
  let cheapest = Infinity;

  for (const room of rooms) {
    const live = data[room.beds24RoomId];
    const price =
      live?.avgNightly && live.avgNightly > 0
        ? Math.round(live.avgNightly)
        : room.price;

    byRoomId[room.beds24RoomId] = price;
    byId[room.id] = price;

    if (price < cheapest) cheapest = price;
  }

  // Fallback if no rooms at all
  if (!isFinite(cheapest)) {
    cheapest = Math.min(...rooms.map((r) => r.price));
  }

  return { byRoomId, byId, cheapest, loading, isLive };
}
