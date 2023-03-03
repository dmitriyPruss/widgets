import React, { useCallback } from 'react';
import { Box,IconButton } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import LastPageIcon from '@mui/icons-material/LastPage';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { TablePaginationActionsProps } from './table-pagination-actions.types';


const TablePaginationActions = (
  { count, 
    page, 
    rowsPerPage, 
    onPageChange 
  }: TablePaginationActionsProps
): EmotionJSX.Element => {
  const theme = useTheme();

  const handleFirstPageButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
	  onPageChange(event, 0);
  }, [onPageChange]);

  const handleBackButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
	  onPageChange(event, page - 1);
  }, [page, onPageChange]);

  const handleNextButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
	  onPageChange(event, page + 1);
  }, [page, onPageChange]);

  const handleLastPageButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
	  onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }, [count, rowsPerPage, onPageChange]);

  return (
	<Box sx={{ flexShrink: 0, ml: 2.5 }}>
	  <IconButton 
        onClick={ handleFirstPageButtonClick } 
        disabled={ page === 0 } 
        aria-label="first page"
      >
		{ theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon /> }
	  </IconButton>
	  <IconButton 
        onClick={ handleBackButtonClick } 
        disabled={ page === 0 } 
        aria-label="previous page"
      >
		{ theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft /> }
	  </IconButton>
	  <IconButton
		onClick={ handleNextButtonClick }
		disabled={ page >= Math.ceil(count / rowsPerPage) - 1 }
		aria-label="next page"
	  >
		{ theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight /> }
	  </IconButton>
	  <IconButton
		onClick={ handleLastPageButtonClick }
	    disabled={ page >= Math.ceil(count / rowsPerPage) - 1 }
		aria-label="last page"
	  >
		{ theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon /> }
	  </IconButton>
	</Box>
  );
}

export default TablePaginationActions;