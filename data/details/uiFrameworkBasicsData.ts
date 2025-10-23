export const uiFrameworkBasicsData = {
  title: "UI Framework Basics Explained (React)",
  description: "To build interactive AI applications, you need a user interface. Modern UIs are built with component-based frameworks like React. Let's explore the core concepts that allow you to create dynamic and responsive web experiences.",
  learningPoints: [
    {
      title: "What is a Component?",
      description: "Components are the fundamental building blocks of a React application. They are reusable, self-contained pieces of UI. Think of them like custom, super-powered HTML tags. You build a complex UI by composing simple components together.",
      examples: [
        {
          description: "A simple function component that takes `name` as a property (prop) and displays a personalized greeting. This component can be reused anywhere you need a welcome message.",
          code: `function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// You can then use it in your app like this:
<Welcome name="AI Engineer" />`
        }
      ]
    },
    {
      title: "Managing State with the `useState` Hook",
      description: "Static components are not very interactive. 'State' is data that a component can hold and change over time. When the state changes, the component automatically re-renders to display the new data. The `useState` hook is the primary way to add state to function components.",
      examples: [
        {
          description: "A classic counter component. Clicking the button calls `setCount`, which updates the `count` state variable. React detects this change and re-renders the component to show the new count.",
          code: `import React, { useState } from 'react';

function Counter() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`
        }
      ]
    },
    {
      title: "Handling Side Effects with the `useEffect` Hook",
      description: "What if your component needs to do something that isn't directly related to rendering, like fetching data from an API, setting a timer, or manually changing the DOM? These actions are called 'side effects'. The `useEffect` hook lets you perform side effects from within your function components.",
      examples: [
        {
          description: "This component uses `useEffect` to update the document's title every time the `count` state changes. The array `[count]` at the end is the 'dependency array'—it tells React to only re-run the effect if `count` has changed.",
          code: `import React, { useState, useEffect } from 'react';

function DocumentTitleChanger() {
  const [count, setCount] = useState(0);

  // This effect runs after every render where 'count' has changed.
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]); // Only re-run the effect if count changes

  return (
    <div>
      <p>Check the browser tab title!</p>
      <button onClick={() => setCount(count + 1)}>
        Click me to update the title
      </button>
    </div>
  );
}`
        }
      ]
    }
  ]
};
