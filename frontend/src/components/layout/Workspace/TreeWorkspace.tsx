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
  const [outputOpen, setOutputOpen] = useState(false);

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
    <section className="relative flex-1 min-h-0 flex flex-col p-8 gap-4 overflow-hidden">
      {/* Tree */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <TreeVisualizer
          root={root}
          activeNodes={activeNodes}
          visitedNodes={visitedNodes}
          resultNodes={resultNodes}
          isEditable={isEditable}
          onNodeValueChange={
            isEditable ? handleNodeValueChangeInternal : undefined
          }
          errorNodeId={errorNodeId} // ✅ NEW
          successNodeId={successNodeId} // ✅ NEW
        />
      </div>

      {/* Metrics */}
      <div className="shrink-0 h-16 bg-neutral-900 rounded-lg flex items-center justify-around text-sm text-neutral-400">
        <div>Visited: {visitedNodes.length}</div>

        <button
          type="button"
          onClick={() => setOutputOpen((prev) => !prev)}
          className="rounded-md border border-neutral-700 px-3 py-1.5 text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-800"
        >
          {outputOpen ? "Hide Output" : "View Output"}
        </button>

        <div>Progress: {progress}%</div>
      </div>

      {/* Output Panel */}
      <div
        className={`absolute right-0 top-0 z-10 h-full border-l border-neutral-800 bg-neutral-950 transition-all duration-300 overflow-hidden ${
          outputOpen ? "w-[28rem] max-w-full" : "w-0"
        }`}
      >
        {outputOpen && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4">
              <div>
                <p className="text-lg font-semibold text-white">Tree Output</p>
                <p className="text-sm text-neutral-400">
                  Traversal/view result sequence
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOutputOpen(false)}
                className="rounded-md border border-neutral-700 px-3 py-1 text-neutral-300 transition hover:border-neutral-500 hover:bg-neutral-900"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="rounded-lg bg-neutral-900 p-4 text-sm leading-7 text-neutral-200 break-words">
                {treeOutput.length ? treeOutput.join(" -> ") : "-"}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
