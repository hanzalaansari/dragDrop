import { useRef } from "react";

function DraggableComp({ element, updateElement }) {
    const elementRef = useRef(null);
  
    const handleMouseDown = (e) => {
      const startX = e.clientX;
      const startY = e.clientY;
      const startPosX = element.x;
      const startPosY = element.y;
  
      const handleMouseMove = (moveEvent) => {
        const newX = startPosX + (moveEvent.clientX - startX);
        const newY = startPosY + (moveEvent.clientY - startY);
        updateElement(element.id, { x: newX, y: newY });
      };
  
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
  
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
  
    const handleResizeMouseDown = (e, direction) => {
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = element.width;
      const startHeight = element.height;
  
      const handleMouseMove = (moveEvent) => {
        const newWidth = startWidth + (direction.includes('right') ? moveEvent.clientX - startX : 0);
        const newHeight = startHeight + (direction.includes('bottom') ? moveEvent.clientY - startY : 0);
        updateElement(element.id, { width: newWidth, height: newHeight });
      };
  
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
  
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
  
    return (
      <div
        className="draggable-resizable-element"
        style={{
          width: element.width,
          height: element.height,
          transform: `translate(${element.x}px, ${element.y}px)`,
        }}
        onMouseDown={handleMouseDown}
        ref={elementRef}
      >
        {element.type === 'text' ? (
          <div className="text-element">{element.text}</div>
        ) : (
          <img src="https://via.placeholder.com/100" alt="placeholder" className="image-element" />
        )}
        <div className="resize-handle right" onMouseDown={(e) => handleResizeMouseDown(e, 'right')}></div>
        <div className="resize-handle bottom" onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}></div>
        <div className="resize-handle bottom-right" onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}></div>
      </div>
    );
  }

  export default DraggableComp