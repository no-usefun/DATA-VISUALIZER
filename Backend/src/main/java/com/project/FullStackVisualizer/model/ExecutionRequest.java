package com.project.FullStackVisualizer.model;
import java.util.List;

public class ExecutionRequest{
    final private String algorithm;
    final private List<Integer> input;
    final private Integer index;
    final private Integer value;

    public ExecutionRequest(String algorithm, List<Integer> input, Integer index, Integer value) {
        this.algorithm = algorithm;
        this.input = input;
        this.index = index;
        this.value = value;
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public List<Integer> getInput() {
        return input;
    }

    public Integer getIndex() {
        return index;
    }

    public Integer getValue() {
        return value;
    }
}