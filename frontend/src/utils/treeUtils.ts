import type { TreeNode, Edge } from "../types/tree";

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

  // Step 1: create nodes
  const nodes: TreeNode[] = Array.from({ length: n }, (_, i) => ({
    id: i.toString(),
    value: Math.floor(Math.random() * 100),
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
