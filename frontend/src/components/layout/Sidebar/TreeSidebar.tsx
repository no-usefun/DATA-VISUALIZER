import Button from "../../ui/Button";
import Slider from "../../ui/Slider";

type Props = {
  onGenerate: () => void;
  speed: number;
  setSpeed: (value: number) => void;
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
  isRunning,
  isPaused,
  onStart,
  onPause,
  onReset,
}: Props) {
  const MIN_SPEED = 20;
  const MAX_SPEED = 1500;

  return (
    <aside className="w-80 border-r border-neutral-800 p-6 flex flex-col gap-6">
      <h2 className="text-sm uppercase tracking-wide">Controls</h2>

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
        <Button onClick={onGenerate} variant="primary" disabled={isRunning}>
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
