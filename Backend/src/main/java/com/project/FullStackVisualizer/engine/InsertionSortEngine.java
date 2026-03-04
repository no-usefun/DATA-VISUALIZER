package com.project.FullStackVisualizer.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class InsertionSortEngine implements AlgorithmEngine{

    @Override
    public String getAlgorithmName(){
        return "insertionSort";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request){
        List<Step> steps = new ArrayList<>();
        List<Integer> input = new ArrayList<>(request.getInput());

        int n = input.size();

        for(int i=1; i<n; i++){
            int key = input.get(i);
            int j = i - 1;

            steps.add(new Step("HIGHLIGHT",
                    Map.of("i", i, "j", j),
                    6));

            while(j >= 0 && input.get(j) > key){
                steps.add(new Step("COMPARE",
                        Map.of("i", j, "key", key),
                        7));

                input.set(j + 1, input.get(j));
                steps.add(new Step("MOVE",
                        Map.of("from", j, "to", j + 1),
                        8));

                j--;
            }
            input.set(j + 1, key);
            steps.add(new Step("INSERT",
                    Map.of("index", j + 1, "value", key),
                    9));
        }

        return steps;
    }
}