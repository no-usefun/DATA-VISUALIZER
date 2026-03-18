import { useState, useRef, useEffect } from "react";
import { executeEvent } from "../engines/executeEvent";
import type { ExecutionEvent, ExecutionResponse } from "../types/event";
import { generateRandomArray } from "../utils/arrayUtils";

export function useAlgorithmRunner(state: any) {
  const {
    array,
    setArray,
    workingArray,
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
    setFoundCount,
  } = state;

  const [events, setEvents] = useState<ExecutionEvent[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<number | null>(null);
  const speedRef = useRef(speed);
  const currentIndexRef = useRef(0);
  const progressRef = useRef(0);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  async function start(selectedAlgorithm: string, target?: number | null) {
    if (isRunning) return;

    let snapshot = [...array];

    if (selectedAlgorithm === "binarySearch") {
      snapshot = snapshot.sort((a, b) => (a ?? 0) - (b ?? 0));

      setArray(snapshot);
    }

    setSwapCount(0);
    setComparisonCount(0);
    setSortedIndices([]);
    setActiveIndices([]);
    setCurrentLine(null);
    setPivotIndex(null);
    setFoundCount(0);

    currentIndexRef.current = 0;
    progressRef.current = 0;
    setProgress(0);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const body: any = {
        algorithm: selectedAlgorithm,
        input: snapshot,
      };

      if (
        selectedAlgorithm.toLowerCase().includes("search") &&
        target !== null
      ) {
        body.target = target;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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
  }

  function pause() {
    setIsPaused((prev) => {
      const next = !prev;

      if (next && timerRef.current) {
        clearTimeout(timerRef.current);
      }

      return next;
    });
  }

  function reset() {
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
    setFoundCount(0);
    if (originalArrayRef.current.length > 0) {
      setArray([...originalArrayRef.current]);
    }

    progressRef.current = 0;
    setProgress(0);
  }

  function regenerateArray() {
    if (isRunning) return;

    const newArray = generateRandomArray(arraySize, 100);

    originalArrayRef.current = [...newArray];
    setArray([...newArray]);
    setFoundCount(0);
    setTarget(newArray[0]);
    setActiveIndices([]);
    setSortedIndices([]);
    setMergeRange(null);
    setPivotIndex(null);
    setHeapIndex(null);
  }

  useEffect(() => {
    if (!isRunning || isPaused || events.length === 0) return;

    const runNext = () => {
      if (currentIndexRef.current >= events.length) {
        setWorkingArray((finalArr: any) => {
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
        setFoundCount,
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
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isRunning, isPaused, events]);

  return {
    start,
    pause,
    reset,
    regenerateArray,
    isRunning,
    isPaused,
  };
}
