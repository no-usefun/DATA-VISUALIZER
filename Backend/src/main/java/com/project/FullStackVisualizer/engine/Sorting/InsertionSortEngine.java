package com.project.FullStackVisualizer.engine.Sorting;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class InsertionSortEngine implements AlgorithmEngine {

    private static final class Lines {

        static final int MARK_FIRST_SORTED = 3;
        static final int REMOVE = 7;
        static final int COMPARE = 6;
        static final int SHIFT = 8;
        static final int INSERT = 11;
        static final int MARK_SORTED = 1;
        static final int INITIAL_MARK = 1;
    }

    @Override
    public String getAlgorithmName() {
        return "insertionSort";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {

        List<Step> steps = new ArrayList<>();
        List<Integer> input = new ArrayList<>(request.getInput());

        steps.add(new Step(
                "START",
                Lines.INITIAL_MARK));

        int n = input.size();

        steps.add(new Step(
                "MARK_SORTED",
                Map.of("index", 0),
                Lines.MARK_FIRST_SORTED));

        for (int i = 1; i < n; i++) {

            int key = input.get(i);
            int j = i - 1;

            steps.add(new Step(
                    "REMOVE",
                    Map.of("index", i),
                    Lines.REMOVE));

            while (j >= 0) {

                steps.add(new Step(
                        "COMPARE",
                        Map.of("i", j, "j", j + 1),
                        Lines.COMPARE));

                if (input.get(j) <= key) {
                    break;
                }

                input.set(j + 1, input.get(j));

                steps.add(new Step(
                        "SHIFT",
                        Map.of("from", j, "to", j + 1),
                        Lines.SHIFT));

                j--;
            }

            input.set(j + 1, key);

            steps.add(new Step(
                    "INSERT",
                    Map.of("index", j + 1, "value", key),
                    Lines.INSERT));

            steps.add(new Step(
                    "MARK_SORTED",
                    Map.of("index", i),
                    Lines.MARK_SORTED));
        }

        return steps;
    }
}
