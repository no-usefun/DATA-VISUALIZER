import ArrayVisualizer from "../visualizer/ArrayVisualizer";

type WorkspaceProps = {
  array: number[];
  activeIndices: number[];
  sortedIndices: number[];
};

export default function Workspace({
  array,
  activeIndices,
  sortedIndices,
}: WorkspaceProps) {
  return (
    <section className="flex-1 p-8">
      <ArrayVisualizer
        array={array}
        activeIndices={activeIndices}
        sortedIndices={sortedIndices}
      />
    </section>
  );
}
