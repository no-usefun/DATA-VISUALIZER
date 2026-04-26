interface Props {
  algorithm: string | null;
  isRunning: boolean;
  currentStep: number | null;
  totalSteps: number | null;
  isDashboard?: boolean;
}

const formatAlgorithmName = (name: string) => {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

export default function StatusBar({
  algorithm,
  isRunning,
  currentStep,
  totalSteps,
  isDashboard = false,
}: Props) {
  const statusText = isRunning ? "Running" : "Idle";
  const stepText =
    currentStep !== null && totalSteps !== null
      ? `${Math.min(currentStep, totalSteps)}/${totalSteps}`
      : "-";

  return (
    <footer className="flex h-14 items-center justify-between border-t border-neutral-800 px-8 text-sm text-neutral-400">
      <span>Status: {statusText}</span>
      <span>
        {isDashboard
          ? "Dashboard"
          : algorithm
          ? `Algorithm: ${formatAlgorithmName(algorithm)}`
          : "No algorithm selected"}
      </span>
      <span>
        {isDashboard ? "© 2026 Harsh Agarwal" : `Steps: ${stepText}`}
      </span>
    </footer>
  );
}
