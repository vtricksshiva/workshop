import React, { useState } from 'react';
import FigureList from './FigureList';
import './App.css'; // Importing the CSS file

function App() {

  const [figures, setFigures] = useState([
    { id: 1, imageUrl: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350', caption: 'Image 1' }, // From public/images folder
    { id: 2, imageUrl: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350', caption: 'Image 2' },
  ]);
  

  const addFigure = () => {
    const newFigure = {
      id: Date.now(), // Unique ID based on timestamp
      imageUrl: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350', // New placeholder image
      caption: `New Image ${figures.length + 1}`, // Generate a new caption
    };
    setFigures([...figures, newFigure]); // Add new figure to the state
  };

  const removeFigure = (id) => {
    setFigures(figures.filter(figure => figure.id !== id)); // Remove figure by ID
  };
//   If the id of the current figure is not equal to the id passed to the function, the figure will be included in the new array.
// If the id of the current figure matches the id passed in, the figure will not be included in the new array.

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <FigureList figures={figures} removeFigure={removeFigure} />
      <button className="add-button" onClick={addFigure}>Add Image</button>
    </div>
  );
}

export default App;
