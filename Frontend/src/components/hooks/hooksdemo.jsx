import React from 'react';
import UseStateExample from '../hooks/usestate';
import UseEffectExample from '../hooks/useeffect';
import UseRefExample from '../hooks/useref';
import UseContextExample from '../hooks/usecontext';

const HooksDemoApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Hooks Demo</h1>
      <p>Explore how different React hooks work:</p>
      
      <UseStateExample />
      <UseEffectExample />
      <UseRefExample />
      <UseContextExample />
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5' }}>
        <h3>Hook Summary:</h3>
        <ul>
          <li><strong>useState</strong>: Manage component state</li>
          <li><strong>useEffect</strong>: Handle side effects and lifecycle</li>
          <li><strong>useRef</strong>: Access DOM and store mutable values</li>
          <li><strong>useContext</strong>: Access context without prop drilling</li>
        </ul>
      </div>
    </div>
  );
};

export default HooksDemoApp;