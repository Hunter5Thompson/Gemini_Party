import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import Step1Content from './components/Step1Content';
import Step2Content from './components/Step2Content';
import { llmApiData } from './data/details/llmApiData';
import { step3Data } from './data/step3Data';
import { step4Data } from './data/step4Data';
import { step5Data } from './data/step5Data';
import { step6Data } from './data/step6Data';
import { step7Data } from './data/step7Data';
import { step8Data } from './data/step8Data';
import { step9Data } from './data/step9Data';
import { step10Data } from './data/step10Data';

interface LearningPoint {
  title: string;
  description: string;
  examples?: { description: string; code: string }[];
}

interface SkillDetail {
  title: string;
  description: string;
  learningPoints: LearningPoint[];
}

interface StepDetailsData {
  [key: number]: { [skillName: string]: SkillDetail };
}

const roadmapData = [
  {
    id: 1,
    title: "Coding Fundamentals",
    description: "Every strong AI engineer starts with the fundamentals. Learn Python, Bash, Git, and testing to build a solid foundation for your journey.",
    skills: ["Python", "Bash", "UI Framework Basics (React)", "Basic DS & Algos", "Git & version control", "Testing frameworks (PyTest)", "Streamlit / Gradio"]
  },
  {
    id: 2,
    title: "LLM APIs",
    description: "Learn how to interact with models by understanding LLM APIs. This will teach you structured outputs, caching, system prompts, and more.",
    skills: ["KV caching", "System prompts", "Types of LLMs", "Prompt Caching", "Structured Outputs", "Multi-modal models", "Rate limits, batching, retries", "Cost/performance trade-offs"]
  },
  {
    id: 3,
    title: "LLM Augmentation",
    description: "APIs are great, but raw LLMs need the latest info to be effective. Learn how LLMs are augmented with more info and patterns like fine-tuning, RAG, and prompt engineering.",
    skills: ["Tool Use", "Fine-tuning", "Basics of RAG", "Prompt Engineering", "Context engineering"]
  },
  {
    id: 4,
    title: "Retrieval Techniques",
    description: "Strong LLMs are useless without context. That’s where Retrieval techniques help. Learn about vector DBs, hybrid retrieval, and indexing strategies.",
    skills: ["Vector Databases", "Graph Databases", "Hybrid retrieval", "Reranking pipelines", "Indexing strategies (HNSW, IVF)", "Chunking and embedding"]
  },
  {
    id: 5,
    title: "RAG",
    description: "Once retrieval is solid, move into Retrieval-Augmented Generation. Learn to build retrieval + generation pipelines, reranking, and multi-step retrieval.",
    skills: ["MCP", "Reranking", "Data preparation", "Multi-step retrieval", "Data retrieval and generation", "LLM Orchestration Frameworks"]
  },
  {
    id: 6,
    title: "AI Agents",
    description: "Step into AI Agents, where AI moves from answering to acting. Learn memory, multi-agent systems, human-in-the-loop design, and agentic patterns.",
    skills: ["Memory", "A2A, ACP etc", "Human-in-the-loop", "Multi-Agent systems", "AI Agent Design Patterns", "Agent Orchestration"]
  },
  {
    id: 7,
    title: "Infrastructure",
    description: "Learn how to ship in production with Infrastructure. This will teach you CI/CD, containers, model routing, Kubernetes, and deployment at scale.",
    skills: ["CI/CD", "Kubernetes", "Cloud Services", "Model Routing", "Containerization", "LLM deployment"]
  },
  {
    id: 8,
    title: "Observability & Evaluation",
    description: "Focus on Observability & Evaluation. Learn how to create eval datasets, LLM-as-a-judge, tracing, instrumentation, and continuous evaluation pipelines.",
    skills: ["LLM-as-a-judge", "Multi-turn evals", "AI Agent Evaluation", "Component-level evals", "Observability platforms", "AI Agent instrumentation"]
  },
  {
    id: 9,
    title: "Security",
    description: "Security is crucial. Learn how to implement guardrails, sandboxing, prompt injection defenses, and ethical guidelines to build safe AI systems.",
    skills: ["Guardrails", "Sandboxing", "Ethical guidelines", "Prompt injection defenses"]
  },
  {
    id: 10,
    title: "Advanced Steps",
    description: "Finally, explore advanced workflows. This covers voice & vision agents, CLI agents, robotics, agent swarms, and self-refining AI systems.",
    skills: ["CLI Agents", "Slack agents", "Computer use", "Agent swarms", "Self-refinement", "Robotic Agents", "Voice and Vision Agents", "Automated Prompt Engineering"]
  }
];

const stepDetailsData: StepDetailsData = {
  2: llmApiData,
  3: step3Data,
  4: step4Data,
  5: step5Data,
  6: step6Data,
  7: step7Data,
  8: step8Data,
  9: step9Data,
  10: step10Data,
};

const RoadmapPage = () => {
  const { stepId } = useParams();
  const navigate = useNavigate();

  const activeStep = stepId ? parseInt(stepId, 10) : 1;
  const currentStepData = roadmapData.find(step => step.id === activeStep);

  if (!currentStepData) {
    return <Navigate to="/step/1" replace />;
  }
  
  const renderContentPanel = () => {
    if (!currentStepData) return null;

    if (activeStep === 1) {
      return <Step1Content stepData={currentStepData} />;
    }

    const detailsData = stepDetailsData[activeStep];
    if (detailsData) {
      return <Step2Content stepData={currentStepData} detailsData={detailsData} />;
    }

    // Fallback for any steps without detailed data (though all should have it now)
    return (
      <>
        <h2>Step {currentStepData.id}: {currentStepData.title}</h2>
        <p>{currentStepData.description}</p>
        <h3 className="skills-title">Key Skills & Concepts</h3>
        <ul className="skills-list">
          {currentStepData.skills.map((skill) => (
            <li key={skill} className="skill-tag">{skill}</li>
          ))}
        </ul>
      </>
    );
  };


  return (
    <div className="app-container">
      <header className="header">
        <h1>AI Engineering Learning Roadmap</h1>
        <p>Your path from Beginner Developer to Full-stack AI Engineer</p>
      </header>
      <main className="roadmap-layout">
        <nav className="stepper-nav" aria-label="Learning roadmap steps navigation">
          {roadmapData.map(step => (
            <div
              key={step.id}
              className={`stepper-item ${activeStep === step.id ? 'active' : ''}`}
              onClick={() => navigate(`/step/${step.id}`)}
              role="button"
              tabIndex={0}
              aria-label={`Step ${step.id}: ${step.title}${activeStep === step.id ? ' (current)' : ''}`}
              aria-current={activeStep === step.id ? 'page' : undefined}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/step/${step.id}`)}
            >
              <div className="step-number" aria-hidden="true">{step.id}</div>
              <span>{step.title}</span>
            </div>
          ))}
        </nav>
        <section className="content-panel">
            {renderContentPanel()}
        </section>
      </main>
    </div>
  );
};


const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/step/:stepId" element={<RoadmapPage />} />
        <Route path="/" element={<Navigate to="/step/1" replace />} />
      </Routes>
    </HashRouter>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
