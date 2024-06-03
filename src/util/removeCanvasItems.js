export const removeCanvasItems = (setCanvasItems,selectedElementId) => {
    setCanvasItems((prevItems) => prevItems.filter((item) => (item.id !== selectedElementId)))
  }