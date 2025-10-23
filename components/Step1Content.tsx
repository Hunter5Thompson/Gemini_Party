// Fix: Populating placeholder file with a functional component.
import React, { useState } from 'react';
import { step1Data } from '../data/step1Data';
import GitAndVersionControlDetails from './details/GitAndVersionControlDetails';
import UiFrameworkBasicsDetails from './details/UiFrameworkBasicsDetails';
import DsAlgoDetails from './details/DsAlgoDetails';
import PythonForAiMlDetails from './details/PythonForAiMlDetails';

interface StepData {
  id: number;
  title: string;
  description: string;
  skills: string[];
}

interface Step1ContentProps {
  stepData: StepData;
}

type SkillDetail = {
  title: string;
  description:string;
  points: string[];
};

type Step1Data = {
  [key: string]: SkillDetail;
};

const Step1Content: React.FC<Step1ContentProps> = ({ stepData }) => {
  const [selectedSkill, setSelectedSkill] = useState<string>(stepData.skills[0]);

  const typedStep1Data = step1Data as Step1Data;
  const skillDetails = typedStep1Data[selectedSkill];

  const renderSkillDetails = () => {
    if (selectedSkill === "Python") {
      return <PythonForAiMlDetails />;
    }

    if (selectedSkill === "Git & version control") {
      return <GitAndVersionControlDetails />;
    }
    
    if (selectedSkill === "UI Framework Basics (React)") {
      return <UiFrameworkBasicsDetails />;
    }

    if (selectedSkill === "Basic DS & Algos") {
      return <DsAlgoDetails />;
    }

    if (!skillDetails) {
      return <p>Select a skill to see details.</p>;
    }

    return (
      <>
        <h3>{skillDetails.title}</h3>
        <p>{skillDetails.description}</p>
        <ul>
          {skillDetails.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
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

export default Step1Content;