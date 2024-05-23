import { useEffect, useRef, useState } from "react";

function DraggableComp({ element, updateElement,isSelected,slideDirection,setSlideDirection,setSelectedElementId }) {
    const elementRef = useRef(null);
    const containerHeight = document.querySelector('.canvas').offsetHeight; 
    const containerWidth = document.querySelector('.canvas').offsetWidth; 

    const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (slideDirection && elementRef.current && isSelected) {
      setIsAnimating(true);
      elementRef.current.classList.add(slideDirection);

      const handleAnimationEnd = () => {
        setIsAnimating(false);
        elementRef.current.classList.remove(slideDirection);

        let newProperties = {};
        switch (slideDirection) {
          case 'slide-right':
            newProperties = { x: element.x + containerWidth * 0.8 - element.x,animation:'slide-right' };
            break;
          case 'slide-down':
            newProperties = { y: element.y + containerHeight * 0.8 - element.y,animation:'slide-down' };
            break;
          default:
            break;
        }

        updateElement(element.id, newProperties);
        setSlideDirection(null)
      };

      elementRef.current.addEventListener('animationend', handleAnimationEnd);

      return () => {
        if (elementRef.current) {
          elementRef.current.removeEventListener('animationend', handleAnimationEnd);
        }
      };
    }
  }, [slideDirection, element.id,]);

  
    const handleMouseDown = (e) => {
      setSelectedElementId(element.id);
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

    const handleRotateMouseDown = (e) => {
      e.stopPropagation();
      const centerX = element.x + element.width / 2;
      const centerY = element.y + element.height / 2;
  
      const handleMouseMove = (moveEvent) => {
        const dx = moveEvent.clientX - centerX;
        const dy = moveEvent.clientY - centerY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        updateElement(element.id, { rotation: angle });
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
      className={`draggable-resizable-element ${isSelected ? 'selected' : ''}`}
        style={{
          width: element.width,
          height: element.height,
          zIndex: element.zIndex,
          transform: `translate(${element.x}px, ${element.y}px) rotate(${element.rotation}deg)`,
        }}
        onMouseDown={handleMouseDown}
        ref={elementRef}
      >
        {element.type === 'text' ? (
          <div className="text-element">{element.text}</div>
        ) : (
          <img src={element.url} alt={element.url} className="image-element" />
          // <img src="https://via.placeholder.com/100" alt="placeholder" className="image-element" />
        )}
       {isSelected &&
       <>
        <div className="resize-handle right" onMouseDown={(e) => handleResizeMouseDown(e, 'right')}></div>
        <div className="resize-handle bottom" onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}></div>
        <div className="resize-handle bottom-right" onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}></div>
        <div className="rotate" onMouseDown={handleRotateMouseDown}>↺</div>
        </>
        }
      </div>
    );
  }

  export default DraggableComp