package com.example.visualizer.ds;

import java.util.ArrayList;
import java.util.List;

public class VisualizeSinglyLinkedList{

    private class Node {
        int id;
        int data;
        Node next;

        Node(int id, int data) {
            this.id = id;
            this.data = data;
            this.next = null;
        }
    }

    private Node head = null;
    private Node tail = null;
    private int count = 0;

    public void resetList() {
        head = null;
        tail = null;
        count = 0;
        idCount = 1;
    }

    private int idCount = 1;
    
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

    // ================= ADD OPERATIONS =================

    public void addFirst(int data) {
        Node newNode = new Node(idCount++, data);

        if (isEmpty()) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.next = head;
            head = newNode;
        }

        count++;
    }

    public void addLast(int data) {
        Node newNode = new Node(idCount++, data);

        if (isEmpty()) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }

        count++;
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

        Node newNode = new Node(idCount++, data);
        Node temp = getNodeAt(idx - 1);

        newNode.next = temp.next;
        temp.next = newNode;

        count++;
    }

    // ================= REMOVE OPERATIONS =================

    public void removeFirst() {
        if (isEmpty()) {
            return;
        }
        // Now actually remove
        if (head == tail) {
            resetList();
        } else {
            head = head.next;
            count--;
        }
    }

    public void removeLast() {
        if (isEmpty()) {
            return;
        }

        int removedIndex = count - 1;

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
    }

    public void removeAtIndex(int idx) {
        if (isEmpty() || idx < 0 || idx >= count) {
            return;
        }

        if (idx == 0) {
            removeFirst();
            return;
        }
        Node temp = getNodeAt(idx - 1);

        if (temp.next == tail) {
            tail = temp;
        }

        temp.next = temp.next.next;
        count--;
    }
}
