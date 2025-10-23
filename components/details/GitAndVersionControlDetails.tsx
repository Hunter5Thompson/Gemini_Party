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
      // Fix: Initialize GoogleGenAI with a named apiKey parameter as per guidelines.
      // The API key is sourced from process.env.API_KEY as per instructions.
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
    } catch (e: any) {
      setError(`Failed to generate commit message: ${e.message}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const { title, description, learningPoints, interactiveTool } = gitAndVersionControlData;

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