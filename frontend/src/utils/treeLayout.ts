import type { TreeNode, FlatNode } from "../types/tree";

export function layoutTree(
  root: TreeNode | null,
  horizontalSpacing: number,
  verticalSpacing: number,
): FlatNode[] {
  const nodes: FlatNode[] = [];
  let xCounter = 0;

  function dfs(node: TreeNode | null, depth: number) {
    if (!node) return;

    dfs(node.left, depth + 1);

    nodes.push({
      id: node.id,
      value: node.value,
      x: xCounter * horizontalSpacing,
      y: depth * verticalSpacing,
    });

    xCounter++;

    dfs(node.right, depth + 1);
  }

  dfs(root, 0);
  return nodes;
}
