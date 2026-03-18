type SliderProps = {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;

  label_1?: string;
  label_2?: string;

  displayValue?: number | string;
};

export default function Slider({
  label,
  min,
  max,
  value,
  onChange,
  disabled = false,
  label_1,
  label_2,
  displayValue,
}: SliderProps) {
  return (
    <div className="space-y-2 text-neutral-200">
      {/* Top Label */}
      <div className="flex justify-between text-sm ">
        <span>{label}</span>

        {displayValue !== undefined && <span>{displayValue}</span>}
      </div>

      {/* Slider */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600"
      />

      {/* Bottom Labels (optional) */}
      {(label_1 || label_2) && (
        <div className="flex justify-between text-xs ">
          <span>{label_1}</span>
          <span>{label_2}</span>
        </div>
      )}
    </div>
  );
}
