package com.example.visualizer.model;

public class EdgeState {
    private final int fromIndex;
    private final int toIndex;

    public EdgeState(int fromIndex, int toIndex) {
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
    }

    public int getFromIndex() {
        return fromIndex;
    }

    public int getToIndex() {
        return toIndex;
    }
}