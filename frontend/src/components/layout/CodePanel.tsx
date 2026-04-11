import { memo, useMemo, useState } from "react";
import { algorithmMetadata } from "../../data/algorithmMetadata";

interface Props {
  algorithm: string | null;
  currentLine?: number | null;
}

function CodePanel({ algorithm, currentLine }: Props) {
  const [collapsed, setCollapsed] = useState(true);

  if (!algorithm) return null;

  const metadata = algorithmMetadata[algorithm];
  if (!metadata) return null;

  const codeLines = useMemo(() => {
    return metadata.code.split("\n");
  }, [metadata.code]);

  return (
    <div className="relative flex h-full shrink-0">
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? "Open code panel" : "Close code panel"}
        className={`absolute top-1/2 z-20 flex h-16 w-8 -translate-y-1/2 items-center justify-center rounded-l-md border border-neutral-800 bg-neutral-900 text-neutral-400 shadow-lg transition hover:text-white ${
          collapsed ? "right-0" : "right-full"
        }`}
      >
        {collapsed ? "<" : ">"}
      </button>

      {/* Panel */}
      <div
        className={`border-l border-neutral-800 bg-neutral-950
        transition-all duration-300 overflow-hidden h-full
        ${collapsed ? "w-0" : "w-[30vw] min-w-[360px] max-w-[520px]"}`}
      >
        {!collapsed && (
          <div className="p-6 overflow-y-auto h-full text-sm space-y-6">
            <h2 className="text-lg font-semibold text-white">
              {metadata.name}
            </h2>

            <div>
              <p className="font-bold mb-1 text-neutral-200">Time Complexity</p>
              <p>Best: {metadata.time.best}</p>
              <p>Average: {metadata.time.average}</p>
              <p>Worst: {metadata.time.worst}</p>
            </div>

            <div>
              <p className="font-bold mb-1 text-neutral-200">
                Space Complexity
              </p>
              <p>{metadata.space}</p>
            </div>

            <div>
              <p className="font-bold mb-2 text-neutral-200">Code</p>

              <pre className="bg-neutral-900 p-4 rounded text-xs font-mono overflow-x-auto">
                {codeLines.map((line, index) => {
                  const lineNumber = index + 1;
                  const active = lineNumber === currentLine;

                  return (
                    <div
                      key={index}
                      className={`flex ${
                        active ? "bg-blue-900 border-l-4 border-blue-400" : ""
                      }`}
                    >
                      <span className="w-8 text-neutral-500 select-none">
                        {lineNumber}
                      </span>

                      <span className="flex-1 whitespace-pre">{line}</span>
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(CodePanel);
