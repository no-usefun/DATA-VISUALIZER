export default function Navbar() {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-neutral-800">
      <h1 className="text-lg font-semibold tracking-tight">DSA Visualizer</h1>

      <nav className="flex gap-6 text-sm text-neutral-400">
        <button className="hover:text-white transition">Sorting</button>
        <button className="hover:text-white transition">Searching</button>
        <button className="hover:text-white transition">Graphs</button>
      </nav>
    </header>
  );
}
