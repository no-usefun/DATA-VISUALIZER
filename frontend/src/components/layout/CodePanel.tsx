import { memo, useMemo, useState } from "react";
import { algorithmMetadata } from "../../data/algorithmMetadata";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  algorithm: string | null;
}

function CodePanel({ algorithm }: Props) {
  const [collapsed, setCollapsed] = useState(true);

  if (!algorithm) return null;

  const metadata = algorithmMetadata[algorithm];
  if (!metadata) return null;

  // Memoized highlighted code to prevent heavy re-rendering
  const highlightedCode = useMemo(() => {
    return (
      <SyntaxHighlighter
        language="java"
        style={oneDark}
        wrapLongLines={false}
        showLineNumbers
        customStyle={{
          background: "#171717",
          padding: "16px",
          borderRadius: "6px",
          fontSize: "12px",
        }}
      >
        {metadata.code}
      </SyntaxHighlighter>
    );
  }, [algorithm, metadata.code]);

  return (
    <div className="relative flex h-full">
      {/* Toggle Handle */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="absolute left-0 top-1/2 -translate-y-1/2
        w-8 h-16 flex items-center justify-center
        bg-neutral-900 border border-neutral-800
        text-neutral-400 hover:text-white
        rounded-r-md z-10"
      >
        {collapsed ? ">" : "<"}
      </button>

      {/* Code Panel */}
      <div
        className={`border-l border-neutral-800 bg-neutral-950
        transition-all duration-300 overflow-hidden
        ${collapsed ? "w-0" : "w-[30vw] min-w-[360px] max-w-[520px]"}`}
      >
        {!collapsed && (
          <div className="p-6 overflow-y-auto h-full text-sm space-y-6 scrollbar-thin scrollbar-thumb-neutral-700">
            {/* Algorithm Title */}
            <h2 className="text-lg font-semibold text-white">
              {metadata.name}
            </h2>

            {/* Time Complexity */}
            <div>
              <p className="font-bold mb-1 text-neutral-200">Time Complexity</p>
              <p>Best: {metadata.time.best}</p>
              <p>Average: {metadata.time.average}</p>
              <p>Worst: {metadata.time.worst}</p>
            </div>

            {/* Space Complexity */}
            <div>
              <p className="font-bold mb-1 text-neutral-200">
                Space Complexity
              </p>
              <p>{metadata.space}</p>
            </div>

            {/* Code Section */}
            <div>
              <p className="font-bold mb-2 text-neutral-200">Code</p>
              {highlightedCode}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Prevent unnecessary re-renders
export default memo(CodePanel);
