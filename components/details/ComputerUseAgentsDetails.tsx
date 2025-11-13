import React from 'react';
import { step10Data } from '../../data/step10Data';

const ComputerUseAgentsDetails: React.FC = () => {
  const details = step10Data['Computer use'];

  return (
    <>
      <h3>{details.title}</h3>
      <p>{details.description}</p>

      {details.learningPoints.map((point, index) => (
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

export default ComputerUseAgentsDetails;
