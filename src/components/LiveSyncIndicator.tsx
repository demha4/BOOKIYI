/**
 * LiveSyncIndicator — Shows real-time sync status to users
 * 
 * Displays:
 * - Green dot + "just now" when recently updated
 * - Time since last update
 * - Loading spinner when syncing
 * - Error state if sync fails
 */

import { useEffect, useState } from "react";
import { Loader2, WifiOff, Wifi, AlertCircle } from "lucide-react";

interface LiveSyncIndicatorProps {
  lastUpdated: Date | null;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export function LiveSyncIndicator({ 
  lastUpdated, 
  loading, 
  error,
  onRetry 
}: LiveSyncIndicatorProps) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (!lastUpdated) {
      setTimeAgo("");
      return;
    }

    const updateTimeAgo = () => {
      const seconds = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
      
      if (seconds < 5) {
        setTimeAgo("just now");
      } else if (seconds < 60) {
        setTimeAgo(`${seconds}s ago`);
      } else if (seconds < 3600) {
        const mins = Math.floor(seconds / 60);
        setTimeAgo(`${mins}m ago`);
      } else {
        const hours = Math.floor(seconds / 3600);
        setTimeAgo(`${hours}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  // Error state
  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <WifiOff size={14} className="text-red-500" />
        <span className="text-red-600">Sync failed</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-blue-600 hover:text-blue-700 underline ml-1"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <Loader2 size={14} className="animate-spin text-blue-500" />
        <span className="text-gray-600">Syncing availability...</span>
      </div>
    );
  }

  // Success state with live indicator
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="relative flex items-center">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        {timeAgo === "just now" && (
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
        )}
      </div>
      <Wifi size={14} className="text-green-600" />
      <span className="text-gray-600">
        {lastUpdated ? `Updated ${timeAgo}` : "Live sync active"}
      </span>
    </div>
  );
}

/**
 * Compact version for mobile or tight spaces
 */
export function LiveSyncDot({ 
  lastUpdated, 
  loading, 
  error 
}: Omit<LiveSyncIndicatorProps, 'onRetry'>) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!lastUpdated) {
      setSeconds(0);
      return;
    }

    const updateSeconds = () => {
      setSeconds(Math.floor((Date.now() - lastUpdated.getTime()) / 1000));
    };

    updateSeconds();
    const interval = setInterval(updateSeconds, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  if (error) {
    return (
      <div className="group relative">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Sync failed
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loader2 size={12} className="animate-spin text-blue-500" />;
  }

  return (
    <div className="group relative">
      <div className={`w-2 h-2 rounded-full ${seconds < 5 ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`} />
      {seconds < 5 && (
        <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
      )}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Live • Updated {seconds < 60 ? `${seconds}s` : `${Math.floor(seconds/60)}m`} ago
      </div>
    </div>
  );
}

/**
 * Banner version for prominent display
 */
export function LiveSyncBanner({ 
  lastUpdated, 
  loading, 
  error,
  onRetry 
}: LiveSyncIndicatorProps) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (!lastUpdated) return;

    const updateTimeAgo = () => {
      const seconds = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
      if (seconds < 10) setTimeAgo("just now");
      else if (seconds < 60) setTimeAgo(`${seconds} seconds ago`);
      else setTimeAgo(`${Math.floor(seconds / 60)} minutes ago`);
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <WifiOff size={20} className="text-red-500" />
          <div>
            <div className="font-medium text-red-900">Sync unavailable</div>
            <div className="text-sm text-red-600">{error}</div>
          </div>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-center gap-3">
        <Loader2 size={20} className="animate-spin text-blue-500" />
        <div>
          <div className="font-medium text-blue-900">Syncing with Beds24...</div>
          <div className="text-sm text-blue-600">Checking real-time availability</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-3">
      <div className="relative">
        <Wifi size={20} className="text-green-600" />
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div>
        <div className="font-medium text-green-900">Live availability</div>
        <div className="text-sm text-green-600">
          Synced with Beds24 • Last updated {timeAgo}
        </div>
      </div>
    </div>
  );
}
