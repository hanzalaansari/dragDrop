export const logPositions = (canvasItems) => {
  
  const containerWidth = document.querySelector('.canvas').offsetWidth; 
  const containerHeight = document.querySelector('.canvas').offsetHeight; 

  const positionsInPercentage = canvasItems.map(item => ({
    x: Math.floor((item.x / containerWidth) * 100) + "%",
    y: Math.floor((item.y / containerHeight) * 100) + "%",
    width: item.width,
    height: item.height
  }));

  console.log(positionsInPercentage);
  };
