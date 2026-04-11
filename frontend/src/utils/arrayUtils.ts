export function generateRandomArray(size: number, max: number): number[] {
  const cappedMax = Math.min(max, 200);
  const min = 10;

  return generateUniqueRandomValues(size, min, cappedMax);
}

export function generateUniqueRandomValues(
  size: number,
  min: number,
  max: number,
): number[] {
  const totalAvailable = max - min + 1;
  const finalSize = Math.min(size, totalAvailable);

  const pool = Array.from({ length: totalAvailable }, (_, index) => min + index);

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, finalSize);
}
