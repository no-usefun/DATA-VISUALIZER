type Props = {
  activeCategory: "sorting" | "searching" | "graphs" | null;
  onCategorySelect: (category: "sorting" | "searching" | "graphs") => void;
};

export default function Navbar({ activeCategory, onCategorySelect }: Props) {
  const baseStyle = "hover:text-white transition";
  const activeStyle = "text-white";
  const inactiveStyle = "text-neutral-400";

  const getClass = (category: "sorting" | "searching" | "graphs") =>
    `${baseStyle} ${activeCategory === category ? activeStyle : inactiveStyle}`;

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-neutral-800">
      <h1 className="text-lg font-semibold tracking-tight">DSA Visualizer</h1>

      <nav className="flex gap-6 text-sm">
        <button
          className={getClass("sorting")}
          onClick={() => onCategorySelect("sorting")}
        >
          Sorting
        </button>

        <button
          className={getClass("searching")}
          onClick={() => onCategorySelect("searching")}
        >
          Searching
        </button>

        <button
          className={getClass("graphs")}
          onClick={() => onCategorySelect("graphs")}
        >
          Graphs
        </button>
      </nav>
    </header>
  );
}
