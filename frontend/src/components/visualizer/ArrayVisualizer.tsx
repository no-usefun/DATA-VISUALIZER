import ArrayBar from "./ArrayBar";
import ArrayBox from "./ArrayBox";

type Props = {
  array: (number | null)[];
  activeIndices: number[];
  sortedIndices: number[];
  viewMode: "bars" | "values";
  mergeRange?: {
    left: number;
    mid: number;
    right: number;
  };
};

export default function ArrayVisualizer({
  array,
  activeIndices,
  sortedIndices,
  viewMode,
  mergeRange,
}: Props) {
  const maxValue = Math.max(...array.filter((v): v is number => !!v));

  return (
    <div className="flex flex-wrap justify-center gap-2 h-full">
      {array.map((value, index) => {
        const isActive = activeIndices.includes(index);
        const isSorted = sortedIndices.includes(index);
        const isLeftHalf =
          mergeRange && index >= mergeRange.left && index <= mergeRange.mid;
        const isRightHalf =
          mergeRange && index > mergeRange.mid && index <= mergeRange.right;

        if (viewMode === "bars") {
          return (
            <div key={index} className="flex-1 flex items-end">
              <ArrayBar
                value={value}
                maxValue={maxValue}
                isActive={isActive}
                isSorted={isSorted}
                isLeftHalf={isLeftHalf}
                isRightHalf={isRightHalf}
              />
            </div>
          );
        } else {
          return (
            <div key={index} className="flex items-center justify-center">
              <ArrayBox
                value={value}
                index={index}
                isActive={isActive}
                isSorted={isSorted}
                isLeftHalf={isLeftHalf}
                isRightHalf={isRightHalf}
              />
            </div>
          );
        }
      })}
    </div>
  );
}
