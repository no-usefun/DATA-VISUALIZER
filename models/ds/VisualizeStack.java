class VisualizeStack {
    private class Node{
        int data;
        Node next;
    
        Node(int data){
            this.data = data;
            this.next = null;
        }
    }

    private Node top = null;

    public void push(int data) {
        Node newNode = new Node(data);
        if (isEmpty()) {
            top = newNode;
        } else {
            newNode.next = top;
            top = newNode;
        }

        System.out.println("PUSH: " + data);
        display(); 
    }

    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return -1;
        }
        int poppedData = top.data;
        top = top.next;
        System.out.println("POP: "+poppedData);
        display();
        return poppedData;
    }

    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return -1;
        }
        return top.data;
    }

    public boolean isEmpty() {
        return top == null;
    }

    private void display() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return;
        }
        Node current = top;
        System.out.println("TOP");
        while (current != null) {
            System.out.println("["+current.data + "]");
            current = current.next;
        }
        System.out.println();
    }

    public int size(){
        int count = 0;
        Node temp = top;
        while(temp!=null){
            count++;
            temp = temp.next;
        }

        return count;
    }
}