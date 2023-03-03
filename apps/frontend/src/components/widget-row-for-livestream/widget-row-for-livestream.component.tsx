import React, { FC, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Box,
  Button,
  TableRow,
  TableCell,
  Typography
} from '@mui/material';
import { blue } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { WidgetDto } from '@boilerplate/shared';
import ProductCard from '../product-card/product-card.component';
import { IWidgetItem, IWidgetRowForLiveStreamProps } from './widget-row-for-livestream.types';
import { buttonStyle, iconStyle } from './widget-row-for-livestream.styles';


const WidgetRowForLiveStream: FC<IWidgetRowForLiveStreamProps> = (
  { widget, setCurrentCoords }: IWidgetRowForLiveStreamProps 
) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWindowDisplay = useCallback(() => {
    setIsOpen(!isOpen);
  }, 
  [isOpen]);

  const videoContainerNode = document.getElementById('video-container');

  const showProductCard = useCallback((widget: IWidgetItem) => {
    if (!videoContainerNode) {
      return null;
    }

    return ReactDOM.createPortal(
      <ProductCard widget={widget} setCurrentCoords={setCurrentCoords} />
      ,
      videoContainerNode
    );
  }, [videoContainerNode, setCurrentCoords]);

  return (
    <>
      {isOpen && showProductCard(widget) }
		  <TableRow sx={{ bgcolor: isOpen ? blue[50] : '#fff' }}>
        <TableCell>
          <Box width="220px">
            {widget.title}
          </Box>
        </TableCell>
        <TableCell>
          <Box>
            <Button
              variant="outlined" 
              color={isOpen ? "error" : "primary"}
              onClick={() => { toggleWindowDisplay(); }}
              sx={buttonStyle}
            >              
              <Typography fontSize="14px" fontWeight="bold">
                {isOpen ? 'Hide' : 'Show'}
              </Typography>
              {isOpen 
                ? <VisibilityOffIcon sx={iconStyle} /> 
                : <VisibilityIcon sx={iconStyle} />
              }
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    </>
  )
};

export default WidgetRowForLiveStream;