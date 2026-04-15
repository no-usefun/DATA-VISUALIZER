package com.project.FullStackVisualizer.engine.Trees;

import org.springframework.stereotype.Component;

@Component
public class BfsTraversalEngine extends LevelOrderTraversalEngine {

    @Override
    public String getAlgorithmName() {
        return "bfsTraversal";
    }
}
