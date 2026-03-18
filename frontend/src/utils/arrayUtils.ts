export function generateRandomArray(size: number, max: number): number[] {
  const cappedMax = Math.min(max, 200);
  const min = 10;

  return Array.from({ length: size }, () =>
    Math.floor(min + Math.random() * (cappedMax - min + 1)),
  );
}
