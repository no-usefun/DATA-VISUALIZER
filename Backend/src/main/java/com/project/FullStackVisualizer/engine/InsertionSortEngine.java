package com.project.FullStackVisualizer.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class InsertionSortEngine implements AlgorithmEngine {

    @Override
    public String getAlgorithmName() {
        return "insertionSort";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {

        List<Step> steps = new ArrayList<>();
        List<Integer> input = new ArrayList<>(request.getInput());

        int n = input.size();

        steps.add(new Step("MARK_SORTED", Map.of("index", 0), 5));

        for (int i = 1; i < n; i++) {

            int key = input.get(i);
            int j = i - 1;

            // remove element to create empty slot
            steps.add(new Step(
                    "REMOVE",
                    Map.of("index", i),
                    6));

            while (j >= 0) {

                steps.add(new Step(
                        "COMPARE",
                        Map.of("i", j, "j", j + 1),
                        7));

                if (input.get(j) <= key) {
                    break;
                }

                input.set(j + 1, input.get(j));

                steps.add(new Step(
                        "SHIFT",
                        Map.of("from", j, "to", j + 1),
                        8));

                j--;
            }

            input.set(j + 1, key);

            steps.add(new Step(
                    "INSERT",
                    Map.of("index", j + 1, "value", key),
                    9));

            steps.add(new Step(
                    "MARK_SORTED",
                    Map.of("index", i),
                    10));
        }

        return steps;
    }
}