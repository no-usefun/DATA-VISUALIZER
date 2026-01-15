class VisualizeDeque{
    class Node{
        int data;
        Node next;
        Node prev;

        Node(int data){
            this.data = data;
            this.prev = null;
            this.next = null;
        }
    }

    private Node front = null;
    private Node rear = null;

    public void addBack(int data){
        Node newNode = new Node(data);

        if(isEmpty()){
            front = newNode;
            rear = newNode;
        } else{
            newNode.prev = rear;
            rear.next = newNode;
            rear = newNode;
        }

        System.out.println("Added in Back: "+data);
        display();
    }

    public void addFront(int data){
        Node newNode = new Node(data);

        if(isEmpty()){
            front = newNode;
            rear = newNode;
        } else{
            front.prev = newNode;
            newNode.next = front;
            front = newNode;
        }
        System.out.println("Added in Front: "+data);
        display();
    }

    public int removeFront(){
        if(isEmpty()){
            System.out.println("Deque is empty");
            return -1;
        }

        Node temp = front;
        if(front==rear){
            front = null;
            rear = null;
        } else{
            front.next.prev= null;
            front = front.next;
        }

        System.out.println("Removed from front: "+ temp.data);
        display();
        return temp.data;
    }

    public int removeBack(){
        if(isEmpty()){
            System.out.println("Deque is empty");
            return -1;
        }

        Node temp = rear;
        if(rear==front){
            rear = null;
            front = null;
        } else{
            rear.prev.next = null;
            rear = rear.prev;
        }
        System.out.println("Removed from back: "+ temp.data);
        display();
        return temp.data;
    }

    public boolean isEmpty(){
        return front == null && rear == null;
    }

    private void display(){
        if(isEmpty()){
            System.out.println("Deque is empty");
            return;
        }
        Node temp = front;
        System.out.println("FRONT");
        while(temp!=null){
            System.out.println("["+temp.data+"]");
            temp=temp.next;
        }
        System.out.println("REAR");
    }
}