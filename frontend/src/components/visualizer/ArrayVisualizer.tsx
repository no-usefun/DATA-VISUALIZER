import ArrayBar from "./ArrayBar";

type Props = {
  array: number[];
  activeIndices: number[];
  sortedIndices: number[];
  viewMode: "bars" | "values";
};

export default function ArrayVisualizer({
  array,
  activeIndices,
  sortedIndices,
  viewMode,
}: Props) {
  const maxValue = Math.max(...array);

  return (
    <div className="flex justify-center gap-2 h-full">
      {array.map((value, index) => {
        const isActive = activeIndices.includes(index);
        const isSorted = sortedIndices.includes(index);

        if (viewMode === "bars") {
          return (
            <div key={index} className="flex-1 flex items-end">
              <ArrayBar
                value={value}
                maxValue={maxValue}
                isActive={isActive}
                isSorted={isSorted}
              />
            </div>
          );
        }

        // VALUE MODE
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
      })}
    </div>
  );
}
