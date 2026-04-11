import type { TreeNode } from "../../../types/tree";
import TreeVisualizer from "../../visualizer/TreeVisualizer";

interface Props {
  root: TreeNode | null;
  activeNodes: string[];
  visitedNodes: string[];
  resultNodes: string[];
  treeOutput: number[];
  progress: number;
}

export default function TreeWorkspace({
  root,
  activeNodes,
  visitedNodes,
  resultNodes,
  treeOutput,
  progress,
}: Props) {
  return (
    <section className="flex-1 flex flex-col p-8 gap-4">
      <div className="flex-1">
        <TreeVisualizer
          root={root}
          activeNodes={activeNodes}
          visitedNodes={visitedNodes}
          resultNodes={resultNodes}
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
