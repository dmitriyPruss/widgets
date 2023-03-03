import { blue, grey, red } from '@mui/material/colors';
import { SxProps } from '@mui/material';


export const dialogStyle: SxProps = {
  '& .MuiDialog-paper': {
    borderRadius: '20px'
  } 
}

export const dialogContentStyle: SxProps = {
  paddingBottom: '10px'
}

export const closeIconStyle: SxProps = {
  position: 'absolute',
  top: 5,
  right: 5,
  color: grey[600],
  cursor: 'pointer'
}

export const cancelButtonStyle: SxProps = {
  color: grey[500],
  '&:hover': {
    color: red[500]
  }
}

export const confirmButtonStyle: SxProps = {
  color: blue[500],
  '&:hover': {
    color: blue[900]
  }
};

export const errorStyle: SxProps = { 
  position: 'absolute', 
  top: 58 
};

