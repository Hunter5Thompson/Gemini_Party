export const rerankingPipelinesData = {
  title: "Reranking Pipelines Explained",
  description: "The initial retrieval step in a RAG system is designed for speed and breadth. It quickly fetches a set of potentially relevant documents (e.g., the top 50). A reranking step then uses a more computationally expensive but accurate model to re-order just this small set of candidates, pushing the absolute best matches to the top.",
  learningPoints: [
    {
      title: "The Two-Stage Search Process",
      description: "This retrieve-then-rerank architecture is very common in modern search systems. Stage 1 (Retrieval) casts a wide net to ensure the relevant document is likely captured. Stage 2 (Reranking) provides the precision, carefully analyzing the candidates to find the best fit.",
      examples: []
    },
    {
      title: "How Rerankers Work: Cross-Encoders",
      description: "Most rerankers use a type of model called a 'cross-encoder'. Unlike standard embedding models (bi-encoders) that process the query and document separately, a cross-encoder looks at the query and a document *at the same time*. This allows it to pay much closer attention to the nuanced relationship between them, resulting in a more accurate relevance score.",
      examples: [
        {
          description: "A bi-encoder creates embeddings independently. A cross-encoder reads both texts together for a direct comparison.",
          code: `// Bi-Encoder (Fast, for initial retrieval)
query_vector = model.encode(query)
doc_vector = model.encode(document)
score = cosine_similarity(query_vector, doc_vector)

// Cross-Encoder (Slower, for reranking)
// The model processes both texts in a single input.
score = cross_encoder_model.predict(query, document) // -> Outputs a single relevance score`
        }
      ]
    },
    {
      title: "Building the Pipeline",
      description: "By combining these pieces, you create a powerful and efficient system. The fast bi-encoder filters millions of documents down to a few dozen, and the slow but accurate cross-encoder precisely orders those few, ensuring the context provided to the LLM is of the highest possible quality.",
      examples: [
        {
          description: "Conceptual code for a full RAG pipeline with reranking.",
          code: `const query = "What are the benefits of reranking?";

// 1. Retrieve initial candidates (e.g., top 50) from the vector DB.
const candidates = vector_db.search(query, top_k=50);

// 2. Use a cross-encoder to rerank the candidates.
const reranked_candidates = reranker.rerank(query, candidates);

// 3. Select the top N reranked results to use as context.
const top_context = reranked_candidates.slice(0, 5);

// 4. Generate the final answer with the high-quality context.
const final_answer = generate_with_llm(query, top_context);`
        }
      ]
    }
  ]
};
