import ArraySidebar from "./ArraySidebar";
import TreeSidebar from "./TreeSidebar";

type Category = "sorting" | "searching" | "graphs" | "trees" | null;

type SidebarProps = {
  category: Category;

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
};

export default function Sidebar(props: SidebarProps) {
  const { category } = props;

  // Trees
  if (category === "trees") {
    return (
      <TreeSidebar
        onGenerate={props.onGenerate}
        onStart={props.onStart}
        onPause={props.onPause}
        onReset={props.onReset}
        speed={props.speed}
        setSpeed={props.setSpeed}
        isRunning={props.isRunning}
        isPaused={props.isPaused}
      />
    );
  } else {
    // Default → Array (sorting + searching)
    return <ArraySidebar {...props} />;
  }
}
