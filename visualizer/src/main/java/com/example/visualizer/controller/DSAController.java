package com.example.visualizer.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.visualizer.model.Snapshot;
import com.example.visualizer.model.SnapshotManager;
import com.example.visualizer.model.VisualizeSinglyLinkedList;


@RestController
@RequestMapping("/api/list") 
@CrossOrigin()
public class DSAController {

    private final VisualizeSinglyLinkedList list;
    private final SnapshotManager snapshotManager;

    public DSAController() {
        this.snapshotManager = new SnapshotManager();
        this.list = new VisualizeSinglyLinkedList(snapshotManager);
    }

    @PostMapping("/singlyLinkedList/addFirst/{data}")
    public Snapshot addFirst(@PathVariable int data) {
        list.addFirst(data);
        return snapshotManager.getCurrentSnapshot();
    }

    @PostMapping("/singlyLinkedList/addLast/{data}")
    public Snapshot addLast(@PathVariable int data) {
        list.addLast(data);
        return snapshotManager.getCurrentSnapshot();
    }

    @PostMapping("/singlyLinkedList/addAt/{data}/{idx}")
    public Snapshot addAt(@PathVariable int data, @PathVariable int idx){
        list.addAtIndex(data,idx);
        return snapshotManager.getCurrentSnapshot();
    }

    @PostMapping("/singlyLinkedList/removeFirst")
    public Snapshot removeFirst(){
        list.removeFirst();
        return snapshotManager.getCurrentSnapshot();
    }

    @PostMapping("/singlyLinkedList/removeLast")
    public Snapshot removeLast(){
        list.removeLast();
        return snapshotManager.getCurrentSnapshot();
    }

    @PostMapping("/singlyLinkedList/removeAt/{idx}")
    public Snapshot removeAt(@PathVariable int idx){
        list.removeAtIndex(idx);
        return snapshotManager.getCurrentSnapshot();
    }

    @GetMapping("/singlyLinkedList/history")
    public List<Snapshot> getHistory(){
        return snapshotManager.getAllSnapshots();
    }

    @PostMapping("/singlyLinkedList/clearHistory")
    public void clearHistory(){
        snapshotManager.clearHistory();
        list.resetList();
    }
}


