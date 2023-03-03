import React, { FC, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  Typography
} from '@mui/material';
import { blue } from '@mui/material/colors';
import CastIcon from '@mui/icons-material/Cast';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useModal } from 'mui-modal-provider';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { RootState } from '@boilerplate/store';
import WidgetForm from '../widget-form/widget-form.component';
import WidgetRow from '../widget-row/widget-row.component';
import TablePaginationActions from 
  '../table-pagination-actions/table-pagination-actions.component';
import RouterSuspense from '../router-suspense/router-suspense.component';
import { WidgetDto } from '@boilerplate/shared';
import { headerColumnNames } from '../../constants/widgets.constants';
import { iWidgetsProps } from './widgets.types';
import {  
  bookIconStyle, 
  createWidgetBtnStyle,
  headerColumnCellStyle,
  widgetTableContainerStyle,
  widgetTableFooterStyle,
  tablePaginationStyle
} from './widgets.styles';
import { socketClient } from '../../socket';


const Widgets: FC<iWidgetsProps> = (
  { 
	id, 
	count, 
	page, 
	pageSize, 
	rows, 
	setPage,
	isLoading,
	isError, 
	onChangePage,
	onChangeRowsPerPage
  } : iWidgetsProps
) => {
  const videoIconContainerNode = document.getElementById('video-icon-container');
  
  const showCastIcon = useCallback(() => {
	if (!videoIconContainerNode) {
	  return null;
	}
	  
	return ReactDOM.createPortal(
	  <CastIcon sx={{ height: '30px', width: '35px' }} />,
	  videoIconContainerNode
	);
  }, [videoIconContainerNode]);

  const { showModal } = useModal();

  const { enqueueSnackbar } = useSnackbar();

  const openWidgetForm = useCallback(() => 
	id ? showModal(WidgetForm, { id, enqueueSnackbar }) : null, 
	[id, showModal, enqueueSnackbar]
  );

  const token = useSelector(
    (state: RootState) => state.authReducer.token
  );


  useEffect(() => {
	if (token) {
	  socketClient.joinWidgets(token);

	  socketClient.emitWidgets(token, rows);
	}

	return () => {
	  socketClient.leftWidgets(token as string);
	};
  }, [rows, rows?.length, token]);

  useEffect(() => {
	if (!rows.length && page > 0) {
	  setPage(page - 1);
	} 
  }, [rows.length]);

  return (
    <>
	  {showCastIcon()}
	  <Box
	    mt={1}
		p={2}
	    height="750px"
	    display="flex"
	    flexDirection="column"
	    justifyContent="space-evenly"
	  >
	    <Box display="flex" justifyContent="flex-end">
		  <Button
		    variant="contained"
		    sx={createWidgetBtnStyle}
		    onClick={openWidgetForm}
		  >
		    Create Widget
		  </Button>
	    </Box>
	    <Box width="100%">
		  <Typography variant="h5" color={blue[800]}>Widgets</Typography>
		  <TableContainer component={Paper} sx={{ height: '520px', border: `3px double ${blue[600]}` }}>
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
					sx={{ fontWeight: 'bold', color: 'red' }}
				  >
					Error: no data to display
				  </Typography>
			    )}  
			  </Box>
            }
		    <Table stickyHeader aria-label="collapsible table">
			  <TableHead>
			    <TableRow>
				  {headerColumnNames.map((columnName: string) => (
				    <TableCell key={columnName} sx={headerColumnCellStyle}>
					  {columnName}
				    </TableCell>
				  ))}
			    </TableRow>
			  </TableHead>
			  <TableBody sx={{ width: '100%' }}>
                {!isError && !isLoading && (
			      rows?.map((row: WidgetDto) => (
					<WidgetRow 
					  key={row.id} 
					  row={row} 
					  enqueueSnackbar={enqueueSnackbar} 
					/>
				  ))
                )}
			  </TableBody>
		    </Table>
		  </TableContainer>
		  <TableContainer component={Box} sx={widgetTableContainerStyle}>
		    <Table aria-label="collapsible table">
			  <TableFooter sx={widgetTableFooterStyle}>
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
};

export default Widgets;