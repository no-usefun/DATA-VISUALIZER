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
            for (int j = i; j < n - i - 1; j++) {
                steps.add(new Step("HIGHLIGHT", Map.of("i", i, "j", j), 6));
                steps.add(new Step("COMPARE", Map.of("i", i, "j", j), 7));
                if (input.get(i) > input.get(j + 1)) {
                    steps.add(new Step("SWAP", Map.of("i", i, "j", j), 8));

                    // Swap the elements in the input list to reflect the change
                    int temp = input.get(i);
                    input.set(i, input.get(j));
                    input.set(j, temp);
                }
            }
        }
        steps.add(new Step(
            "MARK_SORTED",
            Map.of("index", 0),
            8
        ));
        return steps;
    }
}