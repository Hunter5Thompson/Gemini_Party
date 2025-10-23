export const dsAlgoData = {
  title: "Data Structures & Algorithms Explained",
  description: "A strong foundation in Data Structures and Algorithms is critical for writing efficient and optimized code. Below is a visual and conceptual overview of the most important topics.",
  learningPoints: [
    {
      id: "bigO",
      title: "Big O Notation",
      description: "Big O notation is used to describe the performance or complexity of an algorithm. It specifically describes the worst-case scenario, and can be used to describe the execution time required or the space used (e.g., in memory or on disk) by an algorithm.",
      visualization: { type: 'graph', data: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)'] },
      pros: ["Standardized method for comparing algorithm efficiency.", "Helps identify performance bottlenecks.", "Abstracts away machine-specific details."],
      cons: ["Focuses on the worst-case, which may not be representative.", "Ignores constants and lower-order terms which can matter in practice."],
      youtubeLink: "https://www.youtube.com/watch?v=__vX2sjlpXU",
      bigO: { "Constant": "O(1)", "Logarithmic": "O(log n)", "Linear": "O(n)", "Quadratic": "O(n²)", "Exponential": "O(2ⁿ)"}
    },
    {
      id: "array",
      title: "Arrays",
      description: "An array is a collection of items stored at contiguous memory locations. It's the simplest data structure where each element can be randomly accessed using its index number. A 2D array (or matrix) is an array of arrays.",
      visualization: { type: 'array', data: [12, 4, 33, 29, 8] },
      pros: ["Fast, O(1) random access.", "Cache friendly due to contiguous memory."],
      cons: ["Fixed size.", "Slow, O(n) insertion and deletion in the middle."],
      youtubeLink: "https://www.youtube.com/watch?v=p-nI3_kze_s",
      bigO: { "Access": "O(1)", "Search": "O(n)", "Insertion": "O(n)", "Deletion": "O(n)"}
    },
    {
      id: "linkedlist",
      title: "Linked Lists",
      description: "A linked list is a linear data structure where elements are not stored at contiguous memory locations. The elements are linked using pointers. Each element (node) consists of data and a pointer to the next node.",
      visualization: { type: 'linked-list', data: [12, 99, 37] },
      pros: ["Dynamic size.", "Efficient, O(1) insertion and deletion at ends."],
      cons: ["Slow, O(n) random access and search.", "Requires extra memory for pointers."],
      youtubeLink: "https://www.youtube.com/watch?v=F8AbOfQwl1c",
      bigO: { "Access": "O(n)", "Search": "O(n)", "Insertion": "O(1)", "Deletion": "O(1)"}
    },
    {
      id: "stack",
      title: "Stacks",
      description: "A stack is a linear data structure that follows a particular order in which the operations are performed. The order is LIFO (Last In, First Out). Think of it as a stack of plates.",
      visualization: { type: 'stack', data: [10, 20, 30] },
      pros: ["Helps manage function calls (call stack).", "Simple to implement.", "Fast operations."],
      cons: ["Limited in functionality.", "Not suitable for all problems."],
      youtubeLink: "https://www.youtube.com/watch?v=I--T_m_L4ZU",
      bigO: { "Access": "O(n)", "Search": "O(n)", "Insertion": "O(1)", "Deletion": "O(1)"}
    },
    {
      id: "queue",
      title: "Queues",
      description: "A queue is a linear data structure that follows a particular order in which the operations are performed. The order is FIFO (First In, First Out). Think of it as a checkout line.",
      visualization: { type: 'queue', data: [10, 20, 30] },
      pros: ["Useful in scenarios requiring ordered processing.", "Simple to implement."],
      cons: ["Standard implementation has O(n) deletion if using an array."],
      youtubeLink: "https://www.youtube.com/watch?v=8_g0_p-22_w",
      bigO: { "Access": "O(n)", "Search": "O(n)", "Insertion": "O(1)", "Deletion": "O(1)"}
    },
    {
      id: "hashmap",
      title: "Hash Maps (Dictionaries)",
      description: "A Hash Map (or Hash Table) is a data structure that stores key-value pairs. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.",
      visualization: { type: 'hashmap', data: [{key: '"name"', value: '"Alice"'}, {key: '"age"', value: '30'}] },
      pros: ["Very fast average case for insertion, deletion, and search.", "Flexible keys."],
      cons: ["Worst-case performance is O(n).", "No ordered iteration.", "Can be memory intensive."],
      youtubeLink: "https://www.youtube.com/watch?v=RlgcY_Al-4g",
      bigO: { "Access": "O(1) Avg", "Search": "O(1) Avg", "Insertion": "O(1) Avg", "Deletion": "O(1) Avg"}
    },
    {
      id: "tree",
      title: "Trees",
      description: "A tree is a hierarchical data structure that consists of nodes connected by edges. Each tree has a root node, and every node (excluding the root) is connected to exactly one parent node.",
      visualization: { type: 'tree', data: {} },
      pros: ["Reflects structural relationships.", "Efficient for searching (in balanced trees).", "Moderate access/insertion speed."],
      cons: ["Performance degrades in unbalanced trees.", "Complex to implement and maintain."],
      youtubeLink: "https://www.youtube.com/watch?v=oSWTXtMglKE",
      bigO: { "Access": "O(log n)", "Search": "O(log n)", "Insertion": "O(log n)", "Deletion": "O(log n)"}
    },
    {
        id: "bst",
        title: "Binary Search Trees (BST)",
        description: "A Binary Search Tree is a special type of tree where for each node, all values in its left subtree are less than its value, and all values in its right subtree are greater. This property allows for efficient searching.",
        visualization: { type: 'tree', data: {} },
        pros: ["Keeps keys in sorted order.", "Efficient search, insertion, and deletion on average."],
        cons: ["Can become unbalanced, leading to O(n) performance.", "Requires careful implementation to maintain balance."],
        youtubeLink: "https://www.youtube.com/watch?v=pYT9F8_LFTM",
        bigO: { "Access": "O(log n)", "Search": "O(log n)", "Insertion": "O(log n)", "Deletion": "O(log n)"}
    },
    {
        id: "heap",
        title: "Heaps",
        description: "A Heap is a special tree-based data structure that satisfies the heap property: in a max heap, for any given node C, if P is a parent of C, then the key of P is greater than or equal to the key of C. It's commonly used for implementing Priority Queues.",
        visualization: { type: 'tree', data: {} },
        pros: ["Efficiently find the min/max element (O(1)).", "Can be implemented efficiently using an array.", "Fast insertion and deletion."],
        cons: ["Searching for an arbitrary element is slow (O(n))."],
        youtubeLink: "https://www.youtube.com/watch?v=t0Cq6tVNRBA",
        bigO: { "Find Min/Max": "O(1)", "Search": "O(n)", "Insertion": "O(log n)", "Deletion": "O(log n)"}
    },
    {
        id: "trie",
        title: "Tries (Prefix Trees)",
        description: "A Trie, or prefix tree, is a tree-like data structure that proves to be very efficient for retrieving information in a dataset of strings. It's often used for autocomplete and spell-checker features.",
        visualization: { type: 'tree', data: {} },
        pros: ["Very fast for prefix-based searches (O(L) where L is key length).", "Can be used for sorting strings alphabetically."],
        cons: ["Can be very memory intensive.", "Not efficient for non-prefix searches."],
        youtubeLink: "https://www.youtube.com/watch?v=B5-D0flN-Qs",
        bigO: { "Search": "O(L)", "Insertion": "O(L)", "Deletion": "O(L)" }
    },
    {
      id: "graph",
      title: "Graphs",
      description: "A graph is a non-linear data structure consisting of nodes (or vertices) and edges that connect them. Graphs are used to model networks, such as social networks, maps, and the internet.",
      visualization: { type: 'graph', data: {} },
      pros: ["Can model complex real-world relationships.", "Many well-studied algorithms exist for graph problems."],
      cons: ["Can be complex to implement and manage.", "Some algorithms are very slow (e.g., exponential)."],
      youtubeLink: "https://www.youtube.com/watch?v=cWNEl4HE2OE",
      bigO: { "Storage": "O(V+E)", "Add Vertex": "O(1)", "Add Edge": "O(1)", "Search": "O(V+E)"}
    },
    {
        id: "unionfind",
        title: "Union-Find (Disjoint Set)",
        description: "A Union-Find (or Disjoint Set Union) data structure keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets. It provides two main operations: `find` (determine which subset an element is in) and `union` (join two subsets).",
        visualization: { type: 'union-find', data: [0, 1, 2, 3, 4] },
        pros: ["Extremely fast operations (nearly constant time on average).", "Perfect for dynamic connectivity problems (e.g., cycle detection in graphs)."],
        cons: ["Very specialized use case.", "Does not store the elements of the sets themselves."],
        youtubeLink: "https://www.youtube.com/watch?v=wU6udHRIkcc",
        bigO: { "Find": "O(α(n))", "Union": "O(α(n))", "Make Set": "O(1)"}
    }
  ]
};