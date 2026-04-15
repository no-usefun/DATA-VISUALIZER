import ArrayWorkspace from "./ArrayWorkspace";
import TreeWorkspace from "./TreeWorkspace";
import type { UpdateResult } from "../../../types/array.ts";
import type { TreeNode, TreeUpdateResult } from "../../../types/tree.ts";

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

  // Tree props
  root: TreeNode | null;
  activeNodes: string[];
  visitedNodes: string[];
  resultNodes: string[];
  treeOutput: number[];

  isEditable: boolean;

  // NEW
  selectedIndex: number | null;
  onSelectIndex: (index: number) => void;

  // handlers
  onArrayValueChange: (index: number, value: number | null) => UpdateResult;
  onTreeNodeValueChange: (nodeId: string, value: number) => TreeUpdateResult;
};

export default function Workspace(props: WorkspaceProps) {
  const { category } = props;

  if (category === "trees") {
    return (
      <TreeWorkspace
        root={props.root}
        activeNodes={props.activeNodes}
        visitedNodes={props.visitedNodes}
        resultNodes={props.resultNodes}
        treeOutput={props.treeOutput}
        progress={props.progress}
        isEditable={props.isEditable}
        onNodeValueChange={props.onTreeNodeValueChange}
      />
    );
  }

  return (
    <ArrayWorkspace
      array={props.array}
      activeIndices={props.activeIndices}
      sortedIndices={props.sortedIndices}
      comparisons={props.comparisons}
      swaps={props.swaps}
      progress={props.progress}
      mergeRange={props.mergeRange}
      pivotIndex={props.pivotIndex}
      heapIndex={props.heapIndex}
      foundCount={props.foundCount}
      isSearchingAlgorithm={props.isSearchingAlgorithm}
      isEditable={props.isEditable}
      selectedIndex={props.selectedIndex}
      onBarClick={props.onSelectIndex}
      handleValueChange={props.onArrayValueChange}
    />
  );
}
