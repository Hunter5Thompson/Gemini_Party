import React from 'react';
import { step9Data } from '../../data/step9Data';

const PromptInjectionDefensesDetails: React.FC = () => {
  const details = step9Data['Prompt injection defenses'];

  return (
    <>
      <h3>{details.title}</h3>
      <p>{details.description}</p>

      {details.learningPoints.map((point) => (
        <div key={`point-${point.title}`} className="learning-point">
          <h4>{point.title}</h4>
          <p>{point.description}</p>
          {point.examples.map((example, exIndex) => (
            <div key={`example-${point.title}-${exIndex}`} className="code-example">
              <p>{example.description}</p>
              <pre><code>{example.code}</code></pre>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default PromptInjectionDefensesDetails;
