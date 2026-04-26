import Button from "../../ui/Button";
import Slider from "../../ui/Slider";
import LegendButton from "./LegendButton";
import { getLegendItems } from "../../../data/legendMetadata";

type Props = {
  category: "sorting" | "searching" | "graphs" | "trees" | null;
  algorithm: string | null;
  onGenerate: (nodeCount: number) => void;

  speed: number;
  setSpeed: (value: number) => void;

  nodeCount: number;
  setNodeCount: (value: number) => void;

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

  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

export default function TreeSidebar({
  category,
  algorithm,
  onGenerate,
  speed,
  setSpeed,
  nodeCount,
  setNodeCount,
  isRunning,
  hasExecution,
  onStepBack,
  onStepForward,
  onManualPlayPause,
  canStepBackward,
  canStepForward,
  onReset,
}: Props) {
  const MIN_SPEED = 20;
  const MAX_SPEED = 1500;

  const MIN_NODES = 1;
  const MAX_NODES = 31;
  const legendItems = getLegendItems(category, algorithm);
  return (
    <aside className="flex w-64 flex-col gap-5 border-r border-neutral-800 p-4 text-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-wide">Controls</h2>
        <LegendButton items={legendItems} />
      </div>

      {/* Node Count */}
      <Slider
        label="No. of Nodes"
        min={MIN_NODES}
        max={MAX_NODES}
        value={nodeCount}
        onChange={setNodeCount}
        displayValue={nodeCount}
        label_1={`${MIN_NODES}`}
        label_2={`${MAX_NODES}`}
      />

      {/* Speed */}
      <Slider
        label="Speed"
        min={MIN_SPEED}
        max={MAX_SPEED}
        value={speed}
        onChange={setSpeed}
        label_1="Fast"
        label_2="Slow"
      />

      {/* Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => onGenerate(nodeCount)}
          variant="primary"
          disabled={hasExecution || isRunning}
        >
          Generate Tree
        </Button>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={onStepBack}
            disabled={!canStepBackward && hasExecution}
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
            disabled={!canStepForward && hasExecution}
            className="rounded-md bg-neutral-800 px-2 py-2 text-base text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {">"}
          </button>
        </div>

        <Button
          onClick={onReset}
          variant="danger"
          disabled={!hasExecution && !isRunning}
        >
          Reset
        </Button>
      </div>
    </aside>
  );
}
