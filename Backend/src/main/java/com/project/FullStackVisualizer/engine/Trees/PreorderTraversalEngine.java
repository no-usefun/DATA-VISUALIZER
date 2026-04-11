package com.project.FullStackVisualizer.engine.Trees;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.engine.AlgorithmEngine;
import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class PreorderTraversalEngine extends TreeEngineSupport implements AlgorithmEngine {

    private static final class Lines {
        static final int START = 1;
        static final int VISIT = 4;
        static final int OUTPUT = 5;
    }

    @Override
    public String getAlgorithmName() {
        return "preorderTraversal";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {
        List<Step> steps = new ArrayList<>();
        TreeNode root = buildTree(request.getInput());

        steps.add(startStep(Lines.START));
        traverse(root, steps);
        return steps;
    }

    private void traverse(TreeNode node, List<Step> steps) {
        if (node == null) {
            return;
        }

        steps.add(visitStep(node, Lines.VISIT));
        steps.add(addResultStep(node, Lines.OUTPUT));
        traverse(node.left, steps);
        traverse(node.right, steps);
    }
}
