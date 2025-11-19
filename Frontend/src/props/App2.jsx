import React, { useState } from 'react';

import Header from './Header';  // Import the Header component
import Footer from './Footer';  // Import the Footer component

function App() {
  // Data to pass down as props
//   const title = "My React Application";
//   const tagline = "© 2025 All Rights Reserved";
 // Step 1: Declare a state variable to store the input value
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
// © 2025 All Rights Reserved
  // Step 2: Handle the input change event
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };


  // Step 2: Handle the input change event
  const handleTaglineChange = (event) => {
    setTagline(event.target.value);
  };
  return (
    <div className="App">
      {/* Pass the data to child components using props */}
      <Header 
      title={title} 
      onChange={handleTitleChange}
      
      />
   
{/* Step 4: Add an input field to capture user input */}
<input
  type="text"
  value={title}
  onChange={handleTitleChange}
  placeholder="Type Header..."
/>


{/* Step 4: Add an input field to capture user input */}
<input
  type="text"
  value={tagline}
  onChange={handleTaglineChange}
  placeholder="Type Footer..."
/>


      <Footer 
      tagline={tagline}
      onChange={handleTaglineChange}
      
      />
    </div>
  );
}

export default App;
