export const hybridRetrievalData = {
  title: "Hybrid Retrieval Explained",
  description: "Hybrid retrieval (or hybrid search) combines the strengths of traditional keyword-based search (like BM25 or full-text search) and modern vector search to produce more accurate and relevant results. It provides a safety net, ensuring you get the best of both worlds.",
  learningPoints: [
    {
      title: "The Weakness of a Single Approach",
      description: "Vector search is excellent for understanding intent and concepts, but it can sometimes miss specific, out-of-vocabulary keywords (like product IDs, acronyms, or specific names). Keyword search is perfect for finding exact matches but fails to understand synonyms or conceptual relationships.",
      examples: [
          {
              description: "Query: 'Information on the 'Gemini-Flash-1.5' model'",
              code: `// Vector Search might return documents about "AI models" or "Gemini Pro", missing the exact model name if it's rare in the training data.
// Keyword Search will find the exact string "Gemini-Flash-1.5" perfectly but will miss a document that says "the latest fast model from Google's Gemini family".`
          }
      ]
    },
    {
      title: "How Hybrid Retrieval Works",
      description: "It's simple: you run two queries in parallel—one against a keyword index and one against a vector index. Then, you take both sets of results and merge them using a scoring algorithm to produce a single, reranked list of the most relevant documents.",
      examples: []
    },
    {
      title: "The Merging & Reranking Step",
      description: "Combining the results is a crucial step. A common technique is Reciprocal Rank Fusion (RRF), which looks at the rank (position) of each document in both result sets and calculates a combined score. This way, documents that rank highly in either search method are boosted to the top of the final list.",
      examples: [
        {
          description: "Conceptual representation of the process.",
          code: `const query = "Information on the 'Gemini-Flash-1.5' model";

// 1. Execute both searches simultaneously
const keywordResults = keyword_search(query); // -> [doc_C, doc_A]
const vectorResults = vector_search(query);   // -> [doc_B, doc_A]

// 2. Fuse the results
// RRF algorithm combines the two lists based on rank.
// doc_A appears in both, so it gets a higher score.
// doc_B and doc_C are also included.
const finalResults = reciprocal_rank_fusion(keywordResults, vectorResults);

// 3. Return the combined, superior list of results
// -> [doc_A, doc_C, doc_B] (example order)`
        }
      ]
    }
  ]
};
