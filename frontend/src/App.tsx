import { useState, useEffect, useRef } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Workspace from "./components/layout/Workspace";
import StatusBar from "./components/layout/StatusBar";
import AlgorithmSelection from "./components/layout/AlgorithmSelection";
import CodePanel from "./components/layout/CodePanel";

import type { ExecutionEvent, ExecutionResponse } from "./types/algorithm";

function generateRandomArray(size: number, max: number): number[] {
  const cappedMax = Math.min(max, 200);
  const min = 10;

  return Array.from({ length: size }, () =>
    Math.floor(min + Math.random() * (cappedMax - min + 10)),
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<
    "sorting" | "searching" | "graphs" | null
  >(null);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(
    null,
  );

  const [arraySize, setArraySize] = useState(10);
  const [speed, setSpeed] = useState(200);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [array, setArray] = useState<(number | null)[]>(
    generateRandomArray(10, 100),
  );

  const [workingArray, setWorkingArray] = useState<(number | null)[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [events, setEvents] = useState<ExecutionEvent[]>([]);

  const currentIndexRef = useRef(0);
  const [swapCount, setSwapCount] = useState(0);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [viewMode, setViewMode] = useState<"bars" | "values">("bars");
  const timerRef = useRef<number>(null);
  const originalArrayRef = useRef<(number | null)[]>([]);

  const [mergeRange, setMergeRange] = useState<{
    left: number;
    mid?: number;
    right: number;
  } | null>(null);

  const handleStart = async () => {
    if (isRunning || !selectedAlgorithm) return;

    const snapshot = [...array];

    // Reset metrics
    setSwapCount(0);
    setComparisonCount(0);
    setProgress(0);
    setSortedIndices([]);
    setActiveIndices([]);
    currentIndexRef.current = 0;

    const response = await fetch("http://localhost:8080/api/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        algorithm: selectedAlgorithm,
        input: snapshot,
      }),
    });

    const data: ExecutionResponse = await response.json();
    if (!data.success) return;

    setWorkingArray(snapshot);
    setEvents(data.data);
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused((prev) => {
      const newState = !prev;

      if (newState && timerRef.current) {
        clearTimeout(timerRef.current);
      }

      return newState;
    });
  };

  const handleReset = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsRunning(false);
    setIsPaused(false);
    setEvents([]);
    setSwapCount(0);
    setComparisonCount(0);
    setProgress(0);
    setActiveIndices([]);
    setSortedIndices([]);
    currentIndexRef.current = 0;
    setWorkingArray([]);

    setArray([...originalArrayRef.current]);
  };

  useEffect(() => {
    if (!isRunning || isPaused || events.length === 0) return;

    const runNext = () => {
      if (currentIndexRef.current >= events.length) {
        setWorkingArray((finalArr) => {
          setArray([...finalArr]);
          return finalArr;
        });

        setIsRunning(false);
        setProgress(100);
        return;
      }

      executeEvent(events[currentIndexRef.current]);
      currentIndexRef.current++;

      setProgress(Math.floor((currentIndexRef.current / events.length) * 100));

      timerRef.current = window.setTimeout(runNext, speed);
    };

    timerRef.current = window.setTimeout(runNext, speed);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isRunning, isPaused, events, speed]);

  const executeEvent = (event: ExecutionEvent) => {
    switch (event.type) {
      case "SWAP": {
        const { i, j } = event.data;

        setWorkingArray((prev) => {
          const newArr = [...prev];
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
          return newArr;
        });

        setSwapCount((prev) => prev + 1);
        break;
      }

      case "COMPARE": {
        const { i, j } = event.data;

        setComparisonCount((prev) => prev + 1);
        setActiveIndices([i, j]);

        break;
      }

      case "HIGHLIGHT": {
        const { i, j } = event.data;
        setActiveIndices([i, j]);
        break;
      }

      case "MARK_SORTED": {
        const { index } = event.data;

        setSortedIndices((prev) => {
          if (prev.includes(index)) return prev;
          return [...prev, index];
        });

        break;
      }

      case "SHIFT": {
        const { from, to } = event.data;

        setWorkingArray((prev) => {
          const arr = [...prev];

          arr[to] = arr[from];
          arr[from] = null;

          return arr;
        });

        break;
      }

      case "MOVE": {
        const { from, to, value } = event.data;

        setWorkingArray((prev) => {
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

        setWorkingArray((prev) => {
          const arr = [...prev];
          arr[index] = value;
          return arr;
        });

        break;
      }

      case "INSERT": {
        const { index, value } = event.data;

        setWorkingArray((prev) => {
          const newArr = [...prev];
          newArr[index] = value;
          return newArr;
        });

        break;
      }

      case "BREAK": {
        const { i } = event.data;
        setActiveIndices([i]);
        break;
      }

      case "SET_PIVOT": {
        const { index } = event.data;
        setActiveIndices([index]);
        break;
      }

      case "MERGE": {
        const { left, mid, right } = event.data;

        setMergeRange({
          left,
          mid,
          right,
        });

        break;
      }

      case "RANGE": {
        const { start, end } = event.data;

        if (start > end) break;

        const range = Array.from(
          { length: end - start + 1 },
          (_, i) => start + i,
        );

        setActiveIndices(range);
        break;
      }

      case "HEAPIFY": {
        const { index } = event.data;
        setActiveIndices([index]);
        break;
      }

      case "REMOVE": {
        const { index } = event.data;

        setWorkingArray((prev) => {
          const arr = [...prev];
          arr[index] = null;
          return arr;
        });

        break;
      }

      default:
        break;
    }
  };

  useEffect(() => {
    if (!isRunning) {
      setArray(generateRandomArray(arraySize, 100));
    }
  }, [arraySize]);

  const regenerateArray = () => {
    if (isRunning) return;
    const newArray = generateRandomArray(arraySize, 100);
    originalArrayRef.current = [...newArray];
    setArray([...newArray]);
  };

  const handleCategoryChange = (
    category: "sorting" | "searching" | "graphs",
  ) => {
    setActiveCategory(category);
    setSelectedAlgorithm(null);
    handleReset();
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-950 text-white">
      <Navbar
        activeCategory={activeCategory}
        onCategorySelect={handleCategoryChange}
      />

      <main className="flex flex-1 min-h-0 overflow-hidden">
        {!selectedAlgorithm ? (
          <AlgorithmSelection
            category={activeCategory}
            onSelect={setSelectedAlgorithm}
          />
        ) : (
          <>
            <Sidebar
              onGenerate={regenerateArray}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              arraySize={arraySize}
              setArraySize={setArraySize}
              speed={speed}
              setSpeed={setSpeed}
              isRunning={isRunning}
              isPaused={isPaused}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            <Workspace
              array={isRunning ? workingArray : array}
              activeIndices={activeIndices}
              sortedIndices={sortedIndices}
              comparisons={comparisonCount}
              swaps={swapCount}
              progress={progress}
              viewMode={viewMode}
            />

            <CodePanel algorithm={selectedAlgorithm} />
          </>
        )}
      </main>

      <StatusBar algorithm={selectedAlgorithm} isRunning={isRunning} />
    </div>
  );
}
