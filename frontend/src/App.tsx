import { useState } from "react";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Workspace from "./components/layout/Workspace/Workspace";
import StatusBar from "./components/layout/StatusBar";
import AlgorithmSelection from "./components/layout/AlgorithmSelection";
import CodePanel from "./components/layout/CodePanel";

import { useVisualizerState } from "./hooks/useVisualizerState";
import { useAlgorithmRunner } from "./hooks/useAlgorithmRunner";
import { updateTreeNodeValue } from "./utils/treeUtils";
import { MAX_NODE_VALUE, MIN_NODE_VALUE } from "./types/tree";

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

  const handleArrayValueChange = (index: number, currentValue: number | null) => {
    if (runner.isRunning || currentValue === null) return;

    const nextValue = window.prompt(
      `Enter a bar value between ${MIN_NODE_VALUE} and ${MAX_NODE_VALUE}`,
      String(currentValue),
    );

    if (nextValue === null) return;

    const parsed = Number(nextValue);

    if (
      Number.isNaN(parsed) ||
      parsed < MIN_NODE_VALUE ||
      parsed > MAX_NODE_VALUE
    ) {
      window.alert(
        `Please enter a number between ${MIN_NODE_VALUE} and ${MAX_NODE_VALUE}.`,
      );
      return;
    }

    visualizer.setArray((prev) => {
      const next = [...prev];
      next[index] = parsed;
      visualizer.originalArrayRef.current = [...next];
      return next;
    });
  };

  const handleTreeNodeValueChange = (nodeId: string, value: number) => {
    if (runner.isRunning) return;

    visualizer.setTreeRoot((prev) => updateTreeNodeValue(prev, nodeId, value));
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
              isEditable={!runner.isRunning}
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
