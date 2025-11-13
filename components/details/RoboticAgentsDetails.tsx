import React from 'react';
import { step10Data } from '../../data/step10Data';

const RoboticAgentsDetails: React.FC = () => {
  const details = step10Data['Robotic Agents'];

  return (
    <>
      <h3>{details.title}</h3>
      <p>{details.description}</p>

      {details.learningPoints.map((point) => (
        <div key={`point-${point.title}`} className="learning-point">
          <h4>{point.title}</h4>
          <p>{point.description}</p>
          {point.examples && point.examples.map((example, exIndex) => (
            <div key={`example-${point.title}-${exIndex}`} className="code-example">
              {example.description && <p>{example.description}</p>}
              {example.code && <pre><code>{example.code}</code></pre>}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default RoboticAgentsDetails;
