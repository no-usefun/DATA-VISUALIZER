import { useState } from "react";
import { layoutTree } from "../../utils/treeLayout";
import { buildEdges } from "../../utils/treeUtils";
import type { TreeNode } from "../../types/tree";

type Props = {
  root: TreeNode | null;
  activeNodes?: string[];
  visitedNodes?: string[];
  resultNodes?: string[];

  isEditable?: boolean;

  onNodeValueChange?: (nodeId: string, value: number) => void;

  errorNodeId?: string | null;
  successNodeId?: string | null;
};

function countNodes(node: TreeNode | null): number {
  if (!node) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}

export default function TreeCanvas({
  root,
  activeNodes,
  visitedNodes,
  resultNodes,
  isEditable = false,
  onNodeValueChange,
  errorNodeId,
  successNodeId,
}: Props) {
  // editing state
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");

  const activeSet = new Set(activeNodes || []);
  const visitedSet = new Set(visitedNodes || []);
  const resultSet = new Set(resultNodes || []);

  if (!root) return null;

  const totalNodes = countNodes(root);

  const horizontalSpacing = Math.max(3 * (31 - totalNodes), 28);
  const verticalSpacing = 100;

  const nodes = layoutTree(root, horizontalSpacing, verticalSpacing);
  const edges = buildEdges(root);

  const minX = Math.min(...nodes.map((n) => n.x));
  const minY = Math.min(...nodes.map((n) => n.y));

  const offsetX = horizontalSpacing;
  const offsetY = 30;

  const normalizedNodes = nodes.map((n) => ({
    ...n,
    x: n.x - minX + offsetX,
    y: n.y - minY + offsetY,
  }));

  const maxY = Math.max(...normalizedNodes.map((n) => n.y));
  const svgHeight = maxY + 50;

  const nodeMap = new Map(normalizedNodes.map((n) => [n.id, n]));

  const handleCommit = (nodeId: string, currentValue: number) => {
    const parsed = Number(tempValue);

    if (parsed === currentValue) {
      setEditingNodeId(null);
      return;
    }

    onNodeValueChange?.(nodeId, parsed);
    setEditingNodeId(null);
  };

  return (
    <div className="h-full w-full min-w-0 overflow-auto">
      <svg width="100%" height={svgHeight}>
        {/* Edges */}
        {edges.map((edge, i) => {
          const from = nodeMap.get(edge.from);
          const to = nodeMap.get(edge.to);
          if (!from || !to) return null;

          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="white"
            />
          );
        })}

        {/* Nodes */}
        {normalizedNodes.map((node) => {
          const isEditing = editingNodeId === node.id;

          const error = errorNodeId === node.id;
          const success = successNodeId === node.id;

          let fill = activeSet.has(node.id)
            ? "#f59e0b"
            : resultSet.has(node.id)
              ? "#06d444"
              : visitedSet.has(node.id)
                ? "#d62404"
                : "#3b82f6";

          let stroke = "none";

          if (error) stroke = "red";
          else if (success) stroke = "lime";

          return (
            <g
              key={node.id}
              onClick={() => {
                if (!isEditable) return;

                setEditingNodeId(node.id);
                setTempValue(String(node.value));
              }}
              className={isEditable ? "cursor-pointer" : ""}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill={fill}
                stroke={stroke}
                strokeWidth={error || success ? 4 : 0}
              />

              {isEditing ? (
                <foreignObject
                  x={node.x - 20}
                  y={node.y - 10}
                  width={40}
                  height={20}
                >
                  <input
                    autoFocus
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={() => handleCommit(node.id, node.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCommit(node.id, node.value);
                      if (e.key === "Escape") setEditingNodeId(null);
                    }}
                    className="w-full text-center text-black text-xs"
                  />
                </foreignObject>
              ) : (
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="12"
                  className="pointer-events-none"
                >
                  {node.value}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
