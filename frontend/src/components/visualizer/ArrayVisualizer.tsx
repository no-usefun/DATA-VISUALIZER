import { useMemo } from "react";
import ArrayBar from "./ArrayBar";

type Props = {
  array: (number | null)[];
  activeIndices: number[];
  sortedIndices: number[];
  mergeRange?: {
    left: number;
    mid: number;
    right: number;
  };
  pivotIndex?: number | null;
  heapIndex?: number | null;
  isEditable?: boolean;
  onBarClick?: (index: number, value: number | null) => void;
};

export default function ArrayVisualizer({
  array,
  activeIndices,
  sortedIndices,
  mergeRange,
  pivotIndex,
  heapIndex,
  isEditable = false,
  onBarClick,
}: Props) {
  // compute max only when array changes
  const maxValue = useMemo(() => {
    return Math.max(...array.filter((v): v is number => v !== null));
  }, [array]);

  // convert to Set for O(1) lookup
  const activeSet = useMemo(() => new Set(activeIndices), [activeIndices]);
  const sortedSet = useMemo(() => new Set(sortedIndices), [sortedIndices]);
  const showValue = array.length <= 30;
  return (
    <div className="flex items-end justify-center gap-2 h-full">
      {array.map((value, index) => {
        const isActive = activeSet.has(index);
        const isSorted = sortedSet.has(index);

        const isLeftHalf =
          mergeRange && index >= mergeRange.left && index <= mergeRange.mid;

        const isRightHalf =
          mergeRange && index > mergeRange.mid && index <= mergeRange.right;

        const isPivot = pivotIndex === index;

        const isHeap = heapIndex === index;

        return (
          <ArrayBar
            key={index}
            value={value}
            maxValue={maxValue}
            isActive={isActive}
            isSorted={isSorted}
            isLeftHalf={!!isLeftHalf}
            isRightHalf={!!isRightHalf}
            showValue={showValue}
            isPivot={isPivot}
            isHeap={isHeap}
            isEditable={isEditable}
            onClick={() => onBarClick?.(index, value)}
          />
        );
      })}
    </div>
  );
}
