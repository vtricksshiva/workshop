import React from 'react';
import BasicFigure from './BasicFigure';

function FigureList({ figures, removeFigure }) {
  return (
    <div className="figure-list">
      {figures.map(figure => (
        <BasicFigure
          key={figure.id}
          imageUrl={figure.imageUrl}
          caption={figure.caption}
          onRemove={() => removeFigure(figure.id)} // Passing remove function
        />
      ))}
    </div>
  );
}

export default FigureList;
