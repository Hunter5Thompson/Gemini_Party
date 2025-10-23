export const step3Data = {
  "Tool Use": {
    title: "Tool Use (Function Calling)",
    description: "Function Calling allows you to grant LLMs access to external tools and APIs. This transforms the model from a pure text generator into an agent that can fetch live data, interact with services, and perform actions in the real world.",
    learningPoints: [
      {
        title: "How Does It Work?",
        description: "The process involves a conversation between your code and the LLM: 1. You describe your available functions (tools) to the model. 2. The user asks a question. 3. The model, instead of answering directly, returns a structured `FunctionCall` object, telling you which function to run and with what arguments. 4. Your code executes that function. 5. You send the function's result back to the model, which then uses that information to formulate a final, user-friendly text response.",
        examples: []
      },
      {
        title: "Code Example: Defining and Using a Tool",
        description: "Here, we define a function `getCurrentWeather` and make it available to the model. When the user asks about the weather, the model doesn't guess; it asks us to call our tool.",
        examples: [
          {
            description: "First, declare the function's structure so the model knows what it can do.",
            code: `import { FunctionDeclaration, GoogleGenAI, Type } from '@google/genai';

const getCurrentWeather: FunctionDeclaration = {
  name: 'getCurrentWeather',
  parameters: {
    type: Type.OBJECT,
    description: 'Get the current weather in a given location.',
    properties: {
      location: {
        type: Type.STRING,
        description: 'The city and state, e.g. San Francisco, CA',
      },
    },
    required: ['location'],
  },
};`
          },
          {
            description: "Next, make the API call with the tool definition included in the config.",
            code: `const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'What is the weather like in Boston?',
  config: {
    tools: [{functionDeclarations: [getCurrentWeather]}],
  },
});

console.log(response.functionCalls);
// Expected output might be:
// [{ name: 'getCurrentWeather', args: { location: 'Boston, MA' } }]`
          }
        ]
      }
    ]
  },
  "Fine-tuning": {
    title: "Fine-tuning",
    description: "Fine-tuning adapts a powerful, pre-trained model to a specific task or domain by training it further on a smaller, specialized dataset. This is ideal for teaching the model a specific style, tone, or format.",
    learningPoints: [
       {
        title: "Why Fine-Tune?",
        description: "You should fine-tune when you need the model to learn a specific *behavior*, not just new facts. Good use cases include: 1. Adopting a very specific personality or brand voice. 2. Consistently producing output in a complex, proprietary format (e.g., custom XML). 3. Mastering a narrow, niche task where a specific vocabulary is required.",
        examples: []
      },
       {
        title: "Fine-Tuning vs. RAG",
        description: "Use RAG (Retrieval-Augmented Generation) to inject real-time or factual knowledge. Use fine-tuning to teach a model a new skill or style. For example, to answer questions about today's news, use RAG. To make a chatbot that always speaks like a 1920s detective, use fine-tuning.",
        examples: []
      },
       {
        title: "Using a Fine-Tuned Model",
        description: "After the fine-tuning process (which is done through specialized tools), you receive a unique model name. Using it is as simple as calling the API with that new name. The model will now exhibit the specialized behavior it learned during training.",
        examples: [{
          description: "The API call looks the same; only the model name changes to point to your custom version.",
          code: `// Assuming 'your-custom-model-name' is the ID of your fine-tuned model.
const response = await ai.models.generateContent({
  model: 'your-custom-model-name',
  contents: 'Summarize the attached meeting notes.',
});

// The output will now follow the specific summary format
// and tone learned during fine-tuning.
console.log(response.text);`
        }]
      }
    ]
  },
  "Basics of RAG": {
    title: "Basics of RAG (Retrieval-Augmented Generation)",
    description: "RAG enhances LLM responses by providing them with relevant information retrieved from an external knowledge base. It grounds the model in facts, reduces hallucinations, and allows it to answer questions about private or recent data.",
    learningPoints: [
       {
        title: "The RAG Flow",
        description: "RAG follows a simple but powerful pattern: 1. **Retrieve:** When a user asks a question, your system first searches a knowledge base (like a vector database) to find text chunks relevant to the query. 2. **Augment:** These relevant chunks are then inserted into the prompt along with the user's original question. 3. **Generate:** This combined prompt is sent to the LLM, which now has the necessary context to generate an accurate, fact-based answer.",
        examples: []
      },
      {
        title: "Conceptual Code Example",
        description: "This example shows how you would manually construct the 'augmented' prompt that gets sent to the LLM. Frameworks like LlamaIndex or LangChain automate this process.",
        examples: [{
          description: "Combine your retrieved context and the user's question into a single, clear prompt.",
          code: `const userQuery = "What is the capital of California?";

// Step 1: Retrieve relevant documents from your knowledge base.
const retrievedContext = [
  "Document 1: California is a state in the Western United States.",
  "Document 2: The capital of California is Sacramento, established in 1854."
];

// Step 2 & 3: Augment the prompt and Generate a response.
const augmentedPrompt = \`
Use the following context to answer the question.
Context:
---
\${retrievedContext.join("\\n")}
---
Question: \${userQuery}
\`;

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: augmentedPrompt,
});

// The model will now use the provided context to answer correctly.
console.log(response.text); // "The capital of California is Sacramento."`
        }]
      }
    ]
  },
  "Prompt Engineering": {
    title: "Prompt Engineering",
    description: "Prompt Engineering is the art and science of crafting effective prompts to guide LLMs toward generating accurate and desired outputs. A well-crafted prompt is the difference between a generic answer and a perfect one.",
    learningPoints: [
      {
        title: "Zero-Shot Prompting",
        description: "Simply ask the model to perform a task directly, without providing any examples. This relies on the model's pre-existing knowledge and works well for straightforward tasks.",
        examples: [{
          description: "A simple, direct instruction.",
          code: `const prompt = "Classify the following movie review as 'positive' or 'negative': 'The film was a masterpiece, I loved it!'";

const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
console.log(response.text); // "positive"`
        }]
      },
      {
        title: "Few-Shot Prompting",
        description: "Provide a few examples (shots) of the task within the prompt. This helps the model understand the expected format, tone, and nuances of the task.",
        examples: [{
          description: "Giving examples helps the model understand the desired output format.",
          code: `const prompt = \`
Extract the main subject from the text.

Text: "The new AI model from Google is impressive."
Subject: "AI model"

Text: "I'm learning about cloud computing and Kubernetes."
Subject: "cloud computing"

Text: "Formula 1 racing is an exciting sport."
Subject:
\`;

const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
console.log(response.text); // "Formula 1 racing"`
        }]
      },
      {
        title: "Chain-of-Thought (CoT) Prompting",
        description: "For complex reasoning problems, CoT encourages the model to break down the problem and 'think step by step.' This often leads to more accurate results.",
        examples: [{
          description: "Simply adding 'Let's think step by step' can significantly improve reasoning.",
          code: `const prompt = \`
Question: A juggler has 16 balls. Half of the balls are golf balls, and half of the golf balls are blue. How many blue golf balls are there? Let's think step by step.
\`;

const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
console.log(response.text);
/*
Expected output:
1. The juggler has 16 balls in total.
2. Half of the balls are golf balls, so there are 16 / 2 = 8 golf balls.
3. Half of the golf balls are blue, so there are 8 / 2 = 4 blue golf balls.
The answer is 4.
*/`
        }]
      }
    ]
  },
  "Context engineering": {
    title: "Context Engineering",
    description: "Context engineering is the practice of structuring and optimizing the information you provide within the LLM's context window. Since the model can only 'see' a finite amount of text, what you include and how you format it is critical.",
    learningPoints: [
      {
        title: "The Importance of Structure",
        description: "Clearly delineating different parts of your prompt (instructions, context, examples, question) helps the model understand their roles. Use markers like `---`, `Context:`, or XML tags to create a clean structure.",
        examples: []
      },
      {
        title: "Positional Awareness",
        description: "LLMs often pay more attention to information at the very beginning and very end of the context window. A common and effective pattern is to place instructions at the top and the user's specific question at the bottom, sandwiching the retrieved context or examples in the middle.",
        examples: [
          {
            description: "This structure clearly separates instructions, context, and the final query, playing to the model's strengths.",
            code: `const augmentedPrompt = \`
You are a helpful assistant. Use the provided context to answer the user's question.

[CONTEXT]
---
The Eiffel Tower was completed in 1889.
It is located in Paris, France.
---

[QUESTION]
When was the Eiffel Tower finished?
\`;`
          }
        ]
      }
    ]
  }
};
