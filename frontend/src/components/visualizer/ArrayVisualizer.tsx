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

  selectedIndex?: number | null;
  errorIndex?: number | null;
  successIndex?: number | null;

  onBarClick?: (index: number) => void;
  handleValueChange?: (index: number, value: number | null) => void;
};

export default function ArrayVisualizer({
  array,
  activeIndices,
  sortedIndices,
  mergeRange,
  pivotIndex,
  heapIndex,
  isEditable = false,
  selectedIndex,
  errorIndex,
  successIndex,
  onBarClick,
  handleValueChange,
}: Props) {
  const maxValue = useMemo(() => {
    const filtered = array.filter((v): v is number => v !== null);
    return filtered.length > 0 ? Math.max(...filtered) : 1;
  }, [array]);

  const activeSet = useMemo(() => new Set(activeIndices), [activeIndices]);
  const sortedSet = useMemo(() => new Set(sortedIndices), [sortedIndices]);

  const showValue = array.length <= 30;

  return (
    <div className="flex h-full min-w-0 items-end justify-center gap-1 md:gap-2">
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
            isSelected={selectedIndex === index}
            error={errorIndex === index}
            success={successIndex === index}
            onClick={() => onBarClick?.(index)}
            onValueChange={
              handleValueChange
                ? (newValue) => handleValueChange(index, newValue)
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
