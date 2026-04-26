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

  let color =
    "bg-gradient-to-t from-blue-700 via-blue-600 to-blue-400 shadow-[inset_-6px_0_10px_rgba(0,0,0,0.12),inset_8px_0_10px_rgba(255,255,255,0.08)]";

  if (isSorted) {
    color =
      "bg-gradient-to-t from-emerald-700 via-emerald-600 to-emerald-400 shadow-[inset_-6px_0_10px_rgba(0,0,0,0.12),inset_8px_0_10px_rgba(255,255,255,0.08)]";
  } else if (isLeftHalf) {
    color =
      "bg-gradient-to-t from-indigo-700 via-indigo-600 to-violet-400 shadow-[inset_-6px_0_10px_rgba(0,0,0,0.12),inset_8px_0_10px_rgba(255,255,255,0.08)]";
  } else if (isRightHalf) {
    color =
      "bg-gradient-to-t from-orange-700 via-orange-600 to-amber-400 shadow-[inset_-6px_0_10px_rgba(0,0,0,0.12),inset_8px_0_10px_rgba(255,255,255,0.08)]";
  } else if (isPivot) {
    color =
      "bg-gradient-to-t from-rose-800 via-rose-700 to-red-500 shadow-[inset_-6px_0_10px_rgba(0,0,0,0.12),inset_8px_0_10px_rgba(255,255,255,0.08)]";
  } else if (isHeap) {
    color =
      "bg-gradient-to-t from-cyan-700 via-cyan-600 to-sky-400 shadow-[inset_-6px_0_10px_rgba(0,0,0,0.12),inset_8px_0_10px_rgba(255,255,255,0.08)]";
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
      className={`${color} ${activeHighlight} ${selectedHighlight} ${errorStyle} ${successStyle} relative flex min-w-0 flex-1 items-end justify-center overflow-hidden rounded-t-[18px] rounded-b-[8px] border border-white/5 transition-[height] duration-300 ${
        isEditable ? "cursor-pointer hover:opacity-90" : ""
      }`}
      style={{ height: `${heightPercentage}%` }}
      onClick={() => {
        onClick?.();
        if (!isEditable) return;
        setIsEditing(true);
      }}
    >
      <span className="pointer-events-none absolute inset-y-0 left-[14%] w-[14%] bg-white/8" />

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
