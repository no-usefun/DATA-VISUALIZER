import { useState } from "react";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Workspace from "./components/layout/Workspace/Workspace";
import StatusBar from "./components/layout/StatusBar";
import AlgorithmSelection from "./components/layout/AlgorithmSelection";
import CodePanel from "./components/layout/CodePanel";

import { useVisualizerState } from "./hooks/useVisualizerState";
import { useAlgorithmRunner } from "./hooks/useAlgorithmRunner";

export default function App() {
  const visualizer = useVisualizerState();
  const runner = useAlgorithmRunner(visualizer);

  const [activeCategory, setActiveCategory] = useState<
    "sorting" | "searching" | "graphs" | "trees" | null
  >(null);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(
    null,
  );

  const handleCategoryChange = (
    category: "sorting" | "searching" | "graphs" | "trees",
  ) => {
    setActiveCategory(category);

    // reset algorithm so algorithm selection screen shows again
    setSelectedAlgorithm(null);

    // optional but recommended
    runner.reset();
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
              root={visualizer.treeRoot}
              activeNodes={visualizer.activeNodes}
              visitedNodes={visualizer.visitedNodes}
              resultNodes={visualizer.resultNodes}
              treeOutput={visualizer.treeOutput}
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
