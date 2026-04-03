import ArrayWorkspace from "./ArrayWorkspace";
import TreeWorkspace from "./TreeWorkspace";

type Category = "sorting" | "searching" | "graphs" | "trees" | null;

type WorkspaceProps = {
  category: Category;

  // Array props
  array: (number | null)[];
  activeIndices: number[];
  sortedIndices: number[];
  comparisons: number;
  swaps: number;
  progress: number;
  mergeRange?: {
    left: number;
    mid: number;
    right: number;
  };
  pivotIndex?: number | null;
  heapIndex?: number | null;
  foundCount?: number | null;
  isSearchingAlgorithm: boolean;
};

export default function Workspace(props: WorkspaceProps) {
  const { category } = props;

  if (category === "trees") {
    return <TreeWorkspace />;
  }

  return <ArrayWorkspace {...props} />;
}
