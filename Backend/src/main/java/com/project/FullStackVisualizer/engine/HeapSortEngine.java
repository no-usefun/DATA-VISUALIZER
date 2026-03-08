package com.project.FullStackVisualizer.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class HeapSortEngine implements AlgorithmEngine {

    @Override
    public String getAlgorithmName() {
        return "heapSort";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {

        List<Step> steps = new ArrayList<>();
        List<Integer> arr = new ArrayList<>(request.getInput());

        int n = arr.size();

        // Build Max Heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i, steps);
        }

        // Extract elements from heap
        for (int i = n - 1; i > 0; i--) {

            steps.add(new Step(
                    "SWAP",
                    Map.of("i", 0, "j", i),
                    8));

            int temp = arr.get(0);
            arr.set(0, arr.get(i));
            arr.set(i, temp);

            steps.add(new Step(
                    "MARK_SORTED",
                    Map.of("index", i),
                    9));

            heapify(arr, i, 0, steps);
        }

        steps.add(new Step(
                "MARK_SORTED",
                Map.of("index", 0),
                10));

        return steps;
    }

    private void heapify(List<Integer> arr, int n, int i, List<Step> steps) {

        steps.add(new Step(
                "HEAPIFY",
                Map.of("index", i),
                5));

        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n) {

            steps.add(new Step(
                    "COMPARE",
                    Map.of("i", largest, "j", left),
                    6));

            if (arr.get(left) > arr.get(largest)) {
                largest = left;
            }
        }

        if (right < n) {

            steps.add(new Step(
                    "COMPARE",
                    Map.of("i", largest, "j", right),
                    6));

            if (arr.get(right) > arr.get(largest)) {
                largest = right;
            }
        }

        if (largest != i) {

            steps.add(new Step(
                    "SWAP",
                    Map.of("i", i, "j", largest),
                    7));

            int swap = arr.get(i);
            arr.set(i, arr.get(largest));
            arr.set(largest, swap);

            heapify(arr, n, largest, steps);
        }
    }
}