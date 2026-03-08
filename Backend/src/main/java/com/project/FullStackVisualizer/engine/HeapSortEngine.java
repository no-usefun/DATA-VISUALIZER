package com.project.FullStackVisualizer.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class HeapSortEngine implements AlgorithmEngine {

    private static final class Lines {
        static final int HEAPIFY_CALL = 1;
        static final int COMPARE_CHILD_1 = 7;
        static final int COMPARE_CHILD_2 = 10;
        static final int SWAP_HEAPIFY = 13;
        static final int SWAP_ROOT = 28;
        static final int MARK_SORTED = 30;
        static final int FINAL_MARK = 21;
    }

    @Override
    public String getAlgorithmName() {
        return "heapSort";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {

        List<Step> steps = new ArrayList<>();
        List<Integer> arr = new ArrayList<>(request.getInput());

        int n = arr.size();

        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i, steps);
        }

        // Extract elements from heap
        for (int i = n - 1; i > 0; i--) {

            steps.add(new Step(
                    "SWAP",
                    Map.of("i", 0, "j", i),
                    Lines.SWAP_ROOT));

            int temp = arr.get(0);
            arr.set(0, arr.get(i));
            arr.set(i, temp);

            steps.add(new Step(
                    "MARK_SORTED",
                    Map.of("index", i),
                    Lines.MARK_SORTED));

            heapify(arr, i, 0, steps);
        }

        steps.add(new Step(
                "MARK_SORTED",
                Map.of("index", 0),
                Lines.FINAL_MARK));

        return steps;
    }

    private void heapify(List<Integer> arr, int n, int i, List<Step> steps) {

        steps.add(new Step(
                "HEAPIFY",
                Map.of("index", i),
                Lines.HEAPIFY_CALL));

        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n) {

            steps.add(new Step(
                    "COMPARE",
                    Map.of("i", largest, "j", left),
                    Lines.COMPARE_CHILD_1));

            if (arr.get(left) > arr.get(largest)) {
                largest = left;
            }
        }

        if (right < n) {

            steps.add(new Step(
                    "COMPARE",
                    Map.of("i", largest, "j", right),
                    Lines.COMPARE_CHILD_2));

            if (arr.get(right) > arr.get(largest)) {
                largest = right;
            }
        }

        if (largest != i) {

            steps.add(new Step(
                    "SWAP",
                    Map.of("i", i, "j", largest),
                    Lines.SWAP_HEAPIFY));

            int swap = arr.get(i);
            arr.set(i, arr.get(largest));
            arr.set(largest, swap);

            heapify(arr, n, largest, steps);
        }
    }
}