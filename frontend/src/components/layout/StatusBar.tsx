interface Props {
  algorithm: string | null;
  isRunning: boolean;
}

const formatAlgorithmName = (name: string) => {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

export default function StatusBar({ algorithm, isRunning }: Props) {
  const statusText = isRunning ? "Running" : "Idle";

  return (
    <footer className="h-14 border-t border-neutral-800 flex items-center justify-between px-8 text-sm text-neutral-400">
      <span>Status: {statusText}</span>

      <span>
        {algorithm
          ? `Algorithm: ${formatAlgorithmName(algorithm)}`
          : "No algorithm selected"}
      </span>
    </footer>
  );
}
