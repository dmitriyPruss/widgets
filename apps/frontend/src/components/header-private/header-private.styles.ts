import { SxProps } from '@mui/material';
import { blue } from '@mui/material/colors';


export const btnStyle: SxProps = { 
  color: '#fff',
  fontSize: '15px',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    bgcolor: blue[50],
    color: blue[900]
  }
};

export const iconStyle: SxProps = {
  width: '35px', 
  height: '35px'
};

export const logoutIconStyle: SxProps = {
  width: '25px', 
  height: '25px',
  marginLeft: '10px',
  color: blue[50],
  cursor: 'pointer',
  '&:hover': {
    color: '#E32636'
  }
};