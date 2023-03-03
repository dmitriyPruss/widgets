import { FC, useEffect } from 'react'
import { Box, Typography, Link } from '@mui/material';
import { useDragLayer } from 'react-dnd';
import { red } from '@mui/material/colors';
import setStyles from '../../utils/set-styles.utils';
import { IProductCardLayerProps } from './product-card-layer.types';
import { layerStyle, linkStyle } from './product-card-layer.styles';


const ProductCardLayer: FC<IProductCardLayerProps> = (
  { widget, setCurrentCoords }: IProductCardLayerProps
) => {
  const {  
    isDragging,  
    initialOffset, 
    currentOffset 
  } = useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    if (!currentOffset) {
      return;
    }

    const { x, y } = currentOffset;

    setCurrentCoords({
      x: (x - 30) / 2,
      y: (y - 110) / 2
    });
  }, [
    currentOffset, 
    isDragging, 
    setCurrentCoords
  ]);

  if(!isDragging) {
    return null
  }

  return (
    <div style={layerStyle}>
      <div
        style={setStyles(initialOffset, currentOffset)}
      >
        <Box 
          width="230px" 
          height="140px"       
          bgcolor={red[100]} 
          borderRadius={3} 
          boxShadow="1px 1px 8px 0 grey" 
          zIndex={300}
          border={`3px double ${red[300]}`}
          p={1.5}
        >
          <Typography variant="h5">{widget?.title}</Typography>
          <Typography fontSize="18px">Price: {widget?.price} $</Typography>
          <Box display="flex" justifyContent="flex-end">  
            <Link 
              variant="button" 
              underline="none" 
              target="blank"
              sx={linkStyle} 
            >
              SHOP
            </Link> 
          </Box>  
        </Box>
      </div>
    </div>
  )
}

export default ProductCardLayer;