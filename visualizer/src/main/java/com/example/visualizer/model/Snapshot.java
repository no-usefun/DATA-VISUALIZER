package com.example.visualizer.model;

import java.util.ArrayList;
import java.util.List;

public class Snapshot {

    private final int step;
    private final List<Integer> state;
    private final Integer changedIndex; // which node changed
    private final String action;        // "ADD" or "REMOVE"

    public Snapshot(int step,
                    List<Integer> state,
                    Integer changedIndex,
                    String action) {

        this.step = step;
        this.state = new ArrayList<>(state);
        this.changedIndex = changedIndex;
        this.action = action;
    }

    public int getStep() {
        return step;
    }

    public List<Integer> getState() {
        return state;
    }

    public Integer getChangedIndex() {
        return changedIndex;
    }

    public String getAction() {
        return action;
    }
}
