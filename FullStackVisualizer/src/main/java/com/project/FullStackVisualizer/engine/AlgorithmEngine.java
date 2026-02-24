package com.project.FullStackVisualizer.engine;

import java.util.List;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

public interface AlgorithmEngine {
    String getAlgorithmName();
    List<Step> generateStep(ExecutionRequest request);
}