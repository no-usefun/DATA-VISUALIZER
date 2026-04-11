import type { TreeNode } from "../../../types/tree";
import TreeVisualizer from "../../visualizer/TreeVisualizer";

interface Props {
  root: TreeNode | null;
  activeNodes: string[];
  visitedNodes: string[];
}

export default function TreeWorkspace({
  root,
  activeNodes,
  visitedNodes,
}: Props) {
  return (
    <section className="flex-1 flex flex-col p-8 gap-4">
      <TreeVisualizer
        root={root}
        activeNodes={activeNodes}
        visitedNodes={visitedNodes}
      />
    </section>
  );
}
