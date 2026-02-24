package com.project.FullStackVisualizer.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class DeleteEngine implements AlgorithmEngine {

    @Override
    public String getAlgorithmName() {
        return "delete";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {

        List<Step> steps = new ArrayList<>();

        List<Integer> arr = new ArrayList<>(request.getInput());
        Integer index = request.getIndex();

        if (index == null) {
            throw new IllegalArgumentException("Index required for delete");
        }

        if (index < 0 || index >= arr.size()) {
            throw new IllegalArgumentException("Invalid index");
        }

        // Step 1: Highlight element to delete
        steps.add(new Step(
                "HIGHLIGHT",
                Map.of("index", index),
                4
        ));

        // Step 2: Shift left elements after index
        for (int i = index + 1; i < arr.size(); i++) {

            steps.add(new Step(
                    "SHIFT_LEFT",
                    Map.of("from", i, "to", i - 1),
                    6
            ));
        }

        // Step 3: Remove last element
        steps.add(new Step(
                "REMOVE",
                Map.of("index", arr.size() - 1),
                8
        ));

        return steps;
    }
}