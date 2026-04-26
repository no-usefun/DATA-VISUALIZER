import ArrayVisualizer from "../../visualizer/ArrayVisualizer";
import { useState } from "react";
import type { UpdateResult } from "../../../types/array.ts";

type ArrayWorkspaceProps = {
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
  isEditable: boolean;

  selectedIndex: number | null;

  onBarClick: (index: number) => void;
  handleValueChange: (index: number, value: number | null) => UpdateResult;
};

export default function ArrayWorkspace({
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
  isEditable,
  selectedIndex,
  onBarClick,
  handleValueChange,
}: ArrayWorkspaceProps) {
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  const [successIndex, setSuccessIndex] = useState<number | null>(null);

  const handleValueChangeInternal = (index: number, value: number | null) => {
    const result = handleValueChange(index, value);

    if (!result?.success) {
      setErrorIndex(null);
      requestAnimationFrame(() => setErrorIndex(index));

      setTimeout(() => setErrorIndex(null), 300);
      return;
    }

    setSuccessIndex(null);
    requestAnimationFrame(() => setSuccessIndex(index));

    setTimeout(() => setSuccessIndex(null), 300);
  };

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-4 p-8">
      {/* Bars */}
      <div className="min-h-0 min-w-0 flex-1">
        <ArrayVisualizer
          array={array}
          activeIndices={activeIndices}
          sortedIndices={sortedIndices}
          mergeRange={mergeRange}
          pivotIndex={pivotIndex}
          heapIndex={heapIndex}
          selectedIndex={selectedIndex}
          isEditable={isEditable}
          onBarClick={isEditable ? onBarClick : undefined}
          handleValueChange={isEditable ? handleValueChangeInternal : undefined}
          errorIndex={errorIndex}
          successIndex={successIndex}
        />
      </div>

      {/* Metrics Panel */}
      <div className="flex h-16 items-center justify-around rounded-lg bg-neutral-900 text-sm text-neutral-400">
        <div>Comparisons: {comparisons}</div>
        <div>
          {isSearchingAlgorithm
            ? `Found: ${foundCount ?? 0}`
            : `Swaps: ${swaps}`}
        </div>
        <div>Progress: {progress}%</div>
      </div>
    </section>
  );
}
