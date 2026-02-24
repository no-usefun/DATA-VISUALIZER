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
        List<Integer> arr = new ArrayList<>(input); // Create a copy of the input list to avoid modifying the original

        int n = input.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                steps.add(new Step("HIGHLIGHT", Map.of("i", j, "j", j + 1), 6));
                steps.add(new Step("COMPARE", Map.of("i", j, "j", j + 1), 6));
                if (input.get(j) > input.get(j + 1)) {
                    steps.add(new Step("SWAP", Map.of("i", j, "j", j + 1), 7));

                    // Swap the elements in the input list to reflect the change
                    int temp = arr.get(j);
                    arr.set(j, arr.get(j + 1));
                    arr.set(j + 1, temp);
                }
            }
        }
        return steps;
    }
}