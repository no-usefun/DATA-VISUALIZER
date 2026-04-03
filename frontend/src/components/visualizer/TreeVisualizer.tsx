import { useState } from "react";
import TreeCanvas from "./TreeCanvas";
import { generateBalancedTree } from "../../utils/treeUtils";
import type { TreeNode } from "../../types/tree";

export default function TreeVisualizer() {
  const [root, setRoot] = useState<TreeNode | null>(generateBalancedTree(15));

  const [activeNodes, setActiveNodes] = useState<string[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);

  const handleGenerate = () => {
    const newTree = generateBalancedTree(15);
    setRoot(newTree);
    setActiveNodes([]);
    setVisitedNodes([]);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Controls */}
      <div className="p-4 flex gap-3 bg-gray-900">
        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Generate Tree
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1">
        <TreeCanvas
          root={root}
          activeNodes={activeNodes}
          visitedNodes={visitedNodes}
        />
      </div>
    </div>
  );
}
