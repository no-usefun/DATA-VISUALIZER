import { MIN_ARRAY_VALUE, MAX_ARRAY_VALUE } from "../types/array";

export function generateRandomArray(size: number): number[] {
  const cappedMax = Math.min(MAX_ARRAY_VALUE, 200);

  return generateUniqueRandomValues(size, MIN_ARRAY_VALUE, cappedMax);
}

export function generateUniqueRandomValues(
  size: number,
  min: number,
  max: number,
): number[] {
  const totalAvailable = max - min + 1;
  const finalSize = Math.min(size, totalAvailable);

  const pool = Array.from(
    { length: totalAvailable },
    (_, index) => min + index,
  );

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, finalSize);
}

type UpdateResult =
  | { success: true; data: (number | null)[] }
  | { success: false; error?: string };

export function updateArrayValue(
  array: (number | null)[],
  index: number,
  value: number | null,
): UpdateResult {
  if (value === null || Number.isNaN(value)) {
    return { success: false, error: "INVALID" };
  }

  if (value < MIN_ARRAY_VALUE || value > MAX_ARRAY_VALUE) {
    return { success: false, error: "OUT_OF_RANGE" };
  }

  const next = [...array];
  next[index] = value;

  return { success: true, data: next };
}
