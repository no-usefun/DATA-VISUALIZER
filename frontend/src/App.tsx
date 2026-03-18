import { useState, useEffect, useRef } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Workspace from "./components/layout/Workspace";
import StatusBar from "./components/layout/StatusBar";
import AlgorithmSelection from "./components/layout/AlgorithmSelection";
import CodePanel from "./components/layout/CodePanel";

import type { ExecutionEvent, ExecutionResponse } from "./types/algorithm";
import { executeEvent } from "./engines/executeEvent";

function generateRandomArray(size: number, max: number): number[] {
  const cappedMax = Math.min(max, 200);
  const min = 10;

  return Array.from({ length: size }, () =>
    Math.floor(min + Math.random() * (cappedMax - min + 1)),
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
  const [speed, setSpeed] = useState(500);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [array, setArray] = useState<(number | null)[]>(
    generateRandomArray(10, 100),
  );

  const [workingArray, setWorkingArray] = useState<(number | null)[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [events, setEvents] = useState<ExecutionEvent[]>([]);

  const [swapCount, setSwapCount] = useState(0);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const [currentLine, setCurrentLine] = useState<number | null>(null);

  const timerRef = useRef<number | null>(null);
  const originalArrayRef = useRef<(number | null)[]>([]);
  const speedRef = useRef(speed);
  const currentIndexRef = useRef(0);
  const progressRef = useRef(0);

  const [mergeRange, setMergeRange] = useState<{
    left: number;
    mid: number;
    right: number;
  } | null>(null);

  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [heapIndex, setHeapIndex] = useState<number | null>(null);

  const handleStart = async () => {
    if (isRunning || !selectedAlgorithm) return;
    if (array.every((v) => v === null)) return;

    const snapshot = [...array];

    setMergeRange(null);
    setSwapCount(0);
    setComparisonCount(0);
    setSortedIndices([]);
    setActiveIndices([]);
    setCurrentLine(null);

    currentIndexRef.current = 0;
    progressRef.current = 0;
    setProgress(0);

    setPivotIndex(null);
    setHeapIndex(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(API_URL, {
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
    } catch (err) {
      console.error("Execution request failed:", err);
    }
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
      timerRef.current = null;
    }

    setIsRunning(false);
    setIsPaused(false);
    setEvents([]);

    setSwapCount(0);
    setComparisonCount(0);

    setActiveIndices([]);
    setSortedIndices([]);

    setCurrentLine(null);

    currentIndexRef.current = 0;
    setWorkingArray([]);

    setMergeRange(null);
    setPivotIndex(null);
    setHeapIndex(null);

    if (originalArrayRef.current.length > 0) {
      setArray([...originalArrayRef.current]);
    }

    progressRef.current = 0;
    setProgress(0);
  };

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (!isRunning || isPaused || events.length === 0) return;

    const runNext = () => {
      if (currentIndexRef.current >= events.length) {
        setWorkingArray((finalArr) => {
          setArray(finalArr);
          return finalArr;
        });

        setIsRunning(false);
        setMergeRange(null);
        setProgress(100);
        setCurrentLine(null);
        return;
      }

      const event = events[currentIndexRef.current];

      setCurrentLine(event.line);

      executeEvent(event, {
        setWorkingArray,
        setActiveIndices,
        setSortedIndices,
        setSwapCount,
        setComparisonCount,
        setMergeRange,
        workingArray,
        setPivotIndex,
        setHeapIndex,
      });

      currentIndexRef.current++;

      const newProgress = Math.floor(
        (currentIndexRef.current / events.length) * 100,
      );

      if (newProgress !== progressRef.current) {
        progressRef.current = newProgress;
        setProgress(newProgress);
      }

      timerRef.current = window.setTimeout(runNext, speedRef.current);
    };

    timerRef.current = window.setTimeout(runNext, speedRef.current);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isRunning, isPaused, events]);

  useEffect(() => {
    if (!isRunning) {
      const newArray = generateRandomArray(arraySize, 100);
      originalArrayRef.current = [...newArray];
      setArray(newArray);
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
            />

            <Workspace
              array={isRunning ? workingArray : array}
              activeIndices={activeIndices}
              sortedIndices={sortedIndices}
              comparisons={comparisonCount}
              swaps={swapCount}
              progress={progress}
              mergeRange={mergeRange || undefined}
              pivotIndex={pivotIndex}
              heapIndex={heapIndex}
            />

            <CodePanel
              algorithm={selectedAlgorithm}
              currentLine={currentLine}
            />
          </>
        )}
      </main>

      <StatusBar algorithm={selectedAlgorithm} isRunning={isRunning} />
    </div>
  );
}
