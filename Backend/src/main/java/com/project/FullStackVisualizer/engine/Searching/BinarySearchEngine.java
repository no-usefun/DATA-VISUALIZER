package com.project.FullStackVisualizer.engine.Searching;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.engine.AlgorithmEngine;
import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class BinarySearchEngine implements AlgorithmEngine {

    private static final class Lines {

        static final int START = 1;
        static final int RANGE = 6;
        static final int PIVOT = 14;
        static final int MARK = 11;
        static final int BREAK = 23;
    }

    @Override
    public String getAlgorithmName() {
        return "binarySearch";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {

        List<Step> steps = new ArrayList<>();
        List<Integer> input = request.getInput();
        int target = request.getTarget();

        int left = 0;
        int right = input.size() - 1;

        steps.add(new Step(
                "START",
                Map.of("left", left, "right", right),
                Lines.START));

        while (left <= right) {

            int mid = left + (right - left) / 2;

            steps.add(new Step(
                    "RANGE",
                    Map.of(
                            "start", left,
                            "end", right
                    ),
                    Lines.RANGE));

            steps.add(new Step(
                    "CHECK",
                    Map.of("index", mid),
                    Lines.PIVOT));

            int value = input.get(mid);

            if (value == target) {

                steps.add(new Step(
                        "MARK_SORTED",
                        Map.of("index", mid),
                        Lines.MARK));

                return steps;
            }

            if (value < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        steps.add(new Step(
                "BREAK",
                Map.of("index", -1),
                Lines.BREAK));

        return steps;
    }
}
