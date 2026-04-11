import { useEffect, useState } from "react";

type Category = "sorting" | "searching" | "graphs" | "trees";

type Props = {
  category: Category | null;
  onSelect: (algorithm: string) => void;
  onBack: () => void;
};

type AlgorithmOption = { label: string; value: string };
type AlgorithmSection = { title: string; items: AlgorithmOption[] };

const algorithmRegistry: Record<Exclude<Category, "trees">, AlgorithmOption[]> =
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

const treeSections: AlgorithmSection[] = [
  {
    title: "Traversals",
    items: [
      { label: "Preorder Traversal", value: "preorderTraversal" },
      { label: "Inorder Traversal", value: "inorderTraversal" },
      { label: "Postorder Traversal", value: "postorderTraversal" },
      { label: "Level Order Traversal", value: "levelOrderTraversal" },
      { label: "Breadth First Search (BFS)", value: "bfsTraversal" },
      { label: "Depth First Search (DFS)", value: "dfsTraversal" },
      { label: "Vertical Order Traversal", value: "verticalOrderTraversal" },
    ],
  },
  {
    title: "Views",
    items: [
      { label: "Left View", value: "leftView" },
      { label: "Right View", value: "rightView" },
      { label: "Top View", value: "topView" },
      { label: "Bottom View", value: "bottomView" },
    ],
  },
  {
    title: "Heap",
    items: [
      { label: "Heap Sort", value: "heapTreeSort" },
      { label: "Max Heap", value: "maxHeapTree" },
      { label: "Min Heap", value: "minHeapTree" },
    ],
  },
];

export default function AlgorithmSelection({ category, onSelect, onBack }: Props) {
  const [activeTreeSection, setActiveTreeSection] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (category !== "trees") {
      setActiveTreeSection(null);
    }
  }, [category]);

  if (!category) {
    return (
      <div className="flex-1 flex items-center justify-center text-neutral-500">
        Select a category from the navigation bar.
      </div>
    );
  }

  if (category === "trees") {
    const selectedSection =
      treeSections.find((section) => section.title === activeTreeSection) ??
      null;

    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
        <div className="flex w-full max-w-3xl items-center justify-between">
          <h2 className="text-2xl font-semibold capitalize">
            {category} Algorithms
          </h2>

          <button
            onClick={onBack}
            className="rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-800"
          >
            Back
          </button>
        </div>

        {!selectedSection ? (
          <div className="grid grid-cols-1 gap-6 w-full max-w-xl">
            {treeSections.map((section) => (
              <button
                key={section.title}
                onClick={() => setActiveTreeSection(section.title)}
                className="px-8 py-5 bg-neutral-800 hover:bg-blue-600 transition rounded-lg text-base font-medium"
              >
                {section.title}
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-3xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-left text-lg font-semibold text-neutral-200">
                {selectedSection.title}
              </h3>

              <button
                onClick={() => setActiveTreeSection(null)}
                className="rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-800"
              >
                Back
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {selectedSection.items.map((algo) => (
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
        )}
      </div>
    );
  }

  const algorithms = algorithmRegistry[category];

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8">
      <div className="flex w-full max-w-3xl items-center justify-between px-8">
        <h2 className="text-2xl font-semibold capitalize">
          {category} Algorithms
        </h2>

        <button
          onClick={onBack}
          className="rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-800"
        >
          Back
        </button>
      </div>

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
