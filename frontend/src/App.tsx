import { useState } from "react";

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

export default function App() {
  const visualizer = useVisualizerState();
  const runner = useAlgorithmRunner(visualizer);

  const [activeCategory, setActiveCategory] = useState<
    "sorting" | "searching" | "trees" | null
  >(null);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(
    null,
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [showDashboard, setShowDashboard] = useState(true);

  const handleCategoryChange = (
    category: "sorting" | "searching" | "trees",
  ) => {
    setActiveCategory(category);
    setShowDashboard(false);
    setSelectedAlgorithm(null);
    runner.reset();
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

  return (
    <div className="h-screen flex flex-col bg-neutral-950 text-white">
      <Navbar
        activeCategory={activeCategory}
        onCategorySelect={handleCategoryChange}
      />

      <main className="flex flex-1 min-h-0 overflow-hidden">
        {showDashboard ? (
          <Dashboard />
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
              onStart={
                activeCategory === "trees"
                  ? () => runner.startTreeTraversal(selectedAlgorithm!)
                  : () => runner.start(selectedAlgorithm!, visualizer.target)
              }
              setNodeCount={visualizer.setNodeCount}
              nodeCount={visualizer.nodeCount}
              onPause={runner.pause}
              onReset={runner.reset}
              arraySize={visualizer.arraySize}
              setArraySize={visualizer.setArraySize}
              speed={visualizer.speed}
              setSpeed={visualizer.setSpeed}
              isRunning={runner.isRunning}
              isPaused={runner.isPaused}
              hasExecution={runner.hasExecution}
              playbackMode={runner.playbackMode}
              setPlaybackMode={runner.setPlaybackMode}
              onStepBack={runner.stepBackward}
              isCompleted={runner.isCompleted}
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
              canStepBackward={runner.canStepBackward}
              canStepForward={runner.canStepForward}
              target={visualizer.target}
              setTarget={visualizer.setTarget}
              isSearchingAlgorithm={activeCategory === "searching"}
            />

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
          </>
        )}
      </main>

      <StatusBar algorithm={selectedAlgorithm} isRunning={runner.isRunning} />
    </div>
  );
}
