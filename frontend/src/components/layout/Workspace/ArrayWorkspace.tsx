import ArrayVisualizer from "../../visualizer/ArrayVisualizer";

type WorkspaceProps = {
  array: (number | null)[];
  activeIndices: number[];
  sortedIndices: number[];
  comparisons: number;
  swaps: number;
  progress: number;
  mergeRange?: {
    left: number;
    mid: number;
    right: number;
  };
  pivotIndex?: number | null;
  heapIndex?: number | null;
  foundCount?: number | null;
  isSearchingAlgorithm: boolean;
};

export default function Workspace({
  array,
  activeIndices,
  sortedIndices,
  comparisons,
  swaps,
  progress,
  mergeRange,
  pivotIndex,
  heapIndex,
  foundCount,
  isSearchingAlgorithm,
}: WorkspaceProps) {
  return (
    <section className="flex-1 flex flex-col p-8 gap-4">
      {/* Bars */}
      <div className="flex-1">
        <ArrayVisualizer
          array={array}
          activeIndices={activeIndices}
          sortedIndices={sortedIndices}
          mergeRange={mergeRange}
          pivotIndex={pivotIndex}
          heapIndex={heapIndex}
        />
      </div>

      {/* Metrics Panel */}
      <div className="h-16 bg-neutral-900 rounded-lg flex items-center justify-around text-sm text-neutral-400">
        <div>Comparisons: {comparisons}</div>
        <div>
          {isSearchingAlgorithm ? `Found: ${foundCount}` : `Swaps: ${swaps}`}
        </div>
        <div>Progress: {progress}%</div>
      </div>
    </section>
  );
}
