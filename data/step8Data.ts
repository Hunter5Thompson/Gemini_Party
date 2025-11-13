export const step8Data = {
  "LLM-as-a-judge": {
    title: "LLM-as-a-Judge Explained",
    description: "Manual evaluation of LLM outputs is slow and expensive. The 'LLM-as-a-Judge' pattern uses a powerful, state-of-the-art LLM (the 'judge') to evaluate the quality of another model's output based on a set of criteria. This allows for scalable and automated evaluation.",
    learningPoints: [
      {
        title: "How It Works",
        description: "You create a prompt that provides the judge LLM with the original query, the generated answer, a reference answer (if available), and a rubric for scoring. The judge then provides a score and a rationale, which can be returned in a structured format like JSON.",
        examples: [
          {
            description: "A prompt template for an LLM judge evaluating the helpfulness of a chatbot's response.",
            code: `import { GoogleGenAI, Type } from "@google/genai";

async function evaluateResponse(query, response) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const evaluationPrompt = \`
You are an impartial AI evaluator. Your task is to assess the quality of a chatbot's response to a user query.

[USER QUERY]
\${query}

[CHATBOT RESPONSE]
\${response}

[EVALUATION CRITERIA]
1. Helpfulness: Does the response directly and completely answer the user's question?
2. Clarity: Is the response easy to understand?
3. Safety: Is the response free of harmful or inappropriate content?

[TASK]
Provide a score from 1 (poor) to 5 (excellent) for each criterion and a brief justification for your scores.
\`;

  const result = await ai.models.generateContent({
    model: 'gemini-2.5-pro', // A powerful model is needed for judging
    contents: evaluationPrompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          helpfulness_score: { type: Type.INTEGER },
          clarity_score: { type: Type.INTEGER },
          safety_score: { type: Type.INTEGER },
          justification: { type: Type.STRING }
        }
      }
    }
  });

  return JSON.parse(result.text);
}

// const evaluation = await evaluateResponse("How do I reset my password?", "You can reset it in your account settings.");
// console.log(evaluation);`
          }
        ]
      }
    ]
  },
  "Multi-turn evals": {
    title: "Multi-turn Evaluations Explained",
    description: "Evaluating single Q&A pairs is not enough for conversational AI. Multi-turn evaluations assess the agent's performance over an entire conversation, focusing on its ability to maintain context, handle follow-up questions, and achieve a goal over several interactions.",
    learningPoints: [
      {
        title: "Key Metrics for Conversational Evals",
        description: "Beyond single-response quality, you need to measure: 1. **Coherence:** Does the conversation flow logically? 2. **Context Retention:** Does the agent remember information from earlier turns? 3. **Goal Completion:** Did the agent successfully help the user achieve their goal (e.g., booking a flight)?",
        examples: []
      },
      {
        title: "Creating a Multi-turn Evaluation Dataset",
        description: "These datasets consist of entire conversation transcripts, often with annotations at each turn. The final outcome is labeled as a success or failure.",
        examples: [
          {
            description: "An example entry in a multi-turn evaluation dataset.",
            code: `{
  "conversation_id": "conv-123",
  "goal": "Find a pet-friendly hotel in Paris for 3 nights.",
  "final_outcome": "Success",
  "turns": [
    {
      "speaker": "user",
      "text": "Hi, I need a hotel in Paris."
    },
    {
      "speaker": "agent",
      "text": "Certainly! When are you looking to travel and for how many nights?"
    },
    {
      "speaker": "user",
      "text": "Next month for 3 nights. And it must be pet-friendly."
    },
    {
      "speaker": "agent",
      "text": "I've found three pet-friendly hotels in Paris for you. Would you like to hear about them?",
      "context_used": ["Paris", "3 nights", "pet-friendly"]
    }
  ]
}`
          }
        ]
      }
    ]
  },
  "AI Agent Evaluation": {
    title: "AI Agent Evaluation Explained",
    description: "Evaluating agents is more complex than evaluating simple text generation. You must assess not only the final answer but also the *process* the agent took to get there—specifically, its reasoning and tool usage.",
    learningPoints: [
      {
        title: "Trajectory Evaluation",
        description: "Instead of just looking at the final output, you evaluate the agent's entire 'trajectory' of thoughts, actions, and observations. The key questions are: Did the agent choose the right tool? Did it use the tool with the correct arguments? Was its reasoning sound?",
        examples: []
      },
      {
        title: "Example Agent Trajectory and Evaluation",
        description: "Consider an agent tasked with finding the capital of France. A good trajectory is evaluated, not just the final answer.",
        examples: [
          {
            description: "A trace of the agent's internal monologue and actions (its trajectory).",
            code: `// Agent Goal: "What is the capital of France?"

// Trajectory:
// 1. Thought: "I need to find the capital of a country. The 'search' tool is appropriate for this." (Correct Reasoning)
// 2. Action: search(query="capital of France") (Correct Tool Use)
// 3. Observation: "The capital of France is Paris."
// 4. Final Answer: "The capital of France is Paris." (Correct Final Answer)

// --- Evaluation ---
// Reasoning Correct: Yes
// Tool Choice Correct: Yes
// Tool Arguments Correct: Yes
// Final Answer Correct: Yes
// Overall Outcome: SUCCESS`
          },
          {
            description: "A bad trajectory, even if the final answer is right by chance.",
            code: `// Agent Goal: "What is the capital of France?"

// Trajectory:
// 1. Thought: "I need to do a math calculation." (Incorrect Reasoning)
// 2. Action: calculator(expression="1 + 1") (Incorrect Tool Use)
// 3. Observation: "2"
// 4. Final Answer: "The capital of France is Paris." (Hallucinated/Un-grounded)

// --- Evaluation ---
// Reasoning Correct: No
// Tool Choice Correct: No
// Overall Outcome: FAILURE`
          }
        ]
      }
    ]
  },
  "Component-level evals": {
    title: "Component-level Evaluations Explained",
    description: "A complex AI system like a RAG pipeline is composed of multiple components (retriever, reranker, generator). Evaluating the system end-to-end is important, but to truly diagnose problems, you must evaluate each component in isolation.",
    learningPoints: [
      {
        title: "Evaluating the Retriever",
        description: "The goal of the retriever is to find relevant documents. Key metrics are: 1. **Hit Rate:** Did the retriever find the correct document containing the answer among its top K results? 2. **Mean Reciprocal Rank (MRR):** Measures how high up in the ranking the correct document was.",
        examples: [
          {
            description: "You need a dataset of questions and the corresponding correct document IDs.",
            code: `// Eval Dataset Entry:
{
  "question": "What is a vector database?",
  "correct_document_id": "doc-vdb-001"
}

// Test Run:
const retrieved_ids = retriever.search("What is a vector database?");
// -> ["doc-rag-002", "doc-vdb-001", "doc-llm-003"]

// Evaluation:
// Hit Rate: Yes (doc-vdb-001 is in the list)
// Reciprocal Rank: 1/2 (since it's the 2nd result)`
          }
        ]
      },
      {
        title: "Evaluating the Generator",
        description: "The generator's job is to create an answer based *only* on the provided context. Key metrics, often evaluated by an LLM-as-a-Judge, are: 1. **Faithfulness:** Does the answer stick to the information given in the context, without hallucinating? 2. **Answer Relevance:** Is the answer relevant to the user's question?",
        examples: []
      }
    ]
  },
  "Observability platforms": {
    title: "Observability Platforms Explained",
    description: "Standard logging is not enough for complex, non-deterministic AI systems. Observability platforms like LangSmith, Arize AI, or Weights & Biases provide specialized tools for tracing, monitoring, and debugging LLM applications.",
    learningPoints: [
      {
        title: "Tracing",
        description: "The core feature of these platforms is tracing. A 'trace' captures the entire lifecycle of a request, including all nested LLM calls, tool uses, and RAG component executions. This gives you a hierarchical view of what happened, making it easy to pinpoint errors and performance bottlenecks.",
        examples: [
          {
            description: "A conceptual representation of a trace for a RAG query.",
            code: `Trace: "What is a cross-encoder?"
  -  duración: 1500ms
  - Retriever (150ms)
    - Query: "What is a cross-encoder?"
    - Retrieved Docs: [doc-A, doc-B, doc-C]
  - Reranker (300ms)
    - Input Docs: [doc-A, doc-B, doc-C]
    - Reranked Docs: [doc-C, doc-A]
  - LLM Call (1050ms)
    - Prompt: "Context: [doc-C, doc-A]... Question: ..."
    - Response: "A cross-encoder is a model..."`
          }
        ]
      },
      {
        title: "Monitoring and Analytics",
        description: "These platforms also allow you to monitor key metrics over time, such as latency, cost per request, and user feedback scores. You can set up dashboards and alerts to be notified of performance regressions or spikes in errors.",
        examples: []
      }
    ]
  },
  "AI Agent instrumentation": {
    title: "AI Agent Instrumentation Explained",
    description: "Instrumentation is the process of adding code to your application to record key events, metrics, and data, which can then be sent to an observability platform. For AI agents, this means logging every thought, tool call, and observation to make the agent's behavior transparent and debuggable.",
    learningPoints: [
      {
        title: "What to Instrument",
        description: "You should log: 1. The start and end of every agent run. 2. Every tool the agent calls, along with the input arguments. 3. The output (observation) received from every tool call. 4. The agent's internal 'thoughts' or reasoning steps, if available. 5. Any errors that occur.",
        examples: []
      },
      {
        title: "Implementation with Callbacks or Decorators",
        description: "Orchestration frameworks often provide a callback system for this. Alternatively, you can use decorators in Python to wrap your tool functions and automatically log their execution.",
        examples: [
          {
            description: "Using a Python decorator to automatically log any tool call.",
            code: `import functools

# In a real app, this would log to a platform like LangSmith
def log_tool_call(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"--- Calling tool: {func.__name__} with args: {args}, kwargs: {kwargs} ---")
        try:
            result = func(*args, **kwargs)
            print(f"--- Tool {func.__name__} returned: {result} ---")
            return result
        except Exception as e:
            print(f"--- Tool {func.__name__} failed with error: {e} ---")
            raise
    return wrapper

@log_tool_call
def search_engine(query: str):
    # ... actual search logic ...
    return f"Search results for '{query}'"

# When this is called by an agent, the logs are automatically printed.
# search_engine(query="AI agents")`
          }
        ]
      }
    ]
  }
};
