import { useState } from "react";
import { algorithmMetadata } from "../../data/algorithmMetadata";

interface Props {
  algorithm: string | null;
}

export default function CodePanel({ algorithm }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  if (!algorithm) return null;

  const metadata = algorithmMetadata[algorithm];
  if (!metadata) return null;

  return (
    <div
      className={`relative border-l border-neutral-800 bg-neutral-950 transition-all duration-300 ${
        collapsed ? "w-12" : "w-[380px]"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="absolute inset-0 flex items-center
             text-4xl font-bold text-neutral-400 
             hover:text-white transition"
      >
        {!collapsed ? "<" : ">"}
      </button>

      {!collapsed && (
        <div className="p-6 overflow-y-auto h-full text-sm space-y-5">
          <h2 className="text-lg font-semibold">{metadata.name}</h2>

          <div>
            <p className="font-bold mb-1">Time Complexity</p>
            <p>Best: {metadata.time.best}</p>
            <p>Average: {metadata.time.average}</p>
            <p>Worst: {metadata.time.worst}</p>
          </div>

          <div>
            <p className="font-bold mb-1">Space Complexity</p>
            <p>{metadata.space}</p>
          </div>

          <div>
            <p className="font-bold mb-1">Code</p>
            <pre className="bg-neutral-900 p-4 rounded text-xs overflow-x-auto">
              {metadata.code}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
