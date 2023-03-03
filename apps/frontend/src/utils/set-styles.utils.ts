import { XYCoord } from 'react-dnd';

function setStyles(
  initialOffset: XYCoord | null, 
  currentOffset: XYCoord | null 
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    }
  }
  
  const { x, y } = currentOffset;
  
  const transform = `translate(${x}px, ${y}px)`;
  
  return { transform }
}

export default setStyles;