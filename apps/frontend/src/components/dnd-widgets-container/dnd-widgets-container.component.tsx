import React, { FC, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Box } from '@mui/material';
import { 
  IWidgetItem, 
  IDndWidgetContainerProps, 
  IMoveWidget 
} from './dnd-widgets-container.types';


const DndWidgetsContainer: FC<IDndWidgetContainerProps> = (
  { 
	widgets, 
	setWidgets,
	currentCoords,
	children 
  }: IDndWidgetContainerProps
) => {
  const moveWidget: IMoveWidget = useCallback(
    (id, left, top) => {
	  const newWidget = widgets.find(widget => widget.id === id);

	  if (!newWidget) {
	    return;
	  }

	  newWidget.left = left;
	  newWidget.top = top;

	  const newWidgets = widgets.map(widget => {
	    if(widget.id === newWidget.id) {
		  widget.left = newWidget.left;
		  widget.top = newWidget.top;
	    }

	    return widget;
	  });

	  setWidgets(newWidgets);
    },
    [widgets, setWidgets, currentCoords]
  );

  const [collectedProps, drop] = useDrop(
    () => ({
      accept: 'prod-card',
      drop( item: IWidgetItem) {
		if (!item.id) {
		  return;
		}

		const left = currentCoords.x;
        const top = currentCoords.y;

        moveWidget(item.id, left, top);
      },
    }),
    [moveWidget]
  );

  return (
    <Box ref={drop}>
	  {children}
	</Box>                 
  )	  
} 

export default DndWidgetsContainer;