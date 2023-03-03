import { grey } from '@mui/material/colors';
import { SxProps } from '@mui/material';


export const dialogStyle: SxProps = {
  '& .MuiDialog-paper': {
    borderRadius: '20px'
  }  
}

export const dialogContentStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  height: '180px',
  justifyContent: 'space-between'
}

export const closeIconStyle: SxProps = {
  position: 'absolute',
  top: 0,
  right: 0,
  color: grey[600],
  cursor: 'pointer'
}
