import React, { useRef, useState } from "react";
import "./App.css";
import { logPositions } from "./util/getItemPositions";
import DraggableComp from "./components/DraggableComp";

function App() {
  const hiddenFileInput = useRef(null);
  const [canvasItems, setCanvasItems] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [slideDirection, setSlideDirection] = useState(null);
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [text, setText] = useState("");
  const [recnetAddedItemPosition, setRecnetAddedItemPosition] = useState({
    x: 0,
    y: 0,
  });

  const updateElement = (id, updatedProperties) => {
    setCanvasItems(
      canvasItems.map((element) =>
        element.id === id ? { ...element, ...updatedProperties } : element
      )
    );
  };

  const AnimateSelectedElemts = (direction) => {
    setSlideDirection(direction);
  };

  const handleElementSelect = () => {
    const updatedItems = canvasItems.map((element) => {
      if (element.id === selectedElementId) {
        return { ...element, zIndex: highestZIndex };
      }
      return element;
    });
    setCanvasItems(updatedItems);
    setHighestZIndex(highestZIndex + 1);
  };

  const AddImage = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        const newElement = {
          id: Date.now(),
          type: "image",
          width: 100,
          height: 100,
          x: recnetAddedItemPosition.x,
          y: recnetAddedItemPosition.y,
          rotation: 0,
          zIndex: highestZIndex,
          animation: slideDirection,
          text: "Text Element",
          url: newImage,
        };
        setCanvasItems((prevItems) => [...prevItems, newElement]);
        setHighestZIndex((prevZIndex) => prevZIndex + 1);
        setRecnetAddedItemPosition((previous) => ({
          x: previous.x + 10,
          y: previous.y + 10,
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const AddText = () => {
    setCanvasItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        type: "text",
        width: 100,
        height: 30,
        x: recnetAddedItemPosition.x,
        y: recnetAddedItemPosition.y,
        rotation: 0,
        zIndex: highestZIndex,
        animation: slideDirection,
        text: text,
      },
    ]);
    setText("");
    setRecnetAddedItemPosition((previous) => ({
      x: previous.x + 10,
      y: previous.y + 10,
    }));
  };
  const hanldleDeleteitem = () => {
    setCanvasItems((prevItems) => prevItems.filter((item) => (item.id !== selectedElementId)))
  }
  const SetuserInputText = (event) => {
    setText(event.target.value);
  };


  return (
    <div className="parent">
      <div className="toolbar">
        <div className="functionButton">
          <button onClick={() => hiddenFileInput.current.click()}>
            Add Image
          </button>
          <input
            ref={hiddenFileInput}
            style={{ display: "none" }}
            type="file"
            multiple
            accept="image/*"
            onChange={AddImage}
          />
          <button disabled={text?.length < 1} onClick={() => AddText()}>
            Add Text
          </button>
          <input
            className="inputBox"
            type="text"
            value={text}
            onChange={SetuserInputText}
            placeholder="Enter text"
          />
          <div className="tools-btn-parent">
            <button
              className="tools-btn"
              onClick={() => AnimateSelectedElemts("slide-right")}
            >
              Slide Right
            </button>
            <button
              className="tools-btn"
              onClick={() => AnimateSelectedElemts("slide-down")}
            >
              Slide Down
            </button>
            <button disabled={!canvasItems?.length} className="tools-btn" onClick={() => handleElementSelect()}>
              Bring Front
            </button>
          </div>
        </div>
        <button
          className="submit-button"
          onClick={() => logPositions(canvasItems)}
        >
          Submit
        </button>
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
            hanldleDeleteitem={hanldleDeleteitem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
