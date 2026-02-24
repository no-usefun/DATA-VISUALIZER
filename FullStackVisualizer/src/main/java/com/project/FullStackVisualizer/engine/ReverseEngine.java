package com.project.FullStackVisualizer.engine;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;


@Component
public class ReverseEngine implements AlgorithmEngine{

    @Override
    public String getAlgorithmName() {
        return "reverse";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {
        List<Step> steps = new ArrayList<>();
        List<Integer> input = new ArrayList<>(request.getInput());
        List<Integer> arr = new ArrayList<>(input); // Create a copy of the input list to avoid modifying the original
        
        int left = 0;
        int right = input.size() - 1;

        while(left < right){
            steps.add(new Step("HIGHLIGHT", Map.of("i", left, "j", right), 6));
            steps.add(new Step("SWAP", Map.of("i", left, "j", right), 7));

            // Swap the elements in the input list to reflect the change
            int temp = arr.get(left);
            arr.set(left, arr.get(right));
            arr.set(right, temp);

            left++;
            right--;
        }
        
        return steps;
    }
}