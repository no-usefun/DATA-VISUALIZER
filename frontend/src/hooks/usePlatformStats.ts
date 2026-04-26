import { useEffect, useRef, useState } from "react";
import { fetchPlatformStats } from "../api/platformStats";
import type {
  PlatformCacheEntry,
  PlatformCacheStatus,
  PlatformName,
  PlatformStatsCache,
  PlatformStatsData,
} from "../types/platformStats";

const CACHE_KEY = "dsa-visualizer-platform-stats-cache";
const USERNAMES_KEY = "dsa-visualizer-platform-usernames";
const STALE_AFTER_MS = 30 * 60 * 1000;
const USER_ACTIVE_WINDOW_MS = 5 * 60 * 1000;
const AUTO_REFRESH_CHECK_MS = 60 * 1000;

let latestInteractionAt = Date.now();
let listenersBound = false;

function ensureActivityListeners() {
  if (listenersBound || typeof window === "undefined") return;

  const updateActivity = () => {
    latestInteractionAt = Date.now();
  };

  window.addEventListener("mousemove", updateActivity, { passive: true });
  window.addEventListener("keydown", updateActivity);
  window.addEventListener("pointerdown", updateActivity, { passive: true });
  listenersBound = true;
}

function readCache() {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return {} as PlatformStatsCache;

    return JSON.parse(raw) as PlatformStatsCache;
  } catch {
    return {} as PlatformStatsCache;
  }
}

function writeCache(cache: PlatformStatsCache) {
  window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

function readStoredUsernames() {
  try {
    const raw = window.localStorage.getItem(USERNAMES_KEY);
    if (!raw) return {} as Partial<Record<PlatformName, string>>;

    return JSON.parse(raw) as Partial<Record<PlatformName, string>>;
  } catch {
    return {} as Partial<Record<PlatformName, string>>;
  }
}

function writeStoredUsername(platform: PlatformName, username: string) {
  const usernames = readStoredUsernames();
  usernames[platform] = username;
  window.localStorage.setItem(USERNAMES_KEY, JSON.stringify(usernames));
}

function getCachedEntry(platform: PlatformName): PlatformCacheEntry | null {
  const cache = readCache();
  return cache[platform] ?? null;
}

function getStoredUsername(platform: PlatformName) {
  const usernames = readStoredUsernames();
  return usernames[platform] ?? "";
}

function isEntryStale(lastUpdated: string | null) {
  if (!lastUpdated) return true;

  return Date.now() - new Date(lastUpdated).getTime() > STALE_AFTER_MS;
}

export function usePlatformStats(platform: PlatformName) {
  const initialEntry = getCachedEntry(platform);
  const [username, setUsername] = useState(
    initialEntry?.username ?? getStoredUsername(platform),
  );
  const [data, setData] = useState<PlatformStatsData | null>(
    initialEntry?.data ?? null,
  );
  const [lastUpdated, setLastUpdated] = useState<string | null>(
    initialEntry?.lastUpdated ?? null,
  );
  const [status, setStatus] = useState<PlatformCacheStatus>(
    initialEntry?.status ?? (initialEntry?.data ? "cached" : "idle"),
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const fetchLockRef = useRef(false);

  const isStale = isEntryStale(lastUpdated);

  useEffect(() => {
    ensureActivityListeners();
  }, []);

  useEffect(() => {
    const cachedEntry = getCachedEntry(platform);
    if (!cachedEntry?.data) return;

    setData(cachedEntry.data);
    setLastUpdated(cachedEntry.lastUpdated);
    setStatus(isEntryStale(cachedEntry.lastUpdated) ? "cached" : cachedEntry.status);
  }, [platform]);

  async function refreshStats(reason: "manual" | "auto" | "initial" = "manual") {
    const trimmedUsername = username.trim();
    if (!trimmedUsername || fetchLockRef.current) return;

    fetchLockRef.current = true;
    setIsFetching(true);
    setErrorMessage(null);

    if (!data && reason !== "auto") {
      setStatus("cached");
    }

    try {
      const nextData = await fetchPlatformStats(platform, trimmedUsername);
      const nextTimestamp = new Date().toISOString();
      const nextEntry: PlatformCacheEntry = {
        username: trimmedUsername,
        data: nextData,
        lastUpdated: nextTimestamp,
        status: "live",
      };

      const cache = readCache();
      cache[platform] = nextEntry;
      writeCache(cache);

      setData(nextData);
      setLastUpdated(nextTimestamp);
      setStatus("live");
      setErrorMessage(null);
    } catch (error) {
      const cachedEntry = getCachedEntry(platform);
      const fallbackData = cachedEntry?.data ?? data;
      const fallbackUpdated = cachedEntry?.lastUpdated ?? lastUpdated;

      if (fallbackData) {
        const cache = readCache();
        cache[platform] = {
          username: trimmedUsername,
          data: fallbackData,
          lastUpdated: fallbackUpdated,
          status: "error",
        };
        writeCache(cache);
      }

      setData(fallbackData);
      setLastUpdated(fallbackUpdated);
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Using cached data",
      );
    } finally {
      fetchLockRef.current = false;
      setIsFetching(false);
    }
  }

  function saveUsername(nextUsername: string) {
    const trimmed = nextUsername.trim();
    const usernameChanged = trimmed !== username;

    setUsername(trimmed);
    writeStoredUsername(platform, trimmed);

    const cache = readCache();
    cache[platform] = {
      username: trimmed,
      data: usernameChanged ? null : (cache[platform]?.data ?? null),
      lastUpdated: usernameChanged ? null : (cache[platform]?.lastUpdated ?? null),
      status: usernameChanged ? "idle" : (cache[platform]?.status ?? "idle"),
    };
    writeCache(cache);

    if (usernameChanged) {
      setData(null);
      setLastUpdated(null);
      setStatus("idle");
      setErrorMessage(null);
    }
  }

  useEffect(() => {
    if (!username.trim()) return;
    if (data) return;

    void refreshStats("initial");
  }, [username]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!username.trim()) return;
      if (document.visibilityState !== "visible") return;
      if (Date.now() - latestInteractionAt > USER_ACTIVE_WINDOW_MS) return;
      if (!isEntryStale(lastUpdated)) return;

      void refreshStats("auto");
    }, AUTO_REFRESH_CHECK_MS);

    return () => window.clearInterval(interval);
  }, [username, lastUpdated]);

  return {
    username,
    data,
    lastUpdated,
    status,
    isFetching,
    isStale,
    errorMessage,
    saveUsername,
    refreshStats,
  };
}
