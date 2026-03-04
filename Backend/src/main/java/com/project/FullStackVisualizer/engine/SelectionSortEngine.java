package com.project.FullStackVisualizer.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class SelectionSortEngine implements AlgorithmEngine {

    @Override
    public String getAlgorithmName() {
        return "selectionSort";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {
        List<Step> steps = new ArrayList<>();
        List<Integer> input = new ArrayList<>(request.getInput());
        
        int n = input.size();
        for(int i=0; i<n-1; i++){
            int minIndex = i;
            for(int j=i+1; j<n; j++){
                steps.add(new Step("HIGHLIGHT",
                        Map.of("i", minIndex, "j", j),
                        6));

                steps.add(new Step("COMPARE",
                        Map.of("i", minIndex, "j", j),
                        7));

                if(input.get(j) < input.get(minIndex)){
                    minIndex = j;
                }
            }

            if(minIndex != i){
                steps.add(new Step("SWAP",
                        Map.of("i", i, "j", minIndex),
                        8));

                int temp = input.get(i);
                input.set(i, input.get(minIndex));
                input.set(minIndex, temp);
            }

            steps.add(new Step("MARK_SORTED",
                    Map.of("index", i),
                    9));
        }
        return steps;
    }
}