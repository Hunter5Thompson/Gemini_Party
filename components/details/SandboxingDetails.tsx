import React from 'react';
import { step9Data } from '../../data/step9Data';

const SandboxingDetails: React.FC = () => {
  const details = step9Data['Sandboxing'];

  return (
    <>
      <h3>{details.title}</h3>
      <p>{details.description}</p>

      {details.learningPoints.map((point, index) => (
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

export default SandboxingDetails;
