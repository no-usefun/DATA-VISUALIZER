import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class SnapShot{
    private final int stepCount;
    private final String structureType;
    private final String operation;
    private final List<Integer> state;

    SnapShot(int stepCount, String structureType, String operation, List<Integer> state){
        this.stepCount = stepCount;
        this.structureType = structureType;
        this.operation = operation;
        this.state = new ArrayList<>(state);
    }

    public int getStep() {
        return stepCount;
    }

    public String getStructureType() {
        return structureType;
    }

    public String getOperation() {
        return operation;
    }

    public List<Integer> getState() {
        return Collections.unmodifiableList(state);
    }
}