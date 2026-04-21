/**
 * useLiveAvailability — React hook that fetches real-time room
 * availability + prices from Beds24 with auto-refresh support.
 *
 * Features:
 * - Auto-refresh every N seconds (configurable)
 * - Visibility-aware polling (stops when tab is hidden)
 * - Manual refresh function
 * - Last updated timestamp
 * - Loading states
 *
 * Returns:
 *   liveData     : { [beds24RoomId]: { available, totalPrice, avgNightly, minStay } }
 *   loading      : boolean - true during initial load or refresh
 *   error        : string | null
 *   isLive       : true if API mode is on, false in demo mode
 *   lastUpdated  : Date | null - timestamp of last successful fetch
 *   refresh      : () => Promise<void> - manual refresh function
 */
import { useEffect, useRef, useState, useCallback } from "react";
import {
  getLiveRoomData,
  type RoomLiveData,
} from "../services/beds24";

export interface UseLiveAvailability {
  liveData: Record<string, RoomLiveData>;
  loading: boolean;
  error: string | null;
  isLive: boolean;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useLiveAvailability(
  checkIn: string,
  checkOut: string,
  numAdults: number = 1,
  autoRefreshInterval: number = 30000 // 30 seconds by default
): UseLiveAvailability {
  const [liveData, setLiveData] = useState<Record<string, RoomLiveData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const lastKey = useRef<string>("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const isLive = true; // Always live mode (direct API calls)

  // Function to fetch data
  const fetchData = useCallback(async () => {
    if (!isLive || !checkIn || !checkOut) {
      setLiveData({});
      return;
    }

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const data = await getLiveRoomData(checkIn, checkOut, numAdults);
      setLiveData(data);
      setLastUpdated(new Date());
      setError(null);
      
      if (import.meta.env.DEV) {
        console.log(`[${new Date().toISOString()}] Live availability refreshed:`, data);
      }
    } catch (err: unknown) {
      // Don't set error if request was aborted (normal during cleanup)
      if (err instanceof Error && err.name !== 'AbortError') {
        const errorMsg = err.message || "Failed to load availability";
        setError(errorMsg);
        console.error("[useLiveAvailability] Error:", errorMsg);
      }
    } finally {
      setLoading(false);
    }
  }, [checkIn, checkOut, numAdults, isLive]);

  // Initial fetch when dates change
  useEffect(() => {
    if (!isLive || !checkIn || !checkOut) {
      setLiveData({});
      setLastUpdated(null);
      return;
    }

    const key = `${checkIn}|${checkOut}|${numAdults}`;
    if (key === lastKey.current) return;
    lastKey.current = key;

    // Clear any existing interval when dates change
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Fetch immediately
    fetchData();
  }, [checkIn, checkOut, numAdults, isLive, fetchData]);

  // Auto-refresh interval with visibility awareness
  useEffect(() => {
    if (!isLive || !checkIn || !checkOut || autoRefreshInterval <= 0) {
      return;
    }

    // Function to start polling
    const startPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        fetchData();
      }, autoRefreshInterval);
    };

    // Function to stop polling
    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // Visibility change handler
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tabs - stop polling to save resources
        stopPolling();
        if (import.meta.env.DEV) {
          console.log("[useLiveAvailability] Tab hidden - polling stopped");
        }
      } else {
        // User returned - fetch immediately and restart polling
        if (import.meta.env.DEV) {
          console.log("[useLiveAvailability] Tab visible - polling restarted");
        }
        fetchData();
        startPolling();
      }
    };

    // Start polling if page is visible
    if (!document.hidden) {
      startPolling();
    }

    // Listen for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup on unmount or when dependencies change
    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [checkIn, checkOut, numAdults, autoRefreshInterval, isLive, fetchData]);

  return {
    liveData,
    loading,
    error,
    isLive,
    lastUpdated,
    refresh: fetchData,
  };
}
