export type TreeNode = {
  id: string;
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

export type FlatNode = {
  id: string;
  value: number;
  x: number;
  y: number;
};

export type Edge = {
  from: string;
  to: string;
};

export type TreeUpdateResult =
  | { success: true; data: TreeNode | null }
  | { success: false; error: "INVALID" | "OUT_OF_RANGE" };

export const MIN_NODE_VALUE = 3;
export const MAX_NODE_VALUE = 100;
