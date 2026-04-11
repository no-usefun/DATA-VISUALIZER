export type LegendItem = {
  label: string;
  swatchClass: string;
};

const DEFAULT_ARRAY: LegendItem = {
  label: "Default element",
  swatchClass: "bg-gradient-to-t from-blue-600 to-blue-400",
};

const ACTIVE_ARRAY: LegendItem = {
  label: "Active comparison/check",
  swatchClass: "bg-yellow-300",
};

const SORTED_ARRAY: LegendItem = {
  label: "Sorted or found element",
  swatchClass: "bg-gradient-to-t from-green-600 to-green-400",
};

const LEFT_HALF: LegendItem = {
  label: "Left merge half",
  swatchClass: "bg-gradient-to-t from-purple-600 to-purple-400",
};

const RIGHT_HALF: LegendItem = {
  label: "Right merge half",
  swatchClass: "bg-gradient-to-t from-orange-600 to-orange-400",
};

const PIVOT: LegendItem = {
  label: "Pivot element",
  swatchClass: "bg-gradient-to-t from-red-900 to-red-600",
};

const HEAP_NODE: LegendItem = {
  label: "Heapify focus",
  swatchClass: "bg-gradient-to-t from-orange-600 to-orange-400",
};

const TREE_DEFAULT: LegendItem = {
  label: "Unvisited node",
  swatchClass: "bg-blue-500",
};

const TREE_ACTIVE: LegendItem = {
  label: "Current node",
  swatchClass: "bg-amber-500",
};

const TREE_VISITED: LegendItem = {
  label: "Visited node",
  swatchClass: "bg-red-500",
};

const TREE_OUTPUT: LegendItem = {
  label: "Traversal/view output",
  swatchClass: "bg-green-500",
};

export function getLegendItems(
  category: "sorting" | "searching" | "graphs" | "trees" | null,
  algorithm: string | null,
): LegendItem[] {
  if (category === "trees") {
    return [TREE_DEFAULT, TREE_ACTIVE, TREE_VISITED, TREE_OUTPUT];
  }

  if (category === "searching") {
    return [DEFAULT_ARRAY, ACTIVE_ARRAY, SORTED_ARRAY];
  }

  if (category === "sorting") {
    switch (algorithm) {
      case "mergeSort":
        return [
          DEFAULT_ARRAY,
          ACTIVE_ARRAY,
          LEFT_HALF,
          RIGHT_HALF,
          SORTED_ARRAY,
        ];

      case "quickSort":
        return [DEFAULT_ARRAY, ACTIVE_ARRAY, PIVOT, SORTED_ARRAY];

      case "heapSort":
        return [DEFAULT_ARRAY, ACTIVE_ARRAY, HEAP_NODE, SORTED_ARRAY];

      default:
        return [DEFAULT_ARRAY, ACTIVE_ARRAY, SORTED_ARRAY];
    }
  }

  return [];
}
