package com.project.FullStackVisualizer.engine.Trees;

import org.springframework.stereotype.Component;

@Component
public class DfsTraversalEngine extends PreorderTraversalEngine {

    @Override
    public String getAlgorithmName() {
        return "dfsTraversal";
    }
}
