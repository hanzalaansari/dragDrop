import React, { useState } from 'react';
import './App.css';
import { logPositions } from './util/getItemPositions';
import DraggableComp from './components/DraggableComp';

function App() {
  const [canvasItems, setCanvasItems] = useState([]);
  const [elementId, setElementId] = useState(0);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [slideDirection, setSlideDirection] = useState(null);
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [text, setText] = useState("");

  const addElement = (type) => {
    const newElement = {
      id: elementId,
      type: type,
      width: 100,
      height: type === "text" ? 30 : 100,
      x: 1/2,
      y: 1/2,
      rotation: 0,
      zIndex: highestZIndex,
      animation:slideDirection,
      text: 'Text Element',
    };
    setCanvasItems([...canvasItems, newElement]);
    setElementId(elementId + 1);
    setHighestZIndex(highestZIndex + 1);
  };

  const updateElement = (id, updatedProperties) => {
    setCanvasItems(canvasItems.map(element => element.id === id ? { ...element, ...updatedProperties } : element));
  };

  const slideSelectedElement = (direction) => {
    setSlideDirection(direction);
  };

  const handleElementSelect = () => {
    const updatedItems = canvasItems.map(element => {
      if (element.id === selectedElementId) {
        return { ...element, zIndex: highestZIndex };
      }
      return element;
    });
    setCanvasItems(updatedItems);
    setHighestZIndex(highestZIndex + 1);
  };

  const addText = () => {
    setCanvasItems(prevItems => [
      ...prevItems,
      {
        id: Date.now(),
        type: "text",
        width: 100,
        height: 30,
        x: 1/2,
        y: 1/2,
        rotation: 0,
        zIndex: highestZIndex,
        animation:slideDirection,
        text: text,
      }
    ]);
    setText('');
  };
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="parent">
      <div className="toolbar">
        <div className='functionButton'>
        <button onClick={() => addElement('image')}>Add Image</button>
        <button onClick={() => addElement('text')}>Add Text</button>
        <button disabled={text?.length < 1} onClick={() => addText()}>Add Text Input</button>
        <input
        className='inputBox'
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text"
        />
        <div className='tools-btn-parent'>
        <button className='tools-btn' onClick={() => slideSelectedElement('slide-right')}>Slide Right</button>
          <button className='tools-btn' onClick={() => slideSelectedElement('slide-down')}>Slide Down</button>
          <button className='tools-btn' onClick={() => handleElementSelect()}>Bring Front</button>
          </div>
        </div>
        <button className="submit-button" onClick={() =>logPositions(canvasItems)}>Submit</button>
      </div>
      <div className="canvas">
        {canvasItems.map((element) => (
          <DraggableComp
            key={element.id}
            element={element}
            updateElement={updateElement}
            isSelected={selectedElementId === element.id}
            setSelectedElementId={setSelectedElementId}
            slideDirection={slideDirection}
            setSlideDirection={setSlideDirection}
            highestZIndex={highestZIndex}
            setHighestZIndex={highestZIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default App;