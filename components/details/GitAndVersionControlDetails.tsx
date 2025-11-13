// Fix: Populating placeholder file with a functional component.
import React, { useState } from 'react';
import { gitAndVersionControlData } from '../../data/details/gitAndVersionControlData';
// Fix: Importing GoogleGenAI as per guidelines.
import { GoogleGenAI } from '@google/genai';

const GitAndVersionControlDetails: React.FC = () => {
  const [changeDescription, setChangeDescription] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCommitMessage = async () => {
    if (!changeDescription.trim()) {
      setError('Please describe your changes.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setCommitMessage('');

    try {
      // SECURITY WARNING: Using API keys directly in client-side code is insecure
      // for production applications. This approach is acceptable only for Google AI
      // Studio environments. For production, use a backend API proxy instead.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      
      const prompt = `Generate a concise and descriptive conventional commit message for the following changes:\n\n${changeDescription}\n\nFormat the output as a single-line commit message. For example: "feat: add user authentication feature"`;
      
      // Fix: Use ai.models.generateContent with the correct model and prompt.
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      // Fix: Extract text directly from response.text as per guidelines.
      const text = response.text;
      setCommitMessage(text.trim());
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(`Failed to generate commit message: ${errorMsg}`);
      console.error('Commit generation failed:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const { title, description, learningPoints, interactiveTool } = gitAndVersionControlData;

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

      <div className="interactive-tool">
        <h4>{interactiveTool.title}</h4>
        <p>{interactiveTool.description}</p>
        <textarea
          value={changeDescription}
          onChange={(e) => setChangeDescription(e.target.value)}
          placeholder="e.g., Fixed a bug in the login page where the password was not being validated."
          rows={4}
          disabled={isLoading}
        />
        <button onClick={handleGenerateCommitMessage} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Commit Message'}
        </button>
        {error && <p className="error-message">{error}</p>}
        {commitMessage && (
          <div className="generated-commit">
            <h4>Generated Message:</h4>
            <pre><code>{commitMessage}</code></pre>
          </div>
        )}
      </div>
    </>
  );
};

export default GitAndVersionControlDetails;