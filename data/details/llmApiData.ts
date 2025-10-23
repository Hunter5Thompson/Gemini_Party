export const llmApiData = {
  "KV caching": {
    title: "KV Caching Explained",
    description: "KV Caching is a crucial optimization technique that dramatically speeds up the process of generating text with autoregressive models like Gemini. It avoids redundant computations by reusing calculations from previous steps.",
    learningPoints: [
      {
        title: "What is KV Caching?",
        description: "In the Transformer architecture (the basis for most LLMs), the self-attention mechanism calculates three special matrices for each input token: a Query (Q), a Key (K), and a Value (V). To predict the next token, the model needs to look at the Keys and Values of all preceding tokens. Without caching, it would have to re-calculate these K and V matrices for every single token in the sequence, for every new token it generates. KV Caching stores these Key and Value pairs in memory, so they only need to be computed once.",
        examples: []
      },
      {
        title: "How It Works: An Example",
        description: "Imagine you provide the prompt: `The cat sat on the`. Here's a simplified view of the process:",
        examples: [
          {
            description: "1. **Prefill Phase:** The model processes the entire prompt `(\"The\", \"cat\", \"sat\", \"on\", \"the\")` in one go. It calculates the Key and Value matrices for each of these five tokens and stores them in the cache.",
            code: `// Conceptual Cache after prefill
[
  K_the, V_the,       // Token 1
  K_cat, V_cat,       // Token 2
  K_sat, V_sat,       // Token 3
  K_on, V_on,         // Token 4
  K_the, V_the        // Token 5
]`
          },
          {
            description: "2. **Decoding Phase (Token 1):** The model uses the cached KVs to predict the next token, let's say `\"mat\"`.",
            code: ""
          },
          {
            description: "3. **Decoding Phase (Token 2):** Now, to predict the token after `\"mat\"`, the model only needs to process the *new* token `\"mat\"`. It calculates `K_mat` and `V_mat` and adds them to the cache. It then uses the *entire cache* (KVs for the original prompt + the new KV for `\"mat\"`) to predict the next token. It doesn't need to re-process `\"The cat sat on the\"`.",
            code: `// Conceptual Cache for next step
[
  ...,               // KVs for "The cat sat on the"
  K_mat, V_mat        // NEW: KVs for "mat"
]`
          }
        ]
      },
      {
        title: "Why is it a Game-Changer?",
        description: "The benefit is massive. The initial processing (prefill) is computationally intensive, but generating each subsequent token (decoding) becomes very fast. This is why you often see a slight delay before a streaming response starts, followed by a rapid flow of words. When you use an LLM API, this optimization is handled for you on the provider's infrastructure, ensuring your requests are processed efficiently.",
        examples: [
           {
             description: "When you make a standard API call, this optimization is happening behind the scenes.",
             code: `// You don't configure KV Caching; the API service uses it automatically.
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function run() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'The cat sat on the',
  });
  // The speed of this response, especially for longer outputs,
  // is heavily reliant on KV Caching.
  console.log(response.text);
}`
           }
        ]
      }
    ]
  },
  "System prompts": {
    title: "System Prompts Explained",
    description: "A system prompt is a high-level instruction that steers the model's behavior, personality, and output format throughout the conversation. It sets the ground rules before the user's first prompt.",
    learningPoints: [
      {
        title: "Setting the Persona",
        description: "You can use a system prompt to give the model a specific role or personality. This is much more effective than trying to remind it of its role in every single user prompt.",
        examples: [
          {
            description: "Here, we instruct the model to act as a helpful and friendly pirate.",
            code: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function run() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: "Explain what an API is.",
    config: {
      systemInstruction: "You are a friendly pirate captain named Redbeard. Answer all questions in a thick pirate accent, savvy?",
    },
  });
  // Expected output might be: "Ahoy, matey! An API be like a secret treasure map..."
  console.log(response.text);
}`
          }
        ]
      },
      {
        title: "Defining Output Constraints",
        description: "System prompts are excellent for defining rules about the output format, such as always responding in JSON, using a specific language, or avoiding certain topics.",
        examples: [
          {
            description: "This example tells the model to act as a translator that only provides the translated text and nothing else.",
            code: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function run() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: "Hello, how are you?",
    config: {
      systemInstruction: "You are a flawless English to French translator. Do not add any extra text, pleasantries, or explanations. Only provide the direct translation.",
    },
  });
  // Expected output: "Bonjour, comment ça va ?"
  console.log(response.text);
}`
          }
        ]
      }
    ]
  },
  "Types of LLMs": {
    title: "Types of LLMs Explained",
    description: "Not all LLMs are created equal. They are often tuned for different purposes. Understanding the main types helps you choose the right tool for the job.",
    learningPoints: [
        {
            title: "1. Base Models",
            description: "Base models are the raw, foundational models trained on a massive corpus of text data. Their primary goal is to predict the next word in a sequence. They are incredibly knowledgeable but are not explicitly trained to follow instructions or be conversational. You would typically fine-tune a base model for a very specific custom task.",
            examples: []
        },
        {
            title: "2. Instruction-Tuned Models",
            description: "These are base models that have undergone additional training on datasets of instructions and desired responses. This tuning makes them much better at following user commands and performing general-purpose tasks. `gemini-2.5-flash` is a powerful instruction-tuned model.",
            examples: [{
                description: "A standard API call uses an instruction-tuned model to directly answer a question.",
                code: `// This is a classic use case for an instruction-tuned model.
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Write a python function to reverse a string.',
});
console.log(response.text);`
            }]
        },
        {
            title: "3. Chat Models",
            description: "Chat models are instruction-tuned models that are further optimized for multi-turn dialogue. They are designed to remember the context of a conversation and provide coherent, context-aware responses. The Gemini API provides a dedicated chat interface for this.",
            examples: [{
                description: "The `ai.chats.create` method is specifically designed for this purpose, managing the conversation history for you.",
                code: `import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
});

// First message
let response = await chat.sendMessage({ message: "My name is Bob." });
console.log(response.text); // e.g., "Nice to meet you, Bob!"

// Second message
response = await chat.sendMessage({ message: "What is my name?" });
console.log(response.text); // e.g., "Your name is Bob."`
            }]
        }
    ]
  },
  "Prompt Caching": {
    title: "Prompt Caching Explained",
    description: "Prompt Caching is a server-side optimization technique used by API providers to reduce latency and cost. It is different from KV Caching, which is a computational speedup during generation.",
    learningPoints: [
        {
            title: "What is it?",
            description: "When you send a prompt to the Gemini API, the service can cache the generated response. If another user (or you, again) sends the *exact same prompt* shortly after, the API can instantly return the cached result instead of processing it again. This is particularly effective for common or popular prompts.",
            examples: []
        },
        {
            title: "Is it User-Configurable?",
            description: "No. This is an automatic, transparent optimization handled entirely by Google's infrastructure. There is no API parameter to turn it on or off. You benefit from it automatically when you use the service.",
            examples: [{
                description: "You don't need to do anything in your code to enable prompt caching. It just works.",
                code: `// Imagine this function is called many times with the same 'contents'.
// The first time, it's computed. Subsequent calls may hit the cache,
// resulting in a much faster response.
async function getCapital(country) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: \`What is the capital of \${country}?\`,
    });
    return response.text;
}`
            }]
        }
    ]
  },
  "Structured Outputs": {
    title: "Structured Outputs Explained",
    description: "Forcing the model to return a valid, predictable JSON format is critical for building reliable applications. This avoids flaky string parsing and makes API integrations robust.",
    learningPoints: [
      {
        title: "The Problem with Plain Text",
        description: "If you ask a model for a list, it might return a markdown list, a numbered list, or a comma-separated string. This unpredictability makes it hard to use the output programmatically. Structured output solves this.",
        examples: []
      },
      {
        title: "Forcing JSON Output with a Schema",
        description: "The most reliable way to get structured data is to specify the `responseMimeType` as `application/json` and provide a `responseSchema`. This forces the model's output to conform to the structure you define.",
        examples: [
          {
            description: "Here, we ask for a list of recipes and define a strict schema for the output. The API guarantees the output string will be parsable JSON matching this structure.",
            code: `import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function run() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "List two popular cookie recipes.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        recipeName: { type: Type.STRING },
                        ingredients: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                        },
                    },
                },
            },
        },
    });

    const recipes = JSON.parse(response.text);
    console.log(recipes[0].recipeName);
}`
          }
        ]
      }
    ]
  },
  "Multi-modal models": {
    title: "Multi-modal Models Explained",
    description: "Multi-modal models can process and understand information from more than one 'modality' (type of data). The most common use case is combining images and text in a single prompt.",
    learningPoints: [
      {
        title: "Image and Text Input (Vision)",
        description: "You can send both an image and a text question to a vision-capable model like `gemini-2.5-flash`. The model can 'see' the image and answer questions about it.",
        examples: [
          {
            description: "This example sends an image (as a base64 string) and asks the model to describe it. `imagePart` and `textPart` are combined in the `contents`.",
            code: `// Assuming 'base64EncodedImage' is a valid base64 string of an image
const imagePart = {
  inlineData: {
    mimeType: 'image/jpeg',
    data: base64EncodedImage,
  },
};
const textPart = {
  text: "What is in this image?"
};

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: { parts: [imagePart, textPart] },
});

console.log(response.text);`
          }
        ]
      },
      {
        title: "Image Editing",
        description: "Specialized models like `gemini-2.5-flash-image` can take an image as input and generate a new, edited image as output based on your text instructions.",
        examples: [
           {
            description: "Note the use of the specific model and the `responseModalities` config, which tells the model to output both an image and text.",
            code: `import { GoogleGenAI, Modality } from "@google/genai";
            
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-image',
  contents: {
    parts: [
      { inlineData: { data: base64ImageData, mimeType: 'image/png' } },
      { text: 'add a party hat on the cat' },
    ],
  },
  config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
  },
});

// The response will contain the new image data in its parts.
const newImageData = response.candidates[0].content.parts[0].inlineData.data;`
           }
        ]
      }
    ]
  },
  "Rate limits, batching, retries": {
    title: "API Robustness Patterns",
    description: "Building production applications requires handling the realities of network communication and API limitations. These patterns are essential for reliability.",
    learningPoints: [
      {
        title: "Rate Limits",
        description: "APIs enforce rate limits (e.g., 60 requests per minute) to ensure fair usage and prevent abuse. If you exceed this limit, the API will return an error (often with a 429 status code). Your application must handle this gracefully.",
        examples: []
      },
      {
        title: "Exponential Backoff & Retries",
        description: "When an API call fails (due to a rate limit or a temporary server error), you shouldn't immediately retry. A better strategy is 'exponential backoff': wait for a short period (e.g., 1 second), then retry. If it fails again, wait longer (e.g., 2s), then 4s, and so on. This prevents overwhelming the server.",
        examples: [
          {
            description: "Conceptual code showing a retry loop. In a real app, you would use a library like 'tenacity' or 'async-retry' to handle this.",
            code: `async function generateWithRetry(prompt) {
  let retries = 0;
  const maxRetries = 5;
  while (retries < maxRetries) {
    try {
      const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
      return response.text;
    } catch (error) {
      if (error.status === 429) { // Check for rate limit error
        retries++;
        const delay = Math.pow(2, retries) * 1000; // Exponential backoff
        console.log(\`Rate limited. Retrying in \${delay}ms...\`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  throw new Error("Max retries exceeded.");
}`
          }
        ]
      },
       {
        title: "Batching",
        description: "While the `generateContent` API processes one request at a time, a general high-performance strategy is batching. If you have many small, independent tasks (e.g., classifying 100 sentences), it can be more efficient to send them in a single 'batch' request rather than 100 separate requests. This reduces network overhead. Some specialized APIs are designed for batch processing.",
        examples: []
      }
    ]
  },
  "Cost/performance trade-offs": {
    title: "Cost & Performance Trade-offs",
    description: "Choosing the right model is a critical business and engineering decision. You must balance the cost of the API calls with the performance (speed and quality) required for your application.",
    learningPoints: [
      {
        title: "The Model Hierarchy",
        description: "Providers typically offer a range of models. Smaller, faster models (like `gemini-2.5-flash`) are cheaper and have lower latency, making them ideal for high-volume or real-time tasks. Larger, more powerful models are more expensive and slower but can handle more complex reasoning.",
        examples: []
      },
      {
        title: "Token-Based Pricing",
        description: "LLM APIs are typically priced based on 'tokens,' which are pieces of words. You are charged for both the tokens you send in your prompt (input tokens) and the tokens the model generates in its response (output tokens). Longer prompts and longer answers cost more.",
        examples: [{
            description: "A short prompt for a classification task is much cheaper than a long prompt asking to summarize a document.",
            code: `// CHEAPER: Input and output are small
// Prompt: "Classify this email as 'Spam' or 'Not Spam': ..."
// Output: "Spam"

// MORE EXPENSIVE: Input and output are large
// Prompt: "Summarize this 3000-word article for me: ..."
// Output: "This article is about..." (a 200-word summary)`
        }]
      },
      {
        title: "The Golden Rule",
        description: "Start with the fastest, cheapest model that can reliably accomplish your task. For many applications, like classification, simple Q&A, or chat, `gemini-2.5-flash` is a fantastic starting point. Only move to a more powerful (and expensive) model if you can prove that the quality of the cheaper model is insufficient for your use case.",
        examples: []
      }
    ]
  }
};