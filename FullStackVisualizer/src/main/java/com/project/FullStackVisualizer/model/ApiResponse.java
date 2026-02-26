package com.project.FullStackVisualizer.model;

public class ApiResponse<T> {

    final private boolean success;
    final private T data;
    final private String error;

    public ApiResponse(boolean success, T data, String error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }

    public boolean isSuccess() { return success; }
    public T getData() { return data; }
    public String getError() { return error; }
}