import type {
  CodeChefStats,
  LeetCodeStats,
  PlatformName,
  PlatformStatsData,
} from "../types/platformStats";

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

function toNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readNestedValue(source: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (value !== undefined && value !== null) {
      return value;
    }
  }

  return undefined;
}

function getLeetCodeStatsUrl(username: string) {
  const template =
    import.meta.env.VITE_LEETCODE_STATS_API_URL ??
    "https://cp-stats-api.onrender.com/api/leetcode/<username>";

  return template.replace("<username>", encodeURIComponent(username));
}

function getCodeChefStatsUrl(username: string) {
  const template =
    import.meta.env.VITE_CODECHEF_STATS_API_URL ??
    "https://cp-stats-api.onrender.com/api/codechef/<username>";

  return template.replace("<username>", encodeURIComponent(username));
}

function normalizeLeetCodeStats(
  username: string,
  raw: Record<string, unknown>,
): LeetCodeStats {
  const scopedData = (raw.data as Record<string, unknown> | undefined) ?? raw;
  const totalSource =
    (scopedData.total as Record<string, unknown> | undefined) ?? scopedData;
  const difficultySource =
    (scopedData.difficulty as Record<string, unknown> | undefined) ?? scopedData;
  const statsSource =
    (scopedData.stats as Record<string, unknown> | undefined) ?? scopedData;

  const easySolved = toNumber(
    readNestedValue(
      (difficultySource.easy as Record<string, unknown> | undefined) ??
        difficultySource,
      ["solved", "easySolved", "easy", "easyCount"],
    ),
  );
  const mediumSolved = toNumber(
    readNestedValue(
      (difficultySource.medium as Record<string, unknown> | undefined) ??
        difficultySource,
      ["solved", "mediumSolved", "medium", "mediumCount"],
    ),
  );
  const hardSolved = toNumber(
    readNestedValue(
      (difficultySource.hard as Record<string, unknown> | undefined) ??
        difficultySource,
      ["solved", "hardSolved", "hard", "hardCount"],
    ),
  );

  const easyTotal = toNumber(
    readNestedValue(
      (difficultySource.easy as Record<string, unknown> | undefined) ??
        difficultySource,
      ["total", "easyTotal", "totalEasy"],
    ),
    940,
  );
  const mediumTotal = toNumber(
    readNestedValue(
      (difficultySource.medium as Record<string, unknown> | undefined) ??
        difficultySource,
      ["total", "mediumTotal", "totalMedium"],
    ),
    2048,
  );
  const hardTotal = toNumber(
    readNestedValue(
      (difficultySource.hard as Record<string, unknown> | undefined) ??
        difficultySource,
      ["total", "hardTotal", "totalHard"],
    ),
    927,
  );

  const totalSolved = toNumber(
    readNestedValue(totalSource, ["solved", "totalSolved", "solvedProblems"]),
    easySolved + mediumSolved + hardSolved,
  );
  const totalQuestions = toNumber(
    readNestedValue(totalSource, ["total", "totalQuestions", "totalProblems"]),
    easyTotal + mediumTotal + hardTotal,
  );

  return {
    platform: "leetcode",
    username,
    totalSolved,
    totalQuestions,
    submissions: toNumber(
      readNestedValue(statsSource, [
        "submissions",
        "totalSubmissions",
        "submissionCount",
      ]),
    ),
    difficulty: [
      { label: "Easy", solved: easySolved, total: easyTotal, color: "#22c55e" },
      {
        label: "Med.",
        solved: mediumSolved,
        total: mediumTotal,
        color: "#facc15",
      },
      { label: "Hard", solved: hardSolved, total: hardTotal, color: "#ef4444" },
    ],
  };
}

function normalizeCodeChefStats(
  username: string,
  raw: Record<string, unknown>,
): CodeChefStats {
  const scopedData = (raw.data as Record<string, unknown> | undefined) ?? raw;
  const solved = toNumber(
    readNestedValue(scopedData, [
      "solved",
      "fullySolved",
      "problemsSolved",
      "totalSolved",
    ]),
  );
  const progressTarget = Math.max(
    solved,
    toNumber(readNestedValue(scopedData, ["progressTarget", "goal", "target"]), 300),
  );

  return {
    platform: "codechef",
    username,
    solved,
    rating: toNumber(readNestedValue(scopedData, ["rating", "currentRating"]), 0),
    contests: toNumber(
      readNestedValue(scopedData, [
        "contests",
        "contestCount",
        "contestsParticipated",
        "totalContest",
      ]),
      0,
    ),
    stars: String(readNestedValue(scopedData, ["stars", "starRating"]) ?? "-"),
    progressTarget,
  };
}

export async function fetchLeetCodeStats(username: string) {
  const response = await fetch(getLeetCodeStatsUrl(username));

  if (!response.ok) {
    throw new Error("Failed to fetch leetcode stats");
  }

  const json = (await response.json()) as
    | ApiEnvelope<Record<string, unknown>>
    | Record<string, unknown>;

  if ("success" in json && json.success === false) {
    throw new Error(
      typeof json.message === "string"
        ? json.message
        : "Failed to fetch leetcode stats",
    );
  }

  const data =
    "data" in json && json.data && typeof json.data === "object"
      ? (json.data as Record<string, unknown>)
      : (json as Record<string, unknown>);

  return normalizeLeetCodeStats(username, data);
}

export async function fetchCodeChefStats(username: string) {
  const response = await fetch(getCodeChefStatsUrl(username));

  if (!response.ok) {
    throw new Error("Failed to fetch codechef stats");
  }

  const json = (await response.json()) as
    | ApiEnvelope<Record<string, unknown>>
    | Record<string, unknown>;

  if ("success" in json && json.success === false) {
    throw new Error(
      typeof json.message === "string"
        ? json.message
        : "Failed to fetch codechef stats",
    );
  }

  const data =
    "data" in json && json.data && typeof json.data === "object"
      ? (json.data as Record<string, unknown>)
      : (json as Record<string, unknown>);

  return normalizeCodeChefStats(username, data);
}

export async function fetchPlatformStats(
  platform: PlatformName,
  username: string,
): Promise<PlatformStatsData> {
  if (platform === "leetcode") {
    return fetchLeetCodeStats(username);
  }

  return fetchCodeChefStats(username);
}
