import ArrayVisualizer from "../visualizer/ArrayVisualizer";

type WorkspaceProps = {
  array: number[];
  activeIndices: number[];
  sortedIndices: number[];
  comparisons: number;
  swaps: number;
  progress: number;
  viewMode: "bars" | "values";
};

export default function Workspace({
  array,
  activeIndices,
  sortedIndices,
  comparisons,
  swaps,
  progress,
  viewMode,
}: WorkspaceProps) {
  return (
    <section className="flex-1 flex flex-col p-8 gap-4">
      {/* Bars */}
      <div className="flex-1">
        <ArrayVisualizer
          array={array}
          activeIndices={activeIndices}
          sortedIndices={sortedIndices}
          viewMode={viewMode}
        />
      </div>

      {/* Metrics Panel */}
      <div className="h-24 bg-neutral-900 rounded-lg flex items-center justify-around text-sm text-neutral-400">
        <div>Comparisons: {comparisons}</div>
        <div>Swaps: {swaps}</div>
        <div>Progress: {progress}%</div>
      </div>
    </section>
  );
}
