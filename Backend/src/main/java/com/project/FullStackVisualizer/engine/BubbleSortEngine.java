package com.project.FullStackVisualizer.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class BubbleSortEngine implements AlgorithmEngine {

    @Override
    public String getAlgorithmName() {
        return "bubbleSort";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {

        List<Step> steps = new ArrayList<>();
        List<Integer> input = new ArrayList<>(request.getInput());

        int n = input.size();

        for (int i = 0; i < n - 1; i++) {

            boolean swapped = false;

            for (int j = 0; j < n - i - 1; j++) {

                // highlight comparison
                steps.add(new Step(
                        "COMPARE",
                        Map.of("i", j, "j", j + 1),
                        6));

                if (input.get(j) > input.get(j + 1)) {

                    // swap event
                    steps.add(new Step(
                            "SWAP",
                            Map.of("i", j, "j", j + 1),
                            7));

                    int temp = input.get(j);
                    input.set(j, input.get(j + 1));
                    input.set(j + 1, temp);

                    swapped = true;
                }
            }

            // last element of this pass is sorted
            steps.add(new Step(
                    "MARK_SORTED",
                    Map.of("index", n - i - 1),
                    8));

            // early termination if no swaps happened
            if (!swapped) {

                for (int k = 0; k < n - i - 1; k++) {

                    steps.add(new Step(
                            "MARK_SORTED",
                            Map.of("index", k),
                            9));
                }

                return steps;
            }
        }

        // mark first element sorted at the end
        steps.add(new Step(
                "MARK_SORTED",
                Map.of("index", 0),
                10));

        return steps;
    }
}