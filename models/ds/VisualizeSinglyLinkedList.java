import java.util.ArrayList;
import java.util.List;

class VisualizeSinglyLinkedList{
    private class Node{
        int data;
        Node next;
        Node(int data){
            this.data = data;
            this.next = null;
        }
    }

    private Node head = null;
    private Node tail = null;
    private int count = 0;
    final private SnapshotManager snapshotManager;

    public boolean isEmpty(){
        return head==null;
    }

    public void addFirst(int data){
        Node newNode = new Node(data);

        if(isEmpty()){
            head = newNode;
            tail = newNode;
        } else{
            newNode.next = head;
            head = newNode;
        }
        count++;
        snapshotManager.addSnapshot("SinglyLinkedList", "Add First " + data, getCurrentState());
        logOperation("ADD NODE: "+data);
    }

    private Node getNodeAt(int idx){
        Node temp  = head;
        for(int i=0; i<idx; i++){
            temp=temp.next;
        }

        return temp;
    }

    public void addAt(int data, int idx){
        if(idx < 0 || idx > count){
            System.out.println("Not a valid index");
            return;
        }

        if(idx==0){
            addFirst(data);
            return;
        }

        if(idx == count){
            addLast(data);
            return;
        }

        Node newNode = new Node(data);
        Node temp = getNodeAt(idx-1);
        
        newNode.next = temp.next;
        temp.next = newNode;
        count++;
        snapshotManager.addSnapshot("SinglyLinkedList", "Add At Index "+idx+" data: " + data, getCurrentState());
        logOperation("ADD NODE: "+data);
    }

    public void addLast(int data){
        Node newNode = new Node(data);
        if(isEmpty()){
            head = newNode;
            tail = newNode;
        } else{
            tail.next = newNode;
            tail = newNode;
        }
        count++;
        snapshotManager.addSnapshot("SinglyLinkedList", "Add Last data: " + data, getCurrentState());
        logOperation("ADD NODE: "+data);
    }

    public void removeFirst(){
        if(isEmpty()){
            System.out.println("LinkedList is empty");
            return;
        }

        int removedData = head.data;
        if(head==tail){
            head = null;
            tail = null;
        } else{
            head = head.next;
        }
        count--;
        snapshotManager.addSnapshot("SinglyLinkedList", "Remove First data: " + removedData, getCurrentState());
        logOperation("REMOVE NODE: "+removedData);
    }

    public void removeAt(int idx){
        if(isEmpty()){
            System.out.println("LinkedList is empty");
            return;
        }

        if(idx < 0 || idx >= count){
            System.out.println("Not a valid index");
            return;
        }

        if(idx==0){
            removeFirst();
            return;
        }

        Node temp = getNodeAt(idx-1);
        
        int removedData = temp.next.data;
        temp.next = temp.next.next;
        if(temp.next == null){
            tail = temp;
        }
        count--;
        snapshotManager.addSnapshot("SinglyLinkedList", "Remove At Index "+idx+" data: " + removedData, getCurrentState());
        logOperation("REMOVE NODE: "+removedData);
    }

    public void removeLast(){
        if(isEmpty()){
            System.out.println("LinkedList is empty");
            return;
        }

        Node temp = head;
        int lastData = tail.data;

        if(head==tail){
            head=null;
            tail=null;
        } else{
            while(temp.next.next!=null){
                temp=temp.next;
            }
            temp.next = temp.next.next;
            tail = temp;
        }
        count--;
        snapshotManager.addSnapshot("SinglyLinkedList", "Remove last data: " + lastData, getCurrentState());
        logOperation("REMOVE NODE: "+ lastData);
    }

    public void display(){
        if(isEmpty()){
            System.out.println("LinkedList is empty");
            return;
        }

        Node temp = head;
        System.out.println("HEAD: ");
        while(temp!=null){
            System.out.print("["+temp.data+"]" + " -> ");
            temp = temp.next;
        }
        System.out.println("NULL");
        System.out.println();
    }

    private void logOperation(String Message){
        System.out.println(Message);
        display();
    }

    public int size(){
        return count;
    }

    public VisualizeSinglyLinkedList(SnapshotManager snapshotManager){
        this.snapshotManager = snapshotManager;
    }

    private List<Integer> getCurrentState(){
        List<Integer> state = new ArrayList<>();
        Node temp = head;
        while(temp!=null){
            state.add(temp.data);
            temp = temp.next;
        }
        return state;
    }
}