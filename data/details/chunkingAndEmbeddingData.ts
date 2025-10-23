export const chunkingAndEmbeddingData = {
  title: "Chunking and Embedding Explained",
  description: "Before you can perform semantic search, your documents must be processed. This involves two critical steps: breaking large documents into smaller, meaningful 'chunks' (Chunking) and converting those chunks into numerical representations called 'embeddings' (Embedding).",
  learningPoints: [
    {
      title: "Why is Chunking Necessary?",
      description: "LLMs have a limited context window, meaning they can only process a certain amount of text at once. Furthermore, feeding an entire large document to an LLM to answer a small question is inefficient and can dilute the relevant information. Chunking solves this by creating focused, bite-sized pieces of content that can be precisely retrieved.",
      examples: [
        {
          description: "A common strategy is Recursive Character Splitting, which tries to split text on logical separators (like paragraphs, then sentences) to keep related content together.",
          code: `// Conceptual example of chunking a document
const document = "AI is transforming the world. It has many applications in healthcare and finance. The future of AI is bright.";

// Chunks might look like this:
const chunks = [
  "AI is transforming the world.",
  "It has many applications in healthcare and finance.",
  "The future of AI is bright."
];`
        }
      ]
    },
    {
      title: "What is an Embedding?",
      description: "An embedding is a vector (a list of numbers) that captures the semantic meaning of a piece of text. Text with similar meanings will have vectors that are close to each other in high-dimensional space. This is what enables 'semantic search'—searching for concepts, not just keywords.",
      examples: []
    },
    {
      title: "The Embedding Process",
      description: "You use a specialized embedding model to convert your text chunks into vectors. This is typically done by calling an API. The resulting vectors are then stored in a vector database for later retrieval.",
      examples: [
        {
          description: "While the Gemini API in the `@google/genai` library doesn't have a dedicated `embedContent` endpoint, the concept is fundamental. In a real application, you would use an embedding model provider for this step.",
          code: `// This is a conceptual example. The @google/genai library
// does not currently expose a direct embedding endpoint in this manner.
async function getEmbedding(text, embeddingModel) {
  // In a real scenario, you'd call a service like:
  // const response = await embeddingModel.embedContent(text);
  // return response.embedding;
  
  // For demonstration, we'll simulate a vector output.
  // The actual vector would have hundreds of dimensions.
  if (text.includes("AI")) {
    return [0.8, 0.1, 0.9, ...];
  } else {
    return [0.2, 0.7, 0.3, ...];
  }
}

const textChunk = "AI is transforming the world.";
const vector = await getEmbedding(textChunk, myEmbeddingModel);
// vector is now [0.8, 0.1, 0.9, ...] which can be stored in a vector DB.`
        }
      ]
    }
  ]
};
