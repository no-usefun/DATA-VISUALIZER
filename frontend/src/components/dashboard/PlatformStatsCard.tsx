import { useEffect, useState } from "react";
import type {
  CodeChefStats,
  DifficultyBreakdown,
  LeetCodeStats,
  PlatformCacheStatus,
  PlatformName,
  PlatformStatsData,
} from "../../types/platformStats";

type PlatformStatsCardProps = {
  platform: PlatformName;
  username: string;
  data: PlatformStatsData | null;
  status: PlatformCacheStatus;
  isFetching: boolean;
  isStale: boolean;
  lastUpdated: string | null;
  errorMessage: string | null;
  onSaveUsername: (username: string) => void;
  onRefresh: () => void;
};

const platformLabel = {
  leetcode: "LeetCode",
  codechef: "CodeChef",
} as const;

const platformAccent = {
  leetcode: "#2563eb",
  codechef: "#fb923c",
} as const;

const platformProfileUrl = {
  leetcode: (username: string) => `https://leetcode.com/u/${username}/`,
  codechef: (username: string) => `https://www.codechef.com/users/${username}`,
} as const;

function formatRelativeUpdated(lastUpdated: string | null) {
  if (!lastUpdated) return "Never updated";

  const elapsedMs = Date.now() - new Date(lastUpdated).getTime();
  const elapsedMinutes = Math.max(1, Math.floor(elapsedMs / 60000));

  if (elapsedMinutes < 60) {
    return `Updated ${elapsedMinutes} minute${elapsedMinutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(elapsedMinutes / 60);
  return `Updated ${hours} hour${hours === 1 ? "" : "s"} ago`;
}

function StatusPill({
  status,
  isStale,
}: {
  status: PlatformCacheStatus;
  isStale: boolean;
}) {
  const appearance =
    status === "live"
      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
      : status === "error"
        ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
        : "bg-neutral-800 text-neutral-300 border-neutral-700";

  const label =
    status === "live"
      ? "Live"
      : status === "error"
        ? "Error"
        : isStale
          ? "Cached · Stale"
          : "Cached";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-[11px] font-medium ${appearance}`}
    >
      {label}
    </span>
  );
}

function DifficultyRow({ item }: { item: DifficultyBreakdown }) {
  const percent =
    item.total > 0 ? Math.min(100, (item.solved / item.total) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold" style={{ color: item.color }}>
          {item.label}
        </span>
        <span className="text-neutral-200">
          {item.solved} / {item.total}
        </span>
      </div>
      <div className="h-2 rounded-full bg-[#2b2b2b]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%`, backgroundColor: item.color }}
        />
      </div>
    </div>
  );
}

