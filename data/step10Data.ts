export const step10Data = {
  "CLI Agents": {
    title: "CLI Agents Explained",
    description: "CLI (Command-Line Interface) agents are AI assistants that operate within a developer's terminal. They can automate complex command sequences, help with code scaffolding, manage cloud infrastructure, or act as an interactive guide for complex tools.",
    learningPoints: [
      {
        title: "Core Functionality",
        description: "A CLI agent typically takes a natural language goal, translates it into a series of shell commands, and then seeks approval from the user before executing them. This combines the reasoning power of an LLM with the direct system access of the command line.",
        examples: [
          {
            description: "Conceptual workflow for an agent that creates a new git branch and commits files.",
            code: `// User Input: > my-agent "create a new feature branch called 'login-v2' and add all current changes to it"

// Agent's Internal Plan:
// 1. Thought: The user wants to create a new git branch and commit changes.
//    I need to use 'git checkout -b' and then 'git add' and 'git commit'.
// 2. Generated Commands:
//    - git checkout -b login-v2
//    - git add .
//    - git commit -m "feat: start work on login v2"

// Agent's Output to User:
// > I am about to run the following commands:
// > 1. git checkout -b login-v2
// > 2. git add .
// > 3. git commit -m "feat: start work on login v2"
// > Do you want to proceed? (y/n)`
          }
        ]
      }
    ]
  },
  "Slack agents": {
    title: "Slack Agents Explained",
    description: "Integrating AI agents into chat platforms like Slack creates powerful, collaborative assistants. A Slack agent can summarize channels, answer questions based on company knowledge, create tickets, or orchestrate workflows by mentioning other users or services.",
    learningPoints: [
      {
        title: "Event-Driven Architecture",
        description: "Slack agents are event-driven. They listen for specific events, such as being mentioned in a channel (`@my-agent`) or a slash command being used (`/summarize`). When a relevant event occurs, it triggers the agent's logic.",
        examples: [
          {
            description: "Conceptual Python code using the Slack Bolt SDK to respond to a mention.",
            code: `from slack_bolt import App

app = App(token="xoxb-your-token")

@app.event("app_mention")
def handle_mention(event, say):
    user_query = event["text"]
    
    # Here, you would invoke your agent's reasoning logic
    # agent_response = my_ai_agent.run(user_query)
    agent_response = f"You asked: '{user_query}'. I am processing this..."
    
    say(agent_response)

if __name__ == "__main__":
    app.start(port=3000)`
          }
        ]
      },
      {
        title: "Accessing Slack Tools",
        description: "A key advantage is that the agent can be given tools to interact with the Slack API itself. For example, it could have a 'send_message' tool or a 'create_channel' tool, allowing it to perform actions within the workspace.",
        examples: []
      }
    ]
  },
  "Computer use": {
    title: "Computer Use Agents Explained",
    description: "These are highly advanced agents that can perceive a computer screen and control the mouse and keyboard to automate tasks in any graphical user interface (GUI). This allows them to operate applications that do not have APIs, just like a human would.",
    learningPoints: [
      {
        title: "Vision is Key",
        description: "The agent uses a vision-capable multimodal LLM to analyze screenshots of the screen. It identifies UI elements like buttons, text fields, and icons based on their appearance.",
        examples: [
          {
            description: "A conceptual prompt for a GUI agent.",
            code: `// The agent is shown a screenshot of a web form.

// Agent's Prompt:
// "You are a helpful assistant. Your goal is to fill out this form to book a flight.
//  The screen shows the current state of the application.
//  Based on the screenshot, what is the next action you should take?
//  Should you 'CLICK' on an element, 'TYPE' into a field, or 'FINISH'?
//  Describe the element you want to interact with."

// Agent's Response:
// {
//   "action": "TYPE",
//   "element_description": "the text input field labeled 'From'",
//   "text_to_type": "New York"
// }`
          }
        ]
      },
      {
        title: "Action Space",
        description: "The agent's actions are typically simplified to a few primitives: `CLICK(x, y)`, `TYPE(text)`, `SCROLL(direction)`, etc. The agent's response is parsed, and a library like `pyautogui` is used to execute the command on the host OS.",
        examples: []
      }
    ]
  },
  "Agent swarms": {
    title: "Agent Swarms Explained",
    description: "An agent swarm is a system where a large number of simple, often specialized, agents collaborate to solve a complex problem. Instead of a single 'monolithic' agent trying to do everything, a 'manager' agent decomposes the task and distributes it among a swarm of 'worker' agents who may work in parallel.",
    learningPoints: [
      {
        title: "The Power of Parallelism",
        description: "Swarms are particularly effective for tasks that can be broken down into many independent sub-tasks, such as performing a broad web search for a research paper. A manager agent can generate 100 different search queries and assign each one to a separate 'researcher' agent. The swarm can then execute these searches in parallel, gathering vast amounts of information much faster than a single agent could.",
        examples: [
          {
            description: "Conceptual workflow for a research swarm.",
            code: `function researchSwarm(topic) {
  // 1. Manager agent creates a plan of 100 sub-questions.
  const subQuestions = managerAgent.createPlan(topic, 100);
  // -> ["What are the origins of X?", "What is the impact of X on Y?", ...]

  // 2. Distribute each sub-question to a worker agent.
  //    This can be done in parallel using serverless functions.
  const workerPromises = subQuestions.map(q => workerAgent.run(q));
  
  // 3. Wait for all workers to finish their research.
  const allResults = await Promise.all(workerPromises);

  // 4. Manager agent synthesizes all the results into a final report.
  const finalReport = managerAgent.synthesize(allResults);

  return finalReport;
}`
          }
        ]
      }
    ]
  },
  "Self-refinement": {
    title: "Self-Refinement Explained",
    description: "Self-refinement (or self-critique) is an advanced agentic pattern where an agent improves its own work iteratively. It produces an initial output, then 'reflects' on it by critiquing it against the original goal, and finally uses that critique to generate a refined, higher-quality output.",
    learningPoints: [
      {
        title: "The Generate-Critique-Refine Loop",
        description: "This process mimics the human creative process. By explicitly separating the generation and critique steps, the agent is forced to re-evaluate its work from a different perspective, often catching errors or identifying areas for improvement it would have missed in a single pass.",
        examples: [
          {
            description: "A detailed example of an agent writing a Python function with self-refinement.",
            code: `const goal = "Write a Python function to check if a string is a palindrome.";

// --- 1. Initial Generation ---
const firstDraft = await generatorAgent.run(\`Write a function for: \${goal}\`);
// -> "def is_palindrome(s): return s == s[::-1]"

// --- 2. Self-Critique ---
const critiquePrompt = \`
Goal: \${goal}
Generated Code:
\${firstDraft}

Critique this code. Does it handle all cases? What about capitalization and punctuation?
\`;
const critique = await critiqueAgent.run(critiquePrompt);
// -> "The code is simple but fails on cases like 'Racecar' or 'A man, a plan...'.
//     It should be case-insensitive and ignore non-alphanumeric characters."

// --- 3. Refinement ---
const refinePrompt = \`
Goal: \${goal}
Original Code: \${firstDraft}
Critique: \${critique}

Rewrite the code to address the critique.
\`;
const finalCode = await generatorAgent.run(refinePrompt);
// -> A more robust function that handles capitalization and punctuation.`
          }
        ]
      }
    ]
  },
  "Robotic Agents": {
    title: "Robotic Agents Explained",
    description: "Robotic agents use LLMs as their 'brain' to understand high-level natural language commands and translate them into a sequence of physical actions for a robot to execute. This bridges the gap between human intent and low-level robot control.",
    learningPoints: [
      {
        title: "From Language to Action",
        description: "The core challenge is mapping language to a robot's 'action space'. The LLM is given a description of the robot's available functions (e.g., `move_arm(x, y, z)`, `grip(pressure)`, `rotate_wrist(degrees)`). When given a command, the LLM generates a plan as a sequence of these function calls.",
        examples: [
          {
            description: "Translating a human command into a robot's primitive actions.",
            code: `// Human Command: "pick up the red block and place it on the blue block"

// LLM's System Prompt contains the available robot functions:
// "You can call the following functions: move_arm, grip, release."

// LLM-generated Plan (as a series of tool calls):
// 1. { tool: "move_arm", args: { position: [red_block_coords] } }
// 2. { tool: "grip", args: { pressure: 50 } }
// 3. { tool: "move_arm", args: { position: [above_blue_block_coords] } }
// 4. { tool: "release", args: {} }`
          }
        ]
      },
      {
        title: "Incorporating Sensory Feedback",
        description: "Advanced robotic agents are multi-modal. They can take input from cameras ('what do you see?') or sensors to inform their plans. If a robot tries to grip and its pressure sensors return '0', it can 'observe' that the action failed and re-plan its next move.",
        examples: []
      }
    ]
  },
  "Voice and Vision Agents": {
    title: "Voice and Vision Agents Explained",
    description: "These are multi-modal agents that can perceive the world through vision (images, video streams) and interact through natural, spoken language. This enables a much more fluid and intuitive form of human-computer interaction, moving beyond text-based chat.",
    learningPoints: [
      {
        title: "Real-time, Low-Latency Interaction",
        description: "The key to a successful voice agent is low latency. The agent must be able to process audio input as it's spoken and generate an audio response almost instantly to feel like a natural conversation. This requires specialized APIs like Gemini's Live API, which is optimized for real-time streaming.",
        examples: [
          {
            description: "The Gemini Live API allows for real-time, bi-directional streaming of audio, making natural conversation possible. This code snippet shows the conceptual setup.",
            code: `import {GoogleGenAI, Modality} from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// The Live API uses a persistent connection
const session = await ai.live.connect({
  model: 'gemini-2.5-flash-native-audio-preview-09-2025',
  callbacks: {
    onopen: () => console.log('Connection opened.'),
    onmessage: (message) => {
      // Play back the model's audio response as it arrives.
      const audioContent = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
      if (audioContent) {
        playAudio(audioContent);
      }
    },
    // ... onerror, onclose
  },
  config: {
    responseModalities: [Modality.AUDIO],
  },
});

// As the user speaks, their microphone audio is captured and streamed to the session.
// session.sendRealtimeInput({ media: microphoneAudioBlob });`
          }
        ]
      }
    ]
  },
  "Automated Prompt Engineering": {
    title: "Automated Prompt Engineering Explained",
    description: "Manual prompt engineering can be a tedious process of trial and error. Automated Prompt Engineering (APE) uses an LLM to perform this optimization task, essentially asking an AI to find the best instructions for another AI.",
    learningPoints: [
      {
        title: "The APE Process",
        description: "The process involves a 'proposer' LLM and a 'target' LLM. 1. The proposer LLM generates a list of candidate instructions for a given task. 2. Each candidate instruction is then used as a prompt for the 'target' LLM to solve a set of problems from an evaluation dataset. 3. The prompts are scored based on how well the target LLM performed. 4. The highest-scoring prompt is selected as the optimal one.",
        examples: [
          {
            description: "Conceptual example of APE finding a better prompt for a reasoning task.",
            code: `const taskDescription = "Solve simple math word problems.";
const evalDataset = [{ question: "If I have 3 apples...", answer: 5 }];

// 1. Proposer LLM generates candidate instructions.
const candidatePrompts = [
  "Solve the math problem.",
  "Think step by step.",
  "Let's reason logically to find the solution."
];

// 2. Evaluate each prompt.
const scores = {};
for (const prompt of candidatePrompts) {
  // Run the target LLM on the eval dataset with this prompt.
  const accuracy = evaluate(targetLLM, prompt, evalDataset);
  scores[prompt] = accuracy;
}

// 3. Select the best one.
// scores might be: { "Solve...": 0.6, "Think...": 0.95, "Let's reason...": 0.92 }
const bestPrompt = "Think step by step.";`
          }
        ]
      }
    ]
  }
};
