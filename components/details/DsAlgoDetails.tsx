import React from 'react';
import { dsAlgoData } from '../../data/details/dsAlgoData';

interface Visualization {
  type: 'array' | 'linked-list' | 'stack' | 'queue' | 'tree' | 'graph' | 'union-find';
  data: number[];
}

const DsAlgoDetails: React.FC = () => {
  const { title, description, learningPoints } = dsAlgoData;

  const renderVisualization = (vis: Visualization) => {
    switch(vis.type) {
      case 'array':
        return (
          <div className="vis-container vis-array">
            {vis.data.map((item: number, index: number) => (
              <div key={index} className="vis-element">
                <span className="vis-index">{index}</span>
                {item}
              </div>
            ))}
          </div>
        );
      case 'linked-list':
        return (
          <div className="vis-container vis-linked-list">
            {vis.data.map((item: number, index: number) => (
              <React.Fragment key={index}>
                <div className="vis-element">
                  {item}
                  <div className="vis-pointer"></div>
                </div>
                {index < vis.data.length - 1 && <span className="vis-arrow">→</span>}
              </React.Fragment>
            ))}
            <div className="vis-element vis-null">NULL</div>
          </div>
        );
      case 'stack':
        return (
          <div className="vis-container vis-stack">
            <div className="vis-stack-label-top">TOP</div>
            {vis.data.slice().reverse().map((item: number, index: number) => (
              <div key={index} className="vis-element">{item}</div>
            ))}
            <div className="vis-stack-label-bottom">BOTTOM</div>
          </div>
        );
      case 'queue':
        return (
          <div className="vis-container vis-queue">
            <div className="vis-queue-label-front">FRONT</div>
            {vis.data.map((item: number, index: number) => (
               <div key={index} className="vis-element">{item}</div>
            ))}
             <div className="vis-queue-label-rear">REAR</div>
          </div>
        );
      case 'tree':
        return <div className="vis-placeholder">Trees, BSTs, Heaps, and Tries are hierarchical and complex to visualize simply here, but imagine a root node with branching children.</div>;
      case 'graph':
         return <div className="vis-placeholder">Graphs are networks of nodes (vertices) connected by edges. Think of a social network map.</div>;
      case 'union-find':
        return <div className="vis-placeholder">Imagine sets of connected items, like groups of friends. Union-Find quickly merges groups and finds which group an item belongs to.</div>
      default:
        return null;
    }
  };

  return (
    <div className="ds-algo-details-container">
      <h3>{title}</h3>
      <p>{description}</p>

      {learningPoints.map((point) => (
        <div key={point.id} className="data-structure-card">
          <h4>{point.title}</h4>
          <p>{point.description}</p>
          
          <div className="visualization">
            <h5>Visualization</h5>
            {renderVisualization(point.visualization)}
          </div>

          <div className="pros-cons-grid">
            <div>
              <h5>Pros</h5>
              <ul>{point.pros.map((pro, i) => <li key={`pro-${point.id}-${i}`}>{pro}</li>)}</ul>
            </div>
            <div>
              <h5>Cons</h5>
              <ul>{point.cons.map((con, i) => <li key={`con-${point.id}-${i}`}>{con}</li>)}</ul>
            </div>
          </div>

          <div className="big-o-section">
            <h5>Big O Complexity</h5>
            <table className="big-o-table">
              <tbody>
                {Object.entries(point.bigO).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td><code>{value as string}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <a href={point.youtubeLink} target="_blank" rel="noopener noreferrer" className="youtube-link">
            Watch on YouTube
          </a>
        </div>
      ))}
    </div>
  );
};

export default DsAlgoDetails;
