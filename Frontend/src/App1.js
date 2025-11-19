import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

function App() {
  // Step 1: Declare a state variable to store the input value
  const [inputValue, setInputValue] = useState('');

  // Step 2: Handle the input change event
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <h1>{inputValue}</h1> {/* Step 3: Dynamically update the <h1> based on input */}

      {/* Step 4: Add an input field to capture user input */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
    </div>
  );
}

export default App;

