import { useState, useEffect, useRef } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Workspace from "./components/layout/Workspace";
import StatusBar from "./components/layout/StatusBar";
import AlgorithmSelection from "./components/layout/AlgorithmSelection";
import CodePanel from "./components/layout/CodePanel";

import type { ExecutionEvent, ExecutionResponse } from "./types/algorithm";

function generateRandomArray(size: number, max: number): number[] {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * max) + 20,
  );
}

export default function App() {
  // =========================
  // Category + Algorithm State
  // =========================
  const [activeCategory, setActiveCategory] = useState<
    "sorting" | "searching" | "graphs" | null
  >(null);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(
    null,
  );

  // =========================
  // Execution State
  // =========================
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(200);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [array, setArray] = useState<number[]>(generateRandomArray(30, 400));

  const [workingArray, setWorkingArray] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [events, setEvents] = useState<ExecutionEvent[]>([]);
  const currentIndexRef = useRef(0);

  // =========================
  // Metrics State
  // =========================
  const [swapCount, setSwapCount] = useState(0);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [viewMode, setViewMode] = useState<"bars" | "values">("bars");

  // =========================
  // Start Algorithm
  // =========================
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

  // =========================
  // Pause / Resume
  // =========================
  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  // =========================
  // Reset
  // =========================
  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setEvents([]);
    setSwapCount(0);
    setComparisonCount(0);
    setProgress(0);
    setActiveIndices([]);
    setSortedIndices([]);
    currentIndexRef.current = 0;
    setArray(generateRandomArray(arraySize, 400));
  };

  // =========================
  // Event Runner
  // =========================
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

      setTimeout(runNext, speed);
    };

    const timer = setTimeout(runNext, speed);
    return () => clearTimeout(timer);
  }, [isRunning, isPaused, events, speed]);

  // =========================
  // Event Executor
  // =========================
  const executeEvent = (event: ExecutionEvent) => {
    if (event.type === "SWAP") {
      const { i, j } = event.data;

      setWorkingArray((prev) => {
        const newArr = [...prev];
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        return newArr;
      });

      setSwapCount((prev) => prev + 1);
    }

    if (event.type === "COMPARE") {
      setComparisonCount((prev) => prev + 1);
      const { i, j } = event.data;
      setActiveIndices([i, j]);
    }

    if (event.type === "HIGHLIGHT") {
      const { i, j } = event.data;
      setActiveIndices([i, j]);
    }

    if (event.type === "MARK_SORTED") {
      const { index } = event.data;
      setSortedIndices((prev) => [...prev, index]);
    }
  };

  // =========================
  // Regenerate Array on Size Change
  // =========================
  useEffect(() => {
    if (!isRunning) {
      setArray(generateRandomArray(arraySize, 400));
    }
  }, [arraySize]);

  const regenerateArray = () => {
    if (isRunning) return;
    setArray(generateRandomArray(arraySize, 400));
  };

  // =========================
  // Handle Category Change
  // =========================
  const handleCategoryChange = (
    category: "sorting" | "searching" | "graphs",
  ) => {
    setActiveCategory(category);
    setSelectedAlgorithm(null);
    handleReset();
  };

  // =========================
  // Render
  // =========================
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
