package com.project.FullStackVisualizer.engine.Sorting;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.engine.AlgorithmEngine;
import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class QuickSortEngine implements AlgorithmEngine {

    private static final class Lines {

        static final int SET_PIVOT = 3;
        static final int COMPARE = 7;
        static final int SWAP_PARTITION = 8;
        static final int SWAP_FINAL = 13;
        static final int MARK_SORTED = 20;
        static final int INITIAL_MARK = 17;
    }

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
                    Lines.MARK_SORTED));
        }

        return steps;
    }

    private void quickSort(List<Integer> arr, int low, int high, List<Step> steps) {
        steps.add(new Step(
                "START",
                Lines.INITIAL_MARK));

        if (low >= high) {
            return;
        }

        int pivotIndex = partition(arr, low, high, steps);

        steps.add(new Step(
                "MARK_SORTED",
                Map.of("index", pivotIndex),
                Lines.MARK_SORTED));

        quickSort(arr, low, pivotIndex - 1, steps);
        quickSort(arr, pivotIndex + 1, high, steps);
    }

    private int partition(List<Integer> arr, int low, int high, List<Step> steps) {

        int pivot = arr.get(high);

        steps.add(new Step(
                "SET_PIVOT",
                Map.of("index", high),
                Lines.SET_PIVOT));

        int i = low;

        for (int j = low; j < high; j++) {

            steps.add(new Step(
                    "COMPARE",
                    Map.of("i", j, "j", high),
                    Lines.COMPARE));

            if (arr.get(j) < pivot) {

                if (i != j) {

                    steps.add(new Step(
                            "SWAP",
                            Map.of("i", i, "j", j),
                            Lines.SWAP_PARTITION));

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
                    Lines.SWAP_FINAL));

            int temp = arr.get(i);
            arr.set(i, arr.get(high));
            arr.set(high, temp);
        }

        return i;
    }
}
