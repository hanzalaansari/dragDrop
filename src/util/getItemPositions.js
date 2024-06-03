export const logPositions = (canvasRef,canvasItems) => {

  const positionsInPercentage = canvasItems.map(item => ({
    x: Math.floor((item.x / canvasRef.current.offsetWidth) * 100) + "%",
    y: Math.floor((item.y / canvasRef.current.offsetHeight) * 100) + "%",
    width: Math.floor((item.width/canvasRef.current.offsetWidth) * 100) + "%",
    height: Math.floor((item.height/canvasRef.current.offsetWidth) * 100) + "%",
    rotation: item.rotation,
    AnimationType: item.animation,
    url:item.url,
    contentType:item.type
  }));
  console.log(positionsInPercentage);
  };
