export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6 text-center gap-6">
      <h1 className="text-3xl font-bold">Data Structure Visualizer</h1>

      <p className="text-neutral-400 max-w-2xl">
        This tool helps you understand algorithms and data structures through
        interactive visualizations. Follow the steps below to get started.
      </p>

      <div className="text-left max-w-2xl bg-neutral-900 p-6 rounded-lg border border-neutral-800 space-y-3">
        <h2 className="text-lg font-semibold text-white">How to Use</h2>

        <ul className="list-disc list-inside text-neutral-300 space-y-2 text-sm">
          <li>Select a category from the top navigation bar.</li>
          <li>Choose an algorithm from the menu.</li>
          <li>Use sidebar controls to run the visualization.</li>
          <li>Edit values by clicking nodes or bars.</li>
          <li>Use step controls to navigate execution.</li>
        </ul>
      </div>

      <div className="mt-6 px-4 py-2 text-sm text-neutral-400 border border-neutral-700 rounded-md bg-neutral-900">
        🚧 Dashboard features coming soon
      </div>
    </div>
  );
}
