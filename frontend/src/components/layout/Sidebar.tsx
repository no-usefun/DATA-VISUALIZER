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

  viewMode: "bars" | "values";
  setViewMode: React.Dispatch<React.SetStateAction<"bars" | "values">>;
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
  viewMode,
  setViewMode,
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

      {/* View Mode Toggle */}
      <div className="mt-6">
        <p className="text-sm mb-2 text-neutral-400">View Mode</p>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("bars")}
            className={`px-3 py-1 rounded text-sm transition ${
              viewMode === "bars"
                ? "bg-blue-600 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            Bars
          </button>

          <button
            onClick={() => setViewMode("values")}
            className={`px-3 py-1 rounded text-sm transition ${
              viewMode === "values"
                ? "bg-blue-600 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            Values
          </button>
        </div>
      </div>
    </aside>
  );
}
