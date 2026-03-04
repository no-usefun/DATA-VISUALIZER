package com.project.FullStackVisualizer.model;
import java.util.List;

public class ExecutionRequest{
    final private String algorithm;
    final private List<Integer> input;

    public ExecutionRequest(String algorithm, List<Integer> input, Integer index, Integer value) {
        this.algorithm = algorithm;
        this.input = input;
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public List<Integer> getInput() {
        return input;
    }
}