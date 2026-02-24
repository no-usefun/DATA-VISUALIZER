package com.project.FullStackVisualizer.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.ExecutionResponse;
import com.project.FullStackVisualizer.model.Step;
import com.project.FullStackVisualizer.service.ExecutionService;

@RestController
@RequestMapping("/api")
public class ExecutionController {
    private final ExecutionService executionService;

    public ExecutionController(ExecutionService executionService) {
        this.executionService = executionService;
    }

    @PostMapping("/execute")
    public ExecutionResponse execute(@RequestBody ExecutionRequest request){
        
        List<Step> steps = executionService.execute(request);
        return new ExecutionResponse(steps);
    }
}