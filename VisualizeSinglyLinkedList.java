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
        System.out.println("ADD NODE: "+data);
        display();
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
        Node temp = head;
        int i=0;
        while(i < idx-1){
            temp = temp.next;
            i++;
        }
        
        newNode.next = temp.next;
        temp.next = newNode;
        count++;
        System.out.println("ADD NODE: "+data);
        display();
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
        System.out.println("ADD NODE: "+data);
        display();
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

    public int size(){
        return count;
    }
}