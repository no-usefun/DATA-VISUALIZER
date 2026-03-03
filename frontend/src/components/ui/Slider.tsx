type SliderProps = {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
};

export default function Slider({
  label,
  min,
  max,
  value,
  onChange,
  disabled = false,
}: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-neutral-400">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
    </div>
  );
}
