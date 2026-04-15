package com.project.FullStackVisualizer.engine.Trees;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.engine.AlgorithmEngine;
import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class InorderTraversalEngine extends TreeEngineSupport implements AlgorithmEngine {

    private static final class Lines {
        static final int START = 1;
        static final int VISIT = 6;
        static final int OUTPUT = 7;
    }

    @Override
    public String getAlgorithmName() {
        return "inorderTraversal";
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

        traverse(node.left, steps);
        steps.add(visitStep(node, Lines.VISIT));
        steps.add(addResultStep(node, Lines.OUTPUT));
        traverse(node.right, steps);
    }
}
