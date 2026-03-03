import Button from "../ui/Button";
import Slider from "../ui/Slider";

type SidebarProps = {
  onGenerate: () => void;
  arraySize: number;
  setArraySize: (value: number) => void;
  speed: number;
  setSpeed: (value: number) => void;
  isRunning: boolean;
  onTest: () => void;
  //onPause: () => void;
};

export default function Sidebar({
  onGenerate,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  isRunning,
  onTest,
}: SidebarProps) {
  return (
    <aside className="w-80 border-r border-neutral-800 p-6 flex flex-col gap-6">
      <h2 className="text-sm uppercase tracking-wide text-neutral-400">
        Controls
      </h2>

      <Slider
        label="Array Size"
        min={10}
        max={100}
        value={arraySize}
        onChange={setArraySize}
        disabled={isRunning}
      />

      <Slider
        label="Speed (ms)"
        min={20}
        max={200}
        value={speed}
        onChange={setSpeed}
      />

      <div className="space-y-4">
        <Button onClick={onGenerate} variant="primary" disabled={isRunning}>
          Generate Array
        </Button>

        <Button onClick={onTest} variant="success">
          Start
        </Button>

        <Button variant="danger">Reset</Button>
      </div>
    </aside>
  );
}
