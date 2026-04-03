import { useState, useRef } from "react";
import { generateRandomArray } from "../utils/arrayUtils";
import type { TreeNode } from "../types/tree";

export function useVisualizerState() {
  const [arraySize, setArraySize] = useState(10);
  const [speed, setSpeed] = useState(500);

  const [array, setArray] = useState<(number | null)[]>(
    generateRandomArray(10, 100),
  );

  const [workingArray, setWorkingArray] = useState<(number | null)[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  const [swapCount, setSwapCount] = useState(0);
  const [comparisonCount, setComparisonCount] = useState(0);

  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState<number | null>(null);

  const [mergeRange, setMergeRange] = useState<{
    left: number;
    mid: number;
    right: number;
  } | null>(null);

  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [heapIndex, setHeapIndex] = useState<number | null>(null);

  const originalArrayRef = useRef<(number | null)[]>([]);

  const [target, setTarget] = useState<number | null>(null);

  const [foundCount, setFoundCount] = useState(0);

  // Tree state
  const [treeRoot, setTreeRoot] = useState<TreeNode | null>(null);
  const [activeNodes, setActiveNodes] = useState<string[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);

  return {
    array,
    setArray,
    workingArray,
    setWorkingArray,
    activeIndices,
    setActiveIndices,
    sortedIndices,
    setSortedIndices,
    swapCount,
    setSwapCount,
    comparisonCount,
    setComparisonCount,
    progress,
    setProgress,
    currentLine,
    setCurrentLine,
    mergeRange,
    setMergeRange,
    pivotIndex,
    setPivotIndex,
    heapIndex,
    setHeapIndex,
    arraySize,
    setArraySize,
    speed,
    setSpeed,
    originalArrayRef,
    target,
    setTarget,
    foundCount,
    setFoundCount,
    treeRoot,
    setTreeRoot,
    activeNodes,
    setActiveNodes,
    visitedNodes,
    setVisitedNodes,
  };
}
