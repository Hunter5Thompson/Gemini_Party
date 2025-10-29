export const step6Data = {
  "Memory": {
    title: "Agent Memory",
    description: "For an agent to be truly useful, it must remember past interactions and information. Memory transforms a stateless chatbot into a stateful assistant. We can categorize memory into two main types: short-term and long-term.",
    learningPoints: [
      {
        title: "Short-Term Memory: The Context Window",
        description: "This is the most basic form of memory. The agent's 'memory' is simply the history of the conversation that is passed back to the LLM with each new turn. The Gemini API's chat functionality handles this automatically. It's simple and effective for conversations but is limited by the size of the model's context window.",
        examples: [
          {
            description: "The `chat` object automatically includes previous messages in the context for the next turn, creating a short-term memory.",
            code: `import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const chat: Chat = ai.chats.create({ model: 'gemini-2.5-flash' });

// The model now "remembers" your name for the next turn.
await chat.sendMessage({ message: "My name is Alex." }); 
const response = await chat.sendMessage({ message: "What is my name?" });

console.log(response.text); // "Your name is Alex."`
          }
        ]
      },
      {
        title: "Long-Term Memory: Vector Stores",
        description: "To give an agent a persistent memory that lasts across conversations, you can use a vector database. Key facts or entire conversation summaries are converted into embeddings and stored. Before generating a response, the agent can retrieve relevant memories from the database to inform its answer.",
        examples: [
          {
            description: "A conceptual workflow for an agent using a long-term memory store.",
            code: `async function agentWithLongTermMemory(query) {
  // 1. Retrieve relevant memories from the vector DB.
  const relevantMemories = await vectorDB.search(query, { topK: 3 });
  // -> ["User previously asked about Python.", "User is interested in web development."]

  // 2. Augment the prompt with these memories.
  const augmentedPrompt = \`
  Relevant context from past conversations:
  \${relevantMemories.join('\\n')}
  ---
  Current user query: \${query}
  \`;

  // 3. Generate a response with the added context.
  const response = await ai.models.generateContent({ 
    model: 'gemini-2.5-flash', 
    contents: augmentedPrompt 
  });
  
  // 4. (Optional) Save the summary of this turn back to the vector DB.
  // await saveToMemory(query, response.text);

  return response.text;
}`
          }
        ]
      }
    ]
  },
  "A2A, ACP etc": {
    title: "Agentic Communication Patterns",
    description: "Agentic patterns define how agents interact with each other and with external tools. Understanding these patterns is key to building systems that are more than just a single LLM call.",
    learningPoints: [
       {
        title: "ReAct: Reason and Act",
        description: "This is one of the most fundamental and powerful agentic patterns. Instead of just answering, the agent follows a 'Thought, Action, Observation' loop. It reasons about what it needs to do (Thought), chooses a tool to use (Action), and then sees the result of that action (Observation). It repeats this loop until it has enough information to answer the user's question.",
        examples: [
            {
                description: "A conceptual trace of a ReAct loop for a simple question.",
                code: `// User Query: "Who is the CEO of Google?"

// Turn 1:
// Thought: I need to find the current CEO of Google. The best tool for this is a search engine.
// Action: search("current CEO of Google")
// Observation: The search result says "Sundar Pichai is the CEO of Google."

// Turn 2:
// Thought: I have found the answer. I can now respond to the user.
// Final Answer: Sundar Pichai is the CEO of Google.`
            }
        ]
      },
      {
        title: "Agent-to-Agent (A2A) Communication",
        description: "In this pattern, a primary 'manager' agent decomposes a complex task and delegates sub-tasks to specialized 'worker' agents. For example, a 'travel agent' might receive a request to 'plan a trip to Paris,' and it would delegate booking the flight to a 'flight agent' and finding a hotel to a 'hotel agent'.",
        examples: []
      }
    ]
  },
  "Human-in-the-loop": {
    title: "Human-in-the-Loop (HITL)",
    description: "HITL is a crucial design pattern for building safe and reliable AI agents. It creates points in the agent's workflow where human oversight and approval are required before proceeding. This is essential for tasks that are high-stakes, ambiguous, or involve taking irreversible actions.",
    learningPoints: [
      {
        title: "Why HITL is Essential",
        description: "Agents can misinterpret instructions or hallucinate facts. For critical actions like sending emails to customers, spending money, or deleting data, you cannot risk autonomous errors. HITL provides a safety layer, allowing a human to verify the agent's plan before execution.",
        examples: []
      },
      {
        title: "Implementation Strategy",
        description: "A common way to implement HITL is to have the agent pause before executing a tool call. It presents its intended action and arguments to a UI, where a human can approve or deny it. If approved, the agent proceeds; if denied, the agent can try to replan or ask the human for clarification.",
        examples: [
          {
            description: "Conceptual code showing an agent seeking approval before using a tool.",
            code: `function agent(goal) {
  // Agent uses ReAct to decide on an action.
  const plan = {
    tool: "sendEmail",
    args: {
      recipient: "customer@example.com",
      subject: "Your Order is Confirmed",
      body: "..."
    }
  };

  // The agent's next step requires human approval.
  const isApproved = requestHumanApproval(plan);

  if (isApproved) {
    // If approved, execute the action.
    executeTool(plan.tool, plan.args);
    return "Email sent successfully.";
  } else {
    // If denied, report back to the user.
    return "Action was cancelled by the user.";
  }
}`
          }
        ]
      }
    ]
  },
  "Multi-Agent systems": {
    title: "Multi-Agent Systems",
    description: "Instead of building a single, monolithic 'do-everything' agent, multi-agent systems use a team of specialized agents that collaborate to solve a problem. This approach often leads to more robust and higher-quality results for complex tasks.",
    learningPoints: [
      {
        title: "The Power of Specialization",
        description: "You can create a team of experts. For example, to write a research paper, you could have a 'Researcher' agent that browses the web to find sources, a 'Writer' agent that drafts the paper based on the research, and a 'Critic' agent that reviews the draft and suggests improvements.",
        examples: []
      },
      {
        title: "Collaborative Workflows",
        description: "Agents can work sequentially, in parallel, or in a hierarchical structure. A common pattern is a 'manager-worker' setup, where a manager agent breaks down a task and assigns pieces to different worker agents, then synthesizes their results into a final product.",
        examples: [
          {
            description: "A sequential workflow for creating a blog post.",
            code: `async function createBlogPost(topic) {
  // 1. The Researcher agent gathers information.
  const researchData = await researcherAgent.run(\`Find recent news about \${topic}\`);

  // 2. The Writer agent takes the research and drafts the post.
  const draft = await writerAgent.run(\`Write a blog post based on this research: \${researchData}\`);

  // 3. The Editor agent refines the draft for clarity and style.
  const finalPost = await editorAgent.run(\`Proofread and improve this draft: \${draft}\`);

  return finalPost;
}`
          }
        ]
      }
    ]
  },
  "AI Agent Design Patterns": {
    title: "AI Agent Design Patterns",
    description: "As the field of AI agents matures, common solutions to recurring problems have emerged. These design patterns provide a reusable blueprint for building more effective and sophisticated agents.",
    learningPoints: [
      {
        title: "Plan-and-Execute",
        description: "In this pattern, the agent first creates a detailed, step-by-step plan to achieve a goal. Then, it executes each step of the plan in order, without re-planning unless a step fails. This is different from ReAct, which re-evaluates its plan after every single action.",
        examples: [
          {
            description: "First, generate the plan.",
            code: `// Goal: "Refactor the user_auth.py file."

// LLM Call 1: Generate the plan.
const plan = [
  "1. Read the contents of user_auth.py.",
  "2. Identify any parts of the code that can be simplified.",
  "3. Rewrite the simplified code.",
  "4. Write the new code back to the file."
];`
          },
           {
            description: "Then, execute the plan step-by-step.",
            code: `for (step in plan) {
  // Execute the action for the current step
  // e.g., use a 'readFile' tool for step 1.
  executeAction(step);
}`
          }
        ]
      },
      {
        title: "Self-Correction / Reflection",
        description: "To improve the quality of an agent's output, you can build a reflection step into its process. The agent produces an initial draft or plan, and then in a second step, it critiques its own work and identifies areas for improvement. This is like having a built-in quality assurance process.",
        examples: [
          {
            description: "A workflow for generating and reflecting on a piece of code.",
            code: `const goal = "Write a Python function to calculate a factorial.";

// 1. First, the agent generates the initial code.
const initialCode = await codeGenerationAgent.run(goal);

// 2. Then, the agent critiques its own work.
const reflectionPrompt = \`
Here is a Python function I wrote:
<code>
\${initialCode}
</code>
Critique this code. Are there bugs? Is it efficient? Are there edge cases I missed?
\`;
const critique = await reflectionAgent.run(reflectionPrompt);
// -> "The code fails for negative numbers and is not recursive."

// 3. Finally, the agent uses the critique to generate a better version.
const refinementPrompt = \`
Original code: \${initialCode}
Critique: \${critique}
Please rewrite the code to address the critique.
\`;
const finalCode = await codeGenerationAgent.run(refinementPrompt);`
          }
        ]
      }
    ]
  },
  "Agent Orchestration": {
    title: "Agent Orchestration",
    description: "Orchestration is the process of managing the end-to-end execution of a multi-agent or multi-step task. An orchestrator acts as the 'brain' of the system, invoking agents, managing state, and routing information between components.",
    learningPoints: [
      {
        title: "The Role of the Orchestrator",
        description: "The orchestrator is responsible for: 1. Receiving the initial user request. 2. Choosing which agent or tool to call first. 3. Passing the output of one agent as the input to the next. 4. Maintaining the overall state of the task. 5. Deciding when the task is complete and returning the final result.",
        examples: []
      },
      {
        title: "State Management",
        description: "A key challenge in orchestration is managing state. As the task progresses, the orchestrator needs to keep track of what's been done, what information has been gathered, and what the next step is. This is often managed using a 'state graph,' where each node represents a step in the process.",
        examples: [
          {
            description: "Frameworks like LangGraph are specifically designed for this. A state graph for our blog post example might look like this:",
            code: `// Conceptual state graph

const graph = new StateGraph();

// Define the nodes in our graph (the agents)
graph.addNode("researcher", researchAgent);
graph.addNode("writer", writerAgent);
graph.addNode("editor", editorAgent);

// Define the edges (the flow of control)
graph.addEdge("researcher", "writer");
graph.addEdge("writer", "editor");

// Set the entry and exit points
graph.setEntryPoint("researcher");
graph.setFinishPoint("editor");

const app = graph.compile();
// Now you can run the whole workflow with one call
const result = await app.invoke({ topic: "AI Agents" });`
          }
        ]
      }
    ]
  }
};
