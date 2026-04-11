import type { ExecutionEvent } from "../types/event";
import { updateTreeNodeValue } from "../utils/treeUtils";

export interface ExecutorContext {
  setWorkingArray: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  setActiveIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setSortedIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setSwapCount: React.Dispatch<React.SetStateAction<number>>;
  setComparisonCount: React.Dispatch<React.SetStateAction<number>>;
  setMergeRange: React.Dispatch<
    React.SetStateAction<{ left: number; mid: number; right: number } | null>
  >;
  workingArray: (number | null)[];
  setPivotIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setHeapIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setFoundCount: React.Dispatch<React.SetStateAction<number | null>>;
  setActiveNodes: React.Dispatch<React.SetStateAction<string[]>>;
  setVisitedNodes: React.Dispatch<React.SetStateAction<string[]>>;
  setResultNodes: React.Dispatch<React.SetStateAction<string[]>>;
  setTreeOutput: React.Dispatch<React.SetStateAction<number[]>>;
  setTreeRoot: React.Dispatch<React.SetStateAction<any>>;
}

export function executeEvent(event: ExecutionEvent, ctx: ExecutorContext) {
  const isValidIndex = (index: number) =>
    index >= 0 && index < ctx.workingArray.length;

  const areValidIndices = (i: number, j: number) =>
    isValidIndex(i) && isValidIndex(j);

  switch (event.type) {
    case "SWAP": {
      const { i, j } = event.data;
      if (!areValidIndices(i, j)) break;

      ctx.setActiveIndices([i, j]);

      ctx.setWorkingArray((prev) => {
        const newArr = [...prev];
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        return newArr;
      });

      ctx.setSwapCount((prev) => prev + 1);
      break;
    }

    case "COMPARE": {
      const { i, j } = event.data;
      if (!areValidIndices(i, j)) break;
      ctx.setComparisonCount((prev) => prev + 1);
      ctx.setActiveIndices([i, j]);

      break;
    }

    case "HIGHLIGHT": {
      const { i, j } = event.data;
      if (!areValidIndices(i, j)) break;
      ctx.setActiveIndices([i, j]);
      break;
    }

    case "MARK_SORTED": {
      const { index } = event.data;
      if (!isValidIndex(index)) break;
      ctx.setSortedIndices((prev) => {
        if (prev.includes(index)) return prev;
        return [...prev, index];
      });

      ctx.setFoundCount(1);
      break;
    }

    case "SHIFT": {
      const { from, to } = event.data;
      if (!areValidIndices(from, to)) break;
      ctx.setWorkingArray((prev) => {
        const arr = [...prev];

        arr[to] = arr[from];
        arr[from] = null;

        return arr;
      });

      ctx.setSwapCount((prev) => prev + 1);

      break;
    }

    case "MOVE": {
      const { from, to, value } = event.data;
      if (to < 0 || to >= ctx.workingArray.length) break;
      if (from !== undefined && !isValidIndex(from)) break;
      ctx.setWorkingArray((prev) => {
        const arr = [...prev];

        if (value !== undefined) {
          arr[to] = value;
        } else if (from !== undefined) {
          arr[to] = arr[from];
        }

        return arr;
      });

      break;
    }

    case "WRITE": {
      const { index, value } = event.data;
      if (!isValidIndex(index)) break;

      ctx.setActiveIndices([index]);

      ctx.setWorkingArray((prev) => {
        const arr = [...prev];
        arr[index] = value;
        return arr;
      });

      ctx.setSwapCount((prev) => prev + 1);

      break;
    }

    case "INSERT": {
      const { index, value } = event.data;
      if (!isValidIndex(index)) break;
      ctx.setWorkingArray((prev) => {
        const newArr = [...prev];
        newArr[index] = value;
        return newArr;
      });

      break;
    }

    case "BREAK": {
      const { i } = event.data;
      ctx.setFoundCount(0);
      if (!isValidIndex(i)) break;
      ctx.setActiveIndices([i]);
      break;
    }

    case "SET_PIVOT": {
      const { index } = event.data;
      if (!isValidIndex(index)) break;

      ctx.setPivotIndex(index);
      ctx.setActiveIndices([index]);

      break;
    }

    case "CHECK": {
      const { index } = event.data;
      if (!isValidIndex(index)) break;

      ctx.setPivotIndex(index);
      ctx.setActiveIndices([index]);
      ctx.setComparisonCount((prev) => prev + 1);
      break;
    }

    case "MERGE": {
      const { left, mid, right } = event.data;
      if (!areValidIndices(left, mid) || !areValidIndices(mid, right)) break;
      ctx.setMergeRange({
        left,
        mid,
        right,
      });

      break;
    }

    case "RANGE": {
      const { start, end } = event.data;

      if (!isValidIndex(start) || !isValidIndex(end)) break;
      if (start > end) break;

      ctx.setMergeRange({
        left: start,
        mid: Math.floor((start + end) / 2),
        right: end,
      });

      break;
    }

    case "HEAPIFY": {
      const { index, size } = event.data;
      if (!areValidIndices(index, size)) break;
      ctx.setActiveIndices([index]);
      ctx.setHeapIndex(index);
      break;
    }

    case "REMOVE": {
      const { index } = event.data;
      if (!isValidIndex(index)) break;
      ctx.setWorkingArray((prev) => {
        const arr = [...prev];
        arr[index] = null;
        return arr;
      });

      break;
    }

    case "VISIT_NODE": {
      const { nodeId } = event.data;
      ctx.setActiveNodes([nodeId]);
      ctx.setVisitedNodes((prev) =>
        prev.includes(nodeId) ? prev : [...prev, nodeId],
      );
      break;
    }

    case "ADD_RESULT_NODE": {
      const { nodeId, value } = event.data;
      ctx.setResultNodes((prev) =>
        prev.includes(nodeId) ? prev : [...prev, nodeId],
      );
      ctx.setTreeOutput((prev) => [...prev, value]);
      break;
    }

    case "ADD_RESULT_VALUE": {
      const { value } = event.data;
      ctx.setTreeOutput((prev) => [...prev, value]);
      break;
    }

    case "SET_TREE_VALUE": {
      const { nodeId, value } = event.data;
      ctx.setTreeRoot((prev: any) => updateTreeNodeValue(prev, nodeId, value));
      break;
    }

    default:
      break;
  }
}
