import { useEffect, useRef, useState } from "react";
import { layoutTree } from "../../utils/treeLayout";
import { buildEdges } from "../../utils/treeUtils";
import type { TreeNode } from "../../types/tree";

type Props = {
  root: TreeNode | null;
  activeNodes?: string[];
  visitedNodes?: string[];
  resultNodes?: string[];
  isEditable?: boolean;
  onNodeClick?: (nodeId: string, value: number) => void;
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
  onNodeClick,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(300);

  const activeSet = new Set(activeNodes || []);
  const visitedSet = new Set(visitedNodes || []);
  const resultSet = new Set(resultNodes || []);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      setWidth(containerRef.current!.offsetWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (!root) return null;

  const totalNodes = countNodes(root);

  const horizontalSpacing = Math.max(4 * (31 - totalNodes), 30);
  const verticalSpacing = 100;

  const nodes = layoutTree(root, horizontalSpacing, verticalSpacing);
  const edges = buildEdges(root);

  const minX = Math.min(...nodes.map((n) => n.x));
  const minY = Math.min(...nodes.map((n) => n.y));

  const offsetX = width / 2;
  const offsetY = 30;

  const normalizedNodes = nodes.map((n) => ({
    ...n,
    x: n.x - minX + offsetX,
    y: n.y - minY + offsetY,
  }));

  const maxY = Math.max(...normalizedNodes.map((n) => n.y));
  const svgHeight = maxY + 50;

  const nodeMap = new Map(normalizedNodes.map((n) => [n.id, n]));

  return (
    <div ref={containerRef} className="w-full h-full">
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
        {normalizedNodes.map((node) => (
          <g
            key={node.id}
            onClick={() => onNodeClick?.(node.id, node.value)}
            className={isEditable ? "cursor-pointer" : ""}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={20}
              fill={
                activeSet.has(node.id)
                  ? "#f59e0b" // active
                  : resultSet.has(node.id)
                    ? "#06d444" // output
                    : visitedSet.has(node.id)
                      ? "#d62404" // visited
                      : "#3b82f6" // default
              }
            />
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
          </g>
        ))}
      </svg>
    </div>
  );
}
