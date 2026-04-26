import Button from "../../ui/Button";
import Slider from "../../ui/Slider";
import LegendButton from "./LegendButton";
import { getLegendItems } from "../../../data/legendMetadata";

type ArraySidebarProps = {
  category: "sorting" | "searching" | "graphs" | "trees" | null;
  algorithm: string | null;
  onGenerate: () => void;
  onReset: () => void;

  arraySize: number;
  setArraySize: (value: number) => void;

  speed: number;
  setSpeed: (value: number) => void;

  isRunning: boolean;
  onStepBack: () => void;
  onStepForward: () => void;
  onManualPlayPause: () => void;
  target: number | null;
  setTarget: (value: number | null) => void;
  isSearchingAlgorithm: boolean;
  canStepBackward: boolean;
  canStepForward: boolean;
};

export default function ArraySidebar({
  category,
  algorithm,
  onGenerate,
  onReset,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  isRunning,
  onStepBack,
  onStepForward,
  onManualPlayPause,
  target,
  setTarget,
  isSearchingAlgorithm,
  canStepBackward,
  canStepForward,
}: ArraySidebarProps) {
  const MIN_ARRAY_SIZE = 5;
  const MAX_ARRAY_SIZE = 30;
  const MIN_DELAY_SPEED = 200;
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
    <aside className="flex w-64 flex-col gap-5 border-r border-neutral-800 p-4 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs uppercase tracking-wide">Controls</h2>
        </div>
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
      <div className="space-y-3">
        <Button onClick={onGenerate} variant="primary" disabled={isRunning}>
          Generate Array
        </Button>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={onStepBack}
            disabled={isRunning || !canStepBackward}
            className="rounded-md bg-neutral-800 px-2 py-2 text-base text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {"<"}
          </button>

          <button
            type="button"
            onClick={onManualPlayPause}
            className="rounded-md bg-green-600 px-2 py-2 text-xs font-medium text-white transition hover:bg-green-500"
          >
            {isRunning ? "Pause" : "Play"}
          </button>

          <button
            type="button"
            onClick={onStepForward}
            disabled={isRunning || !canStepForward}
            className="rounded-md bg-neutral-800 px-2 py-2 text-base text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {">"}
          </button>
        </div>

        <Button onClick={onReset} variant="danger" disabled={isRunning}>
          Reset
        </Button>
      </div>

      {isSearchingAlgorithm && (
        <div className="flex items-center gap-3">
          <label className="text-xs text-neutral-300">Target</label>

          <input
            type="number"
            value={target ?? ""}
            onChange={(e) => handleTargetChange(e.target.value)}
            disabled={isRunning}
            className={`w-20 rounded border px-2 py-1 text-xs text-white
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
