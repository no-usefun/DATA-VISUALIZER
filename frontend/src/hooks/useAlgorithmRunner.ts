import { useEffect, useRef, useState } from "react";
import type { ExecutionEvent, ExecutionResponse } from "../types/array";
import { generateRandomArray } from "../utils/arrayUtils";
import {
  cloneTree,
  generateBalancedTree,
  serializeTreeLevelOrder,
  updateTreeNodeValue,
} from "../utils/treeUtils";

type ExecutionMode = "array" | "tree" | null;
type PlaybackMode = "auto" | "manual";

type Snapshot = {
  workingArray: (number | null)[];
  activeIndices: number[];
  sortedIndices: number[];
  swapCount: number;
  comparisonCount: number;
  mergeRange: { left: number; mid: number; right: number } | null;
  pivotIndex: number | null;
  heapIndex: number | null;
  foundCount: number;
  activeNodes: string[];
  visitedNodes: string[];
  resultNodes: string[];
  treeOutput: number[];
  treeRoot: any;
  currentLine: number | null;
  isCompleted: boolean;
};

export function useAlgorithmRunner(state: any) {
  const {
    array,
    setArray,
    setWorkingArray,
    setActiveIndices,
    setSortedIndices,
    setSwapCount,
    setComparisonCount,
    setMergeRange,
    setPivotIndex,
    setHeapIndex,
    setCurrentLine,
    setProgress,
    originalArrayRef,
    arraySize,
    speed,
    setTarget,
    treeRoot,
    setTreeRoot,
    setActiveNodes,
    setVisitedNodes,
    setResultNodes,
    setTreeOutput,
    nodeCount,
  } = state;

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasExecution, setHasExecution] = useState(false);
  const [executionMode, setExecutionMode] = useState<ExecutionMode>(null);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>("auto");
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const timerRef = useRef<number | null>(null);
  const speedRef = useRef(speed);
  const snapshotsRef = useRef<Snapshot[]>([]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (!isRunning || snapshotsRef.current.length <= 1) return;

    timerRef.current = window.setTimeout(() => {
      const next = Math.min(currentStep + 1, snapshotsRef.current.length - 1);

      const snapshot = snapshotsRef.current[next];
      if (!snapshot) return;

      setCurrentStep(next);
      applySnapshot(snapshot);

      // ✅ handle completion cleanly
      if (next >= snapshotsRef.current.length - 1) {
        setIsRunning(false);
        setIsPaused(true);
        setIsCompleted(true);

        // persist final state
        setArray([...snapshot.workingArray]);
      }
    }, speedRef.current);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, currentStep]);

  function clearPlaybackTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function buildInitialSnapshot(
    initialArray: (number | null)[],
    initialTreeRoot: any,
  ): Snapshot {
    return {
      workingArray: [...initialArray],
      activeIndices: [],
      sortedIndices: [],
      swapCount: 0,
      comparisonCount: 0,
      mergeRange: null,
      pivotIndex: null,
      heapIndex: null,
      foundCount: 0,
      activeNodes: [],
      visitedNodes: [],
      resultNodes: [],
      treeOutput: [],
      treeRoot: cloneTree(initialTreeRoot),
      currentLine: null,
      isCompleted: false,
    };
  }

  function applyEventToSnapshot(
    snapshot: Snapshot,
    event: ExecutionEvent,
  ): Snapshot {
    const next: Snapshot = {
      ...snapshot,
      workingArray: [...snapshot.workingArray],
      activeIndices: [...snapshot.activeIndices],
      sortedIndices: [...snapshot.sortedIndices],
      activeNodes: [...snapshot.activeNodes],
      visitedNodes: [...snapshot.visitedNodes],
      resultNodes: [...snapshot.resultNodes],
      treeOutput: [...snapshot.treeOutput],
      treeRoot: cloneTree(snapshot.treeRoot),
      currentLine: event.line,
    };

    switch (event.type) {
      case "SWAP": {
        const { i, j } = event.data;
        if (
          i >= 0 &&
          j >= 0 &&
          i < next.workingArray.length &&
          j < next.workingArray.length
        ) {
          next.activeIndices = [i, j];
          [next.workingArray[i], next.workingArray[j]] = [
            next.workingArray[j],
            next.workingArray[i],
          ];
          next.swapCount += 1;
        }
        break;
      }

      case "COMPARE":
      case "HIGHLIGHT": {
        const { i, j } = event.data;
        next.activeIndices = [i, j];
        if (event.type === "COMPARE") {
          next.comparisonCount += 1;
        }
        break;
      }

      case "MARK_SORTED": {
        const { index } = event.data;
        if (!next.sortedIndices.includes(index)) {
          next.sortedIndices.push(index);
        }
        next.foundCount = 1;
        break;
      }

      case "SHIFT": {
        const { from, to } = event.data;
        if (
          from >= 0 &&
          to >= 0 &&
          from < next.workingArray.length &&
          to < next.workingArray.length
        ) {
          next.workingArray[to] = next.workingArray[from];
          next.workingArray[from] = null;
          next.swapCount += 1;
        }
        break;
      }

      case "MOVE": {
        const { from, to, value } = event.data;
        if (to >= 0 && to < next.workingArray.length) {
          if (value !== undefined) {
            next.workingArray[to] = value;
          } else if (
            from !== undefined &&
            from >= 0 &&
            from < next.workingArray.length
          ) {
            next.workingArray[to] = next.workingArray[from];
          }
        }
        break;
      }

      case "WRITE": {
        const { index, value } = event.data;
        if (index >= 0 && index < next.workingArray.length) {
          next.activeIndices = [index];
          next.workingArray[index] = value;
          next.swapCount += 1;
        }
        break;
      }

      case "INSERT": {
        const { index, value } = event.data;
        if (index >= 0 && index < next.workingArray.length) {
          next.workingArray[index] = value;
        }
        break;
      }

      case "BREAK": {
        const { i } = event.data;
        next.foundCount = 0;
        if (typeof i === "number" && i >= 0) {
          next.activeIndices = [i];
        }
        break;
      }

      case "SET_PIVOT": {
        const { index } = event.data;
        next.pivotIndex = index;
        next.activeIndices = [index];
        break;
      }

      case "CHECK": {
        const { index } = event.data;
        next.pivotIndex = index;
        next.activeIndices = [index];
        next.comparisonCount += 1;
        break;
      }

      case "MERGE": {
        const { left, mid, right } = event.data;
        next.mergeRange = { left, mid, right };
        break;
      }

      case "RANGE": {
        const { start, end } = event.data;
        next.mergeRange = {
          left: start,
          mid: Math.floor((start + end) / 2),
          right: end,
        };
        break;
      }

      case "HEAPIFY": {
        const { index } = event.data;
        next.activeIndices = [index];
        next.heapIndex = index;
        break;
      }

      case "REMOVE": {
        const { index } = event.data;
        if (index >= 0 && index < next.workingArray.length) {
          next.workingArray[index] = null;
        }
        break;
      }

      case "VISIT_NODE": {
        const { nodeId } = event.data;
        next.activeNodes = [nodeId];
        if (!next.visitedNodes.includes(nodeId)) {
          next.visitedNodes.push(nodeId);
        }
        break;
      }

      case "ADD_RESULT_NODE": {
        const { nodeId, value } = event.data;
        if (!next.resultNodes.includes(nodeId)) {
          next.resultNodes.push(nodeId);
        }
        next.treeOutput.push(value);
        break;
      }

      case "ADD_RESULT_VALUE": {
        next.treeOutput.push(event.data.value);
        break;
      }

      case "SET_TREE_VALUE": {
        next.treeRoot = updateTreeNodeValue(
          next.treeRoot,
          event.data.nodeId,
          event.data.value,
        );
        break;
      }

      default:
        break;
    }

    return next;
  }

  function buildSnapshots(
    events: ExecutionEvent[],
    initialArray: (number | null)[],
    initialTreeRoot: any,
  ) {
    const snapshots = [buildInitialSnapshot(initialArray, initialTreeRoot)];

    for (const event of events) {
      snapshots.push(
        applyEventToSnapshot(snapshots[snapshots.length - 1], event),
      );
    }

    if (snapshots.length > 0) {
      snapshots[snapshots.length - 1].isCompleted = true;
    }

    return snapshots;
  }

  function applySnapshot(snapshot: Snapshot) {
    setWorkingArray([...snapshot.workingArray]);
    setActiveIndices([...snapshot.activeIndices]);
    setSortedIndices([...snapshot.sortedIndices]);
    setSwapCount(snapshot.swapCount);
    setComparisonCount(snapshot.comparisonCount);
    setMergeRange(snapshot.mergeRange);
    setPivotIndex(snapshot.pivotIndex);
    setHeapIndex(snapshot.heapIndex);
    setCurrentLine(snapshot.currentLine);
    setProgress(
      snapshotsRef.current.length > 1
        ? Math.floor(
            ((currentStep + 1) / (snapshotsRef.current.length - 1)) * 100,
          )
        : 0,
    );
    state.setFoundCount(snapshot.foundCount);
    setActiveNodes([...snapshot.activeNodes]);
    setVisitedNodes([...snapshot.visitedNodes]);
    setResultNodes([...snapshot.resultNodes]);
    setTreeOutput([...snapshot.treeOutput]);
    setTreeRoot(cloneTree(snapshot.treeRoot));
    setIsCompleted(snapshot.isCompleted);
  }

  function applyStep(nextStep: number) {
    setCurrentStep(nextStep);
    const snapshot = snapshotsRef.current[nextStep];
    if (!snapshot) return;

    applySnapshot(snapshot);
  }

  async function loadArrayExecution(
    selectedAlgorithm: string,
    target?: number | null,
  ) {
    let inputArray = [...array];

    if (selectedAlgorithm === "binarySearch") {
      inputArray = inputArray.sort((a, b) => (a ?? 0) - (b ?? 0));
      setArray(inputArray);
    }

    const API_URL = import.meta.env.VITE_API_URL;
    const body: any = {
      algorithm: selectedAlgorithm,
      input: inputArray,
    };

    if (selectedAlgorithm.toLowerCase().includes("search") && target !== null) {
      body.target = target;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data: ExecutionResponse = await response.json();
    if (!data.success) return false;

    snapshotsRef.current = buildSnapshots(data.data, inputArray, null);
    setExecutionMode("array");
    setHasExecution(true);
    applyStep(0);
    return true;
  }

  async function loadTreeExecution(selectedAlgorithm: string) {
    if (!treeRoot) return false;

    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        algorithm: selectedAlgorithm,
        input: serializeTreeLevelOrder(treeRoot),
      }),
    });

    const data: ExecutionResponse = await response.json();
    if (!data.success) return false;

    snapshotsRef.current = buildSnapshots(data.data, [], treeRoot);
    setExecutionMode("tree");
    setHasExecution(true);
    applyStep(0);
    return true;
  }

  async function ensureExecutionLoaded(
    selectedAlgorithm: string,
    mode: ExecutionMode,
    target?: number | null,
  ) {
    if (hasExecution && executionMode === mode) {
      return true;
    }

    clearExecutionState(false);

    try {
      if (mode === "array") {
        return await loadArrayExecution(selectedAlgorithm, target);
      }

      return await loadTreeExecution(selectedAlgorithm);
    } catch (err) {
      console.error("Execution request failed:", err);
      return false;
    }
  }

  function clearExecutionState(clearTreeRoot: boolean) {
    clearPlaybackTimer();
    setIsRunning(false);
    setIsPaused(false);
    setHasExecution(false);
    setExecutionMode(null);
    snapshotsRef.current = [];
    setCurrentStep(0);
    setWorkingArray([]);
    setActiveIndices([]);
    setSortedIndices([]);
    setSwapCount(0);
    setComparisonCount(0);
    setMergeRange(null);
    setPivotIndex(null);
    setHeapIndex(null);
    setCurrentLine(null);
    setProgress(0);
    state.setFoundCount(0);
    setActiveNodes([]);
    setVisitedNodes([]);
    setResultNodes([]);
    setTreeOutput([]);
    if (clearTreeRoot) {
      setTreeRoot(null);
    }
    setIsCompleted(false);
  }

  async function start(selectedAlgorithm: string, target?: number | null) {
    if (isRunning) return;

    const loaded = await ensureExecutionLoaded(
      selectedAlgorithm,
      "array",
      target,
    );
    if (!loaded || isCompleted) return;

    setIsRunning(true);
    setIsPaused(false);
  }

  async function startTreeTraversal(selectedAlgorithm: string) {
    if (isRunning) return;

    const loaded = await ensureExecutionLoaded(selectedAlgorithm, "tree");
    if (!loaded || isCompleted) return;

    setIsRunning(true);
    setIsPaused(false);
  }

  function pause() {
    if (!hasExecution) return;

    if (isRunning) {
      clearPlaybackTimer();
      setIsRunning(false);
      setIsPaused(true);

      // ✅ Persist current snapshot explicitly
      const snapshot = snapshotsRef.current[currentStep];
      if (snapshot) {
        applySnapshot(snapshot); // force sync
        setArray([...snapshot.workingArray]); // ← CRITICAL FIX
      }

      return;
    }

    if (currentStep < snapshotsRef.current.length - 1) {
      setIsRunning(true);
      setIsPaused(false);
    }
  }

  async function toggleManualPlayback(
    selectedAlgorithm: string,
    mode: ExecutionMode,
    target?: number | null,
  ) {
    const loaded = await ensureExecutionLoaded(selectedAlgorithm, mode, target);
    if (!loaded) return;

    if (isRunning) {
      pause();
      return;
    }

    if (currentStep < snapshotsRef.current.length - 1) {
      setIsRunning(true);
      setIsPaused(false);
    }
  }

  async function stepForward(
    selectedAlgorithm: string,
    mode: ExecutionMode,
    target?: number | null,
  ) {
    const loaded = await ensureExecutionLoaded(selectedAlgorithm, mode, target);
    if (!loaded) return;

    clearPlaybackTimer();
    setIsRunning(false);
    setIsPaused(true);

    const nextStep = Math.min(currentStep + 1, snapshotsRef.current.length - 1);
    applyStep(nextStep);
    if (nextStep === snapshotsRef.current.length - 1) {
      const snapshot = snapshotsRef.current[nextStep];
      if (snapshot) {
        setIsCompleted(true);
        setArray([...snapshot.workingArray]);
      }
    }
  }

  function stepBackward() {
    if (!hasExecution) return;

    clearPlaybackTimer();
    setIsRunning(false);
    setIsPaused(true);

    const nextStep = Math.max(currentStep - 1, 0);
    applyStep(nextStep);
  }

  function reset() {
    clearExecutionState(false);

    if (originalArrayRef.current.length > 0) {
      setArray([...originalArrayRef.current]);
    }
  }

  function regenerateArray() {
    if (hasExecution || isRunning) return;

    const newArray = generateRandomArray(arraySize);
    originalArrayRef.current = [...newArray];
    setArray([...newArray]);
    state.setFoundCount(0);
    setTarget(newArray[0]);
    setActiveIndices([]);
    setSortedIndices([]);
    setMergeRange(null);
    setPivotIndex(null);
    setHeapIndex(null);
  }

  function generateTree(count?: number) {
    if (hasExecution || isRunning) return;

    const finalCount = count ?? nodeCount;
    const tree = generateBalancedTree(finalCount);

    setTreeRoot(tree);
    setActiveNodes([]);
    setVisitedNodes([]);
    setResultNodes([]);
    setTreeOutput([]);
    setProgress(0);
    setCurrentLine(null);
  }

  return {
    start,
    pause,
    reset,
    regenerateArray,
    generateTree,
    startTreeTraversal,
    toggleManualPlayback,
    stepForward,
    stepBackward,
    isRunning,
    isPaused,
    hasExecution,
    playbackMode,
    isCompleted,
    currentStep,
    totalSteps: Math.max(snapshotsRef.current.length - 1, 0),
    setPlaybackMode,
    canStepBackward: hasExecution && currentStep > 0,
    canStepForward:
      hasExecution &&
      currentStep < Math.max(snapshotsRef.current.length - 1, 0),
  };
}
