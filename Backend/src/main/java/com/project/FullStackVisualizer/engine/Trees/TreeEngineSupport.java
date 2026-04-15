package com.project.FullStackVisualizer.engine.Trees;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;

import com.project.FullStackVisualizer.model.Step;

abstract class TreeEngineSupport {

    protected static final class TreeNode {
        final String id;
        int value;
        TreeNode left;
        TreeNode right;

        TreeNode(String id, int value) {
            this.id = id;
            this.value = value;
        }
    }

    protected TreeNode buildTree(List<Integer> values) {
        if (values == null || values.isEmpty()) {
            return null;
        }

        TreeNode[] nodes = new TreeNode[values.size()];

        for (int i = 0; i < values.size(); i++) {
            nodes[i] = new TreeNode(String.valueOf(i), values.get(i));
        }

        for (int i = 0; i < values.size(); i++) {
            int leftIndex = 2 * i + 1;
            int rightIndex = 2 * i + 2;

            if (leftIndex < values.size()) {
                nodes[i].left = nodes[leftIndex];
            }

            if (rightIndex < values.size()) {
                nodes[i].right = nodes[rightIndex];
            }
        }

        return nodes[0];
    }

    protected Step startStep(int line) {
        return new Step("START", line);
    }

    protected Step visitStep(TreeNode node, int line) {
        return new Step("VISIT_NODE", Map.of("nodeId", node.id, "value", node.value), line);
    }

    protected Step addResultStep(TreeNode node, int line) {
        return new Step("ADD_RESULT_NODE", Map.of("nodeId", node.id, "value", node.value), line);
    }

    protected Step addResultValueStep(int value, int line) {
        return new Step("ADD_RESULT_VALUE", Map.of("value", value), line);
    }

    protected Step setTreeValueStep(TreeNode node, int line) {
        return new Step("SET_TREE_VALUE", Map.of("nodeId", node.id, "value", node.value), line);
    }

    protected List<TreeNode> levelOrderNodes(TreeNode root) {
        List<TreeNode> nodes = new ArrayList<>();

        if (root == null) {
            return nodes;
        }

        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            nodes.add(node);

            if (node.left != null) {
                queue.offer(node.left);
            }

            if (node.right != null) {
                queue.offer(node.right);
            }
        }

        return nodes;
    }

    protected Map<String, Integer> computeHorizontalDistances(TreeNode root) {
        Map<String, Integer> distances = new HashMap<>();

        if (root == null) {
            return distances;
        }

        Queue<TreeNode> nodeQueue = new ArrayDeque<>();
        Queue<Integer> distanceQueue = new ArrayDeque<>();

        nodeQueue.offer(root);
        distanceQueue.offer(0);

        while (!nodeQueue.isEmpty()) {
            TreeNode node = nodeQueue.poll();
            int distance = distanceQueue.poll();

            distances.put(node.id, distance);

            if (node.left != null) {
                nodeQueue.offer(node.left);
                distanceQueue.offer(distance - 1);
            }

            if (node.right != null) {
                nodeQueue.offer(node.right);
                distanceQueue.offer(distance + 1);
            }
        }

        return distances;
    }
}
