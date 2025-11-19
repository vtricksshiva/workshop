
import React, { useState, useRef, useEffect } from 'react';

const UseRefExample = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const countRef = useRef(0);
  const previousCountRef = useRef();
  const videoRef = useRef(null);

  // 1. Accessing DOM elements
  const focusInput = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };

  // 2. Storing mutable values that don't cause re-renders
  const incrementWithoutRender = () => {
    countRef.current += 1;
    console.log('Current countRef value:', countRef.current);
  };

  // 3. Storing previous values
  useEffect(() => {
    previousCountRef.current = count;
  }, [count]);

  // 4. Controlling media elements
  const playVideo = () => {
    videoRef.current.play();
  };

  const pauseVideo = () => {
    videoRef.current.pause();
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>useRef Hook Examples</h2>

      {/* DOM Access Example */}
      <div>
        <h3>1. DOM Element Access</h3>
        <input
          ref={inputRef}
          type="text"
          placeholder="Click button to focus me"
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button onClick={focusInput}>Focus Input</button>
      </div>

      {/* Mutable Value Example */}
      <div style={{ marginTop: '20px' }}>
        <h3>2. Mutable Values (No Re-render)</h3>
        <p>State Count (causes re-render): {count}</p>
        <p>Ref Count (no re-render): {countRef.current}</p>
        <button onClick={() => setCount(count + 1)}>
          Increment State (+re-render)
        </button>
        <button onClick={incrementWithoutRender}>
          Increment Ref (no re-render)
        </button>
        <button onClick={() => console.log('Ref value:', countRef.current)}>
          Log Ref Value
        </button>
      </div>

      {/* Previous Value Example */}
      <div style={{ marginTop: '20px' }}>
        <h3>3. Tracking Previous Values</h3>
        <p>Current Count: {count}</p>
        <p>Previous Count: {previousCountRef.current}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>

      {/* Media Control Example */}
      <div style={{ marginTop: '20px' }}>
        <h3>4. Media Element Control</h3>
        <video
          ref={videoRef}
          width="400"
          controls
          style={{ display: 'block', marginBottom: '10px' }}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button onClick={playVideo}>Play</button>
        <button onClick={pauseVideo}>Pause</button>
      </div>

      {/* Stopwatch Example */}
      <div style={{ marginTop: '20px' }}>
        <StopwatchWithRef />
      </div>
    </div>
  );
};

// Additional example: Stopwatch using useRef
const StopwatchWithRef = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h4>Stopwatch using useRef</h4>
      <p>Time: {time} seconds</p>
      <button onClick={startStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default UseRefExample;