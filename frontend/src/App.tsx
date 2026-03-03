import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Workspace from "./components/layout/Workspace";
import StatusBar from "./components/layout/StatusBar";

import type { ExecutionEvent, ExecutionResponse } from "./types/algorithm";

function generateRandomArray(size: number, max: number): number[] {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * max) + 20,
  );
}

export default function App() {
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(200);
  const [isRunning, setIsRunning] = useState(false);

  const [array, setArray] = useState<number[]>(generateRandomArray(30, 400));

  const [workingArray, setWorkingArray] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [events, setEvents] = useState<ExecutionEvent[]>([]);

  // =========================
  // Start Bubble Sort
  // =========================
  const handleStart = async () => {
    if (isRunning) return;

    const snapshot = [...array]; // freeze initial state

    const response = await fetch("http://localhost:8080/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        algorithm: "bubbleSort",
        input: snapshot,
      }),
    });

    const data: ExecutionResponse = await response.json();
    if (!data.success) return;

    setWorkingArray(snapshot);
    setEvents(data.data);
    setSortedIndices([]);
    setActiveIndices([]);
    setIsRunning(true);
  };

  // =========================
  // Sequential Event Execution
  // =========================
  useEffect(() => {
    if (!isRunning || events.length === 0) return;

    let index = 0;
    let cancelled = false;

    const runNext = () => {
      if (cancelled) return;

      if (index >= events.length) {
        // Persist final sorted result
        setArray((prev) => [...workingArray]);
        setIsRunning(false);
        setActiveIndices([]);
        return;
      }

      executeEvent(events[index]);
      index++;

      setTimeout(runNext, speed);
    };

    runNext();

    return () => {
      cancelled = true;
    };
  }, [isRunning, events, speed]);

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
    }

    if (event.type === "HIGHLIGHT" || event.type === "COMPARE") {
      const { i, j } = event.data;
      setActiveIndices([i, j]);
    }

    if (event.type === "MARK_SORTED") {
      const { index } = event.data;
      setSortedIndices((prev) => [...prev, index]);
    }
  };

  // =========================
  // Regenerate on Size Change
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
  // Render
  // =========================
  return (
    <div className="h-screen flex flex-col bg-neutral-950 text-white">
      <Navbar />

      <main className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar
          onGenerate={regenerateArray}
          arraySize={arraySize}
          setArraySize={setArraySize}
          speed={speed}
          setSpeed={setSpeed}
          isRunning={isRunning}
          onTest={handleStart}
        />

        <Workspace
          array={isRunning ? workingArray : array}
          activeIndices={activeIndices}
          sortedIndices={sortedIndices}
        />
      </main>

      <StatusBar />
    </div>
  );
}
