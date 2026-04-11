import type { TreeNode } from "../../../types/tree";
import { MAX_NODE_VALUE, MIN_NODE_VALUE } from "../../../types/tree";
import TreeVisualizer from "../../visualizer/TreeVisualizer";

interface Props {
  root: TreeNode | null;
  activeNodes: string[];
  visitedNodes: string[];
  resultNodes: string[];
  treeOutput: number[];
  progress: number;
  isEditable: boolean;
  onNodeValueChange: (nodeId: string, value: number) => void;
}

export default function TreeWorkspace({
  root,
  activeNodes,
  visitedNodes,
  resultNodes,
  treeOutput,
  progress,
  isEditable,
  onNodeValueChange,
}: Props) {
  const handleNodeClick = (nodeId: string, currentValue: number) => {
    if (!isEditable) return;

    const nextValue = window.prompt(
      `Enter a node value between ${MIN_NODE_VALUE} and ${MAX_NODE_VALUE}`,
      String(currentValue),
    );

    if (nextValue === null) return;

    const parsed = Number(nextValue);

    if (
      Number.isNaN(parsed) ||
      parsed < MIN_NODE_VALUE ||
      parsed > MAX_NODE_VALUE
    ) {
      window.alert(
        `Please enter a number between ${MIN_NODE_VALUE} and ${MAX_NODE_VALUE}.`,
      );
      return;
    }

    onNodeValueChange(nodeId, parsed);
  };

  return (
    <section className="flex-1 flex flex-col p-8 gap-4">
      <div className="flex-1">
        <TreeVisualizer
          root={root}
          activeNodes={activeNodes}
          visitedNodes={visitedNodes}
          resultNodes={resultNodes}
          isEditable={isEditable}
          onNodeClick={handleNodeClick}
        />
      </div>

      <div className="min-h-16 bg-neutral-900 rounded-lg flex items-center justify-around text-sm text-neutral-400 px-4 py-3">
        <div>Visited: {visitedNodes.length}</div>
        <div>Output: {treeOutput.length ? treeOutput.join(" -> ") : "-"}</div>
        <div>Progress: {progress}%</div>
      </div>
    </section>
  );
}
