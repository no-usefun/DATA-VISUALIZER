package com.project.FullStackVisualizer.engine.Searching;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.engine.AlgorithmEngine;
import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class LinearSearchEngine implements AlgorithmEngine {

    private static final class Lines {

        static final int START = 1;
        static final int COMPARE = 5;
        static final int MARK = 6;
        static final int BREAK = 11;
    }

    @Override
    public String getAlgorithmName() {
        return "linearSearch";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {

        List<Step> steps = new ArrayList<>();
        List<Integer> input = request.getInput();
        int target = request.getTarget();

        steps.add(new Step(
                "START",
                Lines.START));

        for (int i = 0; i < input.size(); i++) {

            steps.add(new Step(
                    "CHECK",
                    Map.of("index", i),
                    Lines.COMPARE));

            if (input.get(i) == target) {

                steps.add(new Step(
                        "MARK_SORTED",
                        Map.of("index", i),
                        Lines.MARK));

                return steps;
            }
        }

        steps.add(new Step(
                "BREAK",
                Map.of("i", -1),
                Lines.BREAK));

        return steps;
    }
}
