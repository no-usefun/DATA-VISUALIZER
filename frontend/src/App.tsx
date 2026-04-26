import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Workspace from "./components/layout/Workspace/Workspace";
import StatusBar from "./components/layout/StatusBar";
import AlgorithmSelection from "./components/layout/AlgorithmSelection";
import CodePanel from "./components/layout/CodePanel";
import Dashboard from "./components/layout/Dashboard";

import { useVisualizerState } from "./hooks/useVisualizerState";
import { useAlgorithmRunner } from "./hooks/useAlgorithmRunner";
import { updateTreeNodeValue } from "./utils/treeUtils";
import { updateArrayValue } from "./utils/arrayUtils";
import type { TreeUpdateResult } from "./types/tree";

type Category = "sorting" | "searching" | "trees";
type AppCategory = Category | null;

type RecentActivityItem = {
  category: Category;
  algorithm: string;
  label: string;
  timestamp: string;
};

const RECENT_ACTIVITY_KEY = "dsa-visualizer-recent-activity";

const algorithmCatalog: Record<
  Category,
  Array<{ label: string; value: string }>
> = {
  sorting: [
    { label: "Bubble Sort", value: "bubbleSort" },
    { label: "Merge Sort", value: "mergeSort" },
    { label: "Quick Sort", value: "quickSort" },
    { label: "Heap Sort", value: "heapSort" },
  ],
  searching: [
    { label: "Linear Search", value: "linearSearch" },
    { label: "Binary Search", value: "binarySearch" },
  ],
  trees: [
    { label: "BFS", value: "bfsTraversal" },
    { label: "DFS", value: "dfsTraversal" },
    { label: "Inorder Traversal", value: "inorderTraversal" },
    { label: "Level Order Traversal", value: "levelOrderTraversal" },
  ],
};

