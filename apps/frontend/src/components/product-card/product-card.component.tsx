import React, { FC, useCallback, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Box, Link, Typography  } from '@mui/material';
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd';
import { 
  cardHeight, 
  cardWidth, 
  maxLeftCoord, 
  maxTopCoord, 
  offset 
} from '../../constants/product-card.constants';
import { IProductCardProps, IWidgetItem } from './product-card.types';
import { linkStyle } from './product-card.styles';
import ProductCardLayer from '../product-card-layer/product-card-layer.component';
import getCardCoord from '../../utils/get-card-coord.utils';


const ProductCard: FC<IProductCardProps> = (
  { widget, setCurrentCoords }: IProductCardProps
) => {
  const videoContainerNode = document.getElementById('video-container');

  const videoContainerCoords = useMemo(
    () => videoContainerNode ? videoContainerNode.getBoundingClientRect() : null, 
    [videoContainerNode]
  );

  const { id, left, top } = widget;

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'prod-card',
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      }),
    }),
    [id, left, top]
  );

  const showProductCardLayer = useCallback((widget: IWidgetItem) => {
    if (!videoContainerNode) {
      return null;
    }

    if (!isDragging) {
      return null;
    }

    return ReactDOM.createPortal(
      <ProductCardLayer widget={widget} setCurrentCoords={setCurrentCoords} />,
      videoContainerNode
    );
  }, [videoContainerNode, isDragging, setCurrentCoords]);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  if (!videoContainerCoords) {
    return null;
  }

  const topCoord = top > 0 ? top : 1;
  const leftCoord = left > 0 ? left : 1;

  const topCard = getCardCoord(maxTopCoord, topCoord, cardHeight, offset);

  const leftCard = getCardCoord(maxLeftCoord, leftCoord, cardWidth, offset);

  const transform = `translate(${leftCard}px, ${topCard}px)`;

  return (
    <>
      {showProductCardLayer(widget)}
      <Box
        ref={drag}
        p={1.5} 
        boxSizing="border-box" 
        position="absolute" 
        width={cardWidth}
        top={topCard}
        left={leftCard} 
        bgcolor="#fff" 
        borderRadius={3} 
        boxShadow="1px 1px 8px 0 grey" 
        zIndex={3}
        display="flex"
        flexDirection="column"
        key={widget.id}
        id={widget.id}
        sx={{
          transform,
          opacity: isDragging ? 0 : 1,
          height: isDragging ? 0 : cardHeight
        }}
      >       
        <Typography variant="h5">{widget?.title}</Typography>
        <Typography fontSize="18px">Price: {widget?.price} $</Typography> 
        <Box display="flex" justifyContent="flex-end">  
          <Link 
            variant="button" 
            underline="none" 
            href={widget?.url} 
            target="blank"
            sx={linkStyle} 
          >
            SHOP
          </Link> 
        </Box> 
      </Box>
    </>
  )
};

export default ProductCard;