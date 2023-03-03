import { SxProps } from '@mui/material';
import { grey } from '@mui/material/colors';


export const widgetRowStyle: SxProps = {
  bgcolor: grey[50],
  cursor: 'pointer',
  width: '100%',
  '&:hover': {
	  bgcolor: grey[200]
  }
};

export const cellStyle: SxProps = {
  border: `1px solid ${grey[300]}`,
};

export const iconStyle: SxProps = {
  border: `1px solid ${grey[300]}`,
  textAlign: 'center'
};