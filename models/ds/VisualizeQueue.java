class VisualizeQueue{
    private class Node{
        int data;
        Node next;

        Node(int data){
            this.data = data;
            this.next = null;
        }
    }

    private int count = 0;
    private Node front = null;
    private Node rear = null;

    public void enqueue(int data){
        Node newNode = new Node(data);
        
        if(isEmpty()){
            front = newNode;
            rear = newNode;
        } else{
            rear.next = newNode;
            rear = newNode;
        }
        count++;
        System.out.println("ENQUEUE: "+ data);
        display();
    }

    public int dequeue(){
        if(isEmpty()){
            System.out.println("Queue is empty");
            return -1;
        }

        Node temp = front;
        front = front.next;
        if(isEmpty()){
            rear = null;
        }
        count--;
        System.out.println("Dequeue: "+temp.data);
        display();
        return temp.data;
    }

    private void display(){
        if(isEmpty()){
            System.out.println("Queue is empty");
            return;
        }

        Node temp = front;
        System.out.println("Front");
        while(temp!=null){
            System.out.println("["+temp.data+"]");
            temp = temp.next;
        }
        System.out.println("REAR");

        System.out.println();
    }

    public int size(){
        return count;
    }

    public boolean isEmpty(){
        return front == null;
    }
}