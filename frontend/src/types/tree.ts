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
