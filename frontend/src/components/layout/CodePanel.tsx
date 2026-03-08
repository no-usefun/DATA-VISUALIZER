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
    <div className="relative flex h-full">
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="
        fixed right-0 top-1/2 -translate-y-1/2
        w-8 h-16 flex items-center justify-center
        bg-neutral-900 border border-neutral-800
        text-neutral-400 hover:text-white
        rounded-l-md z-20"
      >
        {collapsed ? "<" : ">"}
      </button>

      {/* Panel */}
      <div
        className={`border-l border-neutral-800 bg-neutral-950
        transition-all duration-300 overflow-hidden
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
