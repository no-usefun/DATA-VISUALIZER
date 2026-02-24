package com.example.visualizer.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SnapshotManager {

    private final List<Snapshot> history;
    private int stepCounter;

    public SnapshotManager() {
        this.history = new ArrayList<>();
        this.stepCounter = 0;
    }

    public void addSnapshot(List<Integer> currentState, Integer changedIndex, String action) {
        stepCounter++;
        Snapshot snapshot = new Snapshot(
                stepCounter,
                currentState,
                changedIndex,
                action
        );

        history.add(snapshot);
    }

    public List<Snapshot> getAllSnapshots() {
        return Collections.unmodifiableList(history);
    }

    public Snapshot getCurrentSnapshot() {
        if (history.isEmpty()) {
            return null;
        }
        return history.get(history.size() - 1);
    }

    public void clearHistory() {
        history.clear();
        stepCounter = 0;
    }
}
