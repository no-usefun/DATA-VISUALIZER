package com.project.FullStackVisualizer.engine.Trees;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.project.FullStackVisualizer.engine.AlgorithmEngine;
import com.project.FullStackVisualizer.model.ExecutionRequest;
import com.project.FullStackVisualizer.model.Step;

@Component
public class HeapTreeSortEngine extends TreeEngineSupport implements AlgorithmEngine {

    private static final class Lines {
        static final int START = 1;
        static final int VISIT = 8;
        static final int SWAP = 14;
        static final int OUTPUT = 20;
    }

    @Override
    public String getAlgorithmName() {
        return "heapTreeSort";
    }

    @Override
    public List<Step> generateStep(ExecutionRequest request) {
        List<Step> steps = new ArrayList<>();
        TreeNode root = buildTree(request.getInput());
        List<TreeNode> nodes = levelOrderNodes(root);

        steps.add(startStep(Lines.START));

        if (nodes.isEmpty()) {
            return steps;
        }

        for (int i = nodes.size() / 2 - 1; i >= 0; i--) {
            heapify(nodes, nodes.size(), i, steps);
        }

        for (int end = nodes.size() - 1; end > 0; end--) {
            steps.add(visitStep(nodes.get(0), Lines.VISIT));
            steps.add(visitStep(nodes.get(end), Lines.VISIT));
            swapValues(nodes.get(0), nodes.get(end), steps);
            heapify(nodes, end, 0, steps);
        }

        for (TreeNode node : nodes) {
            steps.add(addResultValueStep(node.value, Lines.OUTPUT));
        }

        return steps;
    }

    private void heapify(List<TreeNode> nodes, int size, int rootIndex, List<Step> steps) {
        int largest = rootIndex;

        while (true) {
            int left = 2 * largest + 1;
            int right = 2 * largest + 2;
            int nextLargest = largest;

            steps.add(visitStep(nodes.get(largest), Lines.VISIT));

            if (left < size) {
                steps.add(visitStep(nodes.get(left), Lines.VISIT));
                if (nodes.get(left).value > nodes.get(nextLargest).value) {
                    nextLargest = left;
                }
            }

            if (right < size) {
                steps.add(visitStep(nodes.get(right), Lines.VISIT));
                if (nodes.get(right).value > nodes.get(nextLargest).value) {
                    nextLargest = right;
                }
            }

            if (nextLargest == largest) {
                return;
            }

            swapValues(nodes.get(largest), nodes.get(nextLargest), steps);
            largest = nextLargest;
        }
    }

    private void swapValues(TreeNode first, TreeNode second, List<Step> steps) {
        int temp = first.value;
        first.value = second.value;
        second.value = temp;

        steps.add(setTreeValueStep(first, Lines.SWAP));
        steps.add(setTreeValueStep(second, Lines.SWAP));
    }
}
