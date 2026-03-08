import Button from "../ui/Button";
import Slider from "../ui/Slider";

type SidebarProps = {
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
};

export default function Sidebar({
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
}: SidebarProps) {
  return (
    <aside className="w-80 border-r border-neutral-800 p-6 flex flex-col gap-6">
      <h2 className="text-sm uppercase tracking-wide text-neutral-400">
        Controls
      </h2>

      {/* Array Size */}
      <Slider
        label="Array Size"
        min={5}
        max={50}
        value={arraySize}
        onChange={setArraySize}
        disabled={isRunning}
      />

      {/* Speed */}
      <Slider
        label="Speed (ms)"
        min={20}
        max={500}
        value={speed}
        onChange={setSpeed}
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
    </aside>
  );
}
