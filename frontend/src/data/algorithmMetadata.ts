export type AlgorithmMetadata = {
  name: string;
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
  code: string;
};

export const algorithmMetadata: Record<string, AlgorithmMetadata> = {
  bubbleSort: {
    name: "Bubble Sort",
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: "O(1)",
    code: `for (int i = 0; i < n - 1; i++) {
    boolean swapped = false;
    for (int j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            swap(arr[j], arr[j + 1]);
            swapped = true;
        }
    }
    if (!swapped) break;
}`,
  },
};
