package com.project.FullStackVisualizer.engine.Sorting;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class SelectionSortEngine implements AlgorithmEngine {

    private static final class Lines {

        static final int COMPARE = 7;
        static final int NEW_MIN = 8;
        static final int SWAP = 12;
        static final int MARK_SORTED = 5;
        static final int FINAL_MARK = 1;
        static final int INITIAL_MARK = 1;
    }

    @Override
    public String getAlgorithmName() {
        return "selectionSort";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {

        List<Step> steps = new ArrayList<>();
        List<Integer> input = new ArrayList<>(request.getInput());

        steps.add(new Step(
                "START",
                Lines.INITIAL_MARK));

        int n = input.size();

        for (int i = 0; i < n - 1; i++) {

            int minIndex = i;

            for (int j = i + 1; j < n; j++) {

                steps.add(new Step(
                        "COMPARE",
                        Map.of("i", minIndex, "j", j),
                        Lines.COMPARE));

                if (input.get(j) < input.get(minIndex)) {

                    minIndex = j;

                    steps.add(new Step(
                            "HIGHLIGHT",
                            Map.of("i", minIndex, "j", i),
                            Lines.NEW_MIN));
                }
            }

            if (minIndex != i) {

                steps.add(new Step(
                        "SWAP",
                        Map.of("i", i, "j", minIndex),
                        Lines.SWAP));

                int temp = input.get(i);
                input.set(i, input.get(minIndex));
                input.set(minIndex, temp);
            }

            steps.add(new Step(
                    "MARK_SORTED",
                    Map.of("index", i),
                    Lines.MARK_SORTED));
        }

        steps.add(new Step(
                "MARK_SORTED",
                Map.of("index", n - 1),
                Lines.FINAL_MARK));

        return steps;
    }
}
