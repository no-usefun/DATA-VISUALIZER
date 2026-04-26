type Props = {
  activeCategory: "sorting" | "searching" | "trees" | null;
  onCategorySelect: (category: "sorting" | "searching" | "trees") => void;
  onHomeClick: () => void;
};

export default function Navbar({
  activeCategory,
  onCategorySelect,
  onHomeClick,
}: Props) {
  const getClass = (category: "sorting" | "searching" | "trees") =>
    `rounded-full px-4 py-2 text-sm transition ${
      activeCategory === category
        ? "bg-neutral-100 text-neutral-950"
        : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
    }`;

  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-800 px-8">
      <button
        type="button"
        onClick={onHomeClick}
        className="text-lg font-semibold tracking-tight text-white transition hover:text-sky-300"
      >
        Algorithm Visualizer
      </button>

      <nav className="flex items-center gap-3">
        {(["sorting", "searching", "trees"] as const).map((category) => (
          <button
            key={category}
            className={getClass(category)}
            onClick={() => onCategorySelect(category)}
          >
            {category[0].toUpperCase() + category.slice(1)}
          </button>
        ))}
      </nav>
    </header>
  );
}
