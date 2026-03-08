type ArrayBarProps = {
  value: number | null;
  maxValue: number;
  isActive: boolean;
  isSorted: boolean;
  isLeftHalf?: boolean;
  isRightHalf?: boolean;
};

export default function ArrayBar({
  value,
  maxValue,
  isActive,
  isSorted,
  isLeftHalf,
  isRightHalf,
}: ArrayBarProps) {
  const heightPercentage = value !== null ? (value / maxValue) * 100 : 0;

  let color = "bg-blue-500";

  if (isSorted) color = "bg-green-500";
  else if (isActive) color = "bg-yellow-400";
  if (isLeftHalf) color = "bg-purple-400";
  if (isRightHalf) color = "bg-pink-400";
  return (
    <div
      className={`${color} rounded-sm w-full transition-all duration-300 flex items-end justify-center text-xs text-white font-semibold`}
      style={{
        height: `${heightPercentage}%`,
      }}
    >
      {value}
    </div>
  );
}
