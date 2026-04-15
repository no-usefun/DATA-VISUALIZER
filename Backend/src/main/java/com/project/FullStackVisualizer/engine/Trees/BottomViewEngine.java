package com.project.FullStackVisualizer.engine.Trees;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Queue;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.engine.AlgorithmEngine;
import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class BottomViewEngine extends TreeEngineSupport implements AlgorithmEngine {

    private static final class Lines {
        static final int START = 1;
        static final int VISIT = 13;
        static final int OUTPUT = 18;
    }

    @Override
    public String getAlgorithmName() {
        return "bottomView";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {
        List<Step> steps = new ArrayList<>();
        TreeNode root = buildTree(request.getInput());

        steps.add(startStep(Lines.START));

        if (root == null) {
            return steps;
        }

        Map<String, Integer> horizontalDistances = computeHorizontalDistances(root);
        Map<Integer, TreeNode> bottomNodes = new HashMap<>();

        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            int distance = horizontalDistances.get(node.id);

            steps.add(visitStep(node, Lines.VISIT));
            bottomNodes.put(distance, node);

            if (node.left != null) {
                queue.offer(node.left);
            }

            if (node.right != null) {
                queue.offer(node.right);
            }
        }

        bottomNodes.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(Map.Entry::getValue)
                .forEach(node -> steps.add(addResultStep(node, Lines.OUTPUT)));

        return steps;
    }
}
