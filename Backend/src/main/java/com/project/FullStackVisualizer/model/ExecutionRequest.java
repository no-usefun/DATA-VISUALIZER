package com.project.FullStackVisualizer.model;

import java.util.List;

public class ExecutionRequest {

    private final String algorithm;
    private final List<Integer> input;
    private final Integer target;   // value to search

    public ExecutionRequest(String algorithm, List<Integer> input, Integer target) {
        this.algorithm = algorithm;
        this.input = input;
        this.target = target;
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public List<Integer> getInput() {
        return input;
    }

    public Integer getTarget() {
        return target;
    }
}
