import React from 'react';

function BasicFigure({ imageUrl, caption, onRemove }) {
  return (
    <div className="figure-container">
      <img src={imageUrl} alt={caption} className="figure-image" />
    

      <div className="figure-caption">
        <p>{caption}</p>
        <button onClick={onRemove} className="remove-button">Remove</button>
      </div>
    </div>
  );
}

export default BasicFigure;