function LeetCodePanel({ data }: { data: LeetCodeStats }) {
  const solvedPercent =
    data.totalQuestions > 0 ? (data.totalSolved / data.totalQuestions) * 100 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="flex items-center justify-center">
        <div
          className="grid h-48 w-48 place-items-center rounded-full"
          style={{
            background: `conic-gradient(${platformAccent.leetcode} ${solvedPercent}%, #13213e ${solvedPercent}% 100%)`,
          }}
        >
          <div className="grid h-40 w-40 place-items-center rounded-full bg-[#171717] text-center">
            <div>
              <p className="text-4xl font-bold text-white">
                {data.totalSolved}
                <span className="text-2xl text-neutral-400">
                  /{data.totalQuestions}
                </span>
              </p>
              <p className="mt-1 text-lg font-semibold text-emerald-400">
                Solved
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                {data.submissions} submissions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {data.difficulty.map((item) => (
          <DifficultyRow key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

function CodeChefPanel({ data }: { data: CodeChefStats }) {
  const progressPercent =
    data.progressTarget > 0 ? (data.solved / data.progressTarget) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-400">Solved</p>
          <p className="mt-2 text-5xl font-bold text-white">{data.solved}</p>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl bg-[#2a2a2a] px-4 py-2 text-right">
            <p className="text-xs text-neutral-400">Rating</p>
            <p className="text-2xl font-semibold text-white">
              {data.rating || "-"}
            </p>
          </div>
          <div className="rounded-xl bg-[#2a2a2a] px-4 py-2 text-right">
            <p className="text-xs text-neutral-400">Contests</p>
            <p className="text-2xl font-semibold text-white">{data.contests}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-2 rounded-full bg-[#2b2b2b]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, progressPercent)}%`,
              background: "linear-gradient(90deg, #fb923c 0%, #f59e0b 100%)",
            }}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-neutral-400">
          <span>Competitive Programming</span>
          <span>{data.stars} star</span>
        </div>
      </div>
    </div>
  );
}

function StatsCardSkeleton({ platform }: { platform: PlatformName }) {
  return (
    <div className="rounded-[28px] border border-[#2b2b2b] bg-[#171717] p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="h-7 w-32 animate-pulse rounded bg-[#262626]" />
        <div className="h-8 w-24 animate-pulse rounded-full bg-[#262626]" />
      </div>

      {platform === "leetcode" ? (
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="mx-auto h-48 w-48 animate-pulse rounded-full bg-[#202020]" />
          <div className="space-y-5">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <div className="h-5 w-full animate-pulse rounded bg-[#262626]" />
                <div className="h-2 w-full animate-pulse rounded-full bg-[#262626]" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="h-4 w-16 animate-pulse rounded bg-[#262626]" />
              <div className="h-12 w-24 animate-pulse rounded bg-[#262626]" />
            </div>
            <div className="space-y-3">
              <div className="h-16 w-24 animate-pulse rounded-xl bg-[#262626]" />
              <div className="h-16 w-24 animate-pulse rounded-xl bg-[#262626]" />
            </div>
          </div>
          <div className="h-2 w-full animate-pulse rounded-full bg-[#262626]" />
        </div>
      )}
    </div>
  );
}

export default function PlatformStatsCard({
  platform,
  username,
  data,
  status,
  isFetching,
  isStale,
  lastUpdated,
  errorMessage,
  onSaveUsername,
  onRefresh,
}: PlatformStatsCardProps) {
  const [draftUsername, setDraftUsername] = useState(username);
  const [isEditing, setIsEditing] = useState(!username);

  useEffect(() => {
    setDraftUsername(username);
    setIsEditing(!username);
  }, [username]);

  const hasUsername = username.trim().length > 0;

  if (isFetching && !data) {
    return <StatsCardSkeleton platform={platform} />;
  }

  return (
    <article className="rounded-[28px] border border-[#2b2b2b] bg-[#171717] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-3xl font-semibold text-white">
              {platformLabel[platform]}
            </h3>
            <StatusPill status={status} isStale={isStale} />
          </div>
          {hasUsername ? (
            <div className="mt-2 flex items-center gap-3 text-sm text-neutral-400">
              <span>@{username}</span>
              <button
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
                className="rounded-full border border-[#353535] px-3 py-1 text-xs text-neutral-300 transition hover:border-neutral-500 hover:text-white"
              >
                {isEditing ? "Close" : "Change"}
              </button>
            </div>
          ) : (
            <p className="mt-2 text-sm text-neutral-500">
              Add your username to unlock live competitive stats.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={!hasUsername || isFetching}
          className="inline-flex items-center gap-2 rounded-full border border-[#353535] px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className={isFetching ? "animate-spin" : ""}>↻</span>
          <span>Fetch Live Data</span>
        </button>
      </div>

      {hasUsername && (
        <div className="mb-6 flex justify-end">
          <a
            href={platformProfileUrl[platform](username)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#353535] px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:text-white"
          >
            <span>Visit</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      )}

      {isEditing && (
        <div className="mb-6 rounded-2xl border border-[#2d2d2d] bg-[#1d1d1d] p-4">
          <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-neutral-500">
            {platformLabel[platform]} Username
          </label>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              value={draftUsername}
              onChange={(event) => setDraftUsername(event.target.value)}
              placeholder={`Enter ${platformLabel[platform]} username`}
              className="flex-1 rounded-xl border border-[#3a3a3a] bg-[#111111] px-4 py-3 text-sm text-white outline-none transition focus:border-neutral-500"
            />
            <button
              type="button"
              onClick={() => {
                onSaveUsername(draftUsername);
                if (draftUsername.trim()) {
                  setIsEditing(false);
                }
              }}
              className="rounded-xl bg-neutral-100 px-4 py-3 text-sm font-medium text-neutral-950 transition hover:bg-white"
            >
              Save Username
            </button>
          </div>
        </div>
      )}

      {!hasUsername ? (
        <div className="rounded-2xl border border-dashed border-[#343434] bg-[#131313] p-8 text-sm text-neutral-500">
          No username saved yet. Add one above to cache and fetch stats.
        </div>
      ) : data ? (
        <>
          {data.platform === "leetcode" ? (
            <LeetCodePanel data={data as LeetCodeStats} />
          ) : (
            <CodeChefPanel data={data as CodeChefStats} />
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#262626] pt-4 text-sm text-neutral-500">
            <div className="space-y-1">
              <p>{formatRelativeUpdated(lastUpdated)}</p>
              <p>
                Last updated:{" "}
                {lastUpdated
                  ? new Date(lastUpdated).toLocaleString()
                  : "No successful fetch yet"}
              </p>
            </div>

            <div className="text-right">
              {status === "error" && data ? (
                <p className="text-amber-300">Using cached data</p>
              ) : null}
              {errorMessage ? <p>{errorMessage}</p> : null}
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-[#2d2d2d] bg-[#131313] p-8 text-sm text-neutral-500">
          No stats loaded yet. Save a username and fetch live data to populate
          this card.
        </div>
      )}
    </article>
  );
}
