import React, { useState } from 'react';

function App() {
  // Initialize the state for the counter, step, and minimum value
  const [counter, setCounter] = useState(0);   // Counter value
  const [step, setStep] = useState(1);          // Step value (custom increment or decrement)
  const minValue = 0;                          // Minimum allowed counter value

  // Function to increase the counter
  const increaseCounter = () => {
    setCounter(prevCounter => prevCounter + step);
  };

  // Function to decrease the counter
  const decreaseCounter = () => {
    setCounter(prevCounter => Math.max(prevCounter - step, minValue));  // Prevent going below 0
  };

  // Function to reset the counter to the initial value (0)
  const resetCounter = () => {
    setCounter(0);
  };

  // Function to handle changes in the step value
  const handleStepChange = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {  // Ensure the step is positive
      setStep(value);
    }
  };

  return (
    <div className="App">
      <h1>Counter Application</h1>
      
      {/* Display the current counter value */}
      <div>
        <h2>{counter}</h2>
      </div>

      {/* Buttons for increasing and decreasing the counter */}
      <div>
        <button onClick={increaseCounter}>Increase</button>
        <button onClick={decreaseCounter}>Decrease</button>
      </div>

      {/* Reset button to reset the counter */}
      <div>
        <button onClick={resetCounter}>Reset</button>
      </div>

      {/* Input to set the custom step value */}
      <div>
        <label>Set Step: </label>
        <input
          type="number"
          value={step}
          onChange={handleStepChange}
          min="1"  // Ensure that the step is always positive
        />
      </div>
    </div>
  );
}

export default App;
