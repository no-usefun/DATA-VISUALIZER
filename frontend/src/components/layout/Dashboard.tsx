import { useEffect, useState } from "react";
import PlatformStatsCard from "../dashboard/PlatformStatsCard";
import { usePlatformStats } from "../../hooks/usePlatformStats";

type Category = "sorting" | "searching" | "trees";

type RecentActivityItem = {
  category: Category;
  algorithm: string;
  label: string;
  timestamp: string;
};

type DashboardProps = {
  recentActivity: RecentActivityItem[];
  onExploreCategory: (category: Category) => void;
  onStartVisualization: () => void;
  onRandomAlgorithm: () => void;
  onResumeLastSession: () => void;
};

const categoryCards: Array<{
  title: string;
  category: Category;
  preview: string[];
}> = [
  {
    title: "Sorting",
    category: "sorting",
    preview: ["Bubble Sort", "Selection Sort", "Merge Sort"],
  },
  {
    title: "Searching",
    category: "searching",
    preview: ["Linear Search", "Binary Search"],
  },
  {
    title: "Trees",
    category: "trees",
    preview: ["Inorder Traversal", "Level Order Traversal", "BFS & DFS"],
  },
];

function ActionHub({
  hasResume,
  onStartVisualization,
  onRandomAlgorithm,
  onResumeLastSession,
}: {
  hasResume: boolean;
  onStartVisualization: () => void;
  onRandomAlgorithm: () => void;
  onResumeLastSession: () => void;
}) {
  const actions = [
    { label: "▶ Start Visualization", onClick: onStartVisualization },
    { label: "🎲 Random Algorithm", onClick: onRandomAlgorithm },
    {
      label: "🔁 Resume Last Session",
      onClick: onResumeLastSession,
      disabled: !hasResume,
    },
  ];

  return (
    <section className="rounded-[2rem] border border-[#2a2a2a] bg-[#171717] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
          Action Hub
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Pick up where curiosity starts
        </h2>
      </div>

      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            disabled={action.disabled}
            className="flex w-full items-center justify-between rounded-2xl border border-[#2e2e2e] bg-[#101010] px-4 py-4 text-left text-sm text-neutral-200 transition hover:scale-105 hover:border-[#4a4a4a] hover:bg-[#181818] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>{action.label}</span>
            <span className="text-neutral-500">Open</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function LivePreviewWidget() {
  const [activeBar, setActiveBar] = useState(0);
  const [activeNode, setActiveNode] = useState(0);
  const bars = [36, 62, 44, 78, 58, 88, 48];
  const nodes = ["A", "B", "C", "D", "E"];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveBar((prev) => (prev + 1) % bars.length);
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 650);

    return () => window.clearInterval(interval);
  }, [bars.length, nodes.length]);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[#2a2a2a] bg-[#141414] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
      <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(90deg,rgba(34,197,94,0.12),rgba(59,130,246,0.12),rgba(245,158,11,0.12))]" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
            Live Preview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Watch the workspace come alive
          </h2>
        </div>
        <div className="rounded-full border border-[#2f5f95] bg-[#132033] px-3 py-1 text-xs text-sky-200">
          Live
        </div>
      </div>

      <div className="relative grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.5rem] border border-[#2b2b2b] bg-[#111111] p-4">
          <p className="mb-4 text-sm font-medium text-neutral-300">
            Sorting pulse
          </p>
          <div className="flex h-44 items-end justify-between gap-2 rounded-[1.25rem] bg-[#0a0a0a] px-4 pb-4 pt-6">
            {bars.map((height, index) => {
              const isActive = index === activeBar;
              const isNext = index === (activeBar + 1) % bars.length;

              return (
                <div
                  key={`${height}-${index}`}
                  className={`relative flex-1 overflow-hidden rounded-t-[18px] transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-blue-700 via-blue-600 to-blue-400"
                      : isNext
                        ? "bg-gradient-to-t from-emerald-700 via-emerald-600 to-emerald-400"
                        : "bg-gradient-to-t from-neutral-700 via-neutral-600 to-neutral-500"
                  }`}
                  style={{ height: `${height}%` }}
                >
                  <span className="absolute inset-y-0 left-[14%] w-[14%] bg-white/8" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#2b2b2b] bg-[#111111] p-4">
          <p className="mb-4 text-sm font-medium text-neutral-300">
            Traversal trace
          </p>
          <div className="grid h-44 place-items-center rounded-[1.25rem] bg-[#0a0a0a] p-4">
            <div className="grid gap-5">
              <div className="flex justify-center">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-full border text-sm font-semibold transition-all duration-500 ${
                    activeNode === 0
                      ? "border-[#7dd3fc] bg-[#2563eb] text-white shadow-[0_0_18px_rgba(37,99,235,0.45)]"
                      : "border-neutral-700 bg-neutral-900 text-white"
                  }`}
                >
                  {nodes[0]}
                </div>
              </div>
              <div className="flex items-center justify-center gap-6">
                {nodes.slice(1).map((node, index) => {
                  const isActive = activeNode === index + 1;
                  return (
                    <div
                      key={node}
                      className={`grid h-11 w-11 place-items-center rounded-full border text-sm font-semibold transition-all duration-500 ${
                        isActive
                          ? "border-[#7dd3fc] bg-[#2563eb] text-white shadow-[0_0_18px_rgba(37,99,235,0.4)]"
                          : "border-neutral-700 bg-neutral-900 text-white"
                      }`}
                    >
                      {node}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Dashboard({
  recentActivity,
  onExploreCategory,
  onStartVisualization,
  onRandomAlgorithm,
  onResumeLastSession,
}: DashboardProps) {
  const leetCodeStats = usePlatformStats("leetcode");
  const codeChefStats = usePlatformStats("codechef");

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-950 px-6 py-8 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">
              Algorithm Visualizer
            </p>
            <h1 className="max-w-3xl font-serif text-4xl leading-tight text-white md:text-5xl">
              Build intuition by watching algorithms move, split, and settle.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-neutral-400">
              Launch straight into a visualization, inspect familiar families,
              or reopen the last thing you explored. The dashboard is now your
              control room instead of a static intro card.
            </p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <LivePreviewWidget />
          <ActionHub
            hasResume={recentActivity.length > 0}
            onStartVisualization={onStartVisualization}
            onRandomAlgorithm={onRandomAlgorithm}
            onResumeLastSession={onResumeLastSession}
          />
        </section>

        <section className="rounded-[2rem] border border-[#2a2a2a] bg-[#121212] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
              Competitive Programming
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Track live platform progress
            </h2>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <PlatformStatsCard
              platform="leetcode"
              username={leetCodeStats.username}
              data={leetCodeStats.data}
              status={leetCodeStats.status}
              isFetching={leetCodeStats.isFetching}
              isStale={leetCodeStats.isStale}
              lastUpdated={leetCodeStats.lastUpdated}
              errorMessage={leetCodeStats.errorMessage}
              onSaveUsername={leetCodeStats.saveUsername}
              onRefresh={() => void leetCodeStats.refreshStats("manual")}
            />

            <PlatformStatsCard
              platform="codechef"
              username={codeChefStats.username}
              data={codeChefStats.data}
              status={codeChefStats.status}
              isFetching={codeChefStats.isFetching}
              isStale={codeChefStats.isStale}
              lastUpdated={codeChefStats.lastUpdated}
              errorMessage={codeChefStats.errorMessage}
              onSaveUsername={codeChefStats.saveUsername}
              onRefresh={() => void codeChefStats.refreshStats("manual")}
            />
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#2a2a2a] bg-[#161616] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
                Algorithm Category Grid
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Explore by structure
              </h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {categoryCards.map((card) => (
              <article
                key={card.title}
                className="
        group relative overflow-hidden
        rounded-[1.5rem] 
        border border-[#2d2d2d] 
        bg-gradient-to-b from-[#141414] to-[#0d0d0d] 
        p-5 
        transition-all duration-300 
        hover:-translate-y-1 hover:scale-[1.02]
        hover:border-[#3a3a3a] 
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        "
              >
                {/* Glow Layer */}
                <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 transition group-hover:opacity-80 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_70%)]" />

                {/* Title */}
                <h3 className="text-xl font-semibold text-white transition group-hover:text-sky-400">
                  {card.title}
                </h3>
                {/* Preview List */}
                <div className="mt-4 space-y-2 text-sm text-neutral-300">
                  {card.preview.map((item) => (
                    <p
                      key={item}
                      className="
          border-b border-[#1f1f1f] pb-2 last:border-b-0 
          transition 
          group-hover:text-neutral-200 
          hover:text-white
          "
                    >
                      {item}
                    </p>
                  ))}
                </div>
                {/* Button */}
                <button
                  type="button"
                  onClick={() => onExploreCategory(card.category)}
                  className="
      mt-6 rounded-xl 
      border border-[#353535] 
      bg-gradient-to-b from-[#1a1a1a] to-[#121212] 
      px-4 py-2 text-sm text-white 
      transition-all duration-200 

      hover:border-sky-500 
      hover:bg-[#1f1f1f] 
      hover:shadow-[0_0_12px_rgba(56,189,248,0.25)]
      active:scale-95
      "
                >
                  Explore →
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
