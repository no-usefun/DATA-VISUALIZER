import { useEffect, useState } from "react";

type Category = "sorting" | "searching" | "trees";

type Props = {
  category: Category | null;
  onSelect: (algorithm: string) => void;
  onBack: () => void;
};

type AlgorithmOption = { label: string; value: string };
type AlgorithmSection = { title: string; items: AlgorithmOption[] };

const BUTTON_BASE =
  "px-6 py-3 bg-neutral-800 hover:bg-blue-600 transition rounded-lg text-sm font-medium w-full";

const HEADER_CONTAINER =
  "flex w-full max-w-3xl items-center justify-between px-8";

const GRID_CONTAINER = "grid grid-cols-2 gap-6 w-full max-w-3xl";

const algorithmRegistry: Record<
  Exclude<Category, "trees">,
  AlgorithmOption[]
> = {
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
};

const treeSections: AlgorithmSection[] = [
  {
    title: "Traversals",
    items: [
      { label: "Preorder Traversal", value: "preorderTraversal" },
      { label: "Inorder Traversal", value: "inorderTraversal" },
      { label: "Postorder Traversal", value: "postorderTraversal" },
      { label: "Level Order Traversal", value: "levelOrderTraversal" },
      { label: "BFS", value: "bfsTraversal" },
      { label: "DFS", value: "dfsTraversal" },
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

export default function AlgorithmSelection({
  category,
  onSelect,
  onBack,
}: Props) {
  const [activeTreeSection, setActiveTreeSection] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (category !== "trees") {
      setActiveTreeSection(null);
    }
  }, [category]);

  const handleBack = () => {
    if (category === "trees" && activeTreeSection) {
      setActiveTreeSection(null);
    } else {
      onBack();
    }
  };

  const selectedSection =
    treeSections.find((s) => s.title === activeTreeSection) ?? null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8">
      {/* Header */}
      <div className={HEADER_CONTAINER}>
        <h2 className="text-2xl font-semibold capitalize">
          {category} Algorithms
        </h2>

        <button
          onClick={handleBack}
          className="rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-800"
        >
          Back
        </button>
      </div>

      {/* Trees */}
      {category === "trees" ? (
        !selectedSection ? (
          <div className="grid grid-cols-1 gap-6 w-full max-w-3xl px-8">
            {treeSections.map((section) => (
              <button
                key={section.title}
                onClick={() => setActiveTreeSection(section.title)}
                className={BUTTON_BASE}
              >
                {section.title}
              </button>
            ))} 
          </div>
        ) : (
          <div className={GRID_CONTAINER}>
            {selectedSection.items.map((algo) => (
              <button
                key={algo.value}
                onClick={() => onSelect(algo.value)}
                className={BUTTON_BASE}
              >
                {algo.label}
              </button>
            ))}
          </div>
        )
      ) : (
        <div className={GRID_CONTAINER}>
          {category &&
            algorithmRegistry[category].map((algo) => (
              <button
                key={algo.value}
                onClick={() => onSelect(algo.value)}
                className={BUTTON_BASE}
              >
                {algo.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
