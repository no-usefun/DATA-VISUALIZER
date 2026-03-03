package com.project.FullStackVisualizer.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class InsertEngine implements AlgorithmEngine {
    @Override
    public String getAlgorithmName() {
        return "insert";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {
        
        List<Step> steps = new ArrayList<>();
        List<Integer> arr = new ArrayList<>(request.getInput()); // Create a copy of the input list to avoid modifying the original

        Integer index = request.getIndex();
        Integer value = request.getValue();

        if(index == null || value == null){
            throw new IllegalArgumentException("Index and value required for insert");
        }

        if(index < 0 || index > arr.size()){
            throw new IllegalArgumentException("Index out of bounds");
        }

        // Step 1: Highlight insertion position
        steps.add(new Step(
                "HIGHLIGHT",
                Map.of("index", index),
                4
        ));

        // Step 2: Shift elements right
        for (int i = arr.size() - 1; i >= index; i--) {

            steps.add(new Step(
                    "SHIFT_RIGHT",
                    Map.of("from", i, "to", i + 1),
                    6
            ));
        }

        // Step 3: Insert new value
        steps.add(new Step(
                "INSERT",
                Map.of("index", index, "value", value),
                8
        ));

        return steps;
    }
}
