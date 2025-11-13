import React from 'react';
import { chunkingAndEmbeddingData } from '../../data/details/chunkingAndEmbeddingData';

const ChunkingAndEmbeddingDetails: React.FC = () => {
  const { title, description, learningPoints } = chunkingAndEmbeddingData;

  return (
    <>
      <h3>{title}</h3>
      <p>{description}</p>

      {learningPoints.map((point) => (
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

export default ChunkingAndEmbeddingDetails;
