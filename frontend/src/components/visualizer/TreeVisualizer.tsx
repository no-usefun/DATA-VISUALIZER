import TreeCanvas from "./TreeCanvas";
import type { TreeNode } from "../../types/tree";

interface Props {
  root: TreeNode | null;
  activeNodes: string[];
  visitedNodes: string[];
  resultNodes: string[];
  isEditable: boolean;
  onNodeClick: (nodeId: string, value: number) => void;
}

export default function TreeVisualizer({
  root,
  activeNodes,
  visitedNodes,
  resultNodes,
  isEditable,
  onNodeClick,
}: Props) {
  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <TreeCanvas
        root={root}
        activeNodes={activeNodes}
        visitedNodes={visitedNodes}
        resultNodes={resultNodes}
        isEditable={isEditable}
        onNodeClick={onNodeClick}
      />
    </div>
  );
}
