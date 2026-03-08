package com.project.FullStackVisualizer.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class MergeSortEngine implements AlgorithmEngine {

    private static final class Lines {
        static final int RANGE = 46;
        static final int MERGE = 1;
        static final int COMPARE = 16;
        static final int WRITE_MAIN_1 = 18;
        static final int WRITE_MAIN_2 = 21;
        static final int WRITE_REMAINING_1 = 29;
        static final int WRITE_REMAINING_2 = 35;
        static final int MARK_SORTED = 51;
    }

    @Override
    public String getAlgorithmName() {
        return "mergeSort";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {

        List<Step> steps = new ArrayList<>();
        List<Integer> input = new ArrayList<>(request.getInput());

        mergeSort(input, 0, input.size() - 1, steps);

        for (int i = 0; i < input.size(); i++) {
            steps.add(new Step(
                    "MARK_SORTED",
                    Map.of("index", i),
                    Lines.MARK_SORTED));
        }

        return steps;
    }

    private void mergeSort(List<Integer> arr, int left, int right, List<Step> steps) {

        if (left >= right)
            return;

        int mid = (left + right) / 2;

        steps.add(new Step(
                "RANGE",
                Map.of("start", left, "end", right),
                Lines.RANGE));

        mergeSort(arr, left, mid, steps);
        mergeSort(arr, mid + 1, right, steps);

        merge(arr, left, mid, right, steps);
    }

    private void merge(List<Integer> arr, int left, int mid, int right, List<Step> steps) {

        steps.add(new Step(
                "MERGE",
                Map.of("left", left, "mid", mid, "right", right),
                Lines.MERGE));

        List<Integer> leftArr = new ArrayList<>(arr.subList(left, mid + 1));
        List<Integer> rightArr = new ArrayList<>(arr.subList(mid + 1, right + 1));

        int i = 0;
        int j = 0;
        int k = left;

        while (i < leftArr.size() && j < rightArr.size()) {

            steps.add(new Step(
                    "COMPARE",
                    Map.of("i", left + i, "j", mid + 1 + j),
                    Lines.COMPARE));

            if (leftArr.get(i) <= rightArr.get(j)) {

                arr.set(k, leftArr.get(i));

                steps.add(new Step(
                        "WRITE",
                        Map.of("index", k, "value", leftArr.get(i)),
                        Lines.WRITE_MAIN_1));

                i++;

            } else {

                arr.set(k, rightArr.get(j));

                steps.add(new Step(
                        "WRITE",
                        Map.of("index", k, "value", rightArr.get(j)),
                        Lines.WRITE_MAIN_2));

                j++;
            }

            k++;
        }

        while (i < leftArr.size()) {

            arr.set(k, leftArr.get(i));

            steps.add(new Step(
                    "WRITE",
                    Map.of("index", k, "value", leftArr.get(i)),
                    Lines.WRITE_REMAINING_1));

            i++;
            k++;
        }

        while (j < rightArr.size()) {

            arr.set(k, rightArr.get(j));

            steps.add(new Step(
                    "WRITE",
                    Map.of("index", k, "value", rightArr.get(j)),
                    Lines.WRITE_REMAINING_2));

            j++;
            k++;
        }
    }
}