export default function App() {
  const visualizer = useVisualizerState();
  const runner = useAlgorithmRunner(visualizer);

  const [activeCategory, setActiveCategory] = useState<AppCategory>(null);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(
    null,
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [showDashboard, setShowDashboard] = useState(true);
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>(
    [],
  );

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(RECENT_ACTIVITY_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as RecentActivityItem[];
      if (Array.isArray(parsed)) {
        setRecentActivity(parsed);
      }
    } catch (error) {
      console.error("Failed to load recent activity:", error);
    }
  }, []);

  useEffect(() => {
    if (!selectedAlgorithm || showDashboard) return;

    if (activeCategory === "trees") {
      runner.generateTree();
      return;
    }

    runner.regenerateArray();
  }, [activeCategory, selectedAlgorithm, showDashboard]);

  useEffect(() => {
    if (!activeCategory || !selectedAlgorithm) return;

    const algorithmEntry =
      algorithmCatalog[activeCategory].find(
        (item) => item.value === selectedAlgorithm,
      ) ?? null;

    if (!algorithmEntry) return;

    const nextEntry: RecentActivityItem = {
      category: activeCategory,
      algorithm: selectedAlgorithm,
      label: algorithmEntry.label,
      timestamp: new Date().toISOString(),
    };

    setRecentActivity((prev) => {
      const filtered = prev.filter(
        (item) =>
          !(
            item.category === nextEntry.category &&
            item.algorithm === nextEntry.algorithm
          ),
      );
      const next = [nextEntry, ...filtered].slice(0, 6);
      window.localStorage.setItem(RECENT_ACTIVITY_KEY, JSON.stringify(next));
      return next;
    });
  }, [activeCategory, selectedAlgorithm]);

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setShowDashboard(false);
    setSelectedAlgorithm(null);
    setSelectedIndex(null);
    runner.reset();
  };

  const openAlgorithm = (category: Category, algorithm: string) => {
    runner.reset();
    setActiveCategory(category);
    setSelectedAlgorithm(algorithm);
    setSelectedIndex(null);
    setShowDashboard(false);
  };

  const handleMenuBack = () => {
    if (selectedAlgorithm) {
      setSelectedAlgorithm(null);
      runner.reset();
    } else if (activeCategory) {
      setActiveCategory(null);
      setShowDashboard(true);
    } else {
      setShowDashboard(true);
    }
  };

  const handleArrayValueChange = (
    index: number,
    currentValue: number | null,
  ) => {
    if (runner.isRunning || runner.isCompleted) return { success: false };

    let resultRef: any = null;

    visualizer.setArray((prev) => {
      const result = updateArrayValue(prev, index, currentValue);
      resultRef = result;

      if (!result.success) return prev;

      const next = result.data;
      visualizer.originalArrayRef.current = [...next];
      return next;
    });

    return resultRef;
  };

  const handleTreeNodeValueChange = (
    nodeId: string,
    value: number,
  ): TreeUpdateResult => {
    if (runner.isRunning || runner.isCompleted) {
      return { success: false, error: "INVALID" };
    }

    let resultRef: TreeUpdateResult = { success: false, error: "INVALID" };

    visualizer.setTreeRoot((prev) => {
      const result = updateTreeNodeValue(prev, nodeId, value);
      resultRef = result;

      if (!result.success) return prev;

      return result.data;
    });

    return resultRef;
  };

  const handleRandomAlgorithm = () => {
    const categories = Object.keys(algorithmCatalog) as Category[];
    const category =
      categories[Math.floor(Math.random() * categories.length)] ?? "sorting";
    const algorithms = algorithmCatalog[category];
    const selected =
      algorithms[Math.floor(Math.random() * algorithms.length)] ??
      algorithmCatalog.sorting[0];

    openAlgorithm(category, selected.value);
  };

  const handleResumeLastSession = () => {
    const lastSession = recentActivity[0];
    if (!lastSession) return;

    openAlgorithm(lastSession.category, lastSession.algorithm);
  };

  const handleHomeClick = () => {
    runner.reset();
    setSelectedAlgorithm(null);
    setActiveCategory(null);
    setSelectedIndex(null);
    setShowDashboard(true);
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-950 text-white">
      <Navbar
        activeCategory={activeCategory}
        onCategorySelect={handleCategoryChange}
        onHomeClick={handleHomeClick}
      />

      <main className="flex flex-1 min-h-0 overflow-hidden">
        {showDashboard ? (
          <Dashboard
            recentActivity={recentActivity}
            onExploreCategory={handleCategoryChange}
            onStartVisualization={() => handleCategoryChange("sorting")}
            onRandomAlgorithm={handleRandomAlgorithm}
            onResumeLastSession={handleResumeLastSession}
          />
        ) : !selectedAlgorithm ? (
          <AlgorithmSelection
            category={activeCategory}
            onSelect={setSelectedAlgorithm}
            onBack={handleMenuBack}
          />
        ) : (
          <>
            <Sidebar
              category={activeCategory}
              algorithm={selectedAlgorithm}
              onGenerate={
                activeCategory === "trees"
                  ? runner.generateTree
                  : runner.regenerateArray
              }
              setNodeCount={visualizer.setNodeCount}
              nodeCount={visualizer.nodeCount}
              onReset={runner.reset}
              arraySize={visualizer.arraySize}
              setArraySize={visualizer.setArraySize}
              speed={visualizer.speed}
              setSpeed={visualizer.setSpeed}
              isRunning={runner.isRunning}
              onStepBack={runner.stepBackward}
              onStepForward={
                activeCategory === "trees"
                  ? () => runner.stepForward(selectedAlgorithm!, "tree")
                  : () =>
                      runner.stepForward(
                        selectedAlgorithm!,
                        "array",
                        visualizer.target,
                      )
              }
              onManualPlayPause={
                activeCategory === "trees"
                  ? () =>
                      runner.toggleManualPlayback(selectedAlgorithm!, "tree")
                  : () =>
                      runner.toggleManualPlayback(
                        selectedAlgorithm!,
                        "array",
                        visualizer.target,
                      )
              }
              target={visualizer.target}
              setTarget={visualizer.setTarget}
              isSearchingAlgorithm={activeCategory === "searching"}
              canStepBackward={runner.canStepBackward}
              canStepForward={runner.canStepForward}
            />

            <div className="flex min-w-0 flex-1 overflow-hidden">
              <Workspace
                category={activeCategory}
                array={
                  runner.isRunning ? visualizer.workingArray : visualizer.array
                }
                activeIndices={visualizer.activeIndices}
                sortedIndices={visualizer.sortedIndices}
                comparisons={visualizer.comparisonCount}
                swaps={visualizer.swapCount}
                progress={visualizer.progress}
                mergeRange={visualizer.mergeRange || undefined}
                pivotIndex={visualizer.pivotIndex}
                heapIndex={visualizer.heapIndex}
                foundCount={visualizer.foundCount}
                isSearchingAlgorithm={activeCategory === "searching"}
                isEditable={!runner.hasExecution && !runner.isRunning}
                selectedIndex={selectedIndex}
                onSelectIndex={setSelectedIndex}
                onArrayValueChange={handleArrayValueChange}
                root={visualizer.treeRoot}
                activeNodes={visualizer.activeNodes}
                visitedNodes={visualizer.visitedNodes}
                resultNodes={visualizer.resultNodes}
                treeOutput={visualizer.treeOutput}
                onTreeNodeValueChange={handleTreeNodeValueChange}
              />

              <CodePanel
                algorithm={selectedAlgorithm}
                currentLine={visualizer.currentLine}
              />
            </div>
          </>
        )}
      </main>

      <StatusBar
        algorithm={selectedAlgorithm}
        isRunning={runner.isRunning}
        currentStep={runner.hasExecution ? runner.currentStep : null}
        totalSteps={runner.hasExecution ? runner.totalSteps : null}
        isDashboard={showDashboard}
      />
    </div>
  );
}
