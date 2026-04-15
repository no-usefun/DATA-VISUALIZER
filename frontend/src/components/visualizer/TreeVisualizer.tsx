import TreeCanvas from "./TreeCanvas";
import type { TreeNode } from "../../types/tree";

interface Props {
  root: TreeNode | null;
  activeNodes: string[];
  visitedNodes: string[];
  resultNodes: string[];

  isEditable: boolean;

  onNodeValueChange?: (nodeId: string, value: number) => void;

  errorNodeId?: string | null;
  successNodeId?: string | null;
}

export default function TreeVisualizer({
  root,
  activeNodes,
  visitedNodes,
  resultNodes,
  isEditable,
  onNodeValueChange,
  errorNodeId,
  successNodeId,
}: Props) {
  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <TreeCanvas
        root={root}
        activeNodes={activeNodes}
        visitedNodes={visitedNodes}
        resultNodes={resultNodes}
        isEditable={isEditable}
        onNodeValueChange={onNodeValueChange}
        errorNodeId={errorNodeId}
        successNodeId={successNodeId}
      />
    </div>
  );
}
