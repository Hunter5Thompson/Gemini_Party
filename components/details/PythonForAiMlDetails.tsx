import React from 'react';
import { pythonForAiMlData } from '../../data/details/pythonForAiMlData';

const PythonForAiMlDetails: React.FC = () => {
  const { title, description, learningPoints } = pythonForAiMlData;

  return (
    <>
      <h3>{title}</h3>
      <p>{description}</p>

      {learningPoints.map((point, index) => (
        <div key={index} className="learning-point">
          <h4>{point.title}</h4>
          <p>{point.description}</p>
          {point.examples.map((example, exIndex) => (
            <div key={exIndex} className="code-example">
              <p>{example.description}</p>
              <pre><code>{example.code}</code></pre>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default PythonForAiMlDetails;