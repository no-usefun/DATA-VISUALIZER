package com.project.FullStackVisualizer.model;
import java.util.Map;

public class Step{

    final private String type;
    final private Map<String, Object> data;
    final private int line;

    public Step(String type, Map<String, Object> data, int line) {
        this.type = type;
        this.data = data;
        this.line = line;
    }

    public String getType() {
        return type;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public int getLine() {
        return line;
    }
}