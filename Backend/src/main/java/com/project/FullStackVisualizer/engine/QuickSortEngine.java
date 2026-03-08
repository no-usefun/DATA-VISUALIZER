package com.project.FullStackVisualizer.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class QuickSortEngine implements AlgorithmEngine {

    @Override
    public String getAlgorithmName() {
        return "quickSort";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {

        List<Step> steps = new ArrayList<>();
        List<Integer> arr = new ArrayList<>(request.getInput());

        quickSort(arr, 0, arr.size() - 1, steps);

        for (int i = 0; i < arr.size(); i++) {
            steps.add(new Step(
                    "MARK_SORTED",
                    Map.of("index", i),
                    10));
        }

        return steps;
    }

    private void quickSort(List<Integer> arr, int low, int high, List<Step> steps) {

        if (low >= high)
            return;

        steps.add(new Step(
                "RANGE",
                Map.of("start", low, "end", high),
                5));

        int pivotIndex = partition(arr, low, high, steps);

        steps.add(new Step(
                "MARK_SORTED",
                Map.of("index", pivotIndex),
                8));

        quickSort(arr, low, pivotIndex - 1, steps);
        quickSort(arr, pivotIndex + 1, high, steps);
    }

    private int partition(List<Integer> arr, int low, int high, List<Step> steps) {

        int pivot = arr.get(high);

        steps.add(new Step(
                "SET_PIVOT",
                Map.of("index", high),
                6));

        int i = low;

        for (int j = low; j < high; j++) {

            steps.add(new Step(
                    "COMPARE",
                    Map.of("i", j, "j", high),
                    7));

            if (arr.get(j) < pivot) {

                if (i != j) {

                    steps.add(new Step(
                            "SWAP",
                            Map.of("i", i, "j", j),
                            8));

                    int temp = arr.get(i);
                    arr.set(i, arr.get(j));
                    arr.set(j, temp);
                }

                i++;
            }
        }

        if (i != high) {

            steps.add(new Step(
                    "SWAP",
                    Map.of("i", i, "j", high),
                    9));

            int temp = arr.get(i);
            arr.set(i, arr.get(high));
            arr.set(high, temp);
        }

        return i;
    }
}