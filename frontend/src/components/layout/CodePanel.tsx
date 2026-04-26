import { memo, useMemo, useState } from "react";
import { algorithmMetadata } from "../../data/algorithmMetadata";

interface Props {
  algorithm: string | null;
  currentLine?: number | null;
}

function CodePanel({ algorithm, currentLine }: Props) {
  const [fontSize, setFontSize] = useState(10);

  if (!algorithm) return null;

  const metadata = algorithmMetadata[algorithm];
  if (!metadata) return null;

  const codeLines = useMemo(() => {
    return metadata.code.split("\n");
  }, [metadata.code]);

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(8, prev - 1));
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(16, prev + 1));
  };

  return (
    <aside className="flex h-full w-[clamp(250px,20vw,340px)] min-w-[250px] max-w-[340px] shrink-0 border-l border-neutral-800 bg-neutral-950">
      <div className="h-full w-full overflow-y-auto p-4 text-xs space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-white">
              {metadata.name}
            </h2>
            <div className="group relative">
              <button
                type="button"
                className="rounded-md border border-neutral-700 px-2 py-1 text-[11px] text-neutral-300 transition hover:border-neutral-500 hover:bg-neutral-800"
              >
                Complexity
              </button>

              <div className="pointer-events-none absolute left-15 top-full z-20 hidden w-52 rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-[11px] text-neutral-300 shadow-xl group-hover:block">
                <p className="font-semibold text-white">{metadata.name}</p>
                <p className="mt-2 text-neutral-400">Time</p>
                <p>Best: {metadata.time.best}</p>
                <p>Average: {metadata.time.average}</p>
                <p>Worst: {metadata.time.worst}</p>
                <p className="mt-2 text-neutral-400">Space</p>
                <p>{metadata.space}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={decreaseFontSize}
              aria-label="Decrease code text size"
              className="rounded-md border border-neutral-700 px-2 py-1 text-[11px] font-semibold text-neutral-300 transition hover:border-neutral-500 hover:bg-neutral-800"
            >
              -
            </button>
            <button
              type="button"
              onClick={increaseFontSize}
              aria-label="Increase code text size"
              className="rounded-md border border-neutral-700 px-2 py-1 text-[11px] font-semibold text-neutral-300 transition hover:border-neutral-500 hover:bg-neutral-800"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <p className="mb-2 font-bold text-neutral-200">Code</p>

          <pre
            className="overflow-x-auto rounded bg-neutral-900 p-3 font-mono leading-5"
            style={{ fontSize: `${fontSize}px` }}
          >
            {codeLines.map((line, index) => {
              const lineNumber = index + 1;
              const active = lineNumber === currentLine;

              return (
                <div
                  key={index}
                  className={`flex ${active ? "border-l-4 border-blue-400 bg-blue-900" : ""}`}
                >
                  <span className="w-6 shrink-0 select-none text-neutral-500">
                    {lineNumber}
                  </span>

                  <span className="flex-1 whitespace-pre">{line}</span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </aside>
  );
}

export default memo(CodePanel);
