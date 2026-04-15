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
  hasExecution: boolean;
  playbackMode: "auto" | "manual";
  setPlaybackMode: (value: "auto" | "manual") => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onManualPlayPause: () => void;
  canStepBackward: boolean;
  canStepForward: boolean;
  target: number | null;
  setTarget: (value: number | null) => void;
  isSearchingAlgorithm: boolean;
  isCompleted?: boolean;
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
  hasExecution,
  playbackMode,
  setPlaybackMode,
  onStepBack,
  onStepForward,
  onManualPlayPause,
  canStepBackward,
  canStepForward,
  target,
  setTarget,
  isSearchingAlgorithm,
  isCompleted,
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
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Mode
        </p>
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-neutral-900 p-1">
          {(["auto", "manual"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setPlaybackMode(mode)}
              className={`rounded-md px-3 py-2 text-sm font-medium capitalize transition ${
                playbackMode === mode
                  ? "bg-blue-600 text-white"
                  : "text-neutral-300 hover:bg-neutral-800"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="space-y-4">
        <Button
          onClick={onGenerate}
          variant="primary"
          disabled={isRunning || isPaused}
        >
          Generate Array
        </Button>

        {playbackMode === "auto" ? (
          <>
            <Button
              onClick={onStart}
              variant="success"
              disabled={isRunning || isPaused || (hasExecution && !isPaused)}
            >
              Start
            </Button>

            <Button
              onClick={onPause}
              variant="warning"
              disabled={!hasExecution || isCompleted}
            >
              {isRunning || isCompleted ? "Pause" : "Play"}
            </Button>
          </>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={onStepBack}
              disabled={!canStepBackward}
              className="rounded-md bg-neutral-800 px-3 py-2 text-lg text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {"<"}
            </button>

            <button
              type="button"
              onClick={onManualPlayPause}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-500"
            >
              {isRunning ? "Pause" : "Play"}
            </button>

            <button
              type="button"
              onClick={onStepForward}
              disabled={!canStepForward && hasExecution}
              className="rounded-md bg-neutral-800 px-3 py-2 text-lg text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        )}

        <Button
          onClick={onReset}
          variant="danger"
          disabled={!hasExecution && !isRunning}
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
            disabled={hasExecution || isRunning}
            className={`w-24 px-2 py-1 rounded border text-white
                      ${
                        hasExecution || isRunning
                          ? "bg-neutral-700 border-neutral-600 cursor-not-allowed"
                          : "bg-neutral-800 border-neutral-700"
                      }`}
          />
        </div>
      )}
    </aside>
  );
}
