import ArrayBar from "./ArrayBar";

type ArrayVisualizerProps = {
  array: number[];
  activeIndices: number[];
  sortedIndices: number[];
};

export default function ArrayVisualizer({
  array,
  activeIndices,
  sortedIndices,
}: ArrayVisualizerProps) {
  const maxValue = Math.max(...array);

  return (
    <div className="w-full h-[500px] bg-neutral-900 rounded-md p-4 flex gap-1">
      {array.map((value, index) => {
        const isActive = activeIndices.includes(index);
        const isSorted = sortedIndices.includes(index);

        return (
          <div key={index} className="flex-1 flex flex-col justify-end">
            <ArrayBar
              value={value}
              maxValue={maxValue}
              isActive={isActive}
              isSorted={isSorted}
            />
          </div>
        );
      })}
    </div>
  );
}
