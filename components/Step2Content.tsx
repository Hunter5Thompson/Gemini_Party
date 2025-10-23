import React, { useState } from 'react';
import ChunkingAndEmbeddingDetails from './details/ChunkingAndEmbeddingDetails';
import GraphDatabasesDetails from './details/GraphDatabasesDetails';
import HybridRetrievalDetails from './details/HybridRetrievalDetails';
import IndexingStrategiesDetails from './details/IndexingStrategiesDetails';
import RerankingPipelinesDetails from './details/RerankingPipelinesDetails';
import VectorDatabasesDetails from './details/VectorDatabasesDetails';

interface StepData {
  id: number;
  title: string;
  description: string;
  skills: string[];
}

interface LearningPoint {
    title: string;
    description: string;
    examples?: { description: string; code: string }[];
};

interface SkillDetail {
  title: string;
  description:string;
  learningPoints: LearningPoint[];
};

interface DetailedStepContentProps {
  stepData: StepData;
  detailsData: { [key: string]: SkillDetail };
}


const Step2Content: React.FC<DetailedStepContentProps> = ({ stepData, detailsData }) => {
  const [selectedSkill, setSelectedSkill] = useState<string>(stepData.skills[0]);

  const skillDetails = detailsData[selectedSkill];

  const renderSkillDetails = () => {
    // Custom components for Step 4
    if (stepData.id === 4) {
      switch (selectedSkill) {
        case 'Vector Databases':
          return <VectorDatabasesDetails />;
        case 'Graph Databases':
          return <GraphDatabasesDetails />;
        case 'Hybrid retrieval':
            return <HybridRetrievalDetails />;
        case 'Reranking pipelines':
            return <RerankingPipelinesDetails />;
        case 'Indexing strategies (HNSW, IVF)':
            return <IndexingStrategiesDetails />;
        case 'Chunking and embedding':
            return <ChunkingAndEmbeddingDetails />;
        default:
          break;
      }
    }


    if (!skillDetails || skillDetails.learningPoints.length === 0) {
       return (
        <>
            <h3>{skillDetails?.title || selectedSkill}</h3>
            <p>{skillDetails?.description || "Select a skill to see the details."}</p>
            <div className="info-box">
                <p>Content for this section is coming soon!</p>
            </div>
        </>
       );
    }

    return (
      <>
        <h3>{skillDetails.title}</h3>
        <p>{skillDetails.description}</p>
        
        {skillDetails.learningPoints.map((point, index) => (
            <div key={index} className="learning-point">
            <h4>{point.title}</h4>
            <p>{point.description}</p>
            {point.examples && point.examples.map((example, exIndex) => (
                <div key={exIndex} className="code-example">
                {example.description && <p>{example.description}</p>}
                {example.code && <pre><code>{example.code}</code></pre>}
                </div>
            ))}
            </div>
        ))}
      </>
    );
  };

  return (
    <>
      <h2>Step {stepData.id}: {stepData.title}</h2>
      <p>{stepData.description}</p>
      <div className="step1-layout">
        <aside className="skills-sidebar">
          <h3 className="skills-title">Key Skills & Concepts</h3>
          <ul className="skills-list-vertical">
            {stepData.skills.map((skill) => (
              <li
                key={skill}
                className={`skill-item ${selectedSkill === skill ? 'active' : ''}`}
                onClick={() => setSelectedSkill(skill)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedSkill(skill)}
                role="button"
                tabIndex={0}
              >
                {skill}
              </li>
            ))}
          </ul>
        </aside>
        <section className="skill-details-panel">
          {renderSkillDetails()}
        </section>
      </div>
    </>
  );
};

export default Step2Content;