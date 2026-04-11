import Button from "../../ui/Button";
import Slider from "../../ui/Slider";

type Props = {
  onGenerate: (nodeCount: number) => void;

  speed: number;
  setSpeed: (value: number) => void;

  nodeCount: number;
  setNodeCount: (value: number) => void;

  isRunning: boolean;
  isPaused: boolean;

  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

export default function TreeSidebar({
  onGenerate,
  speed,
  setSpeed,
  nodeCount,
  setNodeCount,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onReset,
}: Props) {
  const MIN_SPEED = 20;
  const MAX_SPEED = 1500;

  const MIN_NODES = 1;
  const MAX_NODES = 31; // keeping it odd to ensure perfectly balanced trees for better visualization

  return (
    <aside className="w-80 border-r border-neutral-800 p-6 flex flex-col gap-6">
      <h2 className="text-sm uppercase tracking-wide">Controls</h2>

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
      <div className="space-y-4">
        <Button
          onClick={() => onGenerate(nodeCount)}
          variant="primary"
          disabled={isRunning}
        >
          Generate Tree
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
    </aside>
  );
}
