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

        // Highlight compared elements
        steps.add(new Step("HIGHLIGHT", 
                Map.of("i", j, "j", j + 1), 
                6));

        // Compare adjacent elements
        steps.add(new Step("COMPARE", 
                Map.of("i", j, "j", j + 1), 
                7));

        if (input.get(j) > input.get(j + 1)) {

            // Swap step
            steps.add(new Step("SWAP", 
                    Map.of("i", j, "j", j + 1), 
                    8));

            // Perform actual swap in list
            int temp = input.get(j);
            input.set(j, input.get(j + 1));
            input.set(j + 1, temp);

            swapped = true;
        }
    }

    // Optimization: stop if no swaps occurred
    if (!swapped) {
        break;
    }
}
        return steps;
    }
}