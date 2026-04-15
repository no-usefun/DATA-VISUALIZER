import { useEffect, useState } from "react";

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

  isEditable?: boolean;
  isSelected?: boolean;
  error?: boolean;
  success?: boolean;

  onClick?: () => void;
  onValueChange?: (value: number | null) => void;
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
  isEditable = false,
  isSelected = false,
  error = false,
  onClick,
  onValueChange,
  success = false,
}: ArrayBarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState("");

  useEffect(() => {
    if (!isEditing) {
      setTempValue(value !== null ? String(value) : "");
    }
  }, [value, isEditing]);

  const heightPercentage =
    value !== null && maxValue > 0 ? (value / maxValue) * 100 : 0;

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

  const activeHighlight = isActive ? "ring-4 ring-yellow-300 shadow-lg" : "";

  const selectedHighlight = isSelected ? "ring-4 ring-cyan-400 shadow-lg" : "";

  const errorStyle = error ? "ring-4 ring-red-500 animate-shake" : "";

  const successStyle = success ? "ring-4 ring-green-400" : "";

  const handleCommit = () => {
    const parsed = tempValue.trim() === "" ? null : Number(tempValue.trim());
    if (parsed === value) {
      setIsEditing(false);
      return;
    }

    onValueChange?.(parsed);
    setIsEditing(false);
  };

  return (
    <div
      className={`${color} ${activeHighlight} ${selectedHighlight} ${errorStyle} ${successStyle} rounded-sm w-full transition-[height] duration-300 flex items-end justify-center relative ${
        isEditable ? "cursor-pointer hover:opacity-90" : ""
      }`}
      style={{ height: `${heightPercentage}%` }}
      onClick={() => {
        onClick?.();
        if (!isEditable) return;
        setIsEditing(true);
      }}
    >
      {isEditing ? (
        <input
          autoFocus
          value={tempValue}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleCommit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCommit();
            if (e.key === "Escape") setIsEditing(false);
          }}
          className="absolute bottom-0 w-full text-center text-black text-sm outline-none bg-white/80"
        />
      ) : (
        showValue &&
        value !== null && (
          <span className="w-full text-center text-white font-semibold text-[clamp(10px,2vh,22px)]">
            {value}
          </span>
        )
      )}
    </div>
  );
}

export default ArrayBar;
