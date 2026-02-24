package com.project.FullStackVisualizer.model;
import java.util.List;

public class ExecutionResponse{
    final private List<Step> steps;

    public ExecutionResponse(List<Step> steps) {
        this.steps = steps;
    }

    public List<Step> getSteps() {
        return steps;
    }

}