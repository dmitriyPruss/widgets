import { SxProps } from '@mui/material';
import { blue } from '@mui/material/colors';

export const linkStyle: SxProps = {
  bgcolor: blue[700],
  color: '#fff',
  p: '8px 16px', 
  borderRadius: 1,
  '&:hover': {
	  bgcolor: blue[800],
    boxShadow: `0px 2px 4px -1px rgb(0 0 0 / 20%), 
                0px 4px 5px 0px rgb(0 0 0 / 14%), 
                0px 1px 10px 0px rgb(0 0 0 / 12%);`
  }
};
