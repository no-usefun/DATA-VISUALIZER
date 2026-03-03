type ArrayBarProps = {
  value: number;
  maxValue: number;
  isActive: boolean;
  isSorted: boolean;
};

export default function ArrayBar({
  value,
  maxValue,
  isActive,
  isSorted,
}: ArrayBarProps) {
  const heightPercentage = (value / maxValue) * 100;

  let color = "bg-blue-500";

  if (isSorted) color = "bg-green-500";
  else if (isActive) color = "bg-yellow-400";

  return (
    <div
      className={`${color} rounded-sm w-full transition-all duration-300`}
      style={{
        height: `${heightPercentage}%`,
      }}
    />
  );
}
