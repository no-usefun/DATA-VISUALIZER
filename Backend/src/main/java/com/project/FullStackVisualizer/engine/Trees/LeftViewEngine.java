package com.project.FullStackVisualizer.engine.Trees;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.engine.AlgorithmEngine;
import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class LeftViewEngine extends TreeEngineSupport implements AlgorithmEngine {

    private static final class Lines {
        static final int START = 1;
        static final int VISIT = 10;
        static final int OUTPUT = 12;
    }

    @Override
    public String getAlgorithmName() {
        return "leftView";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {
        List<Step> steps = new ArrayList<>();
        TreeNode root = buildTree(request.getInput());

        steps.add(startStep(Lines.START));

        if (root == null) {
            return steps;
        }

        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                steps.add(visitStep(node, Lines.VISIT));

                if (i == 0) {
                    steps.add(addResultStep(node, Lines.OUTPUT));
                }

                if (node.left != null) {
                    queue.offer(node.left);
                }

                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
        }

        return steps;
    }
}
