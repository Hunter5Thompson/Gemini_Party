export const vectorDatabasesData = {
  title: "Vector Databases Explained",
  description: "A vector database is a specialized database designed to store, manage, and search high-dimensional vectors. In the context of AI, these vectors are 'embeddings'—numerical representations of text, images, or other data. They are the core infrastructure that powers semantic search, recommendation engines, and Retrieval-Augmented Generation (RAG).",
  learningPoints: [
    {
      title: "What is a Vector Embedding?",
      description: "An embedding is a list of numbers (a vector) that captures the semantic meaning of a piece of data. An embedding model converts your raw data (like a text chunk) into this vector format. The key idea is that similar concepts will have vectors that are numerically close to each other.",
      examples: [
        {
          description: "Conceptually, an embedding model maps words or sentences to points in a high-dimensional space.",
          code: `// Text with similar meanings produce similar vectors
get_embedding("The cat sat on the mat.") -> [0.1, 0.8, 0.2, ...]
get_embedding("A feline was on the rug.") -> [0.12, 0.78, 0.21, ...]

// Text with a different meaning produces a very different vector
get_embedding("The stock market is up.") -> [0.9, 0.3, 0.6, ...]`
        }
      ]
    },
    {
      title: "How Do Vector Databases Work?",
      description: "Vector databases store these embedding vectors and use specialized algorithms (Approximate Nearest Neighbor - ANN) to find the 'closest' vectors to a given query vector. This is much more powerful than traditional keyword search because it finds results based on conceptual meaning, not just word overlap.",
      examples: []
    },
    {
      title: "The RAG Query Process",
      description: "The entire process for a RAG application looks like this:",
      examples: [
        {
          description: "1. The user's query is converted into a vector using the same embedding model.",
          code: `const userQuery = "What are the main types of felines?";
const queryVector = await getEmbedding(userQuery);`
        },
        {
            description: "2. The vector database searches its index to find the stored vectors that are most similar to the `queryVector`.",
            code: `// The database efficiently compares the queryVector against millions of
// stored vectors to find the top K closest matches.
const similarVectors = await vectorDB.search(queryVector, { topK: 5 });`
        },
        {
            description: "3. The original text chunks associated with those similar vectors are retrieved. This text is the context that will be provided to the LLM.",
            code: `// Retrieved context might include:
// ["The domestic cat is a small carnivorous mammal...", "Lions are large felines native to Africa..."]
const context = getOriginalTextFor(similarVectors);`
        }
      ]
    }
  ]
};
