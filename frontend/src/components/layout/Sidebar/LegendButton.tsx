import type { LegendItem } from "../../../data/legendMetadata";

type Props = {
  items: LegendItem[];
};

export default function LegendButton({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="relative group">
      <button
        type="button"
        aria-label="Show color legend"
        className="h-9 w-9 rounded-full border border-neutral-700 bg-neutral-900 text-sm font-semibold text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-800"
      >
        i
      </button>

      <div className="pointer-events-none absolute left-0 top-11 z-20 w-64 rounded-lg border border-neutral-800 bg-neutral-950/95 p-4 opacity-0 shadow-2xl transition duration-150 group-hover:opacity-100">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Legend
        </p>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 text-sm text-neutral-200"
            >
              <span
                className={`h-4 w-4 rounded-sm border border-white/10 ${item.swatchClass}`}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
