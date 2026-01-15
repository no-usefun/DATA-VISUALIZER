import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// store the current state information for a data structure
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

    // retrieve step count value
    public int getStep() {
        return stepCount;
    }

    // retrive data structure type
    public String getStructureType() {
        return structureType;
    }

    // retrive operation used
    public String getOperation() {
        return operation;
    }

    // retrive state after operation
    public List<Integer> getState() {
        return Collections.unmodifiableList(state);
    }
}