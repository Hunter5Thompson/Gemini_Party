export const step5Data = {
  "MCP": {
    title: "Multi-Candidate Prompting (MCP)",
    description: "Multi-Candidate Prompting (also known as Multi-Path Prompting) is an advanced technique where an LLM is prompted to generate several different lines of reasoning or answers to a single query. A subsequent step then evaluates these candidates to select or synthesize the best response, often leading to more robust and accurate results.",
    learningPoints: [
        {
            title: "Why Use MCP?",
            description: "For complex problems, an LLM's first line of thought isn't always the best. By forcing the model to explore multiple perspectives or reasoning chains, you increase the probability of finding a correct and well-reasoned path. This is especially useful for reducing bias and enhancing creativity for open-ended questions.",
            examples: []
        },
        {
            title: "Conceptual Workflow",
            description: "The process typically involves two LLM calls: one for generation of candidates, and one for evaluation.",
            examples: [
                {
                    description: "1. Generation Prompt: Generate 3 different lines of reasoning.",
                    code: `const userQuery = "Should our company invest in AI-powered customer service?";

const generationPrompt = \`
Question: \${userQuery}

Generate 3 distinct perspectives on this topic. Each perspective should outline the pros and cons.
Perspective 1: ...
Perspective 2: ...
Perspective 3: ...
\`;

// In a real app, you might request num_responses > 1
const candidateResponses = await llm.generate(generationPrompt);`
                },
                {
                    description: "2. Evaluation Prompt: Select the most balanced answer.",
                    code: `const evaluationPrompt = \`
Here are 3 distinct perspectives on investing in AI-powered customer service:
<perspectives>
\${candidateResponses}
</perspectives>

Analyze these perspectives and synthesize a final, balanced recommendation for a CTO.
\`;

const finalAnswer = await llm.generate(evaluationPrompt);`
                }
            ]
        }
    ]
  },
  "Reranking": {
    title: "Advanced Reranking",
    description: "While simple reranking improves initial retrieval results, advanced techniques use more sophisticated models like cross-encoders or even trainable Learning-to-Rank (LTR) models to achieve even higher relevance. This is a critical step to ensure the context provided to the LLM is of the highest quality.",
    learningPoints: [
        {
            title: "Cross-Encoders in Detail",
            description: "As mentioned in Step 4, cross-encoders process a query and a document simultaneously. This joint processing allows the model to deeply understand the interactions between the words, leading to a much more accurate relevance score than bi-encoders. The trade-off is higher latency, which is why they are only used on a small number of top candidates.",
            examples: []
        },
        {
            title: "Learning-to-Rank (LTR)",
            description: "For ultimate performance, you can train an LTR model. This involves training a model (often based on gradient boosting, like XGBoost) on human-judged data. The features for this model can be relevance scores from multiple sources (BM25, vector similarity, cross-encoder score) and other metadata. The LTR model learns how to optimally combine these signals to rank results according to human preference.",
            examples: [
                {
                    description: "Conceptual training process for LTR.",
                    code: `// 1. Collect data: For a given query, humans rate a list of documents (e.g., 0=irrelevant, 1=relevant, 2=perfect).
// [
//   { query: "What is RAG?", doc_id: "doc123", bm25_score: 0.8, vector_score: 0.9, relevance_label: 2 },
//   { query: "What is RAG?", doc_id: "doc456", bm25_score: 0.9, vector_score: 0.7, relevance_label: 1 }
// ]

// 2. Train model: Train a model to predict the 'relevance_label' based on the feature scores.
const ltr_model = train_ltr_model(training_data);

// 3. Inference time: Use the trained model to determine the final ranking.
const final_ranked_docs = ltr_model.predict(retrieved_candidates);`
                }
            ]
        }
    ]
  },
  "Data preparation": {
    title: "Data Preparation for RAG",
    description: "The quality of your RAG system is directly determined by the quality of your knowledge base. A robust data preparation pipeline is essential. This goes beyond simple chunking and embedding to include cleaning, structuring, and optimizing your source data.",
    learningPoints: [
        {
            title: "Source Connectors and Cleaning",
            description: "The first step is to load data from various sources (like Notion, Slack, Confluence, or websites). Once loaded, you need to clean it: remove unnecessary HTML, JavaScript, boilerplate text (like headers and footers), and correct formatting errors. This ensures the vector embeddings are based on the actual content.",
            examples: []
        },
        {
            title: "Advanced Chunking Strategies",
            description: "Instead of using fixed-size chunks, consider more advanced methods:",
            examples: [
                {
                    description: "- **Semantic Chunking:** Split the text based on semantic breaks, e.g., when the topic changes. This can be done by analyzing the embedding similarity between consecutive sentences.",
                    code: `// Conceptually: If the vector distance between sentence 5 and sentence 6 exceeds a threshold, start a new chunk.`
                },
                {
                    description: "- **Agentic Chunking:** Use an LLM to go through the document and decide where the optimal chunk boundaries are, often by generating question-answer pairs for each potential chunk.",
                    code: `// Conceptually: Prompt an LLM: "Summarize this paragraph in one sentence. Then, create a question that this paragraph answers." Store the QA pair with the chunk.`
                }
            ]
        },
        {
            title: "Embedding Model Selection",
            description: "Not all embedding models are created equal. Some are optimized for short queries, others for long documents. Experiment with different models and evaluate which provides the best retrieval results for your specific dataset. This is a critical optimization step.",
            examples: []
        }
    ]
  },
  "Multi-step retrieval": {
    title: "Multi-Step Retrieval",
    description: "Complex user questions often cannot be answered with a single retrieval action. Multi-step retrieval breaks a complex question down into a series of simpler sub-questions, performs a retrieval action for each, and synthesizes the results to provide a comprehensive answer.",
    learningPoints: [
        {
            title: "When is it Needed?",
            description: "Consider a question like: 'Compare the RAG features in the latest versions of LlamaIndex and LangChain.' A single vector search will likely fail here. A multi-step approach is required.",
            examples: []
        },
        {
            title: "The Agentic Approach",
            description: "An LLM agent can orchestrate this process. It decomposes the main question into a plan, then executes tools (in this case, the retrieval tool) to carry out the plan.",
            examples: [
                {
                    description: "A conceptual plan generated by an LLM agent.",
                    code: `// Main question: "Compare RAG features in latest LlamaIndex and LangChain."

// Agent-generated plan:
// 1. Find information on RAG features in the latest version of LlamaIndex.
//    - Tool Call: retrieve("latest LlamaIndex RAG features") -> [Context A, Context B]
// 2. Find information on RAG features in the latest version of LangChain.
//    - Tool Call: retrieve("latest LangChain RAG features") -> [Context C, Context D]
// 3. Synthesize the retrieved information to compare the two frameworks and answer the original question.
//    - Tool Call: llm_generate("Context: [A, B, C, D]. Question: Compare the RAG features...")`
                }
            ]
        }
    ]
  },
  "Data retrieval and generation": {
    title: "Retrieval and Generation Pipelines",
    description: "Building a robust RAG application means connecting all the individual components—retrieval, reranking, context formatting, and generation—into a coherent pipeline. Understanding this end-to-end flow is crucial for debugging and optimization.",
    learningPoints: [
        {
            title: "The Full Architecture",
            description: "A typical RAG pipeline looks like this:",
            examples: [
                {
                    description: "A schematic overview of the data flow.",
                    code: `User Query
     |
     v
[Retriever] -> Fetches top-K documents (e.g., 50 candidates)
     |
     v
[Reranker] -> Reorders the 50 candidates and selects top-N (e.g., 5)
     |
     v
[Context Formatter] -> Formats the 5 documents into a clean context string
     |
     v
[LLM Generator] -> Combines context and original query into a prompt
     |
     v
Final Answer`
                }
            ]
        },
        {
            title: "The Importance of Context Formatting",
            description: "The 'Context Formatter' step is subtle but important. How you present the retrieved documents in the prompt can significantly impact the LLM's ability to use them. Use clear separators, add metadata like document titles, and ensure the format is easy for the LLM to parse.",
            examples: []
        },
        {
          title: "Putting It All Together: A Code Walkthrough",
          description: "Here is a detailed, step-by-step pseudo-code example illustrating how all the components of a RAG pipeline work together to answer a user's query.",
          examples: [
              {
                  description: "This function simulates the entire RAG flow, from retrieval to final generation.",
                  code: `import { GoogleGenAI } from "@google/genai";

// --- Mock Components (In a real app, these would be complex services) ---

// A mock retriever that returns a list of document chunks.
async function retrieve(query, topK) {
  console.log(\`1. Retrieving top \${topK} docs for: "\${query}"\`);
  // Returns more candidates than needed for the final context.
  return [
    { id: "doc3", text: "Reranking uses a cross-encoder model for accuracy." },
    { id: "doc1", text: "RAG combines retrieval with generation." },
    { id: "doc5", text: "A vector database stores text embeddings." },
    // ... and 47 other documents
  ];
}

// A mock reranker that re-orders the retrieved documents.
async function rerank(query, documents, topN) {
  console.log(\`2. Reranking \${documents.length} docs to find top \${topN}...\`);
  // In a real system, this would use a more powerful model.
  // For this example, we'll just pretend to re-order them.
  return [
    { id: "doc1", text: "RAG combines retrieval with generation.", score: 0.95 },
    { id: "doc3", text: "Reranking uses a cross-encoder model for accuracy.", score: 0.92 },
  ];
}

// --- Main RAG Pipeline ---

async function answerQuery(query) {
  // 1. Retrieve a large number of candidate documents.
  const retrievedDocs = await retrieve(query, 50);

  // 2. Rerank the candidates to find the most relevant ones.
  const rerankedDocs = await rerank(query, retrievedDocs, 2);
  console.log("3. Top reranked documents selected.");

  // 3. Format the top documents into a context string.
  const context = rerankedDocs
    .map((doc, index) => \`Context \${index + 1}: \${doc.text}\`)
    .join("\\n\\n");
  console.log("4. Formatted context for the LLM.");

  // 4. Augment the prompt with the retrieved context.
  const augmentedPrompt = \`
You are an expert Q&A system. Use the following context to answer the user's question.
If the context doesn't contain the answer, state that you don't know.

---
CONTEXT:
\${context}
---

QUESTION:
\${query}
\`;
  console.log("5. Augmented prompt created.");

  // 5. Generate the final answer using the LLM.
  console.log("6. Sending prompt to Gemini...");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: augmentedPrompt,
  });

  return response.text;
}

// --- Execute the pipeline ---
// const finalAnswer = await answerQuery("What is RAG?");
// console.log("\\n--- FINAL ANSWER ---\\n", finalAnswer);`
              }
          ]
      }
    ]
  },
  "LLM Orchestration Frameworks": {
    title: "LLM Orchestration Frameworks",
    description: "Frameworks like LangChain, LlamaIndex, and Haystack are indispensable tools for managing the complexity of building LLM applications. They provide abstractions and pre-built components for everything from data ingestion and retrieval to complex agentic workflows.",
    learningPoints: [
        {
            title: "Why Use a Framework?",
            description: "Instead of implementing every component (retrievers, rerankers, LLM calls) from scratch, these frameworks provide standardized, composable building blocks. This significantly speeds up development, promotes best practices, and makes your code more modular and maintainable.",
            examples: []
        },
        {
            title: "Example: LangChain Expression Language (LCEL)",
            description: "LCEL provides an elegant, declarative way to define complex chains. The pipe (`|`) syntax allows you to chain components together in a way that is both readable and efficient, with built-in support for streaming and parallel execution.",
            examples: [
                {
                    description: "A simple RAG chain defined using LCEL. This abstracts the entire workflow described in 'Retrieval and Generation Pipelines' into a few lines of code.",
                    code: `// Assuming 'retriever', 'prompt_template', and 'llm' are already configured.

// Create the chain using the pipe syntax
const rag_chain = retriever
  .pipe(format_docs_for_context)
  .pipe(prompt_template)
  .pipe(llm)
  .pipe(output_parser);

// Execute the entire RAG pipeline with a single call
const answer = await rag_chain.invoke("What is Multi-Step Retrieval?");`
                }
            ]
        },
        {
            title: "LlamaIndex: Data Framework for LLMs",
            description: "While LangChain focuses on the orchestration of chains, LlamaIndex excels at its advanced data indexing and retrieval capabilities. It provides a wide array of connectors, sophisticated indexing strategies, and query engines optimized for complex RAG use cases.",
            examples: []
        }
    ]
  }
};
