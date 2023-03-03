import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  Paper,
  Typography
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { blue } from '@mui/material/colors';
import { useSnackbar } from 'notistack';
import ChannelRow from '../channel-row/channel-row.component';
import TablePaginationActions 
  from '../table-pagination-actions/table-pagination-actions.component';
import RouterSuspense from '../router-suspense/router-suspense.component';
import { useGetChannelsQuery } from '@boilerplate/store';
import { headerColumnNames } from '../../constants/channels.constants';
import { ChannelDto } from '@boilerplate/shared';
import {
  headerColumnCellStyle,
  channelTableContainerStyle,
  channelTableFooterStyle,
  tablePaginationStyle,
  bookIconStyle
} from './channels.styles';


const Channels: FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isError } = useGetChannelsQuery({
	  page: page + 1, 
	  pageSize
	});

  const { enqueueSnackbar } = useSnackbar();

  const handleChangePage = useCallback(
    (e: unknown, newPage: number) => {
	    setPage(newPage);
    }, 
    []
  );

  const handleChangeRowsPerPage = useCallback((
	  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(e.target.value, 10));
	  setPage(0);
  }, []);

  const rows = data?.list || [];

  useEffect(() => {
    if (!rows.length && page > 0) {
      setPage(page - 1);
    } 
  }, [rows.length]);

  return (
    <Box
      mt={1}
      height="700px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box width="100%" p={2} >
        <Typography variant="h5" color={blue[800]}>Channels</Typography>
		    <TableContainer 
          component={Paper} 
          sx={{ height: '620px', border: `3px double ${blue[600]}`, position: 'relative' }}
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
              bgcolor="#fff"
              sx={{ opacity: 0.8 }} 
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
                rows?.map((row: ChannelDto) => (
                  <ChannelRow 
                    key={row.id} 
                    row={row} 
                    enqueueSnackbar={enqueueSnackbar} 
                  />
                ))
              )}
			      </TableBody>
		      </Table>
		    </TableContainer>
		    <TableContainer component={Box} sx={channelTableContainerStyle}>
		      <Table aria-label="collapsible table">
			      <TableFooter sx={channelTableFooterStyle}>
			        <TableRow sx={{ position: 'relative', width: '350px' }}>
                <TableCell>
                  <AutoStoriesIcon sx={bookIconStyle} />
                </TableCell>
				        <TablePagination
                  colSpan={3}
                  count={data?.total || 0}
                  rowsPerPage={pageSize}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[5, 10, 25]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  sx={tablePaginationStyle}
				        />
			        </TableRow>
			      </TableFooter>
		      </Table>
		    </TableContainer>
	    </Box>
    </Box>
  )
};

export default Channels;