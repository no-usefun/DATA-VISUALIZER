import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class SnapshotManager {

    private final List<SnapShot> history;
    private int stepCounter;

    public SnapshotManager() {
        this.history = new ArrayList<>();
        this.stepCounter = 0;
    }

    // Create and store a snapshot
    public void addSnapshot(String structureType, String operation, List<Integer> currentState) {
        stepCounter++;
        SnapShot snapshot = new SnapShot(stepCounter, structureType, operation, currentState);
        history.add(snapshot);
    }

    // Get all snapshots (read-only)
    public List<SnapShot> getAllSnapshots() {
        return Collections.unmodifiableList(history);
    }

    // Get snapshot by step number
    public SnapShot getSnapshot(int step) {
        if (step <= 0 || step > history.size()) {
            throw new IllegalArgumentException("Invalid step number");
        }
        return history.get(step - 1); // step starts from 1
    }

    // Replay all snapshots
    public void replay() {
        System.out.println("----- REPLAY START -----");
        for (SnapShot snap : history) {
            printSnapshot(snap);
        }
        System.out.println("----- REPLAY END -----");
    }

    // Helper display method
    private void printSnapshot(SnapShot snap) {
        System.out.println("Step: " + snap.getStep());
        System.out.println("Structure: " + snap.getStructureType());
        System.out.println("Operation: " + snap.getOperation());
        System.out.println("State: " + snap.getState());
        System.out.println();
    }
}
