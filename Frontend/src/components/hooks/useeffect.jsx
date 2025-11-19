import React, { useState, useEffect } from 'react';

const UseEffectExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. useEffect without dependencies (runs after every render)
  useEffect(() => {
    console.log('Component rendered or re-rendered');
  });

  // 2. useEffect with empty dependency array (runs once after initial render)
  useEffect(() => {
    console.log('Component mounted - runs only once');
    
    // Cleanup function (runs when component unmounts)
    return () => {
      console.log('Component will unmount - cleanup');
    };
  }, []);

  // 3. useEffect with dependencies (runs when dependencies change)
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
    
    // Update document title
    document.title = `Count: ${count}`;
    
    // Cleanup for this effect
    return () => {
      console.log('Cleanup for count effect');
    };
  }, [count]); // Only re-run when count changes

  // 4. useEffect for API calls
  useEffect(() => {
    if (name) {
      setLoading(true);
      // Simulate API call
      const timer = setTimeout(() => {
        setData(`Fetched data for: ${name}`);
        setLoading(false);
      }, 1000);

      // Cleanup: cancel the API call if component unmounts or name changes
      return () => {
        clearTimeout(timer);
        setLoading(false);
      };
    }
  }, [name]);

  // 5. useEffect for event listeners
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup: remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>useEffect Hook Examples</h2>
      
      <div>
        <h3>Counter: {count}</h3>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Search Example</h3>
        <input
          type="text"
          placeholder="Type to search..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {loading && <p>Loading...</p>}
        {data && <p>{data}</p>}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Window Width: {windowWidth}px</h3>
        <p>Try resizing your browser window</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Effect Types:</h3>
        <ul>
          <li>No dependencies: Runs after every render</li>
          <li>Empty array: Runs once after mount</li>
          <li>With dependencies: Runs when dependencies change</li>
          <li>With cleanup: Returns cleanup function</li>
        </ul>
      </div>
    </div>
  );
};

export default UseEffectExample;