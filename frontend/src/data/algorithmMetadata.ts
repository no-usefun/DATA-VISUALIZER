export type AlgorithmMetadata = {
  name: string;
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
  code: string;
};

export const algorithmMetadata: Record<string, AlgorithmMetadata> = {
  bubbleSort: {
    name: "Bubble Sort",
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: "O(1)",
    code: `void bubbleSort(int arr[], int n) {
    
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;

        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }

        if (!swapped) break;
    }
}`,
  },

  selectionSort: {
    name: "Selection Sort",
    time: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: "O(1)",
    code: `void selectionSort(int arr[], int n) {
    
    for (int i = 0; i < n - 1; i++) {

        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        swap(arr[i], arr[minIndex]);
    }
}`,
  },

  insertionSort: {
    name: "Insertion Sort",
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: "O(1)",
    code: `void insertionSort(int arr[], int n) {
    
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}`,
  },

  mergeSort: {
    name: "Merge Sort",
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    space: "O(n)",
    code: `void merge(int arr[], int left, int mid, int right) {

    int n1 = mid - left + 1;
    int n2 = right - mid;

    int L[n1], R[n2];

    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];

    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(int arr[], int left, int right) {

    if (left < right) {

        int mid = left + (right - left) / 2;

        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);

        merge(arr, left, mid, right);
    }
}`,
  },

  quickSort: {
    name: "Quick Sort",
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    space: "O(log n)",
    code: `int partition(int arr[], int low, int high) {

    int pivot = arr[high];
    int i = low;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            swap(arr[i], arr[j]);
            i++;
        }
    }

    swap(arr[i], arr[high]);
    return i;
}

void quickSort(int arr[], int low, int high) {

    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}`,
  },

  heapSort: {
    name: "Heap Sort",
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    space: "O(1)",
    code: `void heapify(int arr[], int n, int i) {

    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {

    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
  },

  linearSearch: {
    name: "Linear Search",
    time: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(1)",
    code: `int linearSearch(int arr[], int n, int target) {

    for (int i = 0; i < n; i++) {

        if (arr[i] == target) {
            return i;
        }

    }

    return -1;
}`,
  },

  binarySearch: {
    name: "Binary Search",
    time: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    space: "O(1)",
    code: `int binarySearch(int arr[], int n, int target) {

    int left = 0;
    int right = n - 1;

    while (left <= right) {

        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid;
        }

        if (arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }

    }

    return -1;
}`,
  },

  preorderTraversal: {
    name: "Preorder Traversal",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(h)",
    code: `void preorder(Node node) {
    if (node == null) return;

    visit(node);
    preorder(node.left);
    preorder(node.right);
}`,
  },

  inorderTraversal: {
    name: "Inorder Traversal",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(h)",
    code: `void inorder(Node node) {
    if (node == null) return;

    inorder(node.left);
    visit(node);
    inorder(node.right);
}`,
  },

  postorderTraversal: {
    name: "Postorder Traversal",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(h)",
    code: `void postorder(Node node) {
    if (node == null) return;

    postorder(node.left);
    postorder(node.right);
    visit(node);
}`,
  },

  levelOrderTraversal: {
    name: "Level Order Traversal",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(n)",
    code: `void levelOrder(Node root) {
    if (root == null) return;

    Queue<Node> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        Node node = queue.poll();
        visit(node);

        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
    }
}`,
  },

  verticalOrderTraversal: {
    name: "Vertical Order Traversal",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(n)",
    code: `List<Integer> verticalOrder(Node root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;

    Map<Integer, List<Integer>> columns = new TreeMap<>();
    Queue<Pair<Node, Integer>> queue = new LinkedList<>();
    queue.offer(new Pair<>(root, 0));

    while (!queue.isEmpty()) {
        Pair<Node, Integer> entry = queue.poll();
        Node node = entry.first;
        int hd = entry.second;

        columns.computeIfAbsent(hd, key -> new ArrayList<>()).add(node.value);

        if (node.left != null) queue.offer(new Pair<>(node.left, hd - 1));
        if (node.right != null) queue.offer(new Pair<>(node.right, hd + 1));
    }

    for (List<Integer> column : columns.values()) {
        result.addAll(column);
    }

    return result;
}`,
  },

  bfsTraversal: {
    name: "Breadth First Search (BFS)",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(n)",
    code: `void bfs(Node root) {
    if (root == null) return;

    Queue<Node> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        Node node = queue.poll();
        visit(node);

        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
    }
}`,
  },

  dfsTraversal: {
    name: "Depth First Search (DFS)",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(h)",
    code: `void dfs(Node node) {
    if (node == null) return;

    visit(node);
    dfs(node.left);
    dfs(node.right);
}`,
  },

  leftView: {
    name: "Left View",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(n)",
    code: `List<Integer> leftView(Node root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;

    Queue<Node> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int size = queue.size();

        for (int i = 0; i < size; i++) {
            Node node = queue.poll();
            if (i == 0) result.add(node.value);

            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
    }

    return result;
}`,
  },

  rightView: {
    name: "Right View",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(n)",
    code: `List<Integer> rightView(Node root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;

    Queue<Node> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int size = queue.size();

        for (int i = 0; i < size; i++) {
            Node node = queue.poll();
            if (i == size - 1) result.add(node.value);

            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
    }

    return result;
}`,
  },

  topView: {
    name: "Top View",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(n)",
    code: `List<Integer> topView(Node root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;

    Map<Integer, Integer> firstAtDistance = new TreeMap<>();
    Queue<Pair<Node, Integer>> queue = new LinkedList<>();
    queue.offer(new Pair<>(root, 0));

    while (!queue.isEmpty()) {
        Pair<Node, Integer> entry = queue.poll();
        Node node = entry.first;
        int hd = entry.second;

        firstAtDistance.putIfAbsent(hd, node.value);

        if (node.left != null) queue.offer(new Pair<>(node.left, hd - 1));
        if (node.right != null) queue.offer(new Pair<>(node.right, hd + 1));
    }

    return new ArrayList<>(firstAtDistance.values());
}`,
  },

  bottomView: {
    name: "Bottom View",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(n)",
    code: `List<Integer> bottomView(Node root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;

    Map<Integer, Integer> lastAtDistance = new TreeMap<>();
    Queue<Pair<Node, Integer>> queue = new LinkedList<>();
    queue.offer(new Pair<>(root, 0));

    while (!queue.isEmpty()) {
        Pair<Node, Integer> entry = queue.poll();
        Node node = entry.first;
        int hd = entry.second;

        lastAtDistance.put(hd, node.value);

        if (node.left != null) queue.offer(new Pair<>(node.left, hd - 1));
        if (node.right != null) queue.offer(new Pair<>(node.right, hd + 1));
    }

    return new ArrayList<>(lastAtDistance.values());
}`,
  },

  heapTreeSort: {
    name: "Heap Sort",
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    space: "O(1)",
    code: `void heapSort(int values[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(values, n, i);
    }

    for (int end = n - 1; end > 0; end--) {
        swap(values[0], values[end]);
        heapify(values, end, 0);
    }
}

void heapify(int values[], int size, int root) {
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;

    if (left < size && values[left] > values[largest]) largest = left;
    if (right < size && values[right] > values[largest]) largest = right;

    if (largest != root) {
        swap(values[root], values[largest]);
        heapify(values, size, largest);
    }
}`,
  },

  maxHeapTree: {
    name: "Max Heap",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(1)",
    code: `void buildMaxHeap(int values[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) {
        maxHeapify(values, n, i);
    }
}

void maxHeapify(int values[], int size, int root) {
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;

    if (left < size && values[left] > values[largest]) largest = left;
    if (right < size && values[right] > values[largest]) largest = right;

    if (largest != root) {
        swap(values[root], values[largest]);
        maxHeapify(values, size, largest);
    }
}`,
  },

  minHeapTree: {
    name: "Min Heap",
    time: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(1)",
    code: `void buildMinHeap(int values[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) {
        minHeapify(values, n, i);
    }
}

void minHeapify(int values[], int size, int root) {
    int smallest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;

    if (left < size && values[left] < values[smallest]) smallest = left;
    if (right < size && values[right] < values[smallest]) smallest = right;

    if (smallest != root) {
        swap(values[root], values[smallest]);
        minHeapify(values, size, smallest);
    }
}`,
  },
};
