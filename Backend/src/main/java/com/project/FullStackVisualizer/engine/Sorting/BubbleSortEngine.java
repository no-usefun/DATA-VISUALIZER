package com.project.FullStackVisualizer.engine.Sorting;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.engine.AlgorithmEngine;
import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class BubbleSortEngine implements AlgorithmEngine {

    private static final class Lines {

        static final int COMPARE = 7;
        static final int SWAP = 8;
        static final int MARK_PASS_SORTED = 9;
        static final int EARLY_BREAK = 13;
        static final int FINAL_MARK = 1;
        static final int INITIAL_MARK = 1;
    }

    @Override
    public String getAlgorithmName() {
        return "bubbleSort";
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

            boolean swapped = false;

            for (int j = 0; j < n - i - 1; j++) {

                steps.add(new Step(
                        "COMPARE",
                        Map.of("i", j, "j", j + 1),
                        Lines.COMPARE));

                if (input.get(j) > input.get(j + 1)) {

                    steps.add(new Step(
                            "SWAP",
                            Map.of("i", j, "j", j + 1),
                            Lines.SWAP));

                    int temp = input.get(j);
                    input.set(j, input.get(j + 1));
                    input.set(j + 1, temp);

                    swapped = true;
                }
            }

            steps.add(new Step(
                    "MARK_SORTED",
                    Map.of("index", n - i - 1),
                    Lines.MARK_PASS_SORTED));

            if (!swapped) {

                steps.add(new Step(
                        "BREAK",
                        Map.of(),
                        Lines.EARLY_BREAK));

                for (int k = 0; k < n - i - 1; k++) {

                    steps.add(new Step(
                            "MARK_SORTED",
                            Map.of("index", k),
                            Lines.EARLY_BREAK));
                }

                return steps;
            }
        }

        steps.add(new Step(
                "MARK_SORTED",
                Map.of("index", 0),
                Lines.FINAL_MARK));

        return steps;
    }
}
