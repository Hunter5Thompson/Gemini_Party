export const indexingStrategiesData = {
  title: "Indexing Strategies (HNSW, IVF) Explained",
  description: "Searching through millions or billions of vectors one-by-one (brute-force) is computationally impossible for real-time applications. Vector databases use clever indexing strategies based on Approximate Nearest Neighbor (ANN) algorithms to find 'good enough' matches incredibly fast.",
  learningPoints: [
    {
      title: "The Trade-off: Speed vs. Accuracy",
      description: "ANN algorithms trade perfect accuracy for immense speed. They might not find the absolute closest vector every single time, but they will find an extremely close neighbor in a fraction of the time. For RAG, this is a perfect trade-off, as a 'very relevant' document is just as good as the 'most relevant' one.",
      examples: []
    },
    {
      title: "IVF (Inverted File Index)",
      description: "IVF works by first clustering all the vectors in your database into partitions. When a query comes in, the algorithm first determines which cluster(s) the query vector is closest to. Then, it performs an exhaustive search *only* within those few selected clusters, ignoring the rest of the database. This dramatically reduces the search space.",
      examples: [
        {
          description: "Think of it like searching for a book in a library. Instead of checking every book (brute-force), you first go to the correct section (the cluster), then search just the shelves in that section.",
          code: `// Conceptual flow for IVF
// 1. Pre-computation: Group all vectors into 1000 clusters.
// 2. Query Time:
const queryVector = getEmbedding("my query");
// 3. Find the 5 clusters closest to the query vector.
const closestClusters = find_closest_clusters(queryVector, allClusters);
// 4. Search ONLY the vectors within those 5 clusters.
const results = brute_force_search(queryVector, closestClusters);`
        }
      ]
    },
    {
      title: "HNSW (Hierarchical Navigable Small World)",
      description: "HNSW builds a multi-layered graph structure over your data vectors. The top layers have very few connections, acting like an express highway system, while the bottom layers have many connections, like local streets. A search starts at a random point in the top layer, quickly navigates across the 'highways' to get to the right neighborhood, and then moves down to the 'local streets' to find the precise nearest neighbors.",
      examples: [
        {
          description: "This hierarchical approach is extremely fast and memory-efficient, making HNSW one of the most popular and highest-performing ANN algorithms in use today.",
          code: `// Conceptual flow for HNSW
// 1. Pre-computation: Build a multi-layer graph connecting all vectors.
// 2. Query Time:
const queryVector = getEmbedding("my query");
// 3. Enter the graph at the top layer (the 'highway').
let currentNode = get_entry_point(graph.layer_top);
// 4. Navigate through layers, getting progressively closer.
for (layer in graph.descending_layers) {
  currentNode = search_layer(queryVector, currentNode, layer);
}
// 5. The final currentNode is the nearest neighbor.
const results = currentNode;`
        }
      ]
    }
  ]
};
