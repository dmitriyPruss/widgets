import { SxProps } from '@mui/material';
import { blue, grey } from '@mui/material/colors';


export const headerColumnCellStyle: SxProps = {
  fontSize: '16px',
  fontWeight: 'bold',
  borderRight: `1px solid ${grey[300]}`,
  textAlign: 'center'
};

export const channelTableContainerStyle: SxProps = {
  height: '100px',
  mt: 1
};

export const channelTableFooterStyle: SxProps = {
  background: `${blue[600]}`,
  fontWeight: 'bold',
  fontSize: '1.3em',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  p: 1
};

export const tablePaginationStyle: SxProps = {
  '& .MuiTablePagination-displayedRows': {
	  color:  '#fff',
    fontWeight: 'bold',
    fontSize: '15px',
    width: '90px'
  },
  '& .MuiTablePagination-selectLabel': {
	  display: 'none',
  },
  '& .MuiNativeSelect-select': {
	  display: 'none',
  },
  '& .MuiTablePagination-select': {
	  display: 'none',
  },
  '& .MuiToolbar-root': {
	  padding: 0
  },
  '& .MuiBox-root': {
	  '& .MuiButtonBase-root': {
	    color: '#fff',
      '&:hover': {
        bgcolor: blue[50],
        color: blue[800]
      }
	  },
  },
  '& .css-16c50h-MuiInputBase-root-MuiTablePagination-select': {
	  visibility: 'hidden'
  }
};

export const bookIconStyle: SxProps = { 
  position: 'absolute', 
  width: '35px', 
  height: '30px', 
  color: '#fff', 
  top: 12 
}
