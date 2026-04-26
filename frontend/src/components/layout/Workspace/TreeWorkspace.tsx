import { useState } from "react";
import type { TreeNode } from "../../../types/tree";
import TreeVisualizer from "../../visualizer/TreeVisualizer";
import type { TreeUpdateResult } from "../../../types/tree.ts";

interface Props {
  root: TreeNode | null;
  activeNodes: string[];
  visitedNodes: string[];
  resultNodes: string[];
  treeOutput: number[];
  progress: number;
  isEditable: boolean;

  onNodeValueChange: (nodeId: string, value: number) => TreeUpdateResult;
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
  const [isOutputHovered, setIsOutputHovered] = useState(false);

  const [errorNodeId, setErrorNodeId] = useState<string | null>(null);
  const [successNodeId, setSuccessNodeId] = useState<string | null>(null);

  const handleNodeValueChangeInternal = (nodeId: string, value: number) => {
    if (!isEditable) return;

    const result = onNodeValueChange(nodeId, value);

    if (!result.success) {
      setErrorNodeId(null);
      requestAnimationFrame(() => setErrorNodeId(nodeId));

      setTimeout(() => setErrorNodeId(null), 300);
      return;
    }

    setSuccessNodeId(null);
    requestAnimationFrame(() => setSuccessNodeId(nodeId));

    setTimeout(() => setSuccessNodeId(null), 300);
  };

  return (
    <section className="flex min-h-0 min-w-0 flex-1 gap-4 overflow-hidden p-8">
      <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden">
        <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
          <TreeVisualizer
            root={root}
            activeNodes={activeNodes}
            visitedNodes={visitedNodes}
            resultNodes={resultNodes}
            isEditable={isEditable}
            onNodeValueChange={
              isEditable ? handleNodeValueChangeInternal : undefined
            }
            errorNodeId={errorNodeId}
            successNodeId={successNodeId}
          />
        </div>

        <div className="flex h-16 shrink-0 items-center justify-around rounded-lg bg-neutral-900 text-sm text-neutral-400">
          <div>Visited: {visitedNodes.length}</div>

          <button
            type="button"
            onMouseEnter={() => setIsOutputHovered(true)}
            onMouseLeave={() => setIsOutputHovered(false)}
            className="rounded-md border border-neutral-700 px-3 py-1.5 text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-800"
          >
            Hover Output
          </button>

          <div>Progress: {progress}%</div>
        </div>
      </div>

      {isOutputHovered && (
        <aside
          className="fixed right-4 top-20 z-30 flex max-h-[calc(100vh-7rem)] w-[clamp(250px,20vw,340px)] flex-col overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 shadow-2xl"
          onMouseEnter={() => setIsOutputHovered(true)}
          onMouseLeave={() => setIsOutputHovered(false)}
        >
          <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4">
            <div>
              <p className="text-lg font-semibold text-white">Tree Output</p>
              <p className="text-sm text-neutral-400">
                Traversal/view result sequence
              </p>
            </div>

            <span className="rounded-md border border-neutral-800 px-3 py-1 text-xs text-neutral-500">
              Hover to keep open
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <div className="break-words rounded-lg bg-neutral-900 p-4 text-sm leading-7 text-neutral-200">
              {treeOutput.length ? treeOutput.join(" -> ") : "-"}
            </div>
          </div>
        </aside>
      )}
    </section>
  );
}
