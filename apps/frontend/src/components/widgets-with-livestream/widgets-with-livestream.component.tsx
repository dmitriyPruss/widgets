import React, { FC, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import {
  Badge,	
  Box,
  Paper,
  Table, 
  TableContainer,
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
  Typography,
  TableCell
} from '@mui/material';
import { blue } from '@mui/material/colors';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AmazonIVSPlayer from '../amazon-ivs-player/amazon-ivs-player.component';
import WidgetRowForLiveStream 
  from '../widget-row-for-livestream/widget-row-for-livestream.component';
import TablePaginationActions 
  from '../table-pagination-actions/table-pagination-actions.component';
import RouterSuspense from '../router-suspense/router-suspense.component';
import DndWidgetsContainer from '../dnd-widgets-container/dnd-widgets-container.component';
import { 
  IWidgetItem, 
  IWidgetsWithLiveStreamProps, 
  ICurrentCoords 
} from './widgets-with-livestream.types';
import {
  headerIconStyle, 
  tablePaginationStyle, 
  tableFooterStyle, 
  widgetsHeaderStyle,
  bookIconStyle 
} from './widgets-with-livestream.styles';
import { socketClient } from '../../socket';


const WidgetsWithLiveStream: FC<IWidgetsWithLiveStreamProps> = (
  { 
	count, 
	page, 
	pageSize, 
	playbackURL, 
	isLoading,
	isError, 
	onChangePage, 
	onChangeRowsPerPage,
	widgets, 
	setWidgets 
  }: IWidgetsWithLiveStreamProps 
) => {
  const videoIconContainerNode = document.getElementById('video-icon-container');

  const { id } = useParams();

  const showVideoIcon = useCallback(() => {
	if (!videoIconContainerNode) {
	  return null;
	}
	
	return ReactDOM.createPortal(
	  <Badge color="error" variant="dot" >
		<SmartDisplayIcon sx={headerIconStyle} />
	  </Badge>,
	  videoIconContainerNode
	);
  }, [videoIconContainerNode]);

  const [currentCoords, setCurrentCoords] = useState<ICurrentCoords>({x: 0, y: 0});

  const videoContainerNode = document.getElementById('video-container');

  const productCards = videoContainerNode?.querySelectorAll('div[draggable="true"]');

  const ids = Array.from(productCards || [])?.map(node => node.id);

  useEffect(() => {
	socketClient.joinVisibleWidgets(id as string);

	socketClient.emitWidgetIds(id as string, ids);

	return () => {
	  socketClient.leftWidgets(id as string);
	};
  }, [id, ids?.length]);

  return (
	<>
	  {showVideoIcon()}	
	  <Box 		  
	    mt={5}
	    height="700px"
	    display="flex"
	    justifyContent="space-between"
	    p="0 30px"
	    position="relative"
	  >
		<DndWidgetsContainer  
		  widgets={widgets}
		  setWidgets={setWidgets}
		  currentCoords={currentCoords}
		>
		  <AmazonIVSPlayer playbackURL={playbackURL} />
		</DndWidgetsContainer>
	    <Box width="380px">
		  <Typography sx={widgetsHeaderStyle}>Widgets</Typography>
		  <TableContainer 
		    component={Paper} 
			sx={{ height: '350px', border: `3px double ${blue[300]}`, position: 'relative' }}
		  >
			{(isLoading || isError) && 
              <Box 
				width="100%" 
				height="100%"
				position="absolute"  
				top={0} 
				left={0}
				display="flex"
				flexDirection="column" 
				justifyContent="center" 
				alignItems="center" 
				zIndex={10} 
              >
                {isLoading && <RouterSuspense />}
                {isError && (
                  <Typography 
                    variant="h6" 
                    sx={{ color: 'red' }}
                  >
                    Error: no data to display
                  </Typography>
                )}  
              </Box>
            }
		    <Table aria-label="collapsible table">
			  <TableBody sx={{ width: '100%' }}>
                {!isError && !isLoading && (
			      widgets?.map((widget: IWidgetItem) => (
					<WidgetRowForLiveStream 
					  key={widget.id} 
					  widget={widget} 
					  setCurrentCoords={setCurrentCoords} 
					/>
				  ))
                )}
			  </TableBody>
		    </Table>
		  </TableContainer>
		  <TableContainer component={Box}>
		    <Table aria-label="collapsible table">
			  <TableFooter sx={tableFooterStyle}>
			    <TableRow sx={{ position: 'relative', width: '350px' }}>
				  <TableCell>
				    <AutoStoriesIcon sx={bookIconStyle} />
				  </TableCell>
				  <TablePagination
				    colSpan={3}
				    count={count}
				    rowsPerPage={pageSize}
				    page={page}
				    onPageChange={onChangePage}
				    rowsPerPageOptions={[5, 10, 25]}
				    onRowsPerPageChange={onChangeRowsPerPage}
				    ActionsComponent={TablePaginationActions}
				    sx={tablePaginationStyle}
				  />
			    </TableRow>
			  </TableFooter>
		    </Table>
		  </TableContainer>
	    </Box>
	  </Box>
	</>
  )	  
} 

export default WidgetsWithLiveStream;