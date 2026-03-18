type ArrayBarProps = {
  value: number | null;
  maxValue: number;
  isActive: boolean;
  isSorted: boolean;
  isLeftHalf?: boolean;
  isRightHalf?: boolean;
  showValue: boolean;
  isPivot?: boolean;
  isHeap?: boolean;
};

function ArrayBar({
  value,
  maxValue,
  isActive,
  isSorted,
  isLeftHalf,
  isRightHalf,
  showValue,
  isPivot,
  isHeap,
}: ArrayBarProps) {
  const heightPercentage = value !== null ? (value / maxValue) * 100 : 0;

  // base color
  let color = "bg-gradient-to-t from-blue-600 to-blue-400";

  if (isSorted) {
    color = "bg-gradient-to-t from-green-600 to-green-400";
  } else if (isLeftHalf) {
    color = "bg-gradient-to-t from-purple-600 to-purple-400";
  } else if (isRightHalf) {
    color = "bg-gradient-to-t from-orange-600 to-orange-400";
  } else if (isPivot) {
    color = "bg-gradient-to-t from-red-900 to-red-600";
  } else if (isHeap) {
    color = "bg-gradient-to-t from-orange-600 to-orange-400";
  }

  // highlight effect (separate)
  const highlight = isActive
    ? "ring-4 ring-yellow-300 shadow-yellow-200/90 shadow-lg"
    : "";

  return (
    <div
      className={`${color} ${highlight} rounded-sm w-full transition-[height] duration-300 flex items-end justify-center`}
      style={{ height: `${heightPercentage}%` }}
    >
      {showValue && value !== null && (
        <span className="w-full text-center text-white font-semibold text-[clamp(10px,2vh,22px)]">
          {value}
        </span>
      )}
    </div>
  );
}

export default ArrayBar;
