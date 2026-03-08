type Category = "sorting" | "searching" | "graphs";

type Props = {
  category: Category | null;
  onSelect: (algorithm: string) => void;
};

const algorithmRegistry: Record<Category, { label: string; value: string }[]> =
  {
    sorting: [
      { label: "Bubble Sort", value: "bubbleSort" },
      { label: "Selection Sort", value: "selectionSort" },
      { label: "Insertion Sort", value: "insertionSort" },
      { label: "Merge Sort", value: "mergeSort" },
      { label: "Quick Sort", value: "quickSort" },
      { label: "Heap Sort", value: "heapSort" },
    ],
    searching: [
      { label: "Linear Search", value: "linearSearch" },
      { label: "Binary Search", value: "binarySearch" },
    ],
    graphs: [
      { label: "Breadth First Search (BFS)", value: "bfs" },
      { label: "Depth First Search (DFS)", value: "dfs" },
    ],
  };

export default function AlgorithmSelection({ category, onSelect }: Props) {
  if (!category) {
    return (
      <div className="flex-1 flex items-center justify-center text-neutral-500">
        Select a category from the navigation bar.
      </div>
    );
  }

  const algorithms = algorithmRegistry[category];

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8">
      <h2 className="text-2xl font-semibold capitalize">
        {category} Algorithms
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {algorithms.map((algo) => (
          <button
            key={algo.value}
            onClick={() => onSelect(algo.value)}
            className="px-8 py-4 bg-neutral-800 hover:bg-blue-600 transition rounded-lg text-sm font-medium"
          >
            {algo.label}
          </button>
        ))}
      </div>
    </div>
  );
}
