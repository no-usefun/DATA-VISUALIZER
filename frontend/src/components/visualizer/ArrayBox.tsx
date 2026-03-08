type ArrayBoxProps = {
  value: number | null;
  isActive: boolean;
  isSorted: boolean;
  index: number;
};

export default function ArrayBox({
  value,
  index,
  isActive,
  isSorted,
}: ArrayBoxProps) {
  let color = "bg-neutral-800 text-white";

  if (isSorted) color = "bg-green-500 text-black";
  else if (isActive) color = "bg-yellow-400 text-black";

  return (
    <div
      key={index}
      className={`w-12 h-12 flex items-center justify-center rounded 
                        transition-all duration-300 font-semibold ${color}`}
    >
      {value}
    </div>
  );
}
