import TreeCanvas from "./TreeCanvas";
import type { TreeNode } from "../../types/tree";

interface Props {
  root: TreeNode | null;
  activeNodes: string[];
  visitedNodes: string[];
  resultNodes: string[];
}

export default function TreeVisualizer({
  root,
  activeNodes,
  visitedNodes,
  resultNodes,
}: Props) {
  return (
    <div className="flex-1">
      <TreeCanvas
        root={root}
        activeNodes={activeNodes}
        visitedNodes={visitedNodes}
        resultNodes={resultNodes}
      />
    </div>
  );
}
