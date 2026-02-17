package com.example.visualizer.model;

import java.util.ArrayList;
import java.util.List;

public class VisualizeSinglyLinkedList implements DataStructure {

    private class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    private Node head = null;
    private Node tail = null;
    private int count = 0;

    private final SnapshotManager snapshotManager;

    public VisualizeSinglyLinkedList(SnapshotManager snapshotManager) {
        this.snapshotManager = snapshotManager;
    }

    @Override
    public void reset() {
        resetList();
    }

    public void resetList() {
        head = null;
        tail = null;
        count = 0;
    }

    private boolean isEmpty() {
        return head == null;
    }

    private Node getNodeAt(int idx) {
        Node temp = head;
        for (int i = 0; i < idx; i++) {
            temp = temp.next;
        }
        return temp;
    }

    private List<Integer> getCurrentState() {
        List<Integer> state = new ArrayList<>();
        Node temp = head;
        while (temp != null) {
            state.add(temp.data);
            temp = temp.next;
        }
        return state;
    }

    // ================= ADD OPERATIONS =================

    public void addFirst(int data) {
        Node newNode = new Node(data);

        if (isEmpty()) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.next = head;
            head = newNode;
        }

        count++;
        snapshotManager.addSnapshot(getCurrentState(),0,"ADD");
    }

    public void addLast(int data) {
        Node newNode = new Node(data);

        if (isEmpty()) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }

        count++;
        snapshotManager.addSnapshot(getCurrentState(),count - 1,"ADD");
    }

    public void addAtIndex(int data, int idx) {

        if (idx < 0 || idx > count) {
            return;
        }

        if (idx == 0) {
            addFirst(data);
            return;
        }

        if (idx == count) {
            addLast(data);
            return;
        }

        Node newNode = new Node(data);
        Node temp = getNodeAt(idx - 1);

        newNode.next = temp.next;
        temp.next = newNode;

        count++;

        snapshotManager.addSnapshot(getCurrentState(),idx,"ADD");
    }

    // ================= REMOVE OPERATIONS =================

    public void removeFirst() {
        if (isEmpty()) {
            return;
        }
        // Snapshot 1 → show red
        snapshotManager.addSnapshot(getCurrentState(),0,"REMOVE");
        // Now actually remove
        if (head == tail) {
            resetList();
        } else {
            head = head.next;
            count--;
        }
        // Snapshot 2 → after removal (no highlight)
        snapshotManager.addSnapshot(getCurrentState(),null,null);
    }

    public void removeLast() {
        if (isEmpty()) {
            return;
        }

        int removedIndex = count - 1;
        // Snapshot 1 → turn red
        snapshotManager.addSnapshot(getCurrentState(), removedIndex, "REMOVE");

        if (head == tail) {
            resetList();
        } else {
            Node temp = head;
            while (temp.next.next != null) {
                temp = temp.next;
            }
            temp.next = null;
            tail = temp;
            count--;
        }
        // Snapshot 2 → after removal
        snapshotManager.addSnapshot(getCurrentState(), null, null);
    }

    public void removeAtIndex(int idx) {
        if (isEmpty() || idx < 0 || idx >= count) {
            return;
        }

        if (idx == 0) {
            removeFirst();
            return;
        }

        snapshotManager.addSnapshot(getCurrentState(),idx,"REMOVE");
        Node temp = getNodeAt(idx - 1);

        if (temp.next == tail) {
            tail = temp;
        }

        temp.next = temp.next.next;
        count--;
        snapshotManager.addSnapshot(getCurrentState(), null, null);
    }
}
