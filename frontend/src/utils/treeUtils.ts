import type { TreeNode, Edge } from "../types/tree";
import { MAX_NODE_VALUE, MIN_NODE_VALUE } from "../types/tree";
import { generateUniqueRandomValues } from "./arrayUtils";

export function buildEdges(root: TreeNode | null): Edge[] {
  const edges: Edge[] = [];

  function dfs(node: TreeNode | null) {
    if (!node) return;

    if (node.left) {
      edges.push({ from: node.id, to: node.left.id });
      dfs(node.left);
    }

    if (node.right) {
      edges.push({ from: node.id, to: node.right.id });
      dfs(node.right);
    }
  }

  dfs(root);
  return edges;
}

export function generateBalancedTree(n: number): TreeNode | null {
  if (n === 0) return null;

  const values = generateUniqueRandomValues(n, MIN_NODE_VALUE, MAX_NODE_VALUE);

  // Step 1: create nodes
  const nodes: TreeNode[] = Array.from({ length: n }, (_, i) => ({
    id: i.toString(),
    value: values[i],
    left: null,
    right: null,
  }));

  // Step 2: link children
  for (let i = 0; i < n; i++) {
    const leftIndex = 2 * i + 1;
    const rightIndex = 2 * i + 2;

    if (leftIndex < n) {
      nodes[i].left = nodes[leftIndex];
    }

    if (rightIndex < n) {
      nodes[i].right = nodes[rightIndex];
    }
  }

  return nodes[0]; // root
}

export function serializeTreeLevelOrder(root: TreeNode | null): number[] {
  if (!root) return [];

  const values: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const node = queue.shift();
    if (!node) continue;

    values.push(node.value);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return values;
}

export function updateTreeNodeValue(
  root: TreeNode | null,
  nodeId: string,
  value: number,
): TreeNode | null {
  if (!root) return null;

  if (root.id === nodeId) {
    return { ...root, value };
  }

  return {
    ...root,
    left: updateTreeNodeValue(root.left, nodeId, value),
    right: updateTreeNodeValue(root.right, nodeId, value),
  };
}
