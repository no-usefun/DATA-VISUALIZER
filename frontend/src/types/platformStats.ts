export type PlatformName = "leetcode" | "codechef";

export type PlatformCacheStatus = "idle" | "live" | "cached" | "error";

export type DifficultyBreakdown = {
  label: string;
  solved: number;
  total: number;
  color: string;
};

export type LeetCodeStats = {
  platform: "leetcode";
  username: string;
  totalSolved: number;
  totalQuestions: number;
  submissions: number;
  difficulty: DifficultyBreakdown[];
};

export type CodeChefStats = {
  platform: "codechef";
  username: string;
  solved: number;
  rating: number;
  contests: number;
  stars: string;
  progressTarget: number;
};

export type PlatformStatsData = LeetCodeStats | CodeChefStats;

export type PlatformCacheEntry = {
  username: string;
  data: PlatformStatsData | null;
  lastUpdated: string | null;
  status: PlatformCacheStatus;
};

export type PlatformStatsCache = Partial<
  Record<PlatformName, PlatformCacheEntry>
>;
