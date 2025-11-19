//  Introduction to Hooks
// What are Hooks?

// Hooks are special functions that let you "hook into" React features from functional components

// Introduced in React 16.8 (February 2019)

// Allow functional components to have state, lifecycle methods, and other React features that were previously only available in class components

// Why Hooks?

// Solve problems of complex class components (this binding, wrapper hell, etc.)

// Make code more reusable and organized

// Easier to understand and test

// Rules of Hooks:

// Only call Hooks at the top level (not inside loops, conditions, or nested functions)

// Only call Hooks from React functional components or custom Hooks


import React, { useState } from 'react';

const UseStateExample = () => {
  // Basic state
  const [count, setCount] = useState(0);
  
  // Object state
  const [user, setUser] = useState({
    name: 'John',
    age: 25,
    email: 'john@example.com'
  });
  
  // Array state
  const [items, setItems] = useState(['Apple', 'Banana', 'Orange']);

  // Function to update count
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  // Update object state (merge with spread operator)
  const updateName = () => {
    setUser(prevUser => ({
      ...prevUser,
      name: 'Jane'
    }));
  };

  // Update array state
  const addItem = () => {
    setItems(prevItems => [...prevItems, 'Grape']);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>useState Hook Examples</h2>
      
      {/* Counter Example */}
      <div>
        <h3>Counter: {count}</h3>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      {/* Object State Example */}
      <div style={{ marginTop: '20px' }}>
        <h3>User Info</h3>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Email: {user.email}</p>
        <button onClick={updateName}>Change Name to Jane</button>
        <button onClick={() => setUser(prev => ({ ...prev, age: 30 }))}>
          Set Age to 30
        </button>
      </div>

      {/* Array State Example */}
      <div style={{ marginTop: '20px' }}>
        <h3>Items List</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button onClick={addItem}>Add Grape</button>
        <button onClick={() => setItems(prev => prev.filter((_, i) => i !== 0))}>
          Remove First Item
        </button>
      </div>
    </div>
  );
};

export default UseStateExample;