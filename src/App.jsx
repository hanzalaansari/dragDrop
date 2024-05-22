import React, { useState, useRef } from 'react';
import './App.css';
import { logPositions } from './util/getItemPositions';
import DraggableComp from './components/DraggableComp';

function App() {
  const [canvasItems, setCanvasItems] = useState([]);
  const [elementId, setElementId] = useState(0);

  const addElement = (type) => {
    const newElement = {
      id: elementId,
      type: type,
      width: 100,
      height: 100,
      x: 10,
      y: 10,
      text: 'Text Element',
    };
    
  const numCols = 3; 
  const colWidth = 120; 
  const rowHeight = 120; 
  const margin = 10; 

  const xPos = (canvasItems.length % numCols) * (colWidth + margin);
  const yPos = Math.floor(canvasItems.length / numCols) * (rowHeight + margin);

  newElement.x = xPos;
  newElement.y = yPos;
    setCanvasItems([...canvasItems, newElement]);
    setElementId(elementId + 1);
  };

  const updateElement = (id, updatedProperties) => {
    setCanvasItems(canvasItems.map(element => element.id === id ? { ...element, ...updatedProperties } : element));
  };

  return (
    <div className="parent">
      <div className="toolbar">
        <div className='functionButton'>
        <button onClick={() => addElement('text')}>Add Text</button>
        <button onClick={() => addElement('image')}>Add Image</button>
        </div>
        <button className="submit-button" onClick={() =>logPositions(canvasItems)}>Submit</button>
      </div>
      <div className="canvas">
        {canvasItems.map((element) => (
          <DraggableComp
            key={element.id}
            element={element}
            updateElement={updateElement}
          />
        ))}
      </div>
    </div>
  );
}

export default App;