import Button from "../../ui/Button";
import Slider from "../../ui/Slider";
import LegendButton from "./LegendButton";
import { getLegendItems } from "../../../data/legendMetadata";

type ArraySidebarProps = {
  category: "sorting" | "searching" | "graphs" | "trees" | null;
  algorithm: string | null;
  onGenerate: () => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;

  arraySize: number;
  setArraySize: (value: number) => void;

  speed: number;
  setSpeed: (value: number) => void;

  isRunning: boolean;
  isPaused: boolean;
  target: number | null;
  setTarget: (value: number | null) => void;
  isSearchingAlgorithm: boolean;
};

export default function ArraySidebar({
  category,
  algorithm,
  onGenerate,
  onStart,
  onPause,
  onReset,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  isRunning,
  isPaused,
  target,
  setTarget,
  isSearchingAlgorithm,
}: ArraySidebarProps) {
  const MIN_ARRAY_SIZE = 5;
  const MAX_ARRAY_SIZE = 30;
  const MIN_DELAY_SPEED = 20;
  const MAX_DELAY_SPPED = 1500;

  const handleTargetChange = (value: string) => {
    if (value === "") {
      setTarget(null);
      return;
    }

    const parsed = Number(value);

    if (!Number.isNaN(parsed)) {
      setTarget(parsed);
    }
  };

  const legendItems = getLegendItems(category, algorithm);

  return (
    <aside className="w-80 border-r border-neutral-800 p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm uppercase tracking-wide ">Controls</h2>
        <LegendButton items={legendItems} />
      </div>
      {/* Array Size */}
      <Slider
        label="Array Size"
        min={MIN_ARRAY_SIZE}
        max={MAX_ARRAY_SIZE}
        value={arraySize}
        displayValue={arraySize}
        onChange={setArraySize}
        disabled={isRunning}
      />
      {/* Speed */}
      <Slider
        label="Speed"
        min={MIN_DELAY_SPEED}
        max={MAX_DELAY_SPPED}
        value={speed}
        onChange={setSpeed}
        label_1="Fast"
        label_2="Slow"
      />
      {/* Buttons */}
      <div className="space-y-4">
        <Button onClick={onGenerate} variant="primary" disabled={isRunning}>
          Generate Array
        </Button>

        <Button onClick={onStart} variant="success" disabled={isRunning}>
          Start
        </Button>

        <Button onClick={onPause} variant="warning" disabled={!isRunning}>
          {isPaused ? "Resume" : "Pause"}
        </Button>

        <Button
          onClick={onReset}
          variant="danger"
          disabled={isRunning && !isPaused}
        >
          Reset
        </Button>
      </div>

      {isSearchingAlgorithm && (
        <div className="flex items-center gap-3">
          <label className="text-sm text-neutral-300">Target</label>

          <input
            type="number"
            value={target ?? ""}
            onChange={(e) => handleTargetChange(e.target.value)}
            disabled={isRunning}
            className={`w-24 px-2 py-1 rounded border text-white
                      ${
                        isRunning
                          ? "bg-neutral-700 border-neutral-600 cursor-not-allowed"
                          : "bg-neutral-800 border-neutral-700"
                      }`}
          />
        </div>
      )}
    </aside>
  );
}
