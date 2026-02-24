package com.example.visualizer.model;

public class NodeState {
    private final int index;
    private final int value;

    public NodeState(int index, int value) {
        this.index = index;
        this.value = value;
    }

    public int getIndex() {
        return index;
    }

    public int getValue() {
        return value;
    }
}