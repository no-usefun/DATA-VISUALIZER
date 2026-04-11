import ArraySidebar from "./ArraySidebar";
import TreeSidebar from "./TreeSidebar";

type Category = "sorting" | "searching" | "graphs" | "trees" | null;

type SidebarProps = {
  category: Category;
  algorithm: string | null;

  // Array props
  onGenerate: () => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;

  arraySize: number;
  setArraySize: (value: number) => void;

  speed: number;
  setSpeed: (value: number) => void;

  isRunning: boolean;
  isPaused: boolean;

  target: number | null;
  setTarget: (value: number | null) => void;

  isSearchingAlgorithm: boolean;

  // Tree props
  nodeCount: number;
  setNodeCount: (value: number) => void;
};

export default function Sidebar(props: SidebarProps) {
  const { category } = props;

  // Trees
  if (category === "trees") {
    return <TreeSidebar {...props} />;
  } else {
    return <ArraySidebar {...props} />;
  }
}
