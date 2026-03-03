package com.project.FullStackVisualizer.service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.FullStackVisualizer.engine.AlgorithmEngine;
import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Service
public class ExecutionService{

    private final Map<String, AlgorithmEngine> algorithmEngines;    

    public ExecutionService(List<AlgorithmEngine> engines) {
        this.algorithmEngines = engines.stream()
                .collect(Collectors.toMap(engine -> engine.getAlgorithmName().toLowerCase(), engine -> engine));
    }
    
    public List<Step> execute(ExecutionRequest request){

        String algorithm = request.getAlgorithm();
        List<Integer> input = request.getInput();

        if(algorithm == null || input == null){
            throw new IllegalArgumentException("Algorithm and input cannot be null");
        }

        AlgorithmEngine engine = algorithmEngines.get(algorithm.toLowerCase());
        
        if (engine == null) {
            throw new IllegalArgumentException("Unsupported algorithm: " + algorithm);
        }

        return engine.generateStep(request);
    }
